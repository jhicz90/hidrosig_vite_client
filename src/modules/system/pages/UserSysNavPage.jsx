import { LinkBack } from '../../../components'
import { Nav, Tab } from 'react-bootstrap'
import { NavLink, Outlet } from 'react-router-dom'

export const UserSysNavPage = () => {
    return (
        <>
            <div className='container-fluid'>
                <div className='row my-3'>
                    <div className='col-12'>
                        <div className='row align-items-center justify-content-between g-3'>
                            <div className='col-12 col-md-auto'>
                                <h4 className='mb-0'>USUARIOS DE SISTEMA</h4>
                            </div>
                            <div className='col-12 col-md-auto'>
                                <div className='d-flex gap-2'>
                                    <LinkBack className='btn btn-neutral text-primary' to={`users/create`}>Nuevo usuario</LinkBack>
                                    <LinkBack className='btn btn-neutral text-primary' to={`role/create`}>Nuevo rol</LinkBack>
                                    <LinkBack className='btn btn-neutral text-primary' to={`occup/create`}>Nueva ocupación</LinkBack>
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
                                <NavLink to={`users`} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Usuarios</NavLink>
                            </Nav.Item>
                            <Nav.Item>
                                <NavLink to={`role`} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Roles</NavLink>
                            </Nav.Item>
                            <Nav.Item>
                                <NavLink to={`occup`} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Ocupaciones</NavLink>
                            </Nav.Item>
                        </Nav>
                        <Outlet />
                    </Tab.Container>
                </div>
            </div>
        </>
    )
}
