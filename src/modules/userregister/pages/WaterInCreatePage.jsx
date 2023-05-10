import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import { Button, Form } from 'react-bootstrap'
import AsyncSelect from 'react-select/async'
import { useNavigateState } from '../../../hooks'
import { Liner, LoadingPage, MapLocation, OptionGeometry } from '../../../components'
import { searchIrrigationSystemByJunta, searchPointObject, searchStructureByJunta, useUpdateFarmByIdAddInputIrrigMutation } from '../../../store/actions'

export const WaterInCreatePage = () => {

    const { state: params } = useLocation()
    const [redirect, redirectEscape] = useNavigateState('/app/user_reg/user_farm/prps')

    const [addInputIrrig, { isLoading: isSavingAdd, isSuccess: isSaved }] = useUpdateFarmByIdAddInputIrrigMutation()
    const { control, register, handleSubmit, watch, reset } = useForm()

    const handleSave = async (newData) => {
        try {
            await addInputIrrig({
                id: params?.farm?._id,
                inputIrrig: newData
            })
        } catch (err) {
            console.log(err)
        }
    }

    const handleDiscard = () => {
        redirect()
    }

    useEffect(() => {
        if (isSaved) {
            reset({})
        }
    }, [isSaved])

    return (
        <div className='container-fluid'>
            <div className='row my-3'>
                <div className='col-12'>
                    <div className='row align-items-center justify-content-between g-3'>
                        <div className='col-12 col-md-auto'>
                            <h4 className='mb-0'>NUEVA TOMA DE AGUA</h4>
                        </div>
                        <div className='col-12 col-md-auto'>
                            <div className='d-flex gap-2'>
                                <Button
                                    onClick={handleDiscard}
                                    disabled={isSavingAdd}
                                    variant='secondary'
                                    type='button'
                                >
                                    Descartar
                                </Button>
                                <Button
                                    disabled={isSavingAdd}
                                    variant='primary'
                                    type='submit'
                                    form='form-userregister-areafarm-create-waterin'
                                >
                                    Registro nuevo
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row g-0 justify-content-center'>
                <div className='col'>
                    <form id='form-userregister-areafarm-create-waterin' onSubmit={handleSubmit(handleSave)}>
                        <Liner>Detalle</Liner>
                        <div className='row'>
                            <div className='col-12 col-md-6 col-lg-2'>
                                <Form.Group className='mb-3' controlId='newOrder'>
                                    <Form.Label>Orden de riego</Form.Label>
                                    <Form.Control
                                        {...register('order', { required: true })}
                                        type='number'
                                        min={0}
                                        autoComplete='off'
                                    />
                                </Form.Group>
                            </div>
                            <div className='col-12 col-md-6 col-lg-2'>
                                <Form.Group className='mb-3' controlId='newAreaUse'>
                                    <Form.Label>Area de riego</Form.Label>
                                    <Form.Control
                                        {...register('areaUse', { required: true, max: Number(params?.farm?.areaUse) || 0 })}
                                        type='number'
                                        min={0.00001}
                                        step={0.00001}
                                        max={Number(params?.farm?.areaUse) || 0}
                                        autoComplete='off'
                                    />
                                </Form.Group>
                            </div>
                            <div className='col-12 col-md-6 col-lg-2'>
                                <Form.Group className='mb-3' controlId='newFlowUse'>
                                    <Form.Label>Caudal (m3/seg)</Form.Label>
                                    <Form.Control
                                        {...register('flowUse', { required: true })}
                                        type='number'
                                        min={0.01}
                                        step={0.01}
                                        autoComplete='off'
                                    />
                                </Form.Group>
                            </div>
                            <div className='col-12 col-md-6 col-lg-2'>
                                <Form.Group className='mb-3' controlId='newRegulation'>
                                    <Form.Label>Tipo de riego</Form.Label>
                                    <Form.Select
                                        {...register('regulation', { required: true })}
                                        autoComplete='off'
                                    >
                                        <option value={0}>No regulado</option>
                                        <option value={1}>Regulado</option>
                                        <option value={2}>Variable</option>
                                    </Form.Select>
                                </Form.Group>
                            </div>
                            <div className='col-12 col-md-6 col-lg-4'>
                                <Form.Group className='mb-3' controlId='newIrrigSystem'>
                                    <Form.Label>Sistema de riego</Form.Label>
                                    <Controller
                                        name='irrigSystem'
                                        control={control}
                                        rules={{ required: true }}
                                        render={
                                            ({ field }) =>
                                                <AsyncSelect
                                                    {...field}
                                                    inputId='newIrrigSystem'
                                                    classNamePrefix='rc-select'
                                                    isClearable
                                                    defaultOptions
                                                    loadOptions={async (e) => {
                                                        return await searchIrrigationSystemByJunta(params?.farm?.block.junta._id || null, e)
                                                    }}
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
                        <Liner>Estructura</Liner>
                        <div className='row'>
                            <div className='col-12 col-md-6'>
                                <Form.Group className='mb-3' controlId='newStructure'>
                                    <Form.Label>Estructura de captación</Form.Label>
                                    <Controller
                                        name='structure'
                                        control={control}
                                        rules={{ required: true }}
                                        render={
                                            ({ field }) =>
                                                <AsyncSelect
                                                    {...field}
                                                    inputId='newStructure'
                                                    classNamePrefix='rc-select'
                                                    menuPosition='fixed'
                                                    isClearable
                                                    defaultOptions
                                                    loadOptions={async (e) => {
                                                        return await searchStructureByJunta(params?.farm?.block.junta._id || null, e)
                                                    }}
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
                        <Liner>Toma</Liner>
                        <div className='row'>
                            <div className='col-12 col-md-6'>
                                <Form.Group className='mb-3' controlId='newGeometry'>
                                    <Form.Label>Punto de toma de agua</Form.Label>
                                    <Controller
                                        name='waterPointFeature'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field }) =>
                                            <AsyncSelect
                                                {...field}
                                                inputId='newGeometry'
                                                classNamePrefix='rc-select'
                                                styles={{
                                                    control: (baseStyles, state) => ({
                                                        ...baseStyles,
                                                        minHeight: '150px',
                                                    }),
                                                }}
                                                isClearable
                                                defaultOptions
                                                cacheOptions
                                                loadOptions={searchPointObject}
                                                menuPlacement={'auto'}
                                                placeholder={`Buscar...`}
                                                loadingMessage={({ inputValue }) => `Buscando '${inputValue}'`}
                                                noOptionsMessage={({ inputValue }) => `Sin resultados con ...${inputValue}`}
                                                getOptionValue={e => e._id}
                                                getOptionLabel={e => <OptionGeometry geo={e} />}
                                            />
                                        }
                                    />
                                </Form.Group>
                            </div>
                        </div>
                        {
                            !!watch('waterPointFeature')
                            &&
                            <MapLocation
                                geometry={
                                    [
                                        watch('waterPointFeature')
                                    ]
                                }
                            />
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}
