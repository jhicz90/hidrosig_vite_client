import { NavLink, Outlet } from 'react-router-dom'
import { Nav, Tab } from 'react-bootstrap'
import { LinkBack } from '../../../components'

export const TerritoryNavPage = () => {
    return (
        <>
            <div className='container-fluid'>
                <div className='row my-3'>
                    <div className='col-12'>
                        <div className='row align-items-center justify-content-between g-3'>
                            <div className='col-12 col-md-auto'>
                                <h4 className='mb-0'>TERRITORIO</h4>
                            </div>
                            <div className='col-12 col-md-auto'>
                                <div className='d-flex gap-2'>
                                    <LinkBack className='btn btn-neutral text-primary' to={`zone/create`}>Nueva zona</LinkBack>
                                    <LinkBack className='btn btn-neutral text-primary' to={`block/create`}>Nuevo bloque</LinkBack>
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
