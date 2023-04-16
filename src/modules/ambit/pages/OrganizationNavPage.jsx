import { NavLink, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Nav, Tab } from 'react-bootstrap'
import { LinkBack } from '../../../components'

export const OrganizationNavPage = () => {

    const { lvlAccess } = useSelector(state => state.auth)

    return (
        <>
            <div className='container-fluid'>
                <div className='row my-3'>
                    <div className='col-12'>
                        <div className='row align-items-center justify-content-between g-3'>
                            <div className='col-12 col-md-auto'>
                                <h4 className='mb-0'>ORGANIZACIÓN</h4>
                            </div>
                            <div className='col-12 col-md-auto'>
                                <div className='d-flex gap-2'>
                                    {lvlAccess < 3 && <LinkBack className='btn btn-neutral text-primary' to={`junta/create`}>Nueva junta</LinkBack>}
                                    <LinkBack className='btn btn-neutral text-primary' to={`comm/create`}>Nuevo comisión</LinkBack>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
        </>
    )
}