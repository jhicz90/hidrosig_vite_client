import { useEffect } from 'react'
import { Card, Nav, Tab } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { NavLink, Outlet } from 'react-router-dom'
import { LinkBack } from '../../../components'
import { clearToolbarActions, setToolbarActions, setToolbarTitle } from '../../../store/actions'

export const TerritoryNavPage = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(clearToolbarActions())
        dispatch(setToolbarTitle('TERRITORIO'))
        dispatch(setToolbarActions(
            <>
                <LinkBack className='btn btn-neutral text-primary' to={`?w=zone_create&j=`}>Nueva zona</LinkBack>
                <LinkBack className='btn btn-neutral text-primary' to={`?w=block_create&j=&c=`}>Nuevo bloque</LinkBack>
            </>
        ))

        return () => {
            dispatch(clearToolbarActions())
        }
    }, [dispatch])

    return (
        <>
            <div className='row g-0 justify-content-center'>
                <div className='col'>
                    <Tab.Container>
                        <Nav variant='tabs' className='px-3'>
                            <Nav.Item>
                                <NavLink to={`zone`} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Zonas</NavLink>
                            </Nav.Item>
                            <Nav.Item>
                                <NavLink to={`block`} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Bloques de riego</NavLink>
                            </Nav.Item>
                            <Nav.Item>
                                <NavLink to={`location`} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Localidades</NavLink>
                            </Nav.Item>
                        </Nav>
                        <Outlet />
                    </Tab.Container>
                </div>
            </div>
        </>
    )
}