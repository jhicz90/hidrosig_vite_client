import { useState, useEffect } from 'react'
import { Accordion, Button, ButtonGroup, Form, ListGroup } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useAddOrderChannelMutation, useAddRugosityMutation, useDeleteOrderChannelMutation, useDeleteRugosityMutation, useGetOrderChannelsQuery, useGetRugositysQuery, useUpdateOrderChannelMutation, useUpdateRugosityMutation } from '../../../store/storeApi'

export const VariableListPage = () => {

    const { data: listRugosity = [] } = useGetRugositysQuery('')
    const { data: listOrderChannel = [] } = useGetOrderChannelsQuery('')

    return (
        <>
            <Accordion className='m-3'>
                <Accordion.Item eventKey={0}>
                    <Accordion.Header>Rugosidades</Accordion.Header>
                    <Accordion.Body>
                        <ListGroup>
                            <RugosityCreate />
                            {
                                listRugosity.map(rug =>
                                    <RugosityItem key={rug._id} data={rug} />
                                )
                            }
                        </ListGroup>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey={1}>
                    <Accordion.Header>Orden de canales</Accordion.Header>
                    <Accordion.Body>
                        <ListGroup>
                            <OrderChannelCreate />
                            {
                                listOrderChannel.map(orch =>
                                    <OrderChannelItem key={orch._id} data={orch} />
                                )
                            }
                        </ListGroup>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>

        </>
    )
}

const RugosityCreate = () => {

    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            name: '',
            value: ''
        }
    })
    const [addRugosity, { isLoading }] = useAddRugosityMutation()

    const handleSave = (data) => {
        addRugosity(data)
        reset({
            name: '',
            value: 0
        })
    }

    return (
        <ListGroup.Item>
            <form onSubmit={handleSubmit(handleSave)}>
                <div className='row align-items-center'>
                    <div className='col'>
                        <Form.Group controlId='newName'>
                            <Form.Control
                                {...register('name', { required: true })}
                                type='text'
                                autoComplete='off'
                                placeholder='Rugosidad'
                                disabled={isLoading}
                            />
                        </Form.Group>
                    </div>
                    <div className='col-2'>
                        <Form.Group controlId='newValue'>
                            <Form.Control
                                {...register('value', { required: true, min: 0.00001, setValueAs: (v) => Number(v) })}
                                type='number'
                                min={0}
                                step={0.00001}
                                autoComplete='off'
                                placeholder='Valor'
                                disabled={isLoading}
                            />
                        </Form.Group>
                    </div>
                    <div className='col-auto'>
                        <Button
                            type='submit'
                            variant='success'
                            disabled={isLoading}
                        >
                            Grabar nuevo
                        </Button>
                    </div>
                </div>
            </form>
        </ListGroup.Item>
    )
}

const OrderChannelCreate = () => {

    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            name: '',
            rank: 0,
            strict: false,
            type: 'C',
            abrev: ''
        }
    })
    const [addOrderChannel, { isLoading }] = useAddOrderChannelMutation()

    const handleSave = (data) => {
        addOrderChannel(data)
        reset({
            name: '',
            rank: 0,
            strict: false,
            type: 'C',
            abrev: ''
        })
    }

    return (
        <ListGroup.Item>
            <form onSubmit={handleSubmit(handleSave)}>
                <div className='row align-items-center'>
                    <div className='col'>
                        <Form.Group controlId='newOrden'>
                            <Form.Control
                                {...register('name', { required: true })}
                                type='text'
                                autoComplete='off'
                                placeholder='Orden'
                                disabled={isLoading}
                            />
                        </Form.Group>
                    </div>
                    <div className='col'>
                        <Form.Group controlId='newRank'>
                            <Form.Control
                                {...register('rank', { required: true, setValueAs: (v) => Number(v) })}
                                type='number'
                                autoComplete='off'
                                placeholder='Rango'
                                disabled={isLoading}
                            />

                        </Form.Group>
                    </div>
                    <div className='col'>
                        <Form.Group controlId='newStrict'>
                            <Form.Check
                                {...register('strict')}
                                type='checkbox'
                                label='¿El orden de canal esta limitado a su rango?'
                                autoComplete='off'
                                disabled={isLoading}
                            />
                        </Form.Group>
                    </div>
                    <div className='col'>
                        <Form.Group controlId='newType'>
                            <Form.Select
                                {...register('type', { required: true })}
                                autoComplete='off'
                                disabled={isLoading}
                            >
                                <option value={'C'}>Canal</option>
                                <option value={'D'}>Dren</option>
                            </Form.Select>
                        </Form.Group>
                    </div>
                    <div className='col'>
                        <Form.Group controlId='newAbrev'>
                            <Form.Control
                                {...register('abrev', { required: true })}
                                type='text'
                                autoComplete='off'
                                placeholder='Abreviatura'
                                disabled={isLoading}
                            />
                        </Form.Group>
                    </div>
                    <div className='col-auto'>
                        <Button
                            type='submit'
                            variant='success'
                            disabled={isLoading}
                        >
                            Grabar nuevo
                        </Button>
                    </div>
                </div>
            </form>
        </ListGroup.Item>
    )
}

const RugosityItem = ({ data = null }) => {

    const [editing, setEditing] = useState(false)
    const { register, handleSubmit, reset } = useForm()
    const [updateRugosity] = useUpdateRugosityMutation()
    const [deleteRugosity, { isLoading: isDeleting }] = useDeleteRugosityMutation()

    const handleUpdate = (rugosity) => {
        setEditing(false)
        updateRugosity({ id: data._id, rugosity })
    }

    useEffect(() => {
        reset({
            ...data
        })
    }, [reset, data])

    return (
        <ListGroup.Item>
            <form onSubmit={handleSubmit(handleUpdate)}>
                <div className='row align-items-center'>
                    <div className='col'>
                        <Form.Group>
                            <Form.Control
                                {...register('name', { required: true })}
                                type='text'
                                autoComplete='off'
                                placeholder='Rugosidad'
                                readOnly={!editing}
                                plaintext={!editing}
                            />
                        </Form.Group>
                    </div>
                    <div className='col-2'>
                        <Form.Group>
                            <Form.Control
                                {...register('value', { required: true, setValueAs: (v) => Number(v) })}
                                type='number'
                                min={0}
                                step={0.00001}
                                autoComplete='off'
                                placeholder='Valor'
                                readOnly={!editing}
                                plaintext={!editing}
                            />
                        </Form.Group>
                    </div>
                    <div className='col-auto'>
                        <ButtonGroup>
                            <Button
                                onClick={() => setEditing(!editing)}
                                type='button'
                                variant={editing ? 'secondary' : 'primary'}
                            >
                                {editing ? 'Cancel' : 'Editar'}
                            </Button>
                            {
                                editing
                                    ?
                                    <Button
                                        type='submit'
                                        variant='success'
                                    >
                                        Guardar
                                    </Button>
                                    :
                                    <Button
                                        onClick={() => deleteRugosity(data._id)}
                                        type='button'
                                        variant='danger'
                                        disabled={isDeleting}
                                    >
                                        Eliminar
                                    </Button>
                            }
                        </ButtonGroup>
                    </div>
                </div>
            </form>
        </ListGroup.Item>
    )
}

const OrderChannelItem = ({ data = null }) => {
    
    const [editing, setEditing] = useState(false)
    const { register, handleSubmit, reset } = useForm()
    const [updateOrderChannel] = useUpdateOrderChannelMutation()
    const [deleteOrderChannel, { isLoading: isDeleting }] = useDeleteOrderChannelMutation()

    const handleUpdate = (orderchannel) => {
        setEditing(false)
        updateOrderChannel({ id: data._id, orderchannel })
    }

    useEffect(() => {
        reset({
            ...data
        })
    }, [reset, data])

    return (
        <ListGroup.Item>
            <form onSubmit={handleSubmit(handleUpdate)}>
                <div className='row align-items-center'>
                    <div className='col'>
                        <Form.Group>
                            <Form.Control
                                {...register('name', { required: true })}
                                type='text'
                                autoComplete='off'
                                placeholder='Orden'
                                readOnly={!editing}
                                plaintext={!editing}
                            />
                        </Form.Group>
                    </div>
                    <div className='col'>
                        <Form.Group>
                            <Form.Control
                                {...register('rank', { required: true, setValueAs: (v) => Number(v) })}
                                type='number'
                                autoComplete='off'
                                placeholder='Rango'
                                readOnly={!editing}
                                plaintext={!editing}
                            />

                        </Form.Group>
                    </div>
                    <div className='col'>
                        <Form.Group controlId={`strict_${data._id}`}>
                            <Form.Check
                                {...register('strict')}
                                type='checkbox'
                                label='¿El orden de canal esta limitado a su rango?'
                                autoComplete='off'
                                disabled={!editing}
                            />
                        </Form.Group>
                    </div>
                    <div className='col'>
                        <Form.Group>
                            <Form.Select
                                {...register('type', { required: true })}
                                autoComplete='off'
                                disabled={!editing}
                            >
                                <option value={'C'}>Canal</option>
                                <option value={'D'}>Dren</option>
                            </Form.Select>
                        </Form.Group>
                    </div>
                    <div className='col'>
                        <Form.Group>
                            <Form.Control
                                {...register('abrev', { required: true })}
                                type='text'
                                autoComplete='off'
                                placeholder='Abreviatura'
                                readOnly={!editing}
                                plaintext={!editing}
                            />
                        </Form.Group>
                    </div>
                    <div className='col-auto'>
                        <ButtonGroup>
                            <Button
                                onClick={() => setEditing(!editing)}
                                type='button'
                                variant={editing ? 'secondary' : 'primary'}
                            >
                                {editing ? 'Cancel' : 'Editar'}
                            </Button>
                            {
                                editing
                                    ?
                                    <Button
                                        type='submit'
                                        variant='success'
                                    >
                                        Guardar
                                    </Button>
                                    :
                                    <Button
                                        onClick={() => deleteOrderChannel(data._id)}
                                        type='button'
                                        variant='danger'
                                        disabled={isDeleting}
                                    >
                                        Eliminar
                                    </Button>
                            }
                        </ButtonGroup>
                    </div>
                </div>
            </form>
        </ListGroup.Item>
    )
}