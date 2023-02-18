import { useState, useEffect } from 'react'
import { Button, ButtonGroup, Form, ListGroup } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useGetRugosityQuery, useUpdateRugosityMutation } from '../../../store/storeApi'

export const VariableList = () => {

    const { data: list = [], isFetching } = useGetRugosityQuery('')

    return (
        <>
            <ListGroup className='m-3'>
                {
                    list.map(rug =>
                        <RugosityItem key={rug._id} data={rug} />
                    )
                }
            </ListGroup>
        </>
    )
}

const RugosityItem = ({ data = null }) => {

    const [editing, setEditing] = useState(false)
    const { register, handleSubmit, reset } = useForm()
    const [updateRugosity, { isLoading }] = useUpdateRugosityMutation()

    const handleSave = ({ name, value }) => {
        setEditing(false)
        updateRugosity({ id: data._id, rugosity: { name, value } })
    }

    useEffect(() => {
        reset({
            ...data
        })
    }, [reset, data])

    return (
        <ListGroup.Item>
            <form onSubmit={handleSubmit(handleSave)}>
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
                                type='button'
                                onClick={() => setEditing(!editing)}
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
                                        type='button'
                                        variant='danger'
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