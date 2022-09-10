import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useDropzone } from 'react-dropzone'
import fileSize from 'filesize'
import { loadListToUploadResource } from '../../actions'
import { msgFetchAlert, previewResource, acceptFiles } from '../../helpers'

export const ListUpload = () => {

    const dispatch = useDispatch()
    const { modalAccept, modalMultiple, modalLimit, listToUpload } = useSelector(state => state.resource)

    // Propiedades del DROPZONE
    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles) => {
            if (acceptedFiles.length === 0) {
                msgFetchAlert({ msg: [{ content: 'Los archivos seleccionados no estan permitidos', delay: 3000, type: 'error' }] })
            } else {
                if (!modalMultiple) {
                    dispatch(loadListToUploadResource(
                        acceptedFiles.map(file => Object.assign(file, {
                            preview: previewResource(file)
                        }))
                    ))
                } else {
                    if (listToUpload.length < modalLimit) {
                        dispatch(loadListToUploadResource(
                            [
                                ...listToUpload,
                                ...acceptedFiles.slice(0, modalLimit - listToUpload.length).map(file => Object.assign(file, {
                                    preview: previewResource(file)
                                }))
                            ]
                        ))
                    }
                }
            }
        },
        maxFiles: modalMultiple ? modalLimit : 1,
        accept: acceptFiles(modalAccept),
        multiple: modalMultiple
    })

    return (
        <>
            <div className="row">
                <div className="col">
                    <div className="container-upload" {...getRootProps()} style={{ minHeight: '200px' }} >
                        <input {...getInputProps()} />
                        <p className="fs-6 p-4">Arrastre y suelte algunos archivos aqui, o de click para seleccionar los arhivos...</p>
                    </div>
                </div>

            </div>
            {
                listToUpload.length > 0
                &&
                <div className="resource-gallery mt-3">
                    {
                        listToUpload.map((file) => (
                            <div key={file.name} className="file-box">
                                <div className="file">
                                    <div style={{ cursor: 'pointer' }} className="shadow">
                                        <span className="corner" />
                                        <div
                                            className="image"
                                            style={{
                                                width: '100%',
                                                height: '200px',
                                                overflow: 'hidden',
                                                backgroundPosition: 'top',
                                                backgroundSize: 'cover',
                                                backgroundRepeat: 'no-repeat',
                                                backgroundImage: `url(${file.preview})`
                                            }}
                                        />
                                        <div className="file-name">
                                            <span
                                                className="d-inline-block text-truncate"
                                                style={{
                                                    maxWidth: '150px',
                                                    fontWeight: 'bold'
                                                }}>
                                                {file.name}
                                            </span>
                                            <br />
                                            <small className="d-block">Tamaño: {fileSize(file.size !== undefined ? file.size : 0)}</small>
                                            <div className="btn-group w-100 mt-2">
                                                <button
                                                    onClick={() => dispatch(loadListToUploadResource(listToUpload.filter(f => f !== file)))}
                                                    className="btn btn-sm btn-danger"
                                                >
                                                    Quitar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            }
        </>
    )
}
