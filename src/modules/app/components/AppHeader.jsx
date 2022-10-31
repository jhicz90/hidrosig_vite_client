import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Dropdown } from 'react-bootstrap'
import styled from 'styled-components'
import { FaBell, FaEnvelope, FaSearch } from 'react-icons/fa'
import { GiHamburgerMenu } from 'react-icons/gi'

import { logoutAuth, setCmkbarShow } from '../../../store/actions'

import logoApp from '../../../assets/logo192.png'
import { AvatarProfile } from '../../../components'

export const AppHeader = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { displayName, photoURL } = useSelector(state => state.auth)

    const handleLogout = () => {
        dispatch(logoutAuth())
        navigate('/login', { replace: true })
    }

    const handleSidebar = () => {
        const rootApp = document.querySelector('.root-app')
        rootApp.classList.toggle('sidebar-app-mobile-toggled')
    }

    return (
        <HeaderApp>
            <div className='mobile-toggler'>
                <button
                    onClick={handleSidebar}
                    type='button' className='menu-toggler'>
                    <GiHamburgerMenu size={20} />
                </button>
            </div>
            <div className='brand'>
                <Link to={`/app`} className='brand-logo'>
                    HIDRO SIHG
                    <img className='ms-1' src={logoApp} alt='' height='30' />
                </Link>
            </div>
            <div className='menu'>
                <div className='menu-search'>
                    <div className='menu-search-icon'>
                        <FaSearch />
                    </div>
                    <div className='menu-search-input'>
                        <input type='text' className='form-control' placeholder='Buscar...' />
                    </div>
                    <div onClick={() => dispatch(setCmkbarShow(true))} className='menu-search-kbar dark-apple'>
                        <kbd>CTRL+K</kbd>
                    </div>
                </div>
                <Dropdown className='menu-item dropdown-noarrow'>
                    <Dropdown.Toggle as='a' variant='light' className='menu-link'>
                        <div className='menu-icon'>
                            <FaEnvelope />
                        </div>
                        <div className='menu-label'>4</div>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item>Opcion 1</Dropdown.Item>
                        <Dropdown.Item>Opcion 2</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item>Opcion 3</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown className='menu-item dropdown-noarrow'>
                    <Dropdown.Toggle as='a' variant='light' className='menu-link'>
                        <div className='menu-icon'>
                            <FaBell />
                        </div>
                        <div className='menu-label'>6</div>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item>Opcion 1</Dropdown.Item>
                        <Dropdown.Item>Opcion 2</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item>Opcion 3</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown className='menu-item dropdown-noarrow'>
                    <Dropdown.Toggle as='a' variant='light' className='menu-link'>
                        <div className='menu-img online'>
                            {/* <img
                                src={photoURL ? imageGet(photoURL) : imageSysGet(1069)}
                                className='w-100 h-100 rounded-circle shadow'
                                style={{ objectFit: 'contain' }}
                                alt='usersys'
                            /> */}
                            <AvatarProfile size='48px' avatarImg={photoURL} />
                        </div>
                        <div className='menu-text'>{displayName}</div>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item>
                            <i className='fas fa-user-cog'></i><span className='ms-1'>Prefrencias</span>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <i className='fas fa-print'></i><span className='ms-1'>Impresoras</span>
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={handleLogout}>
                            <i className='fas fa-sign-out-alt'></i><span className='ms-1'>Cerrar sesión</span>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </HeaderApp>
    )
}

const HeaderApp = styled.header`
    border: none;
    position: sticky;
    top: 0;
    padding: 0;
    padding-left: 10px;
    padding-right: 10px;
    z-index: 900;
    height: 60px;
    background: #fff;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    transition: box-shadow 0.2s linear;
    box-shadow: 0 6px 6px rgb(0 18 25 / 10%);

    & .mobile-toggler {
        margin-right: auto;
        display: none;
    }

    & .menu-toggler {
        position: relative;
        border: none;
        background: 0 0;
        width: 45px;
        display: block;
        outline: 0;
        padding: 0 10px;
        margin: 0;
        height: 60px;
    }

    & .brand {
        width: 200px;
        height: 60px;
        display: flex;
        align-items: center;
    }

    & .desktop-toggler {
        height: 60px;
        width: 4.0625rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    & .desktop-toggler .menu-toggler {
        width: 65px;
        height: 60px;
        padding: 0 20px;
    }

    & .brand .brand-logo {
        font-weight: 700;
        color: #212837;
        font-size: 20px;
        text-decoration: none;
        height: 60px;
        width: 100%;
        padding: 20px 0;
        display: flex;
        align-items: center;
        /* ESTO ES PARA CENTRAR EL LOGO EN CASO QUE NO HAYA IMPLEMENTADO EL MODO MINIFIED PARA EL SIDEBAR */
        justify-content: center;
    }

    & .menu {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }

    & .menu .menu-search {
        margin: 0 auto 0 50px;
        position: relative;
        max-width: 400px;
        flex: 1;
    }

    & .menu .menu-search .menu-search-icon {
        position: absolute;
        left: 0;
        width: 46px;
        top: 0;
        bottom: 0;
        font-size: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    & .menu .menu-search .menu-search-kbar {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
    }

    & .menu .menu-search .menu-search-input .form-control {
        background: #ebeef4;
        border-color: transparent;
        padding-left: 46px;
        height: 40px;
        font-size: 1rem;
    }

    & .menu .menu-search .menu-search-input .form-control:focus {
        box-shadow: 0 0 0 2px #1f6bff;
    }

    & .menu .menu-item {
        position: relative;
    }

    & .menu .menu-item .menu-link {
        height: 60px;
        padding: 15px;
        text-decoration: none;
        color: #212837;
        display: flex;
        align-items: center;
        cursor: pointer;
        line-height: 20px;
    }

    & .menu .menu-item .menu-icon {
        font-size: 20px;
    }

    & .menu .menu-item .menu-label {
        position: absolute;
        top: 10px;
        right: 5px;
        background: #1f6bff;
        color: #fff;
        font-weight: 700;
        font-size: 12px;
        padding: 0 6px;
        min-width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 30px;
    }

    & .menu .menu-item .menu-img,
    & .menu .menu-item .menu-img-text {
        height: 48px;
        width: 48px;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    & .menu .menu-item .menu-img-text.online:before,
    & .menu .menu-item .menu-img.online:before {
        content: "";
        position: absolute;
        width: 33%;
        height: 33%;
        right: -1px;
        bottom: 0px;
        background: #03ba31;
        border-radius: 8px;
        border: 2px solid white;
        z-index: 1;
    }

    & .menu .menu-item .menu-img + .menu-text,
    & .menu .menu-item .menu-img-text + .menu-text {
        margin-left: 8px;
    }

    @media (max-width: 1200px) {
        padding: 0 10px;

        & .desktop-toggler {
            display: none;
        }

        & .brand {
            width: auto;
        }

        & .mobile-toggler {
            display: block;
            margin-right: 10px;
        }

        & .menu .menu-search {
            margin-left: 30px;
            margin-right: 10px;
        }
    }

    @media (max-width: 768px) {
        & .brand {
            display: none;
        }

        & .menu .menu-search {
            display: none;
        }
    }
`