import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { startUpdateInformationJunta } from '../../../store'
import { upperCaseCatch } from '../../../helpers'

export const JuntaModuleInformation = () => {

    const dispatch = useDispatch()
    const { active, isSaving } = useSelector(state => state.junta)
    const { register, setValue, handleSubmit, reset } = useForm()

    const handleSave = ({ name, nameAbrev, nameLarge, nameLargeAbrev, desc }) => {
        dispatch(startUpdateInformationJunta({
            name,
            nameAbrev,
            nameLarge,
            nameLargeAbrev,
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
                        <div className='col-12 col-md-6'>
                            <Form.Group className='mb-3' controlId='uName'>
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    {...register('name', {
                                        required: true,
                                        onChange: (e) => {
                                            setValue('nameAbrev', upperCaseCatch(e.target.value))
                                        }
                                    })}
                                    type='text'
                                    autoComplete='off'
                                />
                            </Form.Group>
                        </div>
                        <div className='col-12 col-md-6'>
                            <Form.Group className='mb-3' controlId='uNameAbrev'>
                                <Form.Label>Nombre abreviado</Form.Label>
                                <Form.Control
                                    {...register('nameAbrev', { required: true })}
                                    type='text'
                                    autoComplete='off'
                                />
                            </Form.Group>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-12 col-md-6'>
                            <Form.Group className='mb-3' controlId='uNameLarge'>
                                <Form.Label>Nombre largo o juridico</Form.Label>
                                <Form.Control
                                    {...register('nameLarge', {
                                        required: true,
                                        onChange: (e) => {
                                            setValue('nameLargeAbrev', upperCaseCatch(e.target.value))
                                        }
                                    })}
                                    type='text'
                                    autoComplete='off'
                                />
                            </Form.Group>
                        </div>
                        <div className='col-12 col-md-6'>
                            <Form.Group className='mb-3' controlId='uNameLargeAbrev'>
                                <Form.Label>Nombre largo abreviado</Form.Label>
                                <Form.Control
                                    {...register('nameLargeAbrev', { required: true })}
                                    type='text'
                                    autoComplete='off'
                                />
                            </Form.Group>
                        </div>
                    </div>
                    <div className='row'>
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
