import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Button, Card, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { Liner } from '../../../components'
import { userfarmApi, useUpdateUserFarmByIdMutation } from '../../../store/actions'

export const UserFarmInformation = () => {

    const { userid } = useParams()
    const { data = null } = useSelector(userfarmApi.endpoints.getUserFarmById.select(userid))
    const [updateUserFarm, { isLoading: isUpdating }] = useUpdateUserFarmByIdMutation()
    const { register, watch, handleSubmit, getValues, reset } = useForm()

    const handleUpdate = (updateData) => {
        updateUserFarm({
            id: userid,
            userfarm: updateData
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
                <form id='form-userregister-userfarm-info' onSubmit={handleSubmit(handleUpdate)}>
                    <Liner>Información personal</Liner>
                    <div className='row'>
                        <div className='col-12 col-md-6 col-lg-2'>
                            <Form.Group className='mb-3' controlId='pCode'>
                                <Form.Label>Código</Form.Label>
                                <Form.Control
                                    {...register('code', { required: true })}
                                    type='text'
                                    disabled
                                    autoComplete='off'
                                />
                            </Form.Group>
                        </div>
                        <div className='col-12 col-md-6 col-lg-2'>
                            <Form.Group className='mb-3' controlId='pType'>
                                <Form.Label>Tipo</Form.Label>
                                <Form.Select
                                    {...register('type', { required: true })}
                                    autoComplete='off'
                                >
                                    <option value={1}>Natural</option>
                                    <option value={2}>Juridico</option>
                                    <option value={3}>Institucional</option>
                                    <option value={4}>Sucesión hereditaria</option>
                                    <option value={5}>Asociación conyugal</option>
                                    <option value={6}>Otros</option>
                                </Form.Select>
                            </Form.Group>
                        </div>
                        <div className='col-12 col-md-6 col-lg-4'>
                            <Form.Group className='mb-3' controlId='pDocId'>
                                <Form.Label>Documento de identidad o RUC</Form.Label>
                                <Form.Control
                                    {...register('docid', { required: true })}
                                    type='text'
                                    autoComplete='off'
                                />
                            </Form.Group>
                        </div>
                        <div className='col-12 col-md-6 col-lg-4'>
                            <Form.Group className='mb-3' controlId='pStatus'>
                                <Form.Label>Estado</Form.Label>
                                <Form.Select
                                    {...register('status', { required: true })}
                                    autoComplete='off'
                                >
                                    <option value={0}>Fallecido</option>
                                    <option value={1}>Vivo</option>
                                    <option value={2}>Heredero</option>
                                </Form.Select>
                            </Form.Group>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-12'>
                            <Form.Group className='mb-3' controlId='pSocialReason'>
                                <Form.Label>Razón social</Form.Label>
                                <Form.Control
                                    {...register('socialReason', { required: Number(watch('type')) > 1 })}
                                    disabled={Number(watch('type')) === 1}
                                    type='text'
                                    autoComplete='off'
                                />
                            </Form.Group>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-12 col-md-6 col-lg-3'>
                            <Form.Group className='mb-3' controlId='pGender'>
                                <Form.Label>Género</Form.Label>
                                <Form.Select
                                    {...register('gender', { required: Number(watch('type')) === 1 })}
                                    disabled={Number(watch('type')) > 1}
                                    autoComplete='off'
                                >
                                    <option value={'F'}>Femenino</option>
                                    <option value={'M'}>Masculino</option>
                                    <option value={'O'}>Otro</option>
                                </Form.Select>
                            </Form.Group>
                        </div>
                        <div className='col-12 col-md-6 col-lg-3'>
                            <Form.Group className='mb-3' controlId='pNames'>
                                <Form.Label>Nombres</Form.Label>
                                <Form.Control
                                    {...register('names', { required: Number(watch('type')) === 1 })}
                                    disabled={Number(watch('type')) > 1}
                                    type='text'
                                    autoComplete='off'
                                />
                            </Form.Group>
                        </div>
                        <div className='col-12 col-md-6 col-lg-3'>
                            <Form.Group className='mb-3' controlId='pLastName'>
                                <Form.Label>Apellidos Paternos</Form.Label>
                                <Form.Control
                                    {...register('lastName', { required: Number(watch('type')) === 1 })}
                                    disabled={Number(watch('type')) > 1}
                                    type='text'
                                    autoComplete='off'
                                />
                            </Form.Group>
                        </div>
                        <div className='col-12 col-md-6 col-lg-3'>
                            <Form.Group className='mb-3' controlId='pMotherLastName'>
                                <Form.Label>Apellidos Maternos</Form.Label>
                                <Form.Control
                                    {...register('motherLastName', { required: Number(watch('type')) === 1 })}
                                    disabled={Number(watch('type')) > 1}
                                    type='text'
                                    autoComplete='off'
                                />
                            </Form.Group>
                        </div>
                    </div>
                    <Liner>Contacto</Liner>
                    <div className='row'>
                        <div className='col-12 col-md-4'>
                            <Form.Group className='mb-3' controlId='pEmail'>
                                <Form.Label>Correo electronico</Form.Label>
                                <Form.Control
                                    {...register('email')}
                                    type='email'
                                    autoComplete='off'
                                />
                            </Form.Group>
                        </div>
                        <div className='col-12 col-md-4'>
                            <Form.Group className='mb-3' controlId='pCellphone'>
                                <Form.Label>Celular</Form.Label>
                                <Form.Control
                                    {...register('cellphone')}
                                    type='text'
                                    autoComplete='off'
                                />
                            </Form.Group>
                        </div>
                        <div className='col-12 col-md-4'>
                            <Form.Group className='mb-3' controlId='pAddress'>
                                <Form.Label>Dirección</Form.Label>
                                <Form.Control
                                    {...register('address')}
                                    type='text'
                                    autoComplete='off'
                                />
                            </Form.Group>
                        </div>
                    </div>
                    <div className='d-flex justify-content-end gap-2'>
                        <Button
                            disabled={isUpdating}
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
