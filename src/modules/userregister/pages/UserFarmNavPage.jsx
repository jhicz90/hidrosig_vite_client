import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { Card, Nav, Tab } from 'react-bootstrap'
import { LinkBack } from '../../../components'
import { clearToolbarActions, setToolbarActions, setToolbarTitle } from '../../../store/actions'

export const UserFarmNavPage = () => {

    const dispatch = useDispatch()
    const { hash } = useLocation()

    useEffect(() => {
        dispatch(clearToolbarActions())
        dispatch(setToolbarTitle('USUARIOS AGRARIOS'))
        dispatch(setToolbarActions(
            <>
                <LinkBack className='btn btn-neutral text-primary' to={`?w=userfarm_create`}>Nuevo usuario</LinkBack>
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
                                        <NavLink to={`users`} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Usuarios</NavLink>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <NavLink to={`import`} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Importación</NavLink>
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
