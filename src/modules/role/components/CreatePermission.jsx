import { useState, useEffect } from 'react'
import { Card, Modal, Button, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useAddNewPermMutation } from '../../../store'

export const CreatePermission = () => {

    const [createPermission, { isLoading, isSuccess }] = useAddNewPermMutation()
    const { register, handleSubmit } = useForm()
    const [showModal, setShowModal] = useState(false)

    const handleSave = (e) => {
        createPermission(e)
    }

    useEffect(() => {
        if (isSuccess) {
            setShowModal(false)
        }
    }, [isSuccess])


    return (
        <>
            <Button
                disabled={isLoading}
                variant='primary'
                onClick={() => setShowModal(true)}
            >
                Nuevo permiso
            </Button>
            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                backdrop='static'
                size='lg'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Crear permiso</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card.Body>
                        <form onSubmit={handleSubmit(handleSave)}>
                            <div className='row'>
                                <div className='col-12 col-md-6'>
                                    <Form.Group className='mb-3' controlId='pNameTag'>
                                        <Form.Label>Nombre del permiso</Form.Label>
                                        <Form.Control
                                            {...register('nameTag', { required: true })}
                                            type='text'
                                            autoComplete='off'
                                        />
                                    </Form.Group>
                                </div>
                                <div className='col-12 col-md-6'>
                                    <Form.Group className='mb-3' controlId='pNameKey'>
                                        <Form.Label>Nombre de la llave</Form.Label>
                                        <Form.Control
                                            {...register('nameKey', {
                                                required: true,
                                                setValueAs: v => String(v).toLocaleLowerCase()
                                            })}
                                            type='text'
                                            autoComplete='off'
                                            className='text-lowercase'
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
                            <div className='row'>
                                <div className='col-12 col-md-6'>
                                    <Form.Group className='mb-3' controlId='pGroup'>
                                        <Form.Label>Grupo</Form.Label>
                                        <Form.Control
                                            {...register('group', { required: true })}
                                            type='text'
                                            autoComplete='off'
                                        />
                                    </Form.Group>
                                </div>
                                <div className='col-12 col-md-6'>
                                    <Form.Group className='mb-3' controlId='pPrivate'>
                                        <Form.Label>Privado</Form.Label>
                                        <Form.Check
                                            {...register('private')}
                                            type='switch'
                                            autoComplete='off'
                                            size={10}
                                        />
                                    </Form.Group>
                                </div>
                            </div>
                            <div className='d-flex justify-content-end gap-2'>
                                <Button
                                    disabled={isLoading}
                                    variant='success'
                                    type='submit'
                                >
                                    Guardar
                                </Button>
                            </div>
                        </form>
                    </Card.Body>
                </Modal.Body>
            </Modal>
        </>
    )
}