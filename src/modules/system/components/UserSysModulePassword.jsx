import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Button, Card, Form } from 'react-bootstrap'
import { startUpdatePasswordUserSys } from '../../../store/actions'

export const UserSysModulePassword = () => {

    const dispatch = useDispatch()
    const { active, isSaving } = useSelector(state => state.usersys)
    const { register, getValues, handleSubmit, reset } = useForm({
        defaultValues: {
            newPassword: '',
            newPasswordConfirm: ''
        }
    })

    const handleSave = ({ newPassword, newPasswordConfirm }) => {
        dispatch(startUpdatePasswordUserSys({
            newPassword,
            newPasswordConfirm
        }))
        reset()
    }

    return (
        <Card>
            <Card.Body>
                <form onSubmit={handleSubmit(handleSave)}>
                    <div className='row'>
                        <div className='col-12 col-md-6'>
                            <Form.Group className='mb-3' controlId='uNewPassword'>
                                <Form.Label>Nueva contraseña</Form.Label>
                                <Form.Control
                                    {...register('newPassword', { required: true })}
                                    type={'password'}
                                    autoComplete='off'
                                />
                            </Form.Group>
                        </div>
                        <div className='col-12 col-md-6'>
                            <Form.Group className='mb-3' controlId='uNewPasswordConfirm'>
                                <Form.Label>Confirmar nueva contraseña</Form.Label>
                                <Form.Control
                                    {...register('newPasswordConfirm', {
                                        required: true,
                                        validate: {
                                            matchesPreviousPassword: (value) => {
                                                const { newPassword } = getValues()
                                                return newPassword === value || 'Las contraseñas no coinciden'
                                            }
                                        }
                                    })}
                                    type={'password'}
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
                            disabled={isSaving}
                            variant='warning'
                        >
                            Generar contraseña
                        </Button>
                        <Button
                            disabled={isSaving}
                            variant='primary'
                            type='submit'
                        >
                            Guardar cambios
                        </Button>
                    </div>
                </form>
            </Card.Body>
        </Card>
    )
}
