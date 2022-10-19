import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Modal, Nav, Tab } from 'react-bootstrap'
// import { ListUploaded } from './ResourceUpload/listUploaded'
import { ListUpload } from './ResourceUpload/listUpload'
import { finishModalResource, startUploadResources } from '../store/resource'

export const ResourceUpload = () => {

    const dispatch = useDispatch()
    const { modalResource, modalInit, modalTags, modalMultiple, modalTitle, modalSetArchive, modalFilesSelected } = useSelector(state => state.resource)
    const [activeKey, setActiveKey] = useState({
        1: 'system',
        3: 'uploaded',
        4: 'system',
        6: 'system',
        8: 'uploaded',
        9: 'system',
    }[modalInit] || 'toupload')

    const closeModal = () => {
        dispatch(finishModalResource())
    }

    const handleUploadFiles = () => {
        dispatch(startUploadResources({
            files: [...modalFilesSelected],
            setArchive: modalSetArchive,
            tags: modalTags,
            multiple: modalMultiple
        }))
        dispatch(finishModalResource())
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
            fullscreen
        >
            <Tab.Container
                activeKey={activeKey}
                defaultActiveKey={'uploaded'}
                onSelect={(k) => setActiveKey(k)}
            >
                <Modal.Header style={{ backgroundColor: '#e9ecef', paddingBottom: '0px' }} closeButton>
                    <div className='d-flex flex-column w-100 me-3'>
                        <Modal.Title style={{ color: 'black', textAlign: 'center', paddingBottom: '0.5rem' }}>
                            {modalTitle}
                        </Modal.Title>
                        <Nav variant='tabs' justify>
                            <Nav.Item>
                                <Nav.Link style={{ cursor: 'pointer' }} eventKey={'uploaded'}>Biblioteca multimedia</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link style={{ cursor: 'pointer' }} eventKey={'toupload'}>Subir archivos</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <Tab.Content>
                        <Tab.Pane eventKey={'uploaded'}>
                            {/* <ListUploaded /> */}
                        </Tab.Pane>
                        <Tab.Pane eventKey={'toupload'}>
                            <ListUpload />
                        </Tab.Pane>
                    </Tab.Content>
                </Modal.Body>
                <Modal.Footer>
                    {
                        (modalFilesSelected.length > 0 && activeKey === 'toupload')
                        &&
                        <Button
                            onClick={handleUploadFiles}
                            variant='success'
                        >
                            Subir archivos
                        </Button>
                    }
                    <Button
                        onClick={closeModal}
                        variant='neutral'
                    >
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Tab.Container>
        </Modal>
    )
}
