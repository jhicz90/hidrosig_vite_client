import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { Card, Nav, Tab } from 'react-bootstrap'
import { CreateStructure, CreateWaterSource } from '../components'
import { clearToolbarActions, setToolbarActions, setToolbarTitle } from '../../../store/actions'

export const IrrigationNetworkListPage = () => {

    const dispatch = useDispatch()
    const { hash } = useLocation()

    useEffect(() => {
        dispatch(clearToolbarActions())
        dispatch(setToolbarTitle('RED DE RIEGO'))
        dispatch(setToolbarActions(
            <>
                <CreateStructure />
                <CreateWaterSource />
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
                        <Tab.Container defaultActiveKey={hash === '' ? '#net' : hash}>
                            <Card.Header>
                                <Nav variant='tabs'>
                                    <Nav.Item>
                                        <NavLink to={`net`} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Red de riego</NavLink>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <NavLink to={`watersource`} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Fuentes de agua</NavLink>
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
