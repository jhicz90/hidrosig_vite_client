import { NavLink, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Nav, Tab } from 'react-bootstrap'
import { LinkBack } from '../../../components'

export const IrrigationNetworkNavPage = () => {

    const { activeNode: { id = '' } } = useSelector(state => state.irrigationnetwork)

    return (
        <>
            <div className='container-fluid'>
                <div className='row my-3'>
                    <div className='col-12'>
                        <div className='row align-items-center justify-content-between g-3'>
                            <div className='col-12 col-md-auto'>
                                <h4 className='mb-0'>RED DE RIEGO</h4>
                            </div>
                            <div className='col-12 col-md-auto'>
                                <div className='d-flex gap-2'>
                                    <LinkBack className='btn btn-neutral text-primary' to={`?w=structure_create`} state={{ parent: id || '' }}>Nueva estructura</LinkBack>
                                    <LinkBack className='btn btn-neutral text-primary' to={`?w=watersource_create`}>Nueva fuente de agua</LinkBack>
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
                                <NavLink to={`net`} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Red de riego</NavLink>
                            </Nav.Item>
                            <Nav.Item>
                                <NavLink to={`str`} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Estructuras</NavLink>
                            </Nav.Item>
                            <Nav.Item>
                                <NavLink to={`ws`} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Fuentes de agua</NavLink>
                            </Nav.Item>
                            <Nav.Item>
                                <NavLink to={`var`} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Variables</NavLink>
                            </Nav.Item>
                            <Nav.Item>
                                <NavLink to={`import`} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Importación</NavLink>
                            </Nav.Item>
                        </Nav>
                        <Outlet />
                    </Tab.Container>
                </div>
            </div>
        </>
    )
}
