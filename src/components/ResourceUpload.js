import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, Nav, Tab } from 'react-bootstrap'
import { endModalResource, startUploadResource } from '../actions'
import { ListUploaded } from './ResourceUpload/listUploaded'
import { ListUpload } from './ResourceUpload/listUpload'

export const ResourceUpload = () => {

    const dispatch = useDispatch()
    const { modalResource, modalInit, modalTags, modalMultiple, modalTitle, modalSetArchive, listToUpload } = useSelector(state => state.resource)
    const [activeKey, setActiveKey] = useState({
        1: 'system',
        3: 'uploaded',
        4: 'system',
        6: 'system',
        8: 'uploaded',
        9: 'system',
    }[modalInit] || 'toupload')

    const closeModal = () => {
        dispatch(endModalResource())
    }

    const handleUploadFiles = () => {
        dispatch(startUploadResource({
            files: [...listToUpload],
            setArchive: modalSetArchive,
            tags: modalTags,
            multiple: modalMultiple
        }))
        dispatch(endModalResource())
    }

    useEffect(() => {
        setActiveKey({
            1: 'system',
            3: 'uploaded',
            4: 'system',
            6: 'system',
            8: 'uploaded',
            9: 'system',
        }[modalInit] || 'toupload')
    }, [modalInit])

    return (
        <Modal
            size='xl'
            show={modalResource}
            onHide={closeModal}
            backdrop='static'
            scrollable
        >
            <Tab.Container
                activeKey={activeKey}
                defaultActiveKey={activeKey}
                onSelect={(k) => setActiveKey(k)}
            >
                <Modal.Header style={{ backgroundColor: '#e9ecef' }} closeButton>
                    <div className="d-flex flex-column w-100">
                        <Modal.Title style={{ color: 'black', textAlign: 'center' }}>
                            {modalTitle}
                        </Modal.Title>
                        <Nav className="flex-column flex-md-row mt-4" style={{ marginBottom: '-19px' }} variant='tabs' justify>
                            {
                                (modalInit === 1 || modalInit === 4 || modalInit === 6 || modalInit === 9)
                                &&
                                <Nav.Item>
                                    <Nav.Link style={{ cursor: 'pointer' }} eventKey={'system'}>Sistema</Nav.Link>
                                </Nav.Item>
                            }
                            {
                                (modalInit === 4 || modalInit === 3 || modalInit === 8 || modalInit === 9)
                                &&
                                <Nav.Item>
                                    <Nav.Link style={{ cursor: 'pointer' }} eventKey={'uploaded'}>Imagenes</Nav.Link>
                                </Nav.Item>
                            }
                            {
                                (modalInit === 6 || modalInit === 8 || modalInit === 5 || modalInit === 9)
                                &&
                                <Nav.Item>
                                    <Nav.Link style={{ cursor: 'pointer' }} eventKey={'toupload'}>Subir</Nav.Link>
                                </Nav.Item>
                            }
                        </Nav>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <Tab.Content>
                        {
                            (modalInit === 1 || modalInit === 4 || modalInit === 6 || modalInit === 9)
                            &&
                            <Tab.Pane eventKey={'system'}>
                                Lista de imagenes del sistema
                            </Tab.Pane>
                        }
                        {
                            (modalInit === 4 || modalInit === 3 || modalInit === 8 || modalInit === 9)
                            &&
                            <Tab.Pane eventKey={'uploaded'}>
                                <ListUploaded />
                            </Tab.Pane>
                        }
                        {
                            (modalInit === 6 || modalInit === 8 || modalInit === 5 || modalInit === 9)
                            &&
                            <Tab.Pane eventKey={'toupload'}>
                                <ListUpload />
                            </Tab.Pane>
                        }
                    </Tab.Content>
                </Modal.Body>
                <Modal.Footer>
                    {
                        (listToUpload.length > 0 && activeKey === 'toupload')
                        &&
                        <button
                            onClick={handleUploadFiles}
                            className="btn btn-primary"
                        >
                            Subir archivos
                        </button>
                    }
                    <button
                        onClick={closeModal}
                        className="btn btn-neutral"
                    >
                        Cerrar
                    </button>
                </Modal.Footer>
            </Tab.Container>
        </Modal>
    )
}
