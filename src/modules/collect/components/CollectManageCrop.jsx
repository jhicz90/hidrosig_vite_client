import { useEffect, useState } from 'react'
import { Button, ButtonGroup, Card, Form } from 'react-bootstrap'
import { TbPlant } from 'react-icons/tb'
import { Controller, useForm } from 'react-hook-form'
import AsyncSelect from 'react-select/async'
import moment from 'moment'
import validator from 'validator'
import { DatePicker, LoadingPage, OptionCropVariety } from '../../../components'
import { searchCropVarietyByJunta, useAddFarmCropInCollectByYearRateMutation, useDeleteFarmCropInCollectMutation, useGetFarmByIdQuery, useGetListCropByCampaignAndInputIrrigQuery, useUpdateFarmCropInCollectMutation } from '../../../store/actions'
import { useCollectStore } from '../../../hooks'

export const CollectManageCrop = ({ tabId = '' }) => {

    const { getPrpActiveByTabId, getCmpActiveByTabId } = useCollectStore()
    const prpActive = getPrpActiveByTabId(tabId)
    const cmpActive = getCmpActiveByTabId(tabId)
    const cmp = cmpActive.split('-')
    const { data = null, isLoading: loadingFarm } = useGetFarmByIdQuery(prpActive)
    const { data: listFarmCrops = [], isFetching: loadingFarmsCrop } = useGetListCropByCampaignAndInputIrrigQuery({ campaign: cmp[0], inputIrrig: cmp[1] })

    if (loadingFarm) {
        return <LoadingPage />
    }

    return (
        validator.isMongoId(String(cmp[0])) && !!data && cmpActive
        &&
        <Card>
            <Card.Header>
                <div className='row justify-content-end'>
                    <div className='col-auto'>
                        <h6 className='text-uppercase fw-bold m-0'>CULTIVOS <TbPlant size={20} /></h6>
                    </div>
                </div>
            </Card.Header>
            <Card.Body>
                <div className='row'>
                    <div className='col-12'>
                        <div className='d-grid' style={{ overflowX: 'auto', gap: '8px', gridTemplateColumns: '150px 300px 120px 150px 150px 200px' }}>
                            <div style={{ verticalAlign: 'middle', textAlign: 'center', backgroundColor: 'darkgray', color: 'white' }}>Opciones</div>
                            {/* <div style={{ verticalAlign: 'middle', textAlign: 'center', backgroundColor: 'darkgray', color: 'white' }}>Toma</div> */}
                            <div style={{ verticalAlign: 'middle', textAlign: 'center', backgroundColor: 'darkgray', color: 'white' }}>Cultivo / Variedad</div>
                            <div style={{ verticalAlign: 'middle', textAlign: 'center', backgroundColor: 'darkgray', color: 'white' }}>Area de cultivo</div>
                            <div style={{ verticalAlign: 'middle', textAlign: 'center', backgroundColor: 'darkgray', color: 'white' }}>Fecha de siembra</div>
                            <div style={{ verticalAlign: 'middle', textAlign: 'center', backgroundColor: 'darkgray', color: 'white' }}>Fecha de cosecha</div>
                            <div style={{ verticalAlign: 'middle', textAlign: 'center', backgroundColor: 'darkgray', color: 'white' }}>Observación</div>
                            <FarmCropCreate data={data} campaign={cmp[0]} inputIrrig={cmp[1]} />
                            {
                                loadingFarmsCrop
                                    ?
                                    <p>Cargando...</p>
                                    :
                                    <>
                                        {
                                            listFarmCrops.map(frmCrop =>
                                                <FarmCropItem
                                                    key={`crop_var_${frmCrop._id}`}
                                                    data={frmCrop}
                                                />
                                            )
                                        }
                                    </>
                            }
                        </div>
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}

const FarmCropCreate = ({ data, campaign, inputIrrig }) => {

    const { control, register, handleSubmit, reset, setValue, watch } = useForm({
        defaultValues: {
            inputIrrig,
            cropVariety: null,
            areaPlanted: 0,
            seedTime: new Date(),
            harvestTime: new Date(),
            obs: ''
        }
    })
    const [addFarmCrop, { isLoading }] = useAddFarmCropInCollectByYearRateMutation()

    const handleSave = (farmCrop) => {
        addFarmCrop({
            campaign,
            farmCrop: {
                ...farmCrop,
                farm: data._id
            }
        }).unwrap().then(() =>
            reset({
                inputIrrig,
                cropVariety: null,
                areaPlanted: 0,
                seedTime: new Date(),
                harvestTime: new Date(),
                obs: ''
            })
        )
    }

    return (
        <form onSubmit={handleSubmit(handleSave)} style={{ display: 'contents' }}>
            <div style={{ padding: '4px', display: 'flex', alignItems: 'center' }}>
                <Button
                    type='submit'
                    variant='success'
                    size='sm'
                    disabled={isLoading}
                >
                    Grabar nuevo
                </Button>
            </div>
            {/* <div style={{ padding: '4px', display: 'flex', alignItems: 'center' }}>
                <Form.Group style={{ flex: '1 1 auto' }}>
                    <Controller
                        name={`inputIrrig`}
                        control={control}
                        rules={{ required: true }}
                        render={
                            ({ field }) =>
                                <AsyncSelect
                                    {...field}
                                    isDisabled={isLoading}
                                    classNamePrefix='rc-select'
                                    menuPosition='fixed'
                                    hideSelectedOptions
                                    isClearable
                                    defaultOptions
                                    loadOptions={async () => await searchInputIrrigByFarm(data._id)}
                                    menuPlacement={'auto'}
                                    placeholder={`Buscar...`}
                                    loadingMessage={({ inputValue }) => `Buscando '${inputValue}'`}
                                    noOptionsMessage={({ inputValue }) => inputValue.length === 0 ? `No ahi más tomas de riego` : `Sin resultados con ..."${inputValue}"`}
                                    getOptionValue={e => e._id}
                                    getOptionLabel={e => <OptionInputIrrig inputIrrig={e} />}
                                />
                        }
                    />
                </Form.Group>
            </div> */}
            <div style={{ padding: '4px', display: 'flex', alignItems: 'center' }}>
                <Form.Group style={{ flex: '1 1 auto' }}>
                    <Controller
                        name={`cropVariety`}
                        control={control}
                        rules={{ required: true }}
                        render={
                            ({ field }) =>
                                <AsyncSelect
                                    {...field}
                                    isDisabled={isLoading}
                                    classNamePrefix='rc-select'
                                    menuPosition='fixed'
                                    hideSelectedOptions
                                    isClearable
                                    defaultOptions
                                    loadOptions={async (e) => await searchCropVarietyByJunta(data.junta._id, e)}
                                    menuPlacement={'auto'}
                                    placeholder={`Busque y seleccione cultivo...`}
                                    loadingMessage={({ inputValue }) => `Buscando '${inputValue}'`}
                                    noOptionsMessage={({ inputValue }) => `Sin resultados con ...${inputValue}`}
                                    getOptionValue={e => e._id}
                                    getOptionLabel={e => <OptionCropVariety crop={e} />}
                                />
                        }
                    />
                </Form.Group>
            </div>
            <div style={{ padding: '4px', display: 'flex', alignItems: 'center' }}>
                <Form.Group>
                    <Form.Control
                        {...register(`areaPlanted`, {
                            required: true,
                            min: 0.00001,
                            valueAsNumber: true
                        })}
                        type='number'
                        min={0}
                        autoComplete='off'
                        placeholder='Area de cultivo'
                        disabled={isLoading}
                    />
                </Form.Group>
            </div>
            <div style={{ padding: '4px', display: 'flex', alignItems: 'center' }}>
                <Form.Group>
                    <Controller
                        control={control}
                        name={`seedTime`}
                        rules={{
                            required: true,
                            onChange: () => {
                                setValue(
                                    `harvestTime`,
                                    moment(watch(`seedTime`)).add(watch(`cropVariety`)?.period || 0)
                                )
                            }
                        }}
                        render={({
                            field: { onChange, value },
                        }) => (
                            <DatePicker
                                value={value}
                                onChange={onChange}
                                disabled={isLoading}
                            />
                        )}
                    />
                </Form.Group>
            </div>
            <div style={{ padding: '4px', display: 'flex', alignItems: 'center' }}>
                <Form.Group>
                    <Controller
                        control={control}
                        name={`harvestTime`}
                        rules={{ required: true }}
                        render={({
                            field: { onChange, value },
                        }) => (
                            <DatePicker
                                value={moment(value).add(watch(`cropVariety`)?.period || 0, 'M')}
                                onChange={onChange}
                                disabled={isLoading}
                            />
                        )}
                    />
                </Form.Group>
            </div>
            <div style={{ padding: '4px', display: 'flex', alignItems: 'center' }}>
                <Form.Group>
                    <Form.Control
                        {...register(`obs`)}
                        type='text'
                        autoComplete='off'
                        placeholder='Observación'
                        disabled={isLoading}
                    />
                </Form.Group>
            </div>
        </form>
    )
}

const FarmCropItem = ({ data }) => {

    const [editing, setEditing] = useState(false)
    const { control, register, handleSubmit, reset, setValue, watch } = useForm()
    const [updateFarmCrop] = useUpdateFarmCropInCollectMutation()
    const [deleteFarmCrop, { isLoading: isDeleting }] = useDeleteFarmCropInCollectMutation()

    const handleUpdate = (farmCrop) => {
        setEditing(false)
        updateFarmCrop({ collect: data.collectId, farmCrop })
    }

    useEffect(() => {
        reset({
            ...data
        })
    }, [reset, data])

    useEffect(() => {
        if (!editing) {
            reset({
                ...data
            })
        }
    }, [editing])

    return (
        <form onSubmit={handleSubmit(handleUpdate)} style={{ display: 'contents' }}>
            <div style={{ padding: '4px', display: 'flex', alignItems: 'center' }}>
                <ButtonGroup size='sm'>
                    <Button
                        onClick={() => setEditing(!editing)}
                        type='button'
                        variant={editing ? 'secondary' : 'primary'}
                        disabled={isDeleting}
                    >
                        {editing ? 'Cancel' : 'Editar'}
                    </Button>
                    {
                        editing
                            ?
                            <Button
                                type='submit'
                                variant='success'
                            >
                                Guardar
                            </Button>
                            :
                            <Button
                                onClick={() => deleteFarmCrop({ collect: data.collectId, farmCrop: data._id })}
                                type='button'
                                variant='danger'
                                disabled={isDeleting}
                            >
                                Eliminar
                            </Button>
                    }
                </ButtonGroup>
            </div>
            {/* <div style={{ padding: '4px', display: 'flex', alignItems: 'center' }}>
                <OptionInputIrrig inputIrrig={data.inputIrrig} />
                <Form.Group style={{ flex: '1 1 auto' }}>
                    <Controller
                        name={`inputIrrig`}
                        control={control}
                        rules={{ required: true }}
                        render={
                            ({ field }) =>
                                <AsyncSelect
                                    {...field}
                                    isDisabled={!editing}
                                    classNamePrefix='rc-select'
                                    menuPosition='fixed'
                                    hideSelectedOptions
                                    isClearable
                                    defaultOptions
                                    loadOptions={async () => await searchInputIrrigByFarm(data.farm._id)}
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
            </div> */}
            <div style={{ padding: '4px', display: 'flex', alignItems: 'center' }}>
                <Form.Group style={{ flex: '1 1 auto' }}>
                    <Controller
                        name={`cropVariety`}
                        control={control}
                        rules={{ required: true }}
                        render={
                            ({ field }) =>
                                <AsyncSelect
                                    {...field}
                                    isDisabled={!editing}
                                    classNamePrefix='rc-select'
                                    menuPosition='fixed'
                                    hideSelectedOptions
                                    isClearable
                                    defaultOptions
                                    loadOptions={async (e) => await searchCropVarietyByJunta(data.farm.junta, e)}
                                    menuPlacement={'auto'}
                                    placeholder={`Busque y seleccione cultivo...`}
                                    loadingMessage={({ inputValue }) => `Buscando '${inputValue}'`}
                                    noOptionsMessage={({ inputValue }) => `Sin resultados con ...${inputValue}`}
                                    getOptionValue={e => e._id}
                                    getOptionLabel={e => e.hasOwnProperty('nameCropVariety') ? e.nameCropVariety : `${e.crop.name} - ${e.name}`}
                                />
                        }
                    />
                </Form.Group>
            </div>
            <div style={{ padding: '4px', display: 'flex', alignItems: 'center' }}>
                <Form.Group>
                    <Form.Control
                        {...register(`areaPlanted`, {
                            required: true,
                            min: 0.00001,
                            valueAsNumber: true
                        })}
                        type='number'
                        min={0}
                        autoComplete='off'
                        placeholder='Area de cultivo'
                        disabled={!editing}
                    />
                </Form.Group>
            </div>
            <div style={{ padding: '4px', display: 'flex', alignItems: 'center' }}>
                <Form.Group>
                    <Controller
                        control={control}
                        name={`seedTime`}
                        rules={{
                            required: true,
                            onChange: () => {
                                setValue(
                                    `harvestTime`,
                                    moment(watch(`seedTime`)).add(watch(`cropVariety`)?.period || 0)
                                )
                            }
                        }}
                        render={({
                            field: { onChange, value },
                        }) => (
                            <DatePicker
                                value={value}
                                onChange={onChange}
                                disabled={!editing}
                            />
                        )}
                    />
                </Form.Group>
            </div>
            <div style={{ padding: '4px', display: 'flex', alignItems: 'center' }}>
                <Form.Group>
                    <Controller
                        control={control}
                        name={`harvestTime`}
                        rules={{ required: true }}
                        render={({
                            field: { onChange, value },
                        }) => (
                            <DatePicker
                                value={moment(value).add(watch(`cropVariety`)?.period || 0, 'M')}
                                onChange={onChange}
                                disabled={!editing}
                            />
                        )}
                    />
                </Form.Group>
            </div>
            <div style={{ padding: '4px', display: 'flex', alignItems: 'center' }}>
                <Form.Group>
                    <Form.Control
                        {...register(`obs`)}
                        type='text'
                        autoComplete='off'
                        placeholder='Observación'
                        disabled={!editing}
                    />
                </Form.Group>
            </div>
        </form>
    )
}