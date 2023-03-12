import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Outlet } from 'react-router-dom'
import { Nav, Tab } from 'react-bootstrap'
import { clearToolbarActions, setToolbarActions, setToolbarTitle } from '../../../store/actions'
import { LinkBack } from '../../../components'

export const OrganizationNavPage = () => {

    const dispatch = useDispatch()
    const { lvlAccess } = useSelector(state => state.auth)

    useEffect(() => {
        dispatch(clearToolbarActions())
        dispatch(setToolbarTitle('ORGANIZACIÓN'))
        dispatch(setToolbarActions(
            <>
                {lvlAccess < 3 && <LinkBack className='btn btn-neutral text-primary' to={`?w=junta_create`}>Nueva junta</LinkBack>}
                <LinkBack className='btn btn-neutral text-primary' to={`?w=comm_create&j=&c=`}>Nuevo comisión</LinkBack>
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
                            <NavLink to={`junta`} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Junta</NavLink>
                        </Nav.Item>
                        <Nav.Item>
                            <NavLink to={`comm`} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Comisiones</NavLink>
                        </Nav.Item>
                    </Nav>
                    <Outlet />
                </Tab.Container>
            </div>
        </div>
    )
}