import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink, Outlet } from 'react-router-dom'
import { Nav, Tab } from 'react-bootstrap'
import { LinkBack } from '../../../components'
import { clearToolbarActions, setToolbarActions, setToolbarTitle } from '../../../store/actions'

export const UserFarmNavPage = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(clearToolbarActions())
        dispatch(setToolbarTitle('USUARIOS Y PREDIOS'))
        dispatch(setToolbarActions(
            <>
                <LinkBack className='btn btn-neutral text-primary' to={`?w=userfarm_create`}>Nuevo usuario</LinkBack>
                <LinkBack className='btn btn-neutral text-primary' to={`?w=areafarm_create`}>Nuevo predio</LinkBack>
            </>
        ))

        return () => {
            dispatch(clearToolbarActions())
        }
    }, [dispatch])

    return (
        <div className='row g-0 justify-content-center'>
            <div className='col'>
                <Tab.Container>
                    <Nav variant='tabs' className='px-3'>
                        <Nav.Item>
                            <NavLink to={`users`} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Usuarios</NavLink>
                        </Nav.Item>
                        <Nav.Item>
                            <NavLink to={`prps`} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Predios</NavLink>
                        </Nav.Item>
                        <Nav.Item>
                            <NavLink to={`import`} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Importación</NavLink>
                        </Nav.Item>
                    </Nav>
                    <Outlet />
                </Tab.Container>
            </div>
        </div>
    )
}
