import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { startUpdateInformationRole } from '../../../store/role'

export const RoleModuleInformation = () => {

    const dispatch = useDispatch()
    const { active, isSaving } = useSelector(state => state.role)
    const { register, handleSubmit, reset } = useForm()

    const handleSave = ({ name, desc }) => {
        dispatch(startUpdateInformationRole({
            name,
            desc
        }))
    }

    useEffect(() => {
        reset({
            ...active
        })
    }, [reset, active])

    return (
        <Card>
            <Card.Body>
                <form onSubmit={handleSubmit(handleSave)}>
                    <div className='row'>
                        <div className='col-12'>
                            <Form.Group className='mb-3' controlId='uName'>
                                <Form.Label>Nombre del rol de usuario</Form.Label>
                                <Form.Control
                                    {...register('name', { required: true })}
                                    type={'text'}
                                    autoComplete='off'
                                />
                            </Form.Group>
                        </div>
                        <div className='col-12'>
                            <Form.Group className='mb-3' controlId='uDesc'>
                                <Form.Label>Descripción</Form.Label>
                                <Form.Control
                                    {...register('desc')}
                                    as='textarea'
                                    type={'text'}
                                    autoComplete='off'
                                />
                            </Form.Group>
                        </div>
                    </div>
                    <div className='d-flex justify-content-end gap-2'>
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
