import { useState } from 'react'
import { Button, Card, Form, Modal } from 'react-bootstrap'
import { useForm } from 'react-hook-form'

export const ViewZone = ({ data }) => {

    const [showView, setShowView] = useState(false)
    const { register, setValue, handleSubmit, reset } = useForm({
        defaultValues: data
    })

    const handleSave = ({ order, name, desc, junta, feature }) => {
        dispatch(editActiveNewJunta({
            name,
            nameAbrev,
            nameLarge,
            nameLargeAbrev,
            desc
        }))
    }

    return (
        <>
            <Button
                variant='light'
                onClick={() => {
                    setShowView(true)
                }}
            >
                {data.name}
            </Button>
            <Modal
                show={showView}
                onHide={() => setShowView(false)}
                backdrop='static'
                size='lg'
                fullscreen
            >
                <Modal.Header closeButton>
                    <Modal.Title>Zona - {data.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit(handleSave)}>
                        <div className='row'>
                            <div className='col-12 col-md-6'>
                                <Form.Group className='mb-3' controlId='uOrder'>
                                    <Form.Label>Orden</Form.Label>
                                    <Form.Control
                                        {...register('order', { required: true })}
                                        type='number'
                                        autoComplete='off'
                                    />
                                </Form.Group>
                            </div>
                            <div className='col-12 col-md-6'>
                                <Form.Group className='mb-3' controlId='uName'>
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control
                                        {...register('name', { required: true })}
                                        type='text'
                                        autoComplete='off'
                                    />
                                </Form.Group>
                            </div>
                        </div>
                        {/* <div className='row'>
                            <div className='col-12 col-md-6'>
                                <Form.Group className='mb-3' controlId='uNameLarge'>
                                    <Form.Label>Nombre largo o juridico</Form.Label>
                                    <Form.Control
                                        {...register('nameLarge', {required: true})}
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
                        </div> */}
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
                                variant='success'
                                type='submit'
                            >
                                Guardar
                            </Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}
