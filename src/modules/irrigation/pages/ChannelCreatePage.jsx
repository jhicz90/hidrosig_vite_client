import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { HiArrowUturnLeft } from 'react-icons/hi2'
import { useChannelStore } from '@/hooks'
import { DatePicker, EditorTextArea, InputMask, Liner, LoadingPage } from '@/components'
import { useAddChannelMutation, useLazyNewChannelQuery } from '@/store/actions'

export const ChannelCreatePage = () => {

    const { id } = useChannelStore()
    const [newStructure, { data = null, isLoading, isError }] = useLazyNewChannelQuery()
    const [addStructure, { isLoading: isSavingAdd, isSuccess: isSaved }] = useAddChannelMutation()
    const { register, control, handleSubmit, reset } = useForm({
        defaultValues: {
            progressive: '000+000.00'
        }
    })

    const handleSave = async (newData) => {
        await addStructure(newData)
    }

    useEffect(() => {
        newStructure(id)
    }, [])

    useEffect(() => {
        reset({
            ...data
        })
    }, [reset, data])

    useEffect(() => {
        if (isSaved) {
            newStructure(id)
        }
    }, [isSaved])

    if (isLoading) {
        return <LoadingPage />
    }

    return (
        <div className='container'>
            <div className='d-lg-flex align-items-lg-center justify-content-lg-between my-3'>
                <div className='min-w-400 flex-1'>
                    <h4 className='mb-0 text-uppercase'>NUEVO CANAL</h4>
                    {/* <div className='mt-1 mt-sm-0 d-flex flex-column flex-sm-row gap-0 gap-sm-4'>
                            <div className='mt-2 d-flex align-items-center gap-1 text-muted'>
                                <MdOutlineNumbers size={20} />
                                {data.receipt}
                            </div>
                            <div className='mt-2 d-flex align-items-center gap-1 text-muted'>
                                <HiCurrencyDollar size={20} />
                                {data.remainingAmount.toFixed(2)}
                            </div>
                            <div className='mt-2 d-flex align-items-center gap-1 text-muted'>
                                <LiaMoneyCheckAltSolid size={20} />
                                {data.check}
                            </div>
                            <div className='mt-2 d-flex align-items-center gap-1 text-muted'>
                                <HiCalendar size={20} />
                                <span className='text-capitalize'>{moment(data.startDeclaration).format('DD MMMM, YYYY')}</span>
                            </div>
                        </div> */}
                </div>
                <div className='mt-3 ms-lg-5 mt-lg-0 d-flex gap-2 flex-wrap'>
                    <Link
                        to={`/app/schm/irrig/net`}
                        className='btn btn-sm btn-neutral d-flex align-items-center gap-2'
                    >
                        <HiArrowUturnLeft />
                        Red de riego
                    </Link>
                    <Link
                        to={`/app/schm/irrig/chn`}
                        className='btn btn-sm btn-neutral d-flex align-items-center gap-2'
                    >
                        <HiArrowUturnLeft />
                        Estructuras
                    </Link>
                </div>
            </div>
            <div className='mt-2'>
                <form id='form-irrigation-channel-create' onSubmit={handleSubmit(handleSave)}>
                    <div className='d-flex justify-content-end gap-2'>
                        <Button
                            disabled={isSavingAdd}
                            variant='primary'
                            type='submit'
                        >
                            Registrar nuevo
                        </Button>
                    </div>
                    <Liner>Información</Liner>
                    <Row>
                        <Col md={6}>
                            <Form.Group as={Row} className='mb-3'>
                                <Form.Label column md={4}>
                                    Nombre
                                </Form.Label>
                                <Col md={8}>
                                    <Form.Control
                                        {...register('name', { required: true })}
                                        type='text'
                                        autoComplete='off'
                                    />
                                </Col>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group as={Row} className='mb-3'>
                                <Form.Label column md={4}>
                                    Tipo de estructura
                                </Form.Label>
                                <Col md={8}>
                                    <Form.Select
                                        {...register('order', { required: true })}
                                        autoComplete='off'
                                    >
                                        <option value={''}>Seleccione el tipo</option>
                                        {
                                            data?.optionsOrder.map((o) => <option key={o._id} value={o._id}>{o.name}</option>)
                                        }
                                    </Form.Select>
                                </Col>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group as={Row} className='mb-3'>
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
                            <Form.Group as={Row} className='mb-3'>
                                <Form.Label column md={2}>
                                    Observación
                                </Form.Label>
                                <Col md={10}>
                                    <Form.Control
                                        {...register('obs')}
                                        as='textarea'
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
                            <Form.Group as={Row} className='mb-3'>
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
                            <Form.Group as={Row} className='mb-3'>
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
                            <Form.Group as={Row} className='mb-3'>
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
                            <Form.Group as={Row} className='mb-3'>
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
                            <Form.Group as={Row} className='mb-3'>
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
                            <Form.Group as={Row} className='mb-3'>
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
                            <Form.Group as={Row} className='mb-3'>
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
            </div>
        </div>
    )
}
