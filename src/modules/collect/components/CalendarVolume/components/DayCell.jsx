import React, { useContext, useState, useEffect } from 'react'
import { CalendarContext } from '../context'
import { Button, Card, Form, Offcanvas } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import AsyncSelect from 'react-select/async'
import moment from 'moment'
import { searchValueRateByJuntaAndComm, useAddVolByConsumptionMutation, useUpdateVolByConsumptionMutation } from '../../../../../store/actions'
import { OffCanvasFooterStyled } from '../../../../../style'

export const DayCell = ({
    date
}) => {

    const [{ events, farmCrop }, setContext] = useContext(CalendarContext)

    const [showSlide, setShowSlide] = useState(false)

    const isDayEvent = () => !!events.find(d => moment(d.event).isSame(date, 'day')) ? 'dayVolume' : ''

    const isDaySunday = () => Number(moment(date).format('d')) === 0 ? 'daySunday' : ''

    const dayData = () => events.find(d => moment(d.event).isSame(date, 'day'))

    return (
        <React.Fragment>
            {
                !!dayData()
                    ?
                    <SlideVolEdit date={date} data={dayData()} showSlide={showSlide} setShowSlide={setShowSlide} />
                    :
                    <SlideVolCreate date={date} showSlide={showSlide} setShowSlide={setShowSlide} />
            }
            <div
                className={`dayMonth ${isDayEvent()} ${isDaySunday()}`}
                onClick={() => {
                    if (!!farmCrop) {
                        setShowSlide(true)
                    }
                }}
            >
                {moment(date).format('DD')}
            </div>
        </React.Fragment>
    )
}

const SlideVolCreate = ({ date, showSlide, setShowSlide }) => {

    const [{ inputIrrig, valueRate, farmCrop }, setContext] = useContext(CalendarContext)

    const [addVol] = useAddVolByConsumptionMutation()

    const { control, register, handleSubmit, reset } = useForm()

    const handleUpdate = ({ valueRate, quantity }) => {
        addVol({
            collect: farmCrop.collectId,
            volume: {
                isWaterRequest: false,
                farmCrop: farmCrop._id,
                desc: 'DECLARACION DE RIEGO',
                values: {// VALORES CONSUMO
                    valueRate: valueRate.hasOwnProperty('_id') ? valueRate._id : null,
                    quantity,
                },
                irrigation: {// RIEGO
                    event: date,
                    month: moment(date).month() + 1,
                    week: Math.ceil(moment(date).date() / 7),
                },
                waterRequest: {// PEDIDO DE AGUA
                    period: null,
                    quantityGross: 0,
                    flow: 0,
                    duration: 0
                }
            }
        })
    }

    useEffect(() => {
        reset({
            valueRate,
            quantity: 0
        })
    }, [reset, valueRate, showSlide])

    return (
        <Offcanvas
            show={showSlide}
            onHide={() => setShowSlide(false)}
            placement='end'
            style={{ maxWidth: '28rem' }}
        >
            <Offcanvas.Header closeButton closeVariant='white'>
                <Offcanvas.Title>Consumo del {moment(date).format('DD MMMM, YYYY')}</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <form id={`form-collect-crop-vol-create-${moment(date).valueOf()}`} onSubmit={handleSubmit(handleUpdate)}>
                    <div className='row'>
                        <div className='col-12'>
                            <Form.Group className='mb-2'>
                                <Form.Label>Valor de tarifa</Form.Label>
                                <Controller
                                    name={`valueRate`}
                                    control={control}
                                    rules={{ required: true }}
                                    render={
                                        ({ field }) =>
                                            <AsyncSelect
                                                {...field}
                                                isDisabled={inputIrrig.inputIrrig.regulation === 2}
                                                classNamePrefix='rc-select'
                                                hideSelectedOptions
                                                isClearable
                                                isSearchable={false}
                                                defaultOptions
                                                loadOptions={async (e) => await searchValueRateByJuntaAndComm(inputIrrig.block.junta, inputIrrig.block.committee)}
                                                menuPlacement={'auto'}
                                                placeholder={`Busque y seleccione tipo de riego...`}
                                                loadingMessage={({ inputValue }) => `Buscando '${inputValue}'`}
                                                noOptionsMessage={({ inputValue }) => `Sin resultados con ...${inputValue}`}
                                                getOptionValue={e => e._id}
                                                getOptionLabel={e =>
                                                    <div className='d-flex'>
                                                        <b>{e.irrigSystem.name} ({`${e.yearRate.year} ${e.yearRate.campaign === 2 ? 'GRANDE II' : 'CHICA I'}`})</b>
                                                    </div>
                                                }
                                            />
                                    }
                                />
                            </Form.Group>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <Form.Group className='mb-3'>
                                <Form.Label>Volumen</Form.Label>
                                <Form.Control
                                    {...register(`quantity`, {
                                        required: true,
                                        valueAsNumber: true
                                    })}
                                    type='number'
                                    min={0}
                                    autoComplete='off'
                                />
                            </Form.Group>
                        </div>
                    </div>
                </form>
            </Offcanvas.Body>
            <OffCanvasFooterStyled>
                <Button
                    onClick={() => setShowSlide(false)}
                    type='button'
                    variant='neutral'
                >
                    Cancelar
                </Button>
                <Button
                    type='submit'
                    form={`form-collect-crop-vol-create-${moment(date).valueOf()}`}
                    variant='primary'
                >
                    Guardar
                </Button>
            </OffCanvasFooterStyled>
        </Offcanvas>
    )
}

const SlideVolEdit = ({ date, data, showSlide, setShowSlide }) => {

    const [{ inputIrrig }, setContext] = useContext(CalendarContext)

    const [updateVol] = useUpdateVolByConsumptionMutation()

    const { control, register, handleSubmit, reset } = useForm()

    const handleUpdate = (volume) => {
        // updateFarmCrop({ collect: cropCollect.collectId, farmCrop })
        updateVol({
            consumption: data._id,
            volume: {
                ...volume,
                valueRate: volume.valueRate._id
            }
        })
    }

    useEffect(() => {
        reset({
            valueRate: data?.consumption?.values?.valueRate,
            quantity: data?.consumption?.values?.quantity
        })
    }, [reset, data, showSlide])

    return (
        <Offcanvas
            show={showSlide}
            onHide={() => setShowSlide(false)}
            placement='end'
            style={{ maxWidth: '28rem' }}
        >
            <Offcanvas.Header closeButton closeVariant='white'>
                <Offcanvas.Title>Consumo del {moment(date).format('DD MMMM, YYYY')}</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <form id={`form-collect-crop-vol-edit-${moment(date).valueOf()}`} onSubmit={handleSubmit(handleUpdate)}>
                    <div className='row'>
                        <div className='col-12'>
                            <Form.Group className='mb-2'>
                                <Form.Label>Valor de tarifa</Form.Label>
                                <Controller
                                    name={`valueRate`}
                                    control={control}
                                    rules={{ required: true }}
                                    render={
                                        ({ field }) =>
                                            <AsyncSelect
                                                {...field}
                                                isDisabled={inputIrrig.inputIrrig.regulation === 2}
                                                classNamePrefix='rc-select'
                                                hideSelectedOptions
                                                isClearable
                                                isSearchable={false}
                                                defaultOptions
                                                loadOptions={async (e) => await searchValueRateByJuntaAndComm(inputIrrig.block.junta, inputIrrig.block.committee)}
                                                menuPlacement={'auto'}
                                                placeholder={`Busque y seleccione tipo de riego...`}
                                                loadingMessage={({ inputValue }) => `Buscando '${inputValue}'`}
                                                noOptionsMessage={({ inputValue }) => `Sin resultados con ...${inputValue}`}
                                                getOptionValue={e => e._id}
                                                getOptionLabel={e =>
                                                    <div className='d-flex'>
                                                        <b>{e.irrigSystem.name} ({`${e.yearRate.year} ${e.yearRate.campaign === 2 ? 'GRANDE II' : 'CHICA I'}`})</b>
                                                    </div>
                                                }
                                            />
                                    }
                                />
                            </Form.Group>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <Form.Group className='mb-3'>
                                <Form.Label>Volumen</Form.Label>
                                <Form.Control
                                    {...register(`quantity`, {
                                        required: true,
                                        valueAsNumber: true
                                    })}
                                    type='number'
                                    min={0}
                                    autoComplete='off'
                                />
                            </Form.Group>
                        </div>
                    </div>
                </form>
                <Card>
                    <Card.Body>
                        <p>Pedido de agua</p>

                        <p>Datos del pedido</p>
                        <p>Fecha</p>
                        <p>Semana del 1 al 6 de Junio 2023</p>
                    </Card.Body>
                </Card>
            </Offcanvas.Body>
            <OffCanvasFooterStyled>
                <Button
                    onClick={() => setShowSlide(false)}
                    type='button'
                    variant='neutral'
                >
                    Cancelar
                </Button>
                <Button
                    type='submit'
                    form={`form-collect-crop-vol-edit-${moment(date).valueOf()}`}
                    variant='primary'
                >
                    Guardar
                </Button>
            </OffCanvasFooterStyled>
        </Offcanvas>
    )
}