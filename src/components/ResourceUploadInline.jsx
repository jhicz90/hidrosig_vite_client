import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useDropzone } from 'react-dropzone'
import { Button } from 'react-bootstrap'
import { filesize } from 'filesize'
import styled from 'styled-components'
import { acceptFiles, msgFetchAlert, previewResource } from '../helpers'
import { IoCloseSharp } from 'react-icons/io5'
import { startUploadResources } from '../store/actions'

export const ResourceUploadInline = ({ multiple = false, maxFiles = 4, accept = 'images', actionUpload = null, tags = [], cloud = false, access = 1 }) => {

    const dispatch = useDispatch()
    const [filesSelected, setFilesSelected] = useState([])
    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles) => {
            if (acceptedFiles.length === 0) {
                msgFetchAlert({ msg: [{ content: 'Los archivos seleccionados no estan permitidos', delay: 3000, type: 'error' }] })
            } else {
                if (!multiple) {
                    setFilesSelected(
                        acceptedFiles.map(file => Object.assign(file, {
                            preview: previewResource(file)
                        }))
                    )
                } else {
                    if (filesSelected.length < maxFiles) {
                        setFilesSelected(
                            [
                                ...filesSelected,
                                ...acceptedFiles.slice(0, maxFiles - filesSelected.length).map(file => Object.assign(file, {
                                    preview: previewResource(file)
                                }))
                            ]
                        )
                    }
                }
            }
        },
        maxFiles,
        accept: acceptFiles(accept),
        multiple
    })

    const handleUpload = () => {
        if (filesSelected.length > 0) {
            dispatch(startUploadResources({
                files: [...filesSelected],
                tags: [...tags],
                multiple,
                cloud,
                access,
                setArchive: (data) => actionUpload(data)
            }))
        }
    }

    return (
        <>
            <div className='row'>
                <div className='col'>
                    <div
                        className='upload-inline'
                        style={{
                            border: '1px dashed #ced4da',
                            borderRadius: '6px',
                            padding: '10px'
                        }}
                    >
                        <div
                            {...getRootProps()}
                            className='container-upload'
                        >
                            <input {...getInputProps()} />
                            <div
                                className='position-relative'
                                style={{
                                    minHeight: '160px',
                                    backgroundColor: '#ced4da4d',
                                    borderRadius: '6px',
                                }}
                            >
                                <span className='position-absolute top-50 start-50 translate-middle'>Arrastre y suelte algunos archivos aqui, o de click para seleccionar los arhivos...</span>
                            </div>
                        </div>
                        {
                            filesSelected.length > 0
                            &&
                            <>
                                <Button
                                    onClick={handleUpload}
                                    variant='secondary'
                                    className='w-100 mt-1'
                                >Subir archivos</Button>
                                <div className='resource-gallery mt-3'>
                                    {
                                        filesSelected.map((file) => (
                                            <FileUploadStyle key={file.name}>
                                                <img src={file.preview} alt={file.name} />
                                                <div className='file-info'>
                                                    <div
                                                        className='d-inline-block text-truncate'
                                                        style={{
                                                            maxWidth: '200px',
                                                            fontWeight: 'bold'
                                                        }}>
                                                        {file.name}
                                                    </div>
                                                    <small className='d-block'>Tamaño: {filesize(file.size !== undefined ? file.size : 0)}</small>
                                                </div>
                                                <Button
                                                    onClick={() => setFilesSelected(filesSelected.filter(f => f !== file))}
                                                    variant='outline-light'
                                                    size='sm'
                                                    className='d-flex align-items-center text-danger'
                                                >
                                                    <IoCloseSharp size={20} />
                                                </Button>
                                            </FileUploadStyle>
                                        ))
                                    }
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

const FileUploadStyle = styled.div`
    border-radius: 2px;
    border: 2px solid #ced4da4d;
    border-radius: 6px;
    background-color: rgb(255, 255, 255);
    box-shadow: none;
    box-sizing: border-box;
    padding: 8px;
    min-height: 40px;
    margin-bottom: 8px;
    user-select: none;
    color: rgb(9, 30, 66);
    display: flex;

    & img {
        width: 40px;
        height: 40px;
        margin-right: 8px;
        flex-shrink: 0;
        flex-grow: 0;
    }

    & .file-info {
        flex-grow: 1;
        flex-basis: 100%;
        display: flex;
        flex-direction: column;
    }
`