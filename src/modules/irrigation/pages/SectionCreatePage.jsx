import React, { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import { Button, Col, Form, FormCheck, InputGroup, Row } from 'react-bootstrap'
import { HiArrowUturnLeft } from 'react-icons/hi2'
import AsyncSelect from 'react-select/async'
import { pDistance, pProgressive } from '@/helpers'
import { InputMask, Liner, LoadingPage, OptionRugosity } from '@/components'
import { searchRugosity, useAddSectionMutation, useGetCalcPropertiesQuery, useLazyNewSectionByStructureQuery } from '@/store/actions'

export const SectionCreatePage = () => {

    const [searchParams] = useSearchParams()
    const chnid = searchParams.get('chnid') || ''
    const [newSection, { data = null, isLoading, isError }] = useLazyNewSectionByStructureQuery()
    const [addSection, { isLoading: isSavingAdd, isSuccess: isSaved }] = useAddSectionMutation()
    const { register, control, handleSubmit, reset, watch, setFocus, setValue } = useForm({
        defaultValues: {
            progressiveStart: '000+000.00',
            progressiveEnd: '000+000.00'
        }
    })
    const { data: calcs } = useGetCalcPropertiesQuery({
        type: data?.type || 1,
        mayorBasis: watch('mayorBasis'),
        minorBasis: watch('minorBasis'),
        height: watch('height'),
        tight: watch('tight'),
        slope: watch('slope'),
        diameter: watch('diameter'),
        coated: watch('mayorBasis'),
        leftSlopeThickness: watch('leftSlopeThickness'),
        rightSlopeThickness: watch('rightSlopeThickness'),
        grade: watch('grade'),
        rugosity: watch('rugosity')?.value || 0,
    }, { skip: !watch('rugosity') })

    const handleSave = async ({ rugosity, ...newData }) => {
        if (pDistance(watch('progressiveEnd')) - pDistance(watch('progressiveStart')) > 0) {
            if (pDistance(watch('progressiveEnd')) - pDistance(watch('progressiveStart')) > Number(data.limitChannel.limit)) {
                setValue('progressiveStart', '000+000.00')
                setValue('progressiveEnd', pProgressive(data.limitChannel.limit))
            } else {
                if (calcs?.froudeNumber < 1) {
                    try {
                        await addSection({
                            ...newData,
                            rugosity,
                            idRugosity: rugosity ? rugosity._id : ''
                        })
                    } catch (err) {
                        console.log(err)
                    }
                }
            }
        } else {
            setFocus('progressiveEnd')
        }
    }

    useEffect(() => {
        newSection(chnid)
    }, [])

    useEffect(() => {
        reset({
            ...data,
            progressiveStart: data?.limitChannel.lastProgressive || '000+000.00'
        })
    }, [reset, data])

    useEffect(() => {
        if (isSaved) {
            newSection(chnid)
        }
    }, [isSaved])

    if (isLoading) {
        return <LoadingPage />
    }

    return (
        <div className='container'>
            <div className='d-lg-flex align-items-lg-center justify-content-lg-between my-3'>
                <div className='min-w-400 flex-1'>
                    <h4 className='mb-0 text-uppercase'>NUEVO TRAMO</h4>
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
                        to={`/app/schm/irrig/chn/${chnid}/sct`}
                        className='btn btn-sm btn-neutral d-flex align-items-center gap-2'
                    >
                        <HiArrowUturnLeft />
                        CANAL - {data?.limitChannel.channelName}
                    </Link>
                </div>
            </div>
            <div className='container-flex-stack'>
                <div className='row'>
                    <div className='col-6'>
                        <div className='input-group'>
                            <span className='input-group-text col-4'>Estructura</span>
                            <input value={data?.limitChannel.channelName || ''} readOnly type='text' className='form-control col-8' />
                        </div>
                    </div>
                    <div className='col-6'>
                        <div className='input-group'>
                            <span className='input-group-text col-4'>Total de tramos</span>
                            <input value={data?.limitChannel.countSections || 0} readOnly type='text' className='form-control col-8' />
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-6'>
                        <div className='input-group'>
                            <span className='input-group-text col-4'>Longitud acumulada</span>
                            <input value={data?.limitChannel.distanceTotal || 0} readOnly type='text' className='form-control col-8' />
                        </div>
                    </div>
                    <div className='col-6'>
                        <div className='input-group'>
                            <span className='input-group-text col-4'>Longitud restante</span>
                            <input value={data?.limitChannel.limit || 0} readOnly type='text' className='form-control col-8' />
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-2'>
                <form className='container-flex-stack' id='form-irrigation-section-create' onSubmit={handleSubmit(handleSave)}>
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
                            <Form.Group as={Row}>
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
                            <Form.Group as={Row}>
                                <Form.Label column md={4}>
                                    Estado
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
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group as={Row}>
                                <Form.Label column md={4}>
                                    Tipo de estructura
                                </Form.Label>
                                <Col md={8}>
                                    <Form.Select
                                        {...register('type', { required: true })}
                                        autoComplete='off'
                                    >
                                        <option value={1}>Trapezoidal</option>
                                        <option value={2}>Rectangular</option>
                                        <option value={3}>Triangular</option>
                                        <option value={4}>Circular</option>
                                    </Form.Select>
                                </Col>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group as={Row}>
                                <Form.Label column md={4}>
                                    Capacidad de trabajo
                                </Form.Label>
                                <Col md={8}>
                                    <Form.Select
                                        {...register('workCapacity', { required: true })}
                                        autoComplete='off'
                                    >
                                        <option value={0}>No idonea sin estructura</option>
                                        <option value={1}>Idonea sin estructura</option>
                                        <option value={2}>No idonea con estructura no adecuada al sistema</option>
                                        <option value={3}>No idonea con estructura adecuada al sistema</option>
                                        <option value={4}>Idonea con estructura no adecuada al sistema</option>
                                        <option value={5}>Idonea con estructura adecuada al sistema</option>
                                    </Form.Select>
                                </Col>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group as={Row}>
                                <Form.Label column md={4}>
                                    Tipo de revestimiento
                                </Form.Label>
                                <Col md={8}>
                                    <Form.Select
                                        {...register('coatedType', { required: true })}
                                        autoComplete='off'
                                        disabled={!watch('coated')}
                                    >
                                        <option value={0}>Ninguno</option>
                                        <option value={1}>Solera</option>
                                        <option value={2}>Talud derecho</option>
                                        <option value={3}>Talud izquierdo</option>
                                        <option value={4}>Talud derecho y solera</option>
                                        <option value={5}>Talud izquierdo y solera</option>
                                        <option value={6}>Total</option>
                                    </Form.Select>
                                    <FormCheck
                                        id='newCoated'
                                        {...register('coated', {
                                            onChange: () => {
                                                setValue('coatedType', 0)
                                                setValue('leftSlopeThickness', 0)
                                                setValue('rightSlopeThickness', 0)
                                            }
                                        })}
                                        label='¿La estructura esta revestida?'
                                    />
                                </Col>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group as={Row}>
                                <Form.Label column md={2}>
                                    Progresiva inicial - final
                                </Form.Label>
                                <Col md={10}>
                                    <InputGroup>
                                        <Controller
                                            control={control}
                                            name='progressiveStart'
                                            rules={{ required: true }}
                                            render={({
                                                field: { value, onChange }
                                            }) => (
                                                <InputMask
                                                    id='pProgressiveStart'
                                                    mask='999+999.99'
                                                    maskPlaceholder='000+000.00'
                                                    value={value}
                                                    onChange={onChange}
                                                />
                                            )}
                                        />
                                        <Controller
                                            control={control}
                                            name='progressiveEnd'
                                            rules={{ required: true }}
                                            render={({
                                                field: { value, onChange }
                                            }) => (
                                                <InputMask
                                                    id='pProgressiveEnd'
                                                    mask='999+999.99'
                                                    maskPlaceholder='000+000.00'
                                                    value={value}
                                                    onChange={onChange}
                                                />
                                            )}
                                        />
                                        <InputGroup.Text>
                                            {
                                                pDistance(watch('progressiveEnd')) - pDistance(watch('progressiveStart')) >= 0
                                                    ?
                                                    `${pDistance(watch('progressiveEnd')) - pDistance(watch('progressiveStart'))} metros`
                                                    :
                                                    `La progresiva inicial no puede ser mayor que la final`
                                            }
                                        </InputGroup.Text>
                                    </InputGroup>
                                </Col>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Liner>Datos hidraulicos</Liner>
                    <Row>
                        <Col md={6}>
                            <Form.Group as={Row}>
                                <Form.Label column md={4}>
                                    Base mayor
                                </Form.Label>
                                <Col md={8}>
                                    <Form.Control
                                        {...register('mayorBasis', { required: true, setValueAs: v => Number(v) })}
                                        type='number'
                                        min={0}
                                        step={0.01}
                                        autoComplete='off'
                                    />
                                </Col>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group as={Row}>
                                <Form.Label column md={4}>
                                    Base menor
                                </Form.Label>
                                <Col md={8}>
                                    <Form.Control
                                        {...register('minorBasis', { required: true, setValueAs: v => Number(v) })}
                                        type='number'
                                        min={0}
                                        step={0.01}
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
                                    Altura (H)
                                </Form.Label>
                                <Col md={8}>
                                    <Form.Control
                                        {...register('height', { required: true, setValueAs: v => Number(v) })}
                                        type='number'
                                        min={0}
                                        step={0.01}
                                        autoComplete='off'
                                    />
                                </Col>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group as={Row}>
                                <Form.Label column md={4}>
                                    Tirante (Y)
                                </Form.Label>
                                <Col md={8}>
                                    <Form.Control
                                        {...register('tight', { required: true, setValueAs: v => Number(v) })}
                                        type='number'
                                        min={0}
                                        step={0.01}
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
                                    Pendiente (S)
                                </Form.Label>
                                <Col md={8}>
                                    <Form.Control
                                        {...register('grade', { required: true, setValueAs: v => Number(v) })}
                                        type='number'
                                        min={0}
                                        step={0.0001}
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
                                    Rugosidad
                                </Form.Label>
                                <Col md={8}>
                                    <Controller
                                        name='rugosity'
                                        control={control}
                                        rules={{ required: true }}
                                        render={
                                            ({ field }) =>
                                                <AsyncSelect
                                                    {...field}
                                                    classNamePrefix='rc-select'
                                                    styles={{
                                                        control: (baseStyles, state) => ({
                                                            ...baseStyles,
                                                            minHeight: '60px',
                                                        }),
                                                    }}
                                                    isClearable
                                                    defaultOptions
                                                    cacheOptions
                                                    loadOptions={searchRugosity}
                                                    hideSelectedOptions
                                                    menuPlacement={'auto'}
                                                    placeholder={`Buscar...`}
                                                    loadingMessage={({ inputValue }) => `Buscando '${inputValue}'`}
                                                    noOptionsMessage={({ inputValue }) => `Sin resultados con ...${inputValue}`}
                                                    getOptionValue={e => e._id}
                                                    getOptionLabel={e => <OptionRugosity rug={e} />}
                                                />
                                        }
                                    />
                                </Col>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group as={Row}>
                                <Form.Label column md={4}>
                                    Tipo de flujo
                                </Form.Label>
                                <Col md={8}>
                                    <Form.Control
                                        readOnly
                                        type='text'
                                        className={calcs?.froudeNumber === 1 ? 'text-warning' : calcs?.froudeNumber < 1 ? 'text-success' : 'text-danger'}
                                        value={calcs?.typeFlow || 'Faltan datos'}
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
