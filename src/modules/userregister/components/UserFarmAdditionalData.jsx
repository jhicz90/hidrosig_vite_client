import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useFieldArray, useForm } from 'react-hook-form'
import { Button, Card, Form, ListGroup } from 'react-bootstrap'
import { IoMdAddCircleOutline, IoMdClose } from 'react-icons/io'
import { userfarmApi, useUpdateUserFarmByIdMutation } from '@/store/actions'

export const UserFarmAdditionalData = () => {

    const { userid } = useParams()
    const { data = null } = useSelector(userfarmApi.endpoints.getUserFarmById.select(userid))
    const [updateUserFarm, { isLoading: isUpdating }] = useUpdateUserFarmByIdMutation()
    const { register, control, handleSubmit, reset } = useForm()
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'appIdentifiers',
    })

    const handleUpdate = ({ appIdentifiers }) => {
        updateUserFarm({
            id: userid,
            userfarm: { appIdentifiers }
        })
    }

    useEffect(() => {
        reset({
            ...data
        })
    }, [reset, data])

    return (
        <form className='container-flex-stack' id='form-userregister-userfarm-edit-appids' onSubmit={handleSubmit(handleUpdate)}>
            <div className='d-flex justify-content-end gap-2'>
                <Button
                    disabled={isUpdating}
                    variant='primary'
                    type='submit'
                >
                    Guardar cambios
                </Button>
            </div>
            <div className='row'>
                <div className='col-12'>
                    <Form.Group controlId='pAppIdentifiers'>
                        <ListGroup>
                            <ListGroup.Item onClick={() => append({ nameApp: '', idApp: '' })} className='d-flex align-items-center' action>
                                Agregar identificador <IoMdAddCircleOutline className='ms-2' size={20} color='green' />
                            </ListGroup.Item>
                            {
                                fields.map((field, index) =>
                                    <ListGroup.Item key={`appIdentity_ufar_${index}`} variant={!field._id ? 'primary' : ''}>
                                        <div className='row align-items-center g-2'>
                                            <div className='col'>
                                                <Form.Group>
                                                    <Form.Control
                                                        {...register(`appIdentifiers.${index}.nameApp`, { required: true })}
                                                        type='text'
                                                        autoComplete='off'
                                                        placeholder='Nombre de aplicación'
                                                    />
                                                </Form.Group>
                                            </div>
                                            <div className='col'>
                                                <Form.Group>
                                                    <Form.Control
                                                        {...register(`appIdentifiers.${index}.idApp`, { required: true })}
                                                        type='text'
                                                        autoComplete='off'
                                                        placeholder='ID de aplicación'
                                                    />
                                                </Form.Group>
                                            </div>
                                            <div className='col-auto'>
                                                <Button onClick={() => remove(index)} variant='danger'>
                                                    <IoMdClose size={20} />
                                                </Button>
                                            </div>
                                        </div>
                                    </ListGroup.Item>
                                )
                            }
                        </ListGroup>
                    </Form.Group>
                </div>
            </div>
        </form>
    )
}
