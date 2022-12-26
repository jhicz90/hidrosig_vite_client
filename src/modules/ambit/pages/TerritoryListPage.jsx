import { useEffect } from 'react'
import { Card, Nav, Tab } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { NavLink, Outlet } from 'react-router-dom'
import { clearToolbarActions, setToolbarActions, setToolbarTitle } from '../../../store/actions'
import { CreateBlock, CreateZone } from '../components'

export const TerritoryListPage = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(clearToolbarActions())
        dispatch(setToolbarTitle('TERRITORIO'))
        dispatch(setToolbarActions(
            <>
                <CreateZone />
                <CreateBlock />
            </>
        ))

        return () => {
            dispatch(clearToolbarActions())
        }
    }, [dispatch])

    return (
        <>
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col'>
                        <Card>
                            <Tab.Container>
                                <Card.Header>
                                    <Nav variant='tabs'>
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
                                </Card.Header>
                                <Card.Body className='p-0'>
                                    <Outlet />
                                </Card.Body>
                            </Tab.Container>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    )
}
