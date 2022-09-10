import React, { useCallback, useEffect, useState } from 'react'
import { Button, Card, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useDropzone } from 'react-dropzone'
import fileSize from 'filesize'
import { hideImportData, seeImportData,startUploadTempResource } from '../actions'
import { imageSysGet,msgAlert } from '../helpers'
import { Image } from './Image'

export const ImportData = ({ title = '', accept = '', multiple = false, setArchive = null }) => {

    const dispatch = useDispatch()
    const { importData } = useSelector(state => state.ui)
    const [filesLoaded, setFilesLoaded] = useState([])

    const onHide = () => {
        dispatch(hideImportData())
    }

    const handleUploadFile = () => {
        dispatch(startUploadTempResource(filesLoaded, setArchive))
        onHide()
    }

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

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        maxFiles: multiple ? 10 : 1,
        accept,
        multiple
    })

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

    useEffect(() => {
        setFilesLoaded([])
    }, [importData])

    return (
        <>
            <button
                onClick={() => dispatch(seeImportData())}
                className="btn btn-neutral"
            >
                Importar
            </button>
            <Modal
                size='xl'
                show={importData}
                onHide={onHide}
                backdrop='static'
                scrollable
            >
                <Modal.Header closeButton closeVariant='white'>
                    <Modal.Title>
                        Importar {title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container-fluid">
                        <Card bg='light'>
                            <Card.Body>
                                <div className="d-flex justify-content-between align-items-center flex-column flex-lg-row">
                                    <Image noImg={1017} width={100} height={100} />
                                    <div className="my-3 mx-lg-3">
                                        <h5>Descarga nuestra plantilla en EXCEL</h5>
                                        <p>Para poder importar estructuras o tramos de estructuras en lote, debes de descargar la plantilla y subirla utilizando el mismo formato.</p>
                                    </div>
                                    <button className="btn btn-neutral ui-text-blue">Descargar la plantilla</button>
                                </div>
                            </Card.Body>
                        </Card>
                        <div className="row mt-3">
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
                    </div>
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
