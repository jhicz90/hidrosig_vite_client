import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink, Outlet } from 'react-router-dom'
import { Card, Nav, Tab } from 'react-bootstrap'
import { clearToolbarActions, setToolbarActions, setToolbarTitle } from '../../../store/actions'
import { CreateDocument} from '../components'

export const ResourcesPage = () => {

    const dispatch = useDispatch()

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
                        <Tab.Container>
                            <Card.Header>
                                <Nav variant='tabs'>
                                    <Nav.Item>
                                        <NavLink to={`browser`} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Explorador de archivos</NavLink>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <NavLink to={`docs`} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Documentos</NavLink>
                                    </Nav.Item>
                                </Nav>
                            </Card.Header>
                            <Card.Body className='p-0'>
                                <Outlet />
                            </Card.Body>
                        </Tab.Container>
                    </Card>
                </div>
            </div>
        </div>
    )
}
