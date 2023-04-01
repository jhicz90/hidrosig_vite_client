import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { Nav, Tab } from 'react-bootstrap'
import { LinkBack } from '../../../components'

export const IrrigationNetworkNavPage = () => {

    // const dispatch = useDispatch()
    // const { hash } = useLocation()

    // useEffect(() => {
    //     dispatch(clearToolbarActions())
    //     dispatch(setToolbarTitle('RED DE RIEGO'))
    //     dispatch(setToolbarActions(
    //         <>
    //             <LinkBack className='btn btn-neutral text-primary' to={`?w=structure_create`} >Nueva estructura</LinkBack>
    //             <LinkBack className='btn btn-neutral text-primary' to={`?w=watersource_create`} >Nueva fuente de agua</LinkBack>
    //         </>
    //     ))

    //     return () => {
    //         dispatch(clearToolbarActions())
    //     }
    // }, [dispatch])

    return (
        <div className='row g-0 justify-content-center'>
            <div className='col'>
                <Tab.Container>
                    <Nav variant='tabs' className='px-3'>
                        <Nav.Item>
                            <NavLink to={`net`} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Red de riego</NavLink>
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
    )
}
