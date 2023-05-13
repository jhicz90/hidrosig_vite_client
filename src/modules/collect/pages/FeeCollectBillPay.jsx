import { useState, useMemo } from 'react'
import { Accordion, Button, Card, Form, ListGroup, Modal } from 'react-bootstrap'
import { IoMdClose } from 'react-icons/io'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import AsyncSelect from 'react-select/async'
import moment from 'moment'
import { AreaFarmDataInfo } from '../components'
import { DatePicker, Liner, LoadingPage, OptionInputIrrig, OptionYearRate, ScrollbarsShadow } from '../../../components'
import { searchCropByJunta, searchInputIrrigByFarm, searchIrrigationSystemByJunta, searchYearRateByJunta, useGetFarmByIdQuery, useGetListDebtByFarmQuery, useUpdateCollectAddFarmCropMutation } from '../../../store/actions'
import { getYearActive } from '../../../helpers'

export const FeeCollectBillPay = ({ prpId = '' }) => {

    const [showAddCrop, setShowAddCrop] = useState(false)
    const { data = null, isFetching, isLoading } = useGetFarmByIdQuery(prpId)
    const { data: listDebts = [] } = useGetListDebtByFarmQuery(prpId)
    const yearActive = useMemo(() => getYearActive(listDebts), [listDebts])

    if (isLoading || isFetching) {
        return <LoadingPage />
    }

    return (
        !!data
        &&
        <>
            <AddCrop show={showAddCrop} setShow={setShowAddCrop} areaFarm={data} />
            <div className='container-fluid'>
                <div className='row my-3'>
                    <div className='col-12'>
                        <Card>
                            <Card.Body>
                                <AreaFarmDataInfo areaFarm={data} />
                                <div className='row align-items-center'>
                                    <div className='col-12 col-md-auto'>
                                        <div className='d-flex gap-2'>
                                            <Button
                                                onClick={() => setShowAddCrop(true)}
                                                variant='success'
                                                className='d-flex align-items-center gap-2'
                                            >
                                                Ingresar cultivo
                                            </Button>
                                            <Button
                                                variant='warning'
                                                className='d-flex align-items-center gap-2'
                                            >
                                                Generar deuda
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-12 col-md-4 col-lg-3'>
                        <div className='row'>
                            <div className='col'>
                                <Card style={{ overflow: 'hidden' }}>
                                    <Card.Body>
                                        <Form.Control
                                            type='text'
                                        />
                                    </Card.Body>
                                    {
                                        listDebts.length > 0
                                        &&
                                        <Accordion flush style={{ borderRadius: '9px' }} defaultActiveKey={getYearActive(listDebts) || ''}>
                                            <Accordion.Item eventKey='convenios'>
                                                <Accordion.Header>
                                                    CONVENIOS
                                                </Accordion.Header>
                                                <Accordion.Body className='p-0'>
                                                    <ListGroup variant='flush'>
                                                        <ListGroup.Item variant='success' action>CONVENIO #2023A2RU - CANCELADO</ListGroup.Item>
                                                        <ListGroup.Item variant='danger' action>CONVENIO #2021P123 - PENDIENTE</ListGroup.Item>
                                                    </ListGroup>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            {
                                                listDebts.filter(d => String(d._id) === yearActive).map(debt =>
                                                    <Accordion.Item key={`year_${debt._id}`} eventKey={String(debt._id)}>
                                                        <Accordion.Header>
                                                            {`${yearActive === String(debt._id) ? `ACTUAL - ${debt._id}` : debt._id}`}
                                                        </Accordion.Header>
                                                        <Accordion.Body className='p-0'>
                                                            <ListGroup variant='flush'>
                                                                {
                                                                    debt.campaigns.map(c =>
                                                                        <ListGroup.Item key={`campaign_${c._id}`} variant='info' action>
                                                                            Campaña {c.campaign === 1 ? `CHICA I ${c.opened ? ' (A)' : ' (C)'}` : `GRANDE II ${c.opened ? ' (A)' : ' (C)'}`}
                                                                        </ListGroup.Item>
                                                                    )
                                                                }
                                                            </ListGroup>
                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                )
                                            }
                                            {
                                                listDebts.filter(d => String(d._id) !== yearActive).length > 3
                                                    ?
                                                    <ScrollbarsShadow autoHide style={{ height: 200 }}>
                                                        {
                                                            listDebts.filter(d => String(d._id) !== yearActive).map(debt =>
                                                                <Accordion.Item key={`year_${debt._id}`} eventKey={String(debt._id)}>
                                                                    <Accordion.Header>
                                                                        {debt._id}
                                                                    </Accordion.Header>
                                                                    <Accordion.Body className='p-0'>
                                                                        <ListGroup variant='flush'>
                                                                            {
                                                                                debt.campaigns.map(c =>
                                                                                    <ListGroup.Item key={`campaign_${c._id}`} variant='info' action>
                                                                                        Campaña {c.campaign === 1 ? `CHICA I ${c.opened ? ' (A)' : ' (C)'}` : `GRANDE II ${c.opened ? ' (A)' : ' (C)'}`}
                                                                                    </ListGroup.Item>
                                                                                )
                                                                            }
                                                                        </ListGroup>
                                                                    </Accordion.Body>
                                                                </Accordion.Item>
                                                            )
                                                        }
                                                    </ScrollbarsShadow>
                                                    :
                                                    <>
                                                        {
                                                            listDebts.filter(d => String(d._id) !== yearActive).map(debt =>
                                                                <Accordion.Item key={`year_${debt._id}`} eventKey={String(debt._id)}>
                                                                    <Accordion.Header>
                                                                        {debt._id}
                                                                    </Accordion.Header>
                                                                    <Accordion.Body className='p-0'>
                                                                        <ListGroup variant='flush'>
                                                                            {
                                                                                debt.campaigns.map(c =>
                                                                                    <ListGroup.Item key={`campaign_${c._id}`} variant='info' action>
                                                                                        Campaña {c.campaign === 1 ? `CHICA I ${c.opened ? ' (A)' : ' (C)'}` : `GRANDE II ${c.opened ? ' (A)' : ' (C)'}`}
                                                                                    </ListGroup.Item>
                                                                                )
                                                                            }
                                                                        </ListGroup>
                                                                    </Accordion.Body>
                                                                </Accordion.Item>
                                                            )
                                                        }
                                                    </>
                                            }
                                        </Accordion>
                                    }
                                </Card>
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-md-8 col-lg-9'>
                        <div className='row'>
                            <div className='col'>
                                <Card>
                                    <Card.Body>
                                        Tarifas
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const AddCrop = ({ show, setShow, areaFarm }) => {

    const { _id: farmId, junta: { _id: juntaId } } = areaFarm
    const { control, register, handleSubmit, reset, watch } = useForm({
        defaultValues: {
            farm: farmId,
            inputIrrig: null,
            yearRate: null,
            farmCrops: [
                {
                    obs: '',
                    areaPlanted: 0,
                    seedTime: new Date(),
                    harvestTime: new Date(),
                    cropVariety: null,
                    irrigSystem: null
                }
            ]
        },
        mode: 'onChange'
    })
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'farmCrops',
    })
    const [addFarmCrop, { isLoading }] = useUpdateCollectAddFarmCropMutation()

    const handleSave = (data) => {
        addFarmCrop({
            ...data,
            inputIrrig: data.inputIrrig?._id || null,
            yearRate: data.yearRate?._id || null,
        }).unwrap().then(() => {
            reset({
                farm: farmId,
                inputIrrig: null,
                yearRate: null,
                farmCrops: [
                    {
                        obs: '',
                        areaPlanted: 0,
                        seedTime: new Date(),
                        harvestTime: new Date(),
                        cropVariety: null,
                        irrigSystem: null
                    }
                ]
            })
        })
    }

    const handleAddFarmCrop = () => {
        append({
            obs: '',
            areaPlanted: 0,
            seedTime: new Date(),
            harvestTime: new Date(),
            cropVariety: null,
            irrigSystem: null,
            active: true
        })
    }

    return (
        <Modal
            show={show}
            onHide={() => setShow(!show)}
            size='lg'
            backdrop='static'
            fullscreen='sm-down'
        >
            <Modal.Header closeButton closeVariant='white'>
                <Modal.Title>
                    Generar deuda
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form id='form-collect-bill-create-debt' onSubmit={handleSubmit(handleSave)}>
                    <Liner>Información</Liner>
                    {/* <div className='row'>
                        <div className='col-12'>
                            <Form.Group className='mb-3' controlId='newDesc'>
                                <Form.Label>Descripción</Form.Label>
                                <Form.Control
                                    {...register('desc', { required: true, minLength: 6 })}
                                    type='text'
                                    autoComplete='off'
                                />
                            </Form.Group>
                        </div>
                    </div> */}
                    <div className='row'>
                        <div className='col-12'>
                            <Form.Group className='mb-3' controlId='newInputIrrig'>
                                <Form.Label>Toma de riego</Form.Label>
                                <Controller
                                    name='inputIrrig'
                                    control={control}
                                    rules={{ required: true }}
                                    render={
                                        ({ field }) =>
                                            <AsyncSelect
                                                {...field}
                                                inputId='newInputIrrig'
                                                classNamePrefix='rc-select'
                                                isSearchable={false}
                                                isClearable
                                                defaultOptions
                                                loadOptions={async () =>
                                                    await searchInputIrrigByFarm(farmId)
                                                }
                                                menuPlacement={'auto'}
                                                placeholder={`Buscar...`}
                                                loadingMessage={({ inputValue }) => `Buscando '${inputValue}'`}
                                                noOptionsMessage={({ inputValue }) => `Sin resultados con ...${inputValue}`}
                                                getOptionValue={e => e._id}
                                                getOptionLabel={e => <OptionInputIrrig inputIrrig={e} />}
                                            />
                                    }
                                />
                            </Form.Group>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-12'>
                            <Form.Group className='mb-3' controlId='newYearRate'>
                                <Form.Label>Año de tarifa</Form.Label>
                                <Controller
                                    name='yearRate'
                                    control={control}
                                    rules={{ required: true }}
                                    render={
                                        ({ field }) =>
                                            <AsyncSelect
                                                {...field}
                                                inputId='newYearRate'
                                                classNamePrefix='rc-select'
                                                isClearable
                                                defaultOptions
                                                loadOptions={async (e) =>
                                                    await searchYearRateByJunta(juntaId, e)
                                                }
                                                menuPlacement={'auto'}
                                                placeholder={`Buscar...`}
                                                loadingMessage={({ inputValue }) => `Buscando '${inputValue}'`}
                                                noOptionsMessage={({ inputValue }) => `Sin resultados con ...${inputValue}`}
                                                getOptionValue={e => e._id}
                                                getOptionLabel={e => <OptionYearRate yearRate={e} />}
                                            />
                                    }
                                />
                            </Form.Group>
                        </div>
                    </div>
                    <Liner>Cultivos</Liner>
                    <div className='row mb-1'>
                        <div className='col-12'>
                            <Button
                                onClick={handleAddFarmCrop}
                                className='w-100'
                                variant='success'
                            >
                                Agregar cultivo
                            </Button>
                        </div>
                    </div>
                    {
                        fields.length > 0
                        &&
                        <div className='row'>
                            <div className='col-12'>
                                <ListGroup>
                                    {
                                        fields.map((field, index) =>
                                            <ListGroup.Item key={`farmCrop_cllc_${index}`} className='border border-success'>
                                                <div className='row mb-3'>
                                                    <div className='col-8'>
                                                        <Form.Group>
                                                            <Form.Label>Observación</Form.Label>
                                                            <Form.Control
                                                                {...register(`farmCrops.${index}.obs`)}
                                                                type='text'
                                                                autoComplete='off'
                                                            />
                                                        </Form.Group>
                                                    </div>
                                                    <div className='col-4'>
                                                        <Form.Group>
                                                            <Form.Label>Area sembrada o por sembrar</Form.Label>
                                                            <Form.Control
                                                                {...register(`farmCrops.${index}.areaPlanted`, { required: true, min: 0.00001, valueAsNumber: true })}
                                                                type='number'
                                                                autoComplete='off'
                                                            />
                                                        </Form.Group>
                                                    </div>
                                                </div>
                                                <div className='row mb-3'>
                                                    <div className='col'>
                                                        <Form.Group>
                                                            <Form.Label>Fecha de siembra</Form.Label>
                                                            <Controller
                                                                control={control}
                                                                name={`farmCrops.${index}.seedTime`}
                                                                rules={{ required: true }}
                                                                render={({
                                                                    field: { onChange, value },
                                                                }) => (
                                                                    <DatePicker
                                                                        value={value}
                                                                        onChange={onChange}
                                                                        minDate={moment([watch('yearRate')?.year || new Date().getFullYear()]).endOf('year')}
                                                                    />
                                                                )}
                                                            />
                                                        </Form.Group>
                                                    </div>
                                                    <div className='col'>
                                                        <Form.Group>
                                                            <Form.Label>Fecha de cosecha</Form.Label>
                                                            <Controller
                                                                control={control}
                                                                name={`farmCrops.${index}.harvestTime`}
                                                                rules={{ required: true }}
                                                                render={({
                                                                    field: { onChange, value },
                                                                }) => (
                                                                    <DatePicker
                                                                        value={value}
                                                                        onChange={onChange}
                                                                        minDate={moment([watch('yearRate')?.year || new Date().getFullYear()]).endOf('year')}
                                                                    />
                                                                )}
                                                            />
                                                        </Form.Group>
                                                    </div>
                                                </div>
                                                <div className='row mb-3'>
                                                    <div className='col'>
                                                        <Form.Group>
                                                            <Form.Label>Cultivo / Variedad</Form.Label>
                                                            <Controller
                                                                name={`farmCrops.${index}.cropVariety`}
                                                                control={control}
                                                                rules={{ required: true }}
                                                                render={
                                                                    ({ field }) =>
                                                                        <AsyncSelect
                                                                            {...field}
                                                                            classNamePrefix='rc-select'
                                                                            isClearable
                                                                            defaultOptions
                                                                            loadOptions={async (e) =>
                                                                                await searchCropByJunta(juntaId, e)
                                                                            }
                                                                            menuPlacement={'auto'}
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
                                                    <div className='col'>
                                                        <Form.Group>
                                                            <Form.Label>Sistema de riego</Form.Label>
                                                            <Controller
                                                                name={`farmCrops.${index}.irrigSystem`}
                                                                control={control}
                                                                rules={{ required: true }}
                                                                render={
                                                                    ({ field }) =>
                                                                        <AsyncSelect
                                                                            {...field}
                                                                            classNamePrefix='rc-select'
                                                                            isClearable
                                                                            defaultOptions
                                                                            loadOptions={async (e) => await searchIrrigationSystemByJunta(juntaId, e)}
                                                                            menuPlacement={'auto'}
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
                                                {/* <div className='row mb-3'>
                                                    <div className='col-6'>
                                                        <Form.Group>
                                                            <Form.Label>Mes</Form.Label>
                                                            <Form.Control
                                                                {...register(`farmCrops.${index}.month`, { required: true })}
                                                                type='number'
                                                                min={1}
                                                                max={12}
                                                                autoComplete='off'
                                                            />
                                                        </Form.Group>
                                                    </div>
                                                    <div className='col-6'>
                                                        <Form.Group>
                                                            <Form.Label>Semana</Form.Label>
                                                            <Form.Control
                                                                {...register(`farmCrops.${index}.week`, { required: true })}
                                                                type='number'
                                                                min={1}
                                                                max={6}
                                                                autoComplete='off'
                                                            />
                                                        </Form.Group>
                                                    </div>
                                                </div>
                                                <div className='row mb-3'>
                                                    <div className='col-6'>
                                                        <Form.Group>
                                                            <Form.Label>Volumen (m3)</Form.Label>
                                                            <Form.Control
                                                                {...register(`farmCrops.${index}.quantity`, { required: true })}
                                                                type='number'
                                                                min={0.01}
                                                                step={0.01}
                                                                autoComplete='off'
                                                            />
                                                        </Form.Group>
                                                    </div>
                                                    <div className='col-6'>
                                                        <Form.Group>
                                                            <Form.Label>Monto (S/.)</Form.Label>
                                                            <Form.Control
                                                                {...register(`farmCrops.${index}.amount`, { required: true })}
                                                                type='number'
                                                                min={0.01}
                                                                step={0.01}
                                                                autoComplete='off'
                                                            />
                                                        </Form.Group>
                                                    </div>
                                                </div> */}
                                                {
                                                    index > 0
                                                    &&
                                                    <div className='row'>
                                                        <div className='col-auto'>
                                                            <Button onClick={() => remove(index)} variant='danger'>
                                                                <IoMdClose size={20} />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                }
                                            </ListGroup.Item>
                                        )
                                    }
                                </ListGroup>
                            </div>
                        </div>
                    }
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    onClick={() => setShow(false)}
                    type='button'
                    variant='secondary'
                    disabled={isLoading}
                >
                    Cerrar
                </Button>
                <Button
                    type='submit'
                    form='form-collect-bill-create-debt'
                    variant='primary'
                    disabled={isLoading}
                >
                    Grabar nuevo
                </Button>
            </Modal.Footer>
        </Modal>
    )
}