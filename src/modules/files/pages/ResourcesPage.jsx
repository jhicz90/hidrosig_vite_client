import React, { useEffect } from 'react'
import { Card, Nav, Tab } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { clearToolbarActions, setToolbarActions, setToolbarTitle } from '../../../store/actions'
import { CreateDocument, DocumentBrowser, ResourceBrowser } from '../components'

export const ResourcesPage = () => {

    const dispatch = useDispatch()
    const { hash } = useLocation()

    useEffect(() => {
        dispatch(clearToolbarActions())
        dispatch(setToolbarTitle('RECURSOS'))
        dispatch(setToolbarActions(
            <>
                <CreateDocument />
            </>
        ))

        return () => {
            dispatch(clearToolbarActions())
        }
    }, [dispatch])

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
                                        {/* <ResourceBrowser /> */}
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
