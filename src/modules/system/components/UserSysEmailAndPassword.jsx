import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Button, Card, Form } from 'react-bootstrap'
import { Liner } from '../../../components'
import { startUpdateEmailUserSysById, startUpdatePasswordUserSysById, usersysApi } from '../../../store/actions'

export const UserSysEmailAndPassword = () => {

    const { userid } = useParams()
    const dispatch = useDispatch()
    const { data = null, isLoading } = useSelector(usersysApi.endpoints.getUserSysById.select(userid))
    const { register: regEmail, handleSubmit: handleSubmitEmail, reset: resetEmail } = useForm({
        defaultValues: {
            newEmail: ''
        }
    })
    const { register: regPassw, handleSubmit: handleSubmitPassw, getValues: getValPassw, reset: resetPassw } = useForm({
        defaultValues: {
            newPassword: '',
            newPasswordConfirm: ''
        }
    })

    const handleUpdateEmail = ({ newEmail }) => {
        dispatch(startUpdateEmailUserSysById({
            id: userid,
            usersys: data,
            newEmail
        }))
    }

    const handleUpdatePassword = ({ newPassword, newPasswordConfirm }) => {
        dispatch(startUpdatePasswordUserSysById({
            id: userid,
            usersys: data,
            newPassword,
            newPasswordConfirm
        }))
    }

    useEffect(() => {
        resetEmail({})
        resetPassw({})
    }, [data])

    return (
        <Card>
            <Card.Body>
                <form id='form-system-usersys-edit-email' onSubmit={handleSubmitEmail(handleUpdateEmail)}>
                    <Liner>Correo electrónico</Liner>
                    <div className='row'>
                        <div className='col'>
                            <p>
                                Su dirección de correo electrónico actual es: <span className='fw-bolder'>{data.email}</span>
                            </p>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <Form.Group className='mb-3' controlId='pEmail'>
                                <Form.Label>Nuevo correo electronico</Form.Label>
                                <Form.Control
                                    {...regEmail('newEmail', { required: true })}
                                    type='email'
                                    autoComplete='off'
                                />
                            </Form.Group>
                        </div>
                    </div>
                    <div className='d-flex justify-content-end gap-2'>
                        <Button
                            disabled={isLoading}
                            variant='primary'
                            type='submit'
                        >
                            Guardar cambios
                        </Button>
                    </div>
                </form>
                <form id='form-system-usersys-edit-passw' onSubmit={handleSubmitPassw(handleUpdatePassword)}>
                    <Liner>Contraseña</Liner>
                    <div className='row'>
                        <div className='col-12 col-md-6'>
                            <Form.Group className='mb-3' controlId='pNewPassword'>
                                <Form.Label>Nueva contraseña</Form.Label>
                                <Form.Control
                                    {...regPassw('newPassword', { required: true })}
                                    type='password'
                                    autoComplete='off'
                                />
                            </Form.Group>
                        </div>
                        <div className='col-12 col-md-6'>
                            <Form.Group className='mb-3' controlId='pNewPasswordConfirm'>
                                <Form.Label>Confirmar nueva contraseña</Form.Label>
                                <Form.Control
                                    {...regPassw('newPasswordConfirm', {
                                        required: true,
                                        validate: {
                                            matchesPreviousPassword: (value) => {
                                                const { newPassword } = getValPassw()
                                                return newPassword === value || 'Las contraseñas no coinciden'
                                            }
                                        }
                                    })}
                                    type='password'
                                    autoComplete='off'
                                />
                            </Form.Group>
                        </div>
                    </div>
                    <p className='fs-6 mb-2'>Asegúrese de que se cumplan estos requisitos:</p>
                    <ul className='fs-6'>
                        <li>Mínimo 8 caracteres de largo - cuanto más, mejor</li>
                        <li>Al menos un carácter en minúscula</li>
                        <li>Al menos un carácter en mayúscula</li>
                        <li>Al menos un número, símbolo o espacio en blanco</li>
                    </ul>
                    <div className='d-flex justify-content-end gap-2'>
                        <Button
                            disabled={isLoading}
                            variant='primary'
                            type='submit'
                        >
                            Guardar cambios
                        </Button>
                    </div>
                </form>
            </Card.Body>
        </Card >
    )
}