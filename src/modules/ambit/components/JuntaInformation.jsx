import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Button, Card, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { juntaApi, useUpdateJuntaByIdMutation } from '../../../store/actions'
import { useParams } from 'react-router-dom'
import { Liner } from '../../../components'

export const JuntaInformation = () => {

    const { juntaid } = useParams()
    const { data = null } = useSelector(juntaApi.endpoints.getJuntaById.select(juntaid))
    const [updateJunta, { isLoading: isSaving }] = useUpdateJuntaByIdMutation()
    const { register, handleSubmit, reset } = useForm()

    const handleUpdate = ({ name, nameAbrev, nameLarge, nameLargeAbrev, desc, docid, email }) => {
        updateJunta({
            id: juntaid,
            junta: { name, nameAbrev, nameLarge, nameLargeAbrev, desc, docid, email }
        })
    }

    useEffect(() => {
        reset({
            ...data
        })
    }, [reset, data])

    return (
        <Card>
            <Card.Body>
                <form onSubmit={handleSubmit(handleUpdate)}>
                    <Liner>Información</Liner>
                    <div className='row'>
                        <div className='col-12 col-md-6'>
                            <Form.Group className='mb-3' controlId='pName'>
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    {...register('name', { required: true })}
                                    type='text'
                                    autoComplete='off'
                                />
                            </Form.Group>
                        </div>
                        <div className='col-12 col-md-6'>
                            <Form.Group className='mb-3' controlId='pNameAbrev'>
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
                            <Form.Group className='mb-3' controlId='pNameLarge'>
                                <Form.Label>Nombre largo o juridico</Form.Label>
                                <Form.Control
                                    {...register('nameLarge', { required: true })}
                                    type='text'
                                    autoComplete='off'
                                />
                            </Form.Group>
                        </div>
                        <div className='col-12 col-md-6'>
                            <Form.Group className='mb-3' controlId='pNameLargeAbrev'>
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
                            <Form.Group className='mb-3' controlId='pDesc'>
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
                    <Liner>Administración</Liner>
                    <div className='row'>
                        <div className='col-12 col-md-6'>
                            <Form.Group className='mb-3' controlId='pDocId'>
                                <Form.Label>Código de identidad o RUC</Form.Label>
                                <Form.Control
                                    {...register('docid', { required: true })}
                                    type='text'
                                    autoComplete='off'
                                />
                            </Form.Group>
                        </div>
                        <div className='col-12 col-md-6'>
                            <Form.Group className='mb-3' controlId='pEmail'>
                                <Form.Label>Correo electrónico</Form.Label>
                                <Form.Control
                                    {...register('email', { required: true })}
                                    type='text'
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
