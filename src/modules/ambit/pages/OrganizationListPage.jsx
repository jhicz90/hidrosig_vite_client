import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { Card, Nav, Tab } from 'react-bootstrap'
import { clearToolbarActions, setToolbarActions, setToolbarTitle } from '../../../store/actions'
import { CommitteeList, CreateCommittee, CreateJunta, JuntaList } from '../components'

export const OrganizationListPage = () => {

    const dispatch = useDispatch()
    const { hash } = useLocation()
    const { lvlAccess } = useSelector(state => state.auth)

    useEffect(() => {
        dispatch(clearToolbarActions())
        dispatch(setToolbarTitle('ORGANIZACIÓN'))
        dispatch(setToolbarActions(
            <>
                {lvlAccess < 3 && <CreateJunta />}
                <CreateCommittee />
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
                    {
                        lvlAccess >= 2
                            ?
                            <Card className='pb-3'>
                                <CommitteeList />
                            </Card>
                            :
                            <Card>
                                <Tab.Container>
                                    <Card.Header>
                                        <Nav variant='tabs'>
                                            <Nav.Item>
                                                <NavLink to={`junta`} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Junta</NavLink>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <NavLink to={`comm`} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Comisiones</NavLink>
                                            </Nav.Item>
                                        </Nav>
                                    </Card.Header>
                                    <Card.Body className='p-0'>
                                        <Outlet />
                                    </Card.Body>
                                </Tab.Container>
                            </Card>
                    }
                </div>
            </div>
        </div>
    )
}