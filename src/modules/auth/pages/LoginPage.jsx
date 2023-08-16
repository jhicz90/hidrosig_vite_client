import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { FloatingLabel, Form } from 'react-bootstrap'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import { useLazyAuthLoginQuery } from '../../../store/actions'

import bg from '../../../assets/slider1.jpg'

export const LoginPage = () => {

    const { register, handleSubmit } = useForm({
        defaultValues: {
            userpass: '',
            password: '',
            remenber: false
        }
    })
    const [login, { isLoading, isFetching }] = useLazyAuthLoginQuery()

    const isAuthenticating = useMemo(() => isLoading || isFetching, [isLoading, isFetching])

    const handleLogin = (data) => {
        login(data)
    }

    return (
        <Login style={{ backgroundImage: `url(${bg})` }}>
            <div className='background'>
                <div className='form-card'>
                    <div className='form-title'>
                        Bienvenido 👋 a HIDROSIHG
                    </div>
                    <div className='form-subtitle'>
                        Escriba su usuario y contraseña para poder ingresar
                    </div>
                    <form className='auth' onSubmit={handleSubmit(handleLogin)}>
                        <FloatingLabel
                            label='Usuario o Correo'
                            className='mb-3'
                        >
                            <Form.Control
                                {...register('userpass', { required: true })}
                                disabled={isAuthenticating}
                                type='text'
                                placeholder='Usuario o Correo'
                            />
                        </FloatingLabel>
                        <FloatingLabel
                            label='Contraseña'
                            className='mb-3'
                        >
                            <Form.Control
                                {...register('password', { required: true })}
                                disabled={isAuthenticating}
                                type='password'
                                placeholder='Contraseña'
                            />
                        </FloatingLabel>
                        <div className='w-100 d-flex flex-column align-items-center my-2'>
                            <Form.Check
                                {...register('remenber')}
                                id='remenberCheck'
                                inline
                                className='text-white fs-5'
                                type='checkbox'
                                label={`Recordarme`}
                            />
                            <Link to='/recoverpassw' className='d-block small text-decoration-none'>¿Se olvido de la contraseña?</Link>
                        </div>
                        <button
                            disabled={isAuthenticating}
                            className='btn btn-login btn-primary fw-bold w-100' type='submit'>
                            Iniciar sesión
                        </button>
                    </form>
                </div>
            </div>
        </Login>
    )
}

const Login = styled.div`
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
    width: 100vw;
    margin: 0px;

    & div.background {
        width: 100vw;
        height: 100vh;
        background: linear-gradient(75deg, rgb(40,43,54) 0%, rgb(40,43,54) 30%, rgba(40,43,54,0.8) 100%);
        /* Vertical center */
        display: table-cell;
        vertical-align: middle;

        & div.form-card {
            width: 68%;
            display: flex;
            flex-direction: column;
            max-width: 350px;
            margin-left: 60px !important;
        }

        & div.form-title { 
            font-size: 42px; 
            font-weight: 800; 
            letter-spacing: 0.5px; 
            color: #e8e8e8; 
            padding-bottom: 12px; 
        }

        & div.form-subtitle {
            font-size: 18px;
            letter-spacing: 0.5px;
            color: #afafaf;
            padding-bottom: 24px;
        }

        & .btn-login {
            padding: 8px 16px;
            border-radius: 6px;
            font-size: 24px;
        }
    }
`