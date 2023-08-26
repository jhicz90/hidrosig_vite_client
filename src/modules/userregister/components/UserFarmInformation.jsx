import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Col, Form, ListGroup, Row } from 'react-bootstrap'
import { useFieldArray, useForm } from 'react-hook-form'
import validator from 'validator'
import { Liner } from '../../../components'
import { useGetUserFarmByIdQuery, useUpdateUserFarmByIdMutation } from '../../../store/actions'
import { IoMdAddCircleOutline, IoMdClose } from 'react-icons/io'

export const UserFarmInformation = () => {

    const { userid } = useParams()
    const { data = null } = useGetUserFarmByIdQuery(userid)
    const [updateUserFarm, { isLoading: isUpdating }] = useUpdateUserFarmByIdMutation()
    const { control, register, watch, handleSubmit, reset } = useForm()
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'contacts',
    })

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
        <form id='form-userregister-userfarm-info' onSubmit={handleSubmit(handleUpdate)}>
            <div className='d-flex justify-content-end gap-2'>
                <Button
                    disabled={isUpdating}
                    variant='primary'
                    type='submit'
                >
                    Guardar cambios
                </Button>
            </div>
            <Liner>Información personal</Liner>
            <Row>
                <Col sm={6}>
                    <Form.Group as={Row} className='mb-3'>
                        <Form.Label column sm={4}>
                            Código
                        </Form.Label>
                        <Col sm={8}>
                            <Form.Control
                                {...register('code', { required: true })}
                                type='text'
                                disabled
                                readOnly
                                autoComplete='off'
                            />
                        </Col>
                    </Form.Group>
                </Col>
                <Col sm={6}>
                    <Form.Group as={Row} className='mb-3'>
                        <Form.Label column sm={4}>
                            Tipo de usuario
                        </Form.Label>
                        <Col sm={8}>
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
                        </Col>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col sm={6}>
                    <Form.Group as={Row} className='mb-3'>
                        <Form.Label column sm={4}>
                            Documento de identidad o RUC
                        </Form.Label>
                        <Col sm={8}>
                            <Form.Control
                                {...register('docid', { required: true })}
                                type='text'
                                autoComplete='off'
                            />
                        </Col>
                    </Form.Group>
                </Col>
                <Col sm={6}>
                    <Form.Group as={Row} className='mb-3'>
                        <Form.Label column sm={4}>
                            Estado
                        </Form.Label>
                        <Col sm={8}>
                            <Form.Select
                                {...register('status', { required: true })}
                                autoComplete='off'
                            >
                                <option value={0}>Fallecido</option>
                                <option value={1}>Vivo</option>
                                <option value={2}>Heredero</option>
                            </Form.Select>
                        </Col>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group as={Row} className='mb-3'>
                        <Form.Label column sm={2}>
                            Razón social
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                {...register('socialReason', { required: Number(watch('type')) > 1 })}
                                disabled={Number(watch('type')) === 1}
                                type='text'
                                autoComplete='off'
                            />
                        </Col>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <Form.Group as={Row} className='mb-3'>
                        <Form.Label column sm={4}>
                            Género
                        </Form.Label>
                        <Col sm={8}>
                            <Form.Select
                                {...register('gender', { required: Number(watch('type')) === 1 })}
                                disabled={Number(watch('type')) > 1}
                                autoComplete='off'
                            >
                                <option value={'F'}>Femenino</option>
                                <option value={'M'}>Masculino</option>
                                <option value={'O'}>Otro</option>
                            </Form.Select>
                        </Col>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <Form.Group as={Row} className='mb-3'>
                        <Form.Label column sm={4}>
                            Nombres
                        </Form.Label>
                        <Col sm={8}>
                            <Form.Control
                                {...register('names', { required: Number(watch('type')) === 1 })}
                                disabled={Number(watch('type')) > 1}
                                type='text'
                                autoComplete='off'
                            />
                        </Col>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <Form.Group as={Row} className='mb-3'>
                        <Form.Label column sm={4}>
                            Apellidos Paternos
                        </Form.Label>
                        <Col sm={8}>
                            <Form.Control
                                {...register('lastName', { required: Number(watch('type')) === 1 })}
                                disabled={Number(watch('type')) > 1}
                                type='text'
                                autoComplete='off'
                            />
                        </Col>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group as={Row} className='mb-3'>
                        <Form.Label column sm={4}>
                            Apellidos Maternos
                        </Form.Label>
                        <Col sm={8}>
                            <Form.Control
                                {...register('motherLastName', { required: Number(watch('type')) === 1 })}
                                disabled={Number(watch('type')) > 1}
                                type='text'
                                autoComplete='off'
                            />
                        </Col>
                    </Form.Group>
                </Col>
            </Row>
            <Liner>Contacto</Liner>
            <Row>
                <Col md={6}>
                    <Form.Group as={Row} className='mb-3'>
                        <Form.Label column sm={4}>
                            Correo electronico
                        </Form.Label>
                        <Col sm={8}>
                            <Form.Control
                                {...register('email')}
                                type='email'
                                autoComplete='off'
                            />
                        </Col>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group as={Row} className='mb-3'>
                        <Form.Label column sm={4}>
                            Dirección
                        </Form.Label>
                        <Col sm={8}>
                            <Form.Control
                                {...register('address')}
                                type='text'
                                autoComplete='off'
                            />
                        </Col>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group as={Row} className='mb-3'>
                        <Form.Label column sm={2}>
                            Contactos
                        </Form.Label>
                        <Col sm={10}>
                            <ListGroup>
                                <ListGroup.Item onClick={() => append({ name: '', number: '', type: 1 })} className='d-flex align-items-center' action>
                                    Agregar contacto <IoMdAddCircleOutline className='ms-2' size={20} color='green' />
                                </ListGroup.Item>
                                {
                                    fields.map((field, index) =>
                                        <ListGroup.Item key={`contact_str_${index}`} variant={!field._id ? 'primary' : ''}>
                                            <div className='row align-items-center g-2'>
                                                <div className='col'>
                                                    <Form.Group>
                                                        <Form.Control
                                                            {...register(`contacts.${index}.name`, { required: true })}
                                                            type='text'
                                                            autoComplete='off'
                                                            placeholder='Nombre o descripcion del contacto'
                                                        />
                                                    </Form.Group>
                                                </div>
                                                <div className='col'>
                                                    <Form.Group>
                                                        <Form.Control
                                                            {...register(`contacts.${index}.number`, { required: true, validate: v => validator.isMobilePhone(v, 'es-PE') })}
                                                            type='text'
                                                            autoComplete='off'
                                                            placeholder='Número de télefono'
                                                        />
                                                    </Form.Group>
                                                </div>
                                                <div className='col'>
                                                    <Form.Group>
                                                        <Form.Select
                                                            {...register(`contacts.${index}.type`, { required: true })}
                                                            autoComplete='off'
                                                            placeholder='Tipo'
                                                        >
                                                            <option value={1}>Personal</option>
                                                            <option value={2}>Hogar</option>
                                                            <option value={3}>Otros</option>
                                                        </Form.Select>
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
                            <Form.Text muted>
                                Solo se aceptaran números de celular para comunicación directa con WhatsApp u otra aplicación.
                            </Form.Text>
                        </Col>
                    </Form.Group>
                </Col>
            </Row>
        </form>
    )
}
