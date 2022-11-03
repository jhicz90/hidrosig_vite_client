import React from 'react'
import { Card, Nav, Tab } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import { DocumentBrowser, ResourceBrowser } from '../components'

export const ResourcesPage = () => {

    const { hash } = useLocation()

    return (
        <div className='container'>
            <div className='row justify-content-center'>
                <div className='col'>
                    <Card>
                        <Tab.Container defaultActiveKey={hash === '' ? '#browser' : hash}>
                            <Card.Header>
                                <Nav variant='tabs'>
                                    <Nav.Item>
                                        <Nav.Link eventKey='#browser'>Explorador de archivos</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey='#docs'>Documentos</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Card.Header>
                            <Card.Body className='p-0'>
                                <Tab.Content>
                                    <Tab.Pane eventKey='#browser'>
                                        <ResourceBrowser />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey='#docs'>
                                        <DocumentBrowser />
                                    </Tab.Pane>
                                </Tab.Content>
                            </Card.Body>
                        </Tab.Container>
                    </Card>
                </div>
            </div>
        </div>
    )
}
