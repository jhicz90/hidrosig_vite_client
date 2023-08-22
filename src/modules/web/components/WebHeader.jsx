import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { CgDarkMode } from 'react-icons/cg'
import { useUIStore } from '../../../hooks'

import logoApp from '../../../assets/logo192.png'

export const WebHeader = () => {

    const { uid } = useSelector(state => state.auth)
    const { toggleTheme } = useUIStore()

    return (
        <Navbar fixed='top' expand='md' className='bg-body-tertiary'>
            <Container>
                <Link to={`/web`} className='navbar-brand'>
                    <img
                        src={logoApp}
                        width='32'
                        height='32'
                        className='d-inline-block align-top'
                        alt='logo'
                    />
                </Link>
                <Navbar.Toggle aria-controls='navbarScroll' />
                <Navbar.Collapse id='navbarScroll'>
                    <Nav
                        className='me-auto my-2 my-lg-0'
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <NavLink to={`/web`} end className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>Inicio</NavLink>
                        <NavLink to={`/web/servs`} end className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>Servicios</NavLink>
                        <NavDropdown title='Juntas de Usuarios'>
                            <NavDropdown.Item href='#junta1'>Junta de Usuarios - Chira</NavDropdown.Item>
                            <NavDropdown.Item href='#junta2'>Junta de Usuarios - Piura</NavDropdown.Item>
                            <NavDropdown.Item href='#junta3'>Junta de Usuarios - Sechura</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href='#juntas_acerca'>Sobre las Juntas de usuarios</NavDropdown.Item>
                        </NavDropdown>
                        <NavLink to={`/web/about`} end className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>Nosotros</NavLink>
                    </Nav>
                    <Nav>
                        <Nav.Link href='#' onClick={toggleTheme}>
                            <CgDarkMode size={20} />
                        </Nav.Link>
                        {
                            uid
                                ?
                                <Link to={`/app/home`} className='nav-link'>Regresar a HIDRO SIHG</Link>
                                :
                                <Link to={`/login`} className='nav-link'>Ingresar a HIDRO SIHG</Link>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
