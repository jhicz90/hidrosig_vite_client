import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Modal } from 'react-bootstrap'
import { useDropzone } from 'react-dropzone'
import fileSize from 'filesize'
import { startUploadTempResource } from '../actions'
import { imageSysGet, msgAlert } from '../helpers'

export const ResourceUploadTemp = ({ title = '', accept = '', multiple = false, setArchive = null, show, onHide }) => {

    const dispatch = useDispatch()
    const [filesLoaded, setFilesLoaded] = useState([])

    // Este evento se inicia cuando se arrastran archivos no permitidos
    const onDrop = useCallback(acceptedFiles => {
        if (acceptedFiles.length === 0) {
            msgAlert('Los archivos seleccionados no estan permitidos', 3000, 'error')
        } else {
            if (!multiple) {
                setFilesLoaded(acceptedFiles)
            } else {
                setFilesLoaded(e => [...e, ...acceptedFiles])
            }
        }
    }, [multiple])

    // Propiedades del DROPZONE
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        maxFiles: multiple ? 10 : 1,
        accept,
        multiple
    })

    // Efecto que se dispara cuando cambia el estado del SHOW
    useEffect(() => {
        setFilesLoaded([])
    }, [show])

    // Acciones que se realizan al subir archivos en el DROPZONE o elegir un archivo en GALLERY
    const handleUploadFile = () => {
        dispatch(startUploadTempResource(filesLoaded, setArchive))
        onHide()
    }

    // Constante que contiene los archivos cargados en el DROPZONE
    // Cabe recalcar que no se cargaran archivos XLS o DOC por no tener problemas de compatibilidad con versiones anteriores
    const files = filesLoaded.map(file => (
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
                            backgroundImage: `url(${{
                                'jpeg': URL.createObjectURL(file),
                                'png': URL.createObjectURL(file),
                                'xlsx': imageSysGet(2007),
                                'docx': imageSysGet(2008)
                            }[file.name.substring(file.name.lastIndexOf('.') + 1)] || imageSysGet(2000)
                                })`
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
                                onClick={() => handleUploadFile(file)}
                                className="btn btn-sm btn-primary"
                            >
                                Subir
                            </button>
                            <button
                                onClick={() => setFilesLoaded(filesLoaded.filter(f => f !== file))}
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

    return (
        <>
            <Modal
                size='xl'
                show={show}
                onHide={onHide}
                backdrop='static'
            >
                <Modal.Header closeButton closeVariant='white'>
                    <Modal.Title>
                        {title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col">
                            <div className="container-upload" {...getRootProps()} style={{ minHeight: '200px' }} >
                                <input {...getInputProps()} />
                                <p className="fs-6 p-4">
                                    Arrastre y suelte algunos archivos aqui, o de click para seleccionar los arhivos...
                                    {multiple && <><br />(Solo puede seleccionar un máximo de 10 archivos)</>}
                                </p>
                            </div>
                        </div>

                    </div>
                    {
                        (!multiple && filesLoaded.length > 0) &&
                        <div className="row mt-3">
                            <div className="col-auto">
                                {files}
                            </div>
                        </div>
                    }
                    {
                        (multiple && filesLoaded.length > 0) &&
                        <div className="d-flex align-items-start align-content-start flex-wrap mt-3">
                            {files}
                        </div>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <button
                        onClick={onHide}
                        className="btn btn-neutral"
                    >
                        Cerrar
                    </button>
                    {
                        filesLoaded.length > 0
                        &&
                        <button
                            onClick={() => setFilesLoaded([])}
                            className="btn btn-neutral ui-text-red"
                        >
                            <i className="fas fa-eraser" />
                        </button>
                    }
                    <Button
                        onClick={handleUploadFile}
                        disabled={filesLoaded.length === 0}
                        variant='primary'
                    >
                        Subir los archivos
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
