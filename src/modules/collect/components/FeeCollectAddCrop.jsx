import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, ButtonGroup, Card, Form, ListGroup, Table } from 'react-bootstrap'
import { IoMdClose } from 'react-icons/io'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import AsyncSelect from 'react-select/async'
import moment from 'moment'
import { AreaFarmDataInfo } from '..'
import { DatePicker, Liner, LoadingPage, OptionInputIrrig, OptionYearRate } from '../../../components'
import { searchCropVarietyByJunta, searchInputIrrigByFarm, searchIrrigationSystemByJunta, searchYearRateByJunta, useGetFarmByIdQuery, useUpdateCollectAddFarmCropMutation } from '../../../store/actions'

export const FeeCollectAddCrop = ({ tabId = '' }) => {

    const { listSearched = [] } = useSelector(state => state.collect)
    const prpActive = useMemo(() => listSearched.find(ls => ls.id === tabId)?.prpId || null, [listSearched])
    const { data = null, isLoading } = useGetFarmByIdQuery(prpActive)

    const { control, register, handleSubmit, reset, watch, setValue } = useForm({
        defaultValues: {
            farm: prpActive,
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

    const [addFarmCrop, { isLoading: isSaving }] = useUpdateCollectAddFarmCropMutation()

    const handleSave = (data) => {
        addFarmCrop({
            ...data,
            inputIrrig: data.inputIrrig?._id || null,
            yearRate: data.yearRate?._id || null,
        }).unwrap().then(() => {
            reset({
                farm: prpActive,
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
                                Ira otra información
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-xxl-8'>
                        <Card>
                            <Card.Body>
                                <form id='form-collect-bill-add-farmcrop' onSubmit={handleSubmit(handleSave)}>
                                    <Liner>Información</Liner>
                                    <div className='row'>
                                        <div className='col-6'>
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
                                                                styles={{
                                                                    control: (baseStyles, state) => ({
                                                                        ...baseStyles,
                                                                        minHeight: '90px',
                                                                    }),
                                                                }}
                                                                isSearchable={false}
                                                                isClearable
                                                                defaultOptions
                                                                loadOptions={async () => await searchInputIrrigByFarm(prpActive)}
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
                                        <div className='col-6'>
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
                                                                styles={{
                                                                    control: (baseStyles, state) => ({
                                                                        ...baseStyles,
                                                                        minHeight: '90px',
                                                                    }),
                                                                }}
                                                                isClearable
                                                                defaultOptions
                                                                loadOptions={async (e) => await searchYearRateByJunta(data.junta._id, e)}
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
                                                <Table striped bordered hover>
                                                    <thead>
                                                        <tr>
                                                            <th style={{ verticalAlign: 'middle', textAlign: 'center' }}>#</th>
                                                            <th style={{ verticalAlign: 'middle', textAlign: 'center' }}>Cultivo / Variedad</th>
                                                            <th style={{ verticalAlign: 'middle', textAlign: 'center' }}>Observación</th>
                                                            <th width='12%' style={{ verticalAlign: 'middle', textAlign: 'center' }}>Area de cultivo</th>
                                                            <th width='13%' style={{ verticalAlign: 'middle', textAlign: 'center' }}>Fecha de siembra</th>
                                                            <th width='13%' style={{ verticalAlign: 'middle', textAlign: 'center' }}>Fecha de cosecha</th>
                                                            <th style={{ verticalAlign: 'middle', textAlign: 'center' }}>Opciones</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            fields.map((field, index) =>
                                                                <tr key={`farmCrop_cllc_${index}`}>
                                                                    <td style={{ padding: '5px', verticalAlign: 'middle', textAlign: 'center' }}>{index + 1}</td>
                                                                    <td style={{ padding: '5px' }}>
                                                                        <Form.Group>
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
                                                                                            loadOptions={async (e) => await searchCropVarietyByJunta(data.junta._id, e)}
                                                                                            menuPlacement={'auto'}
                                                                                            placeholder={`Busque y seleccione cultivo...`}
                                                                                            loadingMessage={({ inputValue }) => `Buscando '${inputValue}'`}
                                                                                            noOptionsMessage={({ inputValue }) => `Sin resultados con ...${inputValue}`}
                                                                                            getOptionValue={e => e._id}
                                                                                            getOptionLabel={e => e.nameCropVariety}
                                                                                        />
                                                                                }
                                                                            />
                                                                        </Form.Group>
                                                                    </td>
                                                                    <td style={{ padding: '5px' }}>
                                                                        <Form.Group>
                                                                            <Form.Control
                                                                                {...register(`farmCrops.${index}.obs`)}
                                                                                type='text'
                                                                                autoComplete='off'
                                                                                placeholder='Observación'
                                                                            />
                                                                        </Form.Group>
                                                                    </td>
                                                                    <td style={{ padding: '5px' }}>
                                                                        <Form.Group>
                                                                            <Form.Control
                                                                                {...register(`farmCrops.${index}.areaPlanted`, {
                                                                                    required: true,
                                                                                    min: 0.00001,
                                                                                    valueAsNumber: true
                                                                                })}
                                                                                type='number'
                                                                                min={0}
                                                                                autoComplete='off'
                                                                                placeholder='Area de cultivo'
                                                                            />
                                                                        </Form.Group>
                                                                    </td>
                                                                    <td style={{ padding: '5px' }}>
                                                                        <Form.Group>
                                                                            <Controller
                                                                                control={control}
                                                                                name={`farmCrops.${index}.seedTime`}
                                                                                rules={{
                                                                                    required: true,
                                                                                    onChange: () => {
                                                                                        setValue(
                                                                                            `farmCrops.${index}.harvestTime`,
                                                                                            moment(watch(`farmCrops.${index}.seedTime`)).add(watch(`farmCrops.${index}.cropVariety`)?.period || 0)
                                                                                        )
                                                                                    }
                                                                                }}
                                                                                render={({
                                                                                    field: { onChange, value },
                                                                                }) => (
                                                                                    <DatePicker
                                                                                        value={value}
                                                                                        onChange={onChange}
                                                                                    />
                                                                                )}
                                                                            />
                                                                        </Form.Group>
                                                                    </td>
                                                                    <td style={{ padding: '5px' }}>
                                                                        <Form.Group>
                                                                            <Controller
                                                                                control={control}
                                                                                name={`farmCrops.${index}.harvestTime`}
                                                                                rules={{ required: true }}
                                                                                render={({
                                                                                    field: { onChange, value },
                                                                                }) => (
                                                                                    <DatePicker
                                                                                        value={moment(value).add(watch(`farmCrops.${index}.cropVariety`)?.period || 0, 'M')}
                                                                                        onChange={onChange}
                                                                                    />
                                                                                )}
                                                                            />
                                                                        </Form.Group>
                                                                    </td>
                                                                    <td style={{ padding: '5px' }}>
                                                                        <ButtonGroup>
                                                                            <Button
                                                                                // onClick={() => setEditing(!editing)}
                                                                                type='button'
                                                                                // variant={editing ? 'secondary' : 'primary'}
                                                                                variant='primary'
                                                                            >
                                                                                {/* {editing ? 'Cancel' : 'Editar'} */}
                                                                                Cancel
                                                                            </Button>
                                                                            <Button
                                                                                type='submit'
                                                                                variant='success'
                                                                            >
                                                                                Guardar
                                                                            </Button>
                                                                            {/* {
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
                                                                                        // onClick={() => deleteRugosity(data._id)}
                                                                                        type='button'
                                                                                        variant='danger'
                                                                                    // disabled={isDeleting}
                                                                                    >
                                                                                        Eliminar
                                                                                    </Button>
                                                                            } */}
                                                                        </ButtonGroup>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        }
                                                    </tbody>
                                                </Table>
                                                {/* <ListGroup>
                                                    {
                                                        fields.map((field, index) =>
                                                            <ListGroup.Item key={`farmCrop_cllc_${index}`} className='border border-success'>
                                                                <div className='row align-items-center'>
                                                                    <div className='col-4'>
                                                                        <Form.Group>
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
                                                                                            loadOptions={async (e) => await searchCropByJunta(data.junta._id, e)}
                                                                                            menuPlacement={'auto'}
                                                                                            placeholder={`Busque y seleccione cultivo...`}
                                                                                            loadingMessage={({ inputValue }) => `Buscando '${inputValue}'`}
                                                                                            noOptionsMessage={({ inputValue }) => `Sin resultados con ...${inputValue}`}
                                                                                            getOptionValue={e => e._id}
                                                                                            getOptionLabel={e => e.name}
                                                                                        />
                                                                                }
                                                                            />
                                                                        </Form.Group>
                                                                    </div>
                                                                    <div className='col-3'>
                                                                        <Form.Group>
                                                                            <Form.Control
                                                                                {...register(`farmCrops.${index}.obs`)}
                                                                                type='text'
                                                                                autoComplete='off'
                                                                                placeholder='Observación'
                                                                            />
                                                                        </Form.Group>
                                                                    </div>
                                                                    <div className='col-1'>
                                                                        <Form.Group>
                                                                            <Form.Control
                                                                                {...register(`farmCrops.${index}.areaPlanted`, { required: true, min: 0.00001, valueAsNumber: true })}
                                                                                type='number'
                                                                                min={0}
                                                                                autoComplete='off'
                                                                                placeholder='Area de cultivo'
                                                                            />
                                                                        </Form.Group>
                                                                    </div>
                                                                    <div className='col-2'>
                                                                        <Form.Group>
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
                                                                                    />
                                                                                )}
                                                                            />
                                                                        </Form.Group>
                                                                    </div>
                                                                    <div className='col-2'>
                                                                        <Form.Group>
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
                                                                                    />
                                                                                )}
                                                                            />
                                                                        </Form.Group>
                                                                    </div>
                                                                </div>
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
                                                                                min={0}
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
                                                                                    // minDate={moment([watch('yearRate')?.year || new Date().getFullYear()]).endOf('year')}
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
                                                                                    // minDate={moment([watch('yearRate')?.year || new Date().getFullYear()]).endOf('year')}
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
                                                                                            loadOptions={async (e) => await searchCropByJunta(data.junta._id, e)}
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
                                                                                            loadOptions={async (e) => await searchIrrigationSystemByJunta(data.junta._id, e)}
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
                                                </ListGroup> */}
                                            </div>
                                        </div>
                                    }
                                </form>
                            </Card.Body>
                            <Card.Footer>
                                <Button
                                    type='submit'
                                    form='form-collect-bill-add-farmcrop'
                                    variant='primary'
                                    disabled={isLoading}
                                >
                                    Grabar nuevo
                                </Button>
                            </Card.Footer>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    )
}

const CropVarietyItem = () => {

    const [editing, setEditing] = useState(false)
    return null
}