import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { startUpdateEmailUserSys } from '../../../store/usersys'

export const UserSysModuleEmail = () => {

    const dispatch = useDispatch()
    const { active, isSaving } = useSelector(state => state.usersys)
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            newEmail: ''
        }
    })

    const handleSave = ({ newEmail }) => {
        dispatch(startUpdateEmailUserSys({
            newEmail
        }))
        reset()
    }

    return (
        <Card>
            <Card.Body>
                <form onSubmit={handleSubmit(handleSave)}>
                    <p>
                        Su dirección de correo electrónico actual es: <span className='fw-bolder'>{active.email}</span>
                    </p>
                    <div className='row'>
                        <div className='col-12'>
                            <Form.Group className='mb-3' controlId='uEmail'>
                                <Form.Label>Nuevo correo electronico</Form.Label>
                                <Form.Control
                                    {...register('newEmail', { required: true })}
                                    type={'email'}
                                    autoComplete='off'
                                />
                            </Form.Group>
                        </div>
                    </div>
                    <div className='d-flex justify-content-end gap-2'>
                        <Button
                            disabled={isSaving}
                            variant={'primary'}
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