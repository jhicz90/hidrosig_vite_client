import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Form, InputGroup, ListGroup, Offcanvas } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import AsyncSelect from 'react-select/async'
import { OffCanvasFooterStyled } from '../../../style'
import { Liner, LoadingAction, LoadingPage, MapLocation, OptionGeometry } from '../../../components'
import { searchIrrigationSystemByJunta, searchPointObject, searchSectionByJunta, useAddInputIrrigationMutation, useGetFarmByIdQuery, useLazyGetListWaterInByPointQuery, useLazyNewInputIrrigationQuery } from '../../../store/actions'

export const InputIrrigationCreateInAreaFarm = ({ farm = null }) => {

    const [show, setShow] = useState(false)
    const [optionLocation, setOptionLocation] = useState(0)
    const [range, setRange] = useState(20)

    const { data: AreaFarmData = null } = useGetFarmByIdQuery(farm)
    const [searchWaterIn, { data: WaterIn = [], isFetching: isLoadingWaterIn }] = useLazyGetListWaterInByPointQuery()
    const [newInputIrrigation, { data = null, isLoading }] = useLazyNewInputIrrigationQuery()
    const [addInputIrrigation, { isLoading: isSavingAdd }] = useAddInputIrrigationMutation()

    const { control, register, handleSubmit, reset, setValue, watch } = useForm()

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleSave = async (newData) => {
        await addInputIrrigation(newData).unwrap()
            .then(() => newInputIrrigation(farm))
    }

    useEffect(() => {
        setOptionLocation(0)
        newInputIrrigation(farm)
    }, [show])

    useEffect(() => {
        reset({
            ...data
        })
    }, [reset, data])

    return (
        <React.Fragment>
            <Button
                onClick={handleShow}
                variant='primary'
            >
                Nuevo toma de riego
            </Button>
            <Offcanvas
                show={show}
                onHide={handleClose}
                placement='end'
            >
                <Offcanvas.Header closeButton closeVariant='white'>
                    <div className='d-flex flex-column'>
                        <Offcanvas.Title>Toma de riego #NUEVO</Offcanvas.Title>
                    </div>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {
                        isLoading
                            ?
                            <LoadingPage />
                            :
                            <form id='form-userregister-inputirrigation-areafarm-create' onSubmit={handleSubmit(handleSave)}>
                                <Liner>Detalle</Liner>
                                <div className='row'>
                                    <div className='col-12'>
                                        <Form.Group className='mb-3'>
                                            <Form.Label>Descripción</Form.Label>
                                            <Form.Control
                                                {...register('desc')}
                                                type='text'
                                                as='textarea'
                                                autoComplete='off'
                                            />
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-12'>
                                        <Form.Group className='mb-3'>
                                            <Form.Label>Orden de riego</Form.Label>
                                            <Form.Control
                                                {...register('order', {
                                                    required: true
                                                })}
                                                type='number'
                                                min={0}
                                                autoComplete='off'
                                            />
                                            <Form.Text muted>Ingrese el orden o turno de riego en el canal, si desconoce el orden deje el valor en 0 y el sistema lo ordenara tomando en cuenta la ubicación de la toma de riego.</Form.Text>
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-12'>
                                        <Form.Group className='mb-3'>
                                            <Form.Label>Área de riego</Form.Label>
                                            <Form.Control
                                                {...register('areaUseInput', {
                                                    required: true
                                                })}
                                                type='number'
                                                min={0}
                                                step={0.00001}
                                                autoComplete='off'
                                            />
                                            <Form.Text muted>Área ah regar con esta toma de riego.</Form.Text>
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-12'>
                                        <Form.Group className='mb-3'>
                                            <Form.Label>Caudal (m3/seg)</Form.Label>
                                            <Form.Control
                                                {...register('flowUse', {
                                                    required: true
                                                })}
                                                type='number'
                                                min={0.001}
                                                step={0.001}
                                                autoComplete='off'
                                            />
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-6'>
                                        <Form.Group className='mb-3'>
                                            <Form.Label>Tipo de acceso</Form.Label>
                                            <Form.Select
                                                {...register('regulation', { required: true })}
                                                autoComplete='off'
                                            >
                                                <option value={0}>No regulado</option>
                                                <option value={1}>Regulado</option>
                                                <option value={1}>Variable</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </div>
                                    <div className='col-6'>
                                        <Form.Group className='mb-3'>
                                            <Form.Label>Sistema de riego</Form.Label>
                                            <Controller
                                                name='irrigationSystem'
                                                control={control}
                                                rules={{ required: true }}
                                                render={
                                                    ({ field }) =>
                                                        <AsyncSelect
                                                            {...field}
                                                            classNamePrefix='rc-select'
                                                            isClearable
                                                            defaultOptions
                                                            loadOptions={async (e) => {
                                                                return await searchIrrigationSystemByJunta(AreaFarmData?.junta?._id || null, e)
                                                            }}
                                                            hideSelectedOptions
                                                            menuPlacement='auto'
                                                            menuPosition='absolute'
                                                            placeholder={`Buscar...`}
                                                            loadingMessage={({ inputValue }) => `Buscando '${inputValue}'`}
                                                            noOptionsMessage={({ inputValue }) => `Sin resultados con ...${inputValue}`}
                                                            getOptionValue={e => e._id}
                                                            getOptionLabel={e => e.name}
                                                        />
                                                }
                                            />
                                        </Form.Group>
                                    </div>
                                </div>
                                <Liner>Estructura y toma</Liner>
                                <div className='row'>
                                    <div className='col-12'>
                                        <Form.Check
                                            inline
                                            type='radio'
                                            name='optionLocation'
                                            label='Por busqueda de nombre'
                                            id='locationForName'
                                            defaultChecked
                                            onChange={() => {
                                                setOptionLocation(0)
                                                setValue('structure', null)
                                                setValue('waterPointFeature', null)
                                            }}
                                        />
                                        <Form.Check
                                            inline
                                            type='radio'
                                            name='optionLocation'
                                            label='Por ubicación de toma'
                                            id='locationForInput'
                                            onChange={() => {
                                                setOptionLocation(1)
                                                setValue('structure', null)
                                                setValue('waterPointFeature', null)
                                            }}
                                        />
                                        <Form.Check
                                            inline
                                            type='radio'
                                            name='optionLocation'
                                            label='Por ubicación de coordenadas'
                                            id='locationForCoord'
                                            onChange={() => {
                                                setOptionLocation(2)
                                                setValue('structure', null)
                                                setValue('waterPointFeature', null)
                                                searchWaterIn
                                            }}
                                        />
                                    </div>
                                </div>
                                {
                                    optionLocation === 0
                                    &&
                                    <React.Fragment>
                                        <div className='row'>
                                            <div className='col-12'>
                                                <Form.Group className='mb-3' >
                                                    <Form.Label>Estructura de captación</Form.Label>
                                                    <Controller
                                                        name='section'
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
                                                                    loadOptions={async (e) => {
                                                                        return await searchSectionByJunta(AreaFarmData?.junta?._id || null, e)
                                                                    }}
                                                                    hideSelectedOptions
                                                                    menuPlacement='auto'
                                                                    menuPosition='absolute'
                                                                    placeholder={`Buscar...`}
                                                                    loadingMessage={({ inputValue }) => `Buscando '${inputValue}'`}
                                                                    noOptionsMessage={({ inputValue }) => `Sin resultados con ...${inputValue}`}
                                                                    getOptionValue={e => e._id}
                                                                    getOptionLabel={e =>
                                                                        <div className='d-flex gap-2 w-100 justify-content-between'>
                                                                            <div>
                                                                                <h6 className='mb-0'>{`Canal ${e.structure.name}`}</h6>
                                                                                <div className='mb-0 opacity-75'>{e.name}</div>
                                                                            </div>
                                                                        </div>
                                                                    }
                                                                />
                                                        }
                                                    />
                                                </Form.Group>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-12'>
                                                <Form.Group className='mb-3' controlId='newGeometry'>
                                                    <Form.Label>Punto de toma de agua</Form.Label>
                                                    <Controller
                                                        name='waterPointFeature'
                                                        control={control}
                                                        rules={{ required: true }}
                                                        render={({ field }) =>
                                                            <AsyncSelect
                                                                {...field}
                                                                classNamePrefix='rc-select'
                                                                styles={{
                                                                    control: (baseStyles, state) => ({
                                                                        ...baseStyles,
                                                                        minHeight: '100px',
                                                                    }),
                                                                }}
                                                                isClearable
                                                                defaultOptions
                                                                loadOptions={searchPointObject}
                                                                hideSelectedOptions
                                                                menuPlacement='auto'
                                                                menuPosition='absolute'
                                                                placeholder={`Buscar...`}
                                                                loadingMessage={({ inputValue }) => `Buscando '${inputValue}'`}
                                                                noOptionsMessage={({ inputValue }) => `Sin resultados con ...${inputValue}`}
                                                                getOptionValue={e => e._id}
                                                                getOptionLabel={e => <OptionGeometry simple={true} geo={e} />}
                                                            />
                                                        }
                                                    />
                                                    <Form.Text muted>
                                                        Si el punto de ubicación aún no esta ingresado acceda a este <Link to={`/app/ambit/geoobj`}>enlace</Link> para registrarlo.
                                                    </Form.Text>
                                                </Form.Group>
                                            </div>
                                        </div>
                                        {
                                            !!watch('waterPointFeature')
                                            &&
                                            <MapLocation
                                                geometry={
                                                    [
                                                        watch('waterPointFeature'),
                                                        watch('section') !== null && { ...watch('section')?.feature }
                                                    ]
                                                }
                                            />
                                        }
                                    </React.Fragment>
                                }
                                {
                                    optionLocation === 1
                                    &&
                                    <React.Fragment>
                                        <div className='row'>
                                            <div className='col-12'>
                                                <Form.Group className='mb-3' controlId='newGeometry'>
                                                    <Form.Label>Punto de toma de agua</Form.Label>
                                                    <Controller
                                                        name='waterPointFeature'
                                                        control={control}
                                                        rules={{
                                                            required: true,
                                                            onChange: () => {
                                                                if (!!watch('waterPointFeature')) {
                                                                    searchWaterIn({ point: watch('waterPointFeature')._id, range })
                                                                    setValue('section', null)
                                                                }
                                                            }
                                                        }}
                                                        render={({ field }) =>
                                                            <AsyncSelect
                                                                {...field}
                                                                classNamePrefix='rc-select'
                                                                styles={{
                                                                    control: (baseStyles, state) => ({
                                                                        ...baseStyles,
                                                                        minHeight: '100px',
                                                                    }),
                                                                }}
                                                                isClearable
                                                                defaultOptions
                                                                loadOptions={searchPointObject}
                                                                hideSelectedOptions
                                                                menuPlacement='auto'
                                                                menuPosition='absolute'
                                                                placeholder={`Buscar...`}
                                                                loadingMessage={({ inputValue }) => `Buscando '${inputValue}'`}
                                                                noOptionsMessage={({ inputValue }) => `Sin resultados con ...${inputValue}`}
                                                                getOptionValue={e => e._id}
                                                                getOptionLabel={e => <OptionGeometry simple={true} geo={e} />}
                                                            />
                                                        }
                                                    />
                                                    <Form.Text muted>
                                                        Si el punto de ubicación aún no esta ingresado acceda a este <Link to={`/app/ambit/geoobj`}>enlace</Link> para registrarlo.
                                                    </Form.Text>
                                                </Form.Group>
                                                <InputGroup>
                                                    <InputGroup.Text>Rango de busqueda en metros</InputGroup.Text>
                                                    <Form.Control
                                                        onChange={({ target }) => {
                                                            searchWaterIn({ point: watch('waterPointFeature')._id, range: target.value })
                                                            setRange(target.value)
                                                        }}
                                                        value={range}
                                                        min={20}
                                                        type='number'
                                                    />
                                                </InputGroup>
                                            </div>
                                        </div>
                                        {
                                            WaterIn.length === 0 || isLoadingWaterIn || watch('waterPointFeature') === null
                                                ?
                                                <LoadingAction />
                                                :
                                                <ListGroup className='my-2'>
                                                    {
                                                        WaterIn.map(wi =>
                                                            <ListGroup.Item
                                                                active={watch('section')?._id === wi.section?._id}
                                                                onClick={() => {
                                                                    if (watch('section')?._id === wi.section?._id) {
                                                                        setValue('section', null)
                                                                    } else {
                                                                        setValue('section', wi.section)
                                                                    }
                                                                }}
                                                                variant='secondary'
                                                                action
                                                                type='button'
                                                                key={wi.section._id}
                                                            >
                                                                <div className='d-flex gap-2 w-100 justify-content-between'>
                                                                    <div>
                                                                        <h6 className='mb-0'>{`Canal ${wi.section.structure.name}`}</h6>
                                                                        <div className='mb-0 opacity-75'>{wi.section.name} se encuentra a {`${wi.dist.calculated.toFixed(2)} metros`}</div>
                                                                    </div>
                                                                </div>
                                                            </ListGroup.Item>)
                                                    }
                                                </ListGroup>
                                        }
                                        {
                                            !!watch('waterPointFeature')
                                            &&
                                            <MapLocation
                                                geometry={
                                                    [
                                                        watch('waterPointFeature'),
                                                        watch('section') !== null && { ...watch('section')?.feature }
                                                    ]
                                                }
                                            />
                                        }
                                    </React.Fragment>
                                }
                            </form>
                    }
                </Offcanvas.Body>
                <OffCanvasFooterStyled>
                    <Button
                        disabled={isSavingAdd}
                        onClick={handleClose}
                        type='button'
                        variant='neutral'
                    >
                        Cancelar
                    </Button>
                    <Button
                        disabled={isSavingAdd}
                        type='submit'
                        form='form-userregister-inputirrigation-areafarm-create'
                        variant='primary'
                    >
                        Guardar
                    </Button>
                </OffCanvasFooterStyled>
            </Offcanvas>
        </React.Fragment>
    )
}
