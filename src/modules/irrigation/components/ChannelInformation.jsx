import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { DatePicker, EditorTextArea, InputMask, Liner } from '@/components'
import { channelApi, useUpdateChannelByIdMutation } from '@/store/actions'

export const ChannelInformation = () => {

    const { chnid } = useParams()
    const { data = null } = useSelector(channelApi.endpoints.getChannelById.select(chnid))
    const [updateChannel, { isLoading: isUpdating }] = useUpdateChannelByIdMutation()
    const { register, control, handleSubmit, reset } = useForm({
        defaultValues: {
            progressive: '000+000.00',
        }
    })

    const handleUpdate = (updateData) => {
        updateChannel({
            id: chnid,
            channel: updateData
        })
    }

    useEffect(() => {
        reset({
            ...data
        })
    }, [reset, data])

    return (
        <form className='container-flex-stack' id='form-irrigation-channel-edit-info' onSubmit={handleSubmit(handleUpdate)}>
            <div className='d-flex justify-content-end gap-2'>
                <Button
                    disabled={isUpdating}
                    variant='primary'
                    type='submit'
                >
                    Guardar cambios
                </Button>
            </div>
            <Liner>Detalle</Liner>
            <Row>
                <Col>
                    <Form.Group as={Row}>
                        <Form.Label column md={2}>
                            Nombre
                        </Form.Label>
                        <Col md={10}>
                            <Form.Control
                                {...register('name', { required: true })}
                                type='text'
                                autoComplete='off'
                            />
                        </Col>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group as={Row}>
                        <Form.Label column md={2}>
                            Descripción
                        </Form.Label>
                        <Col md={10}>
                            <Controller
                                name='desc'
                                control={control}
                                rules={{ required: true }}
                                render={
                                    ({ field: { onChange, value } }) =>
                                        <EditorTextArea
                                            value={value}
                                            onChnage={onChange}
                                        />
                                }
                            />
                        </Col>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group as={Row}>
                        <Form.Label column md={2}>
                            Observación
                        </Form.Label>
                        <Col md={10}>
                            <Form.Control
                                {...register('obs')}
                                type='text'
                                as='textarea'
                                autoComplete='off'
                            />
                        </Col>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <Form.Group as={Row}>
                        <Form.Label column md={4}>
                            Fecha de construccion
                        </Form.Label>
                        <Col md={8}>
                            <Controller
                                control={control}
                                name='dateCons'
                                rules={{ required: true }}
                                render={({
                                    field: { onChange, value },
                                }) => (
                                    <DatePicker
                                        value={value}
                                        onChange={onChange}
                                    />
                                )}
                            />
                        </Col>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group as={Row}>
                        <Form.Label column md={4}>
                            Fecha de inventario
                        </Form.Label>
                        <Col md={8}>
                            <Controller
                                control={control}
                                name='dateInvt'
                                rules={{ required: true }}
                                render={({
                                    field: { onChange, value },
                                }) => (
                                    <DatePicker
                                        value={value}
                                        onChange={onChange}
                                    />
                                )}
                            />
                        </Col>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <Form.Group as={Row}>
                        <Form.Label column md={4}>
                            Estado de la estructura
                        </Form.Label>
                        <Col md={8}>
                            <Form.Select
                                {...register('status', { required: true })}
                                autoComplete='off'
                            >
                                <option value={1}>Bueno</option>
                                <option value={2}>Malo</option>
                                <option value={3}>Regular</option>
                                <option value={4}>Requiere reparación</option>
                                <option value={5}>Requiere construcción</option>
                            </Form.Select>
                        </Col>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group as={Row}>
                        <Form.Label column md={4}>
                            Margen
                        </Form.Label>
                        <Col md={8}>
                            <Form.Select
                                {...register('margin', { required: true })}
                                autoComplete='off'
                            >
                                <option value={'D'}>Derecha</option>
                                <option value={'I'}>Izquierda</option>
                            </Form.Select>
                        </Col>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <Form.Group as={Row}>
                        <Form.Label column md={4}>
                            Progresiva
                        </Form.Label>
                        <Col md={8}>
                            <Controller
                                control={control}
                                name='progressive'
                                rules={{ required: true }}
                                render={({
                                    field: { onChange, value }
                                }) => (
                                    <InputMask
                                        mask='999+999.99'
                                        maskPlaceholder='000+000.00'
                                        value={value}
                                        onChange={onChange}
                                    />
                                )}
                            />
                        </Col>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group as={Row}>
                        <Form.Label column md={4}>
                            Longitud (metros)
                        </Form.Label>
                        <Col md={8}>
                            <Form.Control
                                {...register('longitude', {
                                    required: true,
                                    setValueAs: v => Number(v).toFixed(2)
                                })}
                                type='number'
                                min={0.01}
                                step={0.01}
                                autoComplete='off'
                            />
                        </Col>
                    </Form.Group>
                </Col>
            </Row>
            <Liner>Operación</Liner>
            <Row>
                <Col md={6}>
                    <Form.Group as={Row}>
                        <Form.Label column md={4}>
                            Eficiencia (%)
                        </Form.Label>
                        <Col md={8}>
                            <Form.Control
                                {...register('efficiency', { required: true })}
                                type='number'
                                min={0.01}
                                step={0.01}
                                autoComplete='off'
                            />
                        </Col>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group as={Row}>
                        <Form.Label column md={4}>
                            Caudal (m3/seg)
                        </Form.Label>
                        <Col md={8}>
                            <Form.Control
                                {...register('flow', { required: true })}
                                type='number'
                                min={0.01}
                                step={0.01}
                                autoComplete='off'
                            />
                        </Col>
                    </Form.Group>
                </Col>
            </Row>
        </form>
    )
}
