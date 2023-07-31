import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { FormCheck } from 'react-bootstrap'
import { IoReturnUpBack } from 'react-icons/io5'

import { UseForm } from '../../../hooks'
import { checkingAuthentication, useLazyAuthLoginQuery } from '../../../store/actions'

import backgroundLogin from '../../../assets/slider2.jpg'
import logoApp from '../../../assets/logo192.png'
import { BeatLoader } from 'react-spinners'

export const LoginPage = () => {

    const navigate = useNavigate()
    const [formLoginValues, , handleLoginInputChange] = UseForm({
        userpass: '',
        password: '',
        remenber: false
    })
    const [login] = useLazyAuthLoginQuery()
    const { userpass, password, remenber } = formLoginValues

    const { checkLogin } = useSelector(state => state.auth)

    const isAuthenticating = useMemo(() => checkLogin === true, [checkLogin])

    const handleLogin = (e) => {
        e?.preventDefault()
        // dispatch(checkingAuthentication(formLoginValues))
        login(formLoginValues)
    }

    const handleBackWeb = () => {
        navigate('/web')
    }

    return (
        <div className='login'>
            <div className='login-content'>
                <div
                    onClick={handleBackWeb}
                    className='btn btn-link text-decoration-none position-fixed'
                    style={{ right: '10px', top: '10px' }}
                >
                    <IoReturnUpBack size={24} />
                    <span className='ms-1'>Regresar a la página principal</span>
                </div>
                <div className='banner d-none d-lg-flex col-xl-8 col-lg-7 align-items-center p-5' style={{ backgroundImage: `url('${backgroundLogin}')` }}>
                    <div className='banner-overlay bg-dark'></div>
                    <div className='w-100 text-white px-5' style={{ zIndex: '1' }}>
                        <h1 className='display-2 fw-bold mb-4'>BIENVENIDO A HIDROSIHG</h1>
                        <div className='fs-4 fw-light'>
                            Con la misión de mejorar el uso del recurso hídrico se creo HIDROSIHG, donde vera un mejor control y manejo de la información del campo a la web.
                        </div>
                    </div>
                </div>
                <div className='login-form d-flex align-items-center col-10 col-lg-5 col-xl-4 p-lg-0 p-xl-1'>
                    <div className='d-flex col-sm-7 col-md-5 col-lg-12 col-xl-12 px-0 px-xl-4 mx-auto'>
                        <div className='w-100 d-flex flex-column align-items-center'>
                            <div className='d-flex justify-content-center align-items-center'>
                                <img src={logoApp} alt='logo' className='ui-w-140' />
                            </div>
                            <h4 className='text-center fw-lighter mt-3 mb-0'>Inicia sesión con tu cuenta</h4>
                            <form onSubmit={handleLogin} className='ui-w-350' noValidate>
                                <input
                                    value={userpass}
                                    onChange={handleLoginInputChange}
                                    disabled={isAuthenticating}
                                    name='userpass'
                                    type='text'
                                    id='inputEmail'
                                    className='form-control form-control-input-login'
                                    placeholder='Usuario o Correo'
                                    autoFocus
                                    autoComplete='off'
                                />
                                <input
                                    value={password}
                                    onChange={handleLoginInputChange}
                                    disabled={isAuthenticating}
                                    name='password'
                                    type='password'
                                    id='inputPassword'
                                    className='form-control form-control-input-login'
                                    placeholder='Contraseña'
                                    autoComplete='off'
                                />
                                <div className='d-flex justify-content-between my-2'>
                                    <FormCheck
                                        inline
                                        value={remenber}
                                        onChange={handleLoginInputChange}
                                        name='remenber'
                                        id='inputRemenber'
                                        type='checkbox'
                                        label={`Recordarme`}
                                    />
                                    <Link to='/recoverpassw' className='d-block small text-decoration-none'>¿Se olvido de la contraseña?</Link>
                                </div>
                                <div className='d-flex justify-content-center'>
                                    {
                                        isAuthenticating
                                            ?
                                            <BeatLoader size={32} speedMultiplier={0.5} style={{ opacity: 0.5, display: 'flex', marginTop: '1rem' }} />
                                            :
                                            <button
                                                disabled={isAuthenticating}
                                                onClick={handleLogin}
                                                className='btn btn-login btn-primary fw-bold w-100' type='submit'>
                                                Iniciar sesión
                                            </button>
                                    }
                                    {/* <button
                                        disabled={isAuthenticating}
                                        onClick={handleLogin}
                                        className='btn btn-login btn-primary fw-bold' type='submit'>
                                        Iniciar sesión
                                    </button> */}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
