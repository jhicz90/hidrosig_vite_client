import { useMemo } from 'react'
import { Alert, Form, Modal } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import Select from 'react-select'
import AsyncSelect from 'react-select/async'
import { CollectCampaign, AreaFarmDataInfo, AreaFarmListCampaign } from '.'
import { Liner, LoadingPage, OptionYearRate } from '../../../components'
import { searchCollectByFarm, useGenerateDebtMutation, useGetFarmByIdQuery } from '../../../store/actions'
import { useCollectStore } from '../../../hooks'

export const FeeCollectBillPay = ({ tabId = '' }) => {

    const { listSearched } = useCollectStore()
    const prpActive = useMemo(() => listSearched.find(ls => ls.id === tabId)?.prpId || null, [listSearched])
    const { data = null, isLoading } = useGetFarmByIdQuery(prpActive)

    if (isLoading) {
        return <LoadingPage />
    }

    return (
        !!data
        &&
        <>
            <div className='container-fluid'>
                <div className='row my-3'>
                    <div className='col-12 col-xxl-4'>
                        <div className='row mb-3 mb-xxl-0 g-3 g-xxl-0'>
                            <div className='col-12 col-md-7 col-xxl-12 mb-xxl-3'>
                                <AreaFarmDataInfo tabId={tabId} prpId={prpActive} />
                            </div>
                            <div className='col-12 col-md-5 col-xxl-12 mb-xxl-3'>
                                <AreaFarmListCampaign tabId={tabId} />
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-xxl-8'>
                        <CollectCampaign tabId={tabId} />
                    </div>
                </div>
            </div>
        </>
    )
}

const AddDebt = ({ show, setShow, areaFarm }) => {

    const { _id: farmId, junta: { _id: juntaId } } = areaFarm
    const { control, register, handleSubmit, reset, watch, setValue } = useForm({
        defaultValues: {
            yearRate: null,
            campaign: null,
            farmCrop: null,
            amount: 0
        },
        mode: 'onChange'
    })
    // const { fields, append, remove } = useFieldArray({
    //     control,
    //     name: 'consumptions',
    // })

    const [addDebt, { isLoading }] = useGenerateDebtMutation()

    const handleSave = (data) => {
        addDebt(data).unwrap().then(() => {
            reset({
                yearRate: null,
                campaign: null,
                farmCrop: null,
                amount: 0,
                // consumptions: [
                //     {
                //         collect: null,
                //         obs: '',
                //         month: 1,
                //         week: 1,
                //         farmCrops: null,
                //         regulation: 0,
                //         valueRate: null,
                //         quantity: 0,
                //         amount: 0
                //     }
                // ]
            })
        })
    }

    // const handleAddConsumption = () => {
    //     append({
    //         collect: null,
    //         obs: '',
    //         month: 1,
    //         week: 1,
    //         farmCrops: null,
    //         regulation: 0,
    //         valueRate: null,
    //         quantity: 0,
    //         amount: 0
    //     })
    // }

    console.log(watch('yearRate'))

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
                <form id='form-collect-bill-add-consumption' onSubmit={handleSubmit(handleSave)}>
                    <Liner>Información</Liner>
                    <div className='row'>
                        <div className='col-12'>
                            <Form.Group className='mb-3' controlId='newYearRate'>
                                <Form.Label>Año de tarifa</Form.Label>
                                <Controller
                                    name='yearRate'
                                    control={control}
                                    rules={{
                                        required: true, onChange: () => {
                                            setValue('campaign')
                                            setValue('farmCrop')
                                        }
                                    }}
                                    render={
                                        ({ field }) =>
                                            <AsyncSelect
                                                {...field}
                                                inputId='newYearRate'
                                                classNamePrefix='rc-select'
                                                isClearable
                                                defaultOptions
                                                loadOptions={async (e) =>
                                                    await searchCollectByFarm(farmId, e)
                                                }
                                                menuPlacement={'auto'}
                                                placeholder={`Buscar...`}
                                                loadingMessage={({ inputValue }) => `Buscando '${inputValue}'`}
                                                noOptionsMessage={({ inputValue }) => `Sin resultados con ...${inputValue}`}
                                                getOptionValue={e => e._id}
                                                getOptionLabel={e => e._id}
                                            />
                                    }
                                />
                            </Form.Group>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-12'>
                            <Form.Group className='mb-3' controlId='newCampaign'>
                                <Form.Label>Campaña</Form.Label>
                                <Controller
                                    name='campaign'
                                    control={control}
                                    rules={{ required: true, onChange: () => setValue('farmCrop') }}
                                    render={
                                        ({ field }) =>
                                            <Select
                                                {...field}
                                                inputId='newCampaign'
                                                classNamePrefix='rc-select'
                                                isClearable
                                                isSearchable={false}
                                                options={watch('yearRate')?.campaigns || []}
                                                menuPlacement={'auto'}
                                                placeholder={`Seleccione una campaña...`}
                                                noOptionsMessage={() => `Sin campañas`}
                                                getOptionValue={e => e._id}
                                                getOptionLabel={e => <OptionYearRate yearRate={e._id} />}
                                            />
                                    }
                                />
                            </Form.Group>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-12'>
                            <Form.Group className='mb-3' controlId='newFarmCrop'>
                                <Form.Label>Cultivos</Form.Label>
                                <Controller
                                    name='farmCrop'
                                    control={control}
                                    render={
                                        ({ field }) =>
                                            <Select
                                                {...field}
                                                inputId='newFarmCrop'
                                                classNamePrefix='rc-select'
                                                isClearable
                                                isSearchable={false}
                                                options={watch('campaign')?.farmCrops || []}
                                                menuPlacement={'auto'}
                                                placeholder={`Seleccione un cultivo...`}
                                                noOptionsMessage={() => `Sin cultivos`}
                                                getOptionValue={e => e._id}
                                                getOptionLabel={e => <div>{e?.cropVariety?.name} - {e?.irrigSystem?.name} - {e?.areaPlanted} ha</div>}
                                            />
                                    }
                                />
                            </Form.Group>
                            <Alert variant='warning'>
                                Tomar en cuenta, que si no selecciona un cultivo este se ingresara como un saldo sin especificacion de que cultivo proviene esa deuda. Este parametro se podra modificar más adelante pero requerira ciertos permisos especiales.
                            </Alert>
                        </div>
                    </div>
                    <div className='col-6'>
                        <Form.Group>
                            <Form.Label>Monto (S/.)</Form.Label>
                            <Form.Control
                                {...register('amount', { required: true, valueAsNumber: true })}
                                type='number'
                                min={0.01}
                                step={0.01}
                                autoComplete='off'
                            />
                        </Form.Group>
                    </div>
                    {/* <Liner>Cultivos</Liner>
                    <div className='row mb-1'>
                        <div className='col-12'>
                            <Button
                                onClick={handleAddConsumption}
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
                                            <ListGroup.Item key={`consumption_cllc_${index}`} className='border border-success'>
                                                <div className='row mb-3'>
                                                    <div className='col-8'>
                                                        <Form.Group>
                                                            <Form.Label>Observación</Form.Label>
                                                            <Form.Control
                                                                {...register(`consumptions.${index}.obs`)}
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
                                                </div>
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
                    } */}
                </form>
            </Modal.Body>
        </Modal>
    )
}