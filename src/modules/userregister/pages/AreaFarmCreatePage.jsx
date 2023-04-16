import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import AsyncSelect from 'react-select/async'
import { useNavigateState } from '../../../hooks'
import { Liner, LoadingPage, OptionBlock, OptionLocation, OptionOrgz, OptionUserFarm } from '../../../components'
import { searchBlockByJunta, searchJunta, searchLocation, searchUserFarm, useAddFarmMutation, useDraftFarmMutation, useLazyNewFarmQuery } from '../../../store/actions'
import { Button, Form } from 'react-bootstrap'

export const AreaFarmCreatePage = () => {

    const [redirect, redirectEscape] = useNavigateState('/app/user_reg/user_farm/prps')

    const { lvlAccess } = useSelector(state => state.auth)
    const [newAreaFarm, { data = null, isLoading, isError }] = useLazyNewFarmQuery()
    const [addFarm, { isLoading: isSavingAdd, isSuccess: isSaved }] = useAddFarmMutation()
    const [draftFarm, { isLoading: isSavingDraft, isSuccess: isSavedDraft }] = useDraftFarmMutation()
    const { control, register, handleSubmit, watch, setValue, getValues, reset } = useForm()

    const handleSave = async ({ draft, ...newData }) => {
        try {
            if (!!draft) {
                await draftFarm(newData)
            } else {
                await addFarm(newData)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const handleDiscard = () => {
        redirect()
    }

    useEffect(() => {
        newAreaFarm()
    }, [])

    useEffect(() => {
        reset({
            ...data
        })
    }, [reset, data])

    useEffect(() => {
        if (isError) {
            redirectEscape()
        }
    }, [isError])

    useEffect(() => {
        if (isSaved || isSavedDraft) {
            newAreaFarm()
        }
    }, [isSaved, isSavedDraft])

    if (isLoading) {
        return <LoadingPage />
    }

    return (
        <div className='container-fluid'>
            <div className='row my-3'>
                <div className='col-12'>
                    <div className='row align-items-center justify-content-between g-3'>
                        <div className='col-12 col-md-auto'>
                            <h4 className='mb-0'>NUEVO PREDIO AGRARIO</h4>
                        </div>
                        <div className='col-12 col-md-auto'>
                            <div className='d-flex gap-2'>
                                <Button
                                    onClick={handleDiscard}
                                    disabled={isSavingAdd || isSavingDraft}
                                    variant='secondary'
                                    type='button'
                                >
                                    Descartar
                                </Button>
                                <Button
                                    onClick={() => {
                                        handleSave({ draft: true, ...getValues() })
                                    }}
                                    disabled={isSavingAdd || isSavingDraft}
                                    variant='neutral'
                                    type='button'
                                    className='text-primary'
                                >
                                    Guardar borrador
                                </Button>
                                <Button
                                    disabled={isSavingAdd || isSavingDraft}
                                    variant='primary'
                                    type='submit'
                                    form='form-userregister-areafarm-create'
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
                    <form id='form-userregister-areafarm-create' onSubmit={handleSubmit(handleSave)}>
                        <Liner>Detalle</Liner>
                        <div className='row'>
                            <div className='col-12 col-md-3 col-xl-2'>
                                <Form.Group className='mb-3' controlId='newCode'>
                                    <Form.Label>Código</Form.Label>
                                    <Form.Control
                                        {...register('code', { required: true })}
                                        type='text'
                                        disabled
                                        autoComplete='off'
                                    />
                                </Form.Group>
                            </div>
                            <div className='col-12 col-md-3 col-xl-2'>
                                <Form.Group className='mb-3' controlId='newCadUnit'>
                                    <Form.Label>Unidad Catastral</Form.Label>
                                    <Form.Control
                                        {...register('cadUnit', { required: true })}
                                        type='text'
                                        autoComplete='off'
                                    />
                                </Form.Group>
                            </div>
                            <div className='col-12 col-md-6 col-xl-4'>
                                <Form.Group className='mb-3' controlId='newName'>
                                    <Form.Label>Nombre del predio</Form.Label>
                                    <Form.Control
                                        {...register('name', { required: true })}
                                        type='text'
                                        autoComplete='off'
                                    />
                                </Form.Group>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col'>
                                <Form.Group className='mb-3' controlId='newDesc'>
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
                        <Liner>Área</Liner>
                        <div className='row'>
                            <div className='col-12 col-md-3 col-xl-2'>
                                <Form.Group className='mb-3' controlId='newAreaTotal'>
                                    <Form.Label>Area total</Form.Label>
                                    <Form.Control
                                        {...register('areaTotal', { required: true })}
                                        type='number'
                                        min={0}
                                        autoComplete='off'
                                    />
                                </Form.Group>
                            </div>
                            <div className='col-12 col-md-3 col-xl-2'>
                                <Form.Group className='mb-3' controlId='newAreaLic'>
                                    <Form.Label>Area de licencia</Form.Label>
                                    <Form.Control
                                        {...register('areaLic', {
                                            required: true,
                                            onChange: (e) => setValue('areaUse', Number(getValues('areaPer')) + Number(e.target.value))
                                        })}
                                        type='number'
                                        min={0}
                                        autoComplete='off'
                                    />
                                </Form.Group>
                            </div>
                            <div className='col-12 col-md-3 col-xl-2'>
                                <Form.Group className='mb-3' controlId='newAreaPer'>
                                    <Form.Label>Area de permiso</Form.Label>
                                    <Form.Control
                                        {...register('areaPer', {
                                            required: true,
                                            onChange: (e) => setValue('areaUse', Number(getValues('areaLic')) + Number(e.target.value))
                                        })}
                                        type='number'
                                        min={0}
                                        autoComplete='off'
                                    />
                                </Form.Group>
                            </div>
                            <div className='col-12 col-md-3 col-xl-2'>
                                <Form.Group className='mb-3' controlId='newAreaUse'>
                                    <Form.Label>Area de uso</Form.Label>
                                    <Form.Control
                                        {...register('areaUse', { required: true })}
                                        disabled={true}
                                        type='number'
                                        min={0}
                                        autoComplete='off'
                                    />
                                </Form.Group>
                            </div>
                        </div>
                        <Liner>Bloque y ubicación</Liner>
                        <div className='row'>
                            {
                                lvlAccess === 1
                                &&
                                <div className='col-12 col-md-4 col-xl-3'>
                                    <Form.Group className='mb-3' controlId='newJunta'>
                                        <Form.Label>Junta de usuarios</Form.Label>
                                        <Controller
                                            name='junta'
                                            control={control}
                                            rules={{
                                                required: true,
                                                onChange: () => {
                                                    setValue('block', null)
                                                }
                                            }}
                                            render={
                                                ({ field }) =>
                                                    <AsyncSelect
                                                        {...field}
                                                        inputId='newJunta'
                                                        classNamePrefix='rc-select'
                                                        styles={{
                                                            control: (baseStyles, state) => ({
                                                                ...baseStyles,
                                                                minHeight: '90px',
                                                            }),
                                                        }}
                                                        isClearable
                                                        defaultOptions
                                                        loadOptions={searchJunta}
                                                        menuPlacement={'auto'}
                                                        placeholder={`Buscar...`}
                                                        loadingMessage={({ inputValue }) => `Buscando '${inputValue}'`}
                                                        noOptionsMessage={({ inputValue }) => `Sin resultados con ...${inputValue}`}
                                                        getOptionValue={e => e._id}
                                                        getOptionLabel={e => <OptionOrgz orgz={e} />}
                                                    />
                                            }
                                        />
                                    </Form.Group>
                                </div>
                            }
                            <div className='col-12 col-md-4 col-xl-3'>
                                <Form.Group className='mb-3' controlId='newBlock'>
                                    <Form.Label>Bloque de riego</Form.Label>
                                    <Controller
                                        name='block'
                                        control={control}
                                        rules={{ required: true }}
                                        render={
                                            ({ field }) =>
                                                <AsyncSelect
                                                    {...field}
                                                    inputId='newBlock'
                                                    classNamePrefix='rc-select'
                                                    styles={{
                                                        control: (baseStyles, state) => ({
                                                            ...baseStyles,
                                                            minHeight: '90px',
                                                        }),
                                                    }}
                                                    isClearable
                                                    isDisabled={watch('junta') === null}
                                                    loadOptions={async (e) => {
                                                        return await searchBlockByJunta(watch('junta')?._id || null, e)
                                                    }}
                                                    menuPlacement={'auto'}
                                                    placeholder={`Buscar...`}
                                                    loadingMessage={({ inputValue }) => `Buscando '${inputValue}'`}
                                                    noOptionsMessage={({ inputValue }) => `Sin resultados con ...${inputValue}`}
                                                    getOptionValue={e => e._id}
                                                    getOptionLabel={e => <OptionBlock block={e} />}
                                                />
                                        }
                                    />
                                </Form.Group>
                            </div>
                            <div className='col-12 col-md-4 col-xl-3'>
                                <Form.Group className='mb-3' controlId='newLocation'>
                                    <Form.Label>Localidad</Form.Label>
                                    <Controller
                                        name='location'
                                        control={control}
                                        rules={{ required: true }}
                                        render={
                                            ({ field }) =>
                                                <AsyncSelect
                                                    {...field}
                                                    inputId='newLocation'
                                                    classNamePrefix='rc-select'
                                                    styles={{
                                                        control: (baseStyles, state) => ({
                                                            ...baseStyles,
                                                            minHeight: '90px',
                                                        }),
                                                    }}
                                                    isClearable
                                                    defaultOptions
                                                    loadOptions={searchLocation}
                                                    menuPlacement={'auto'}
                                                    placeholder={`Buscar...`}
                                                    loadingMessage={({ inputValue }) => `Buscando '${inputValue}'`}
                                                    noOptionsMessage={({ inputValue }) => `Sin resultados con ...${inputValue}`}
                                                    getOptionValue={e => e._id}
                                                    getOptionLabel={e => <OptionLocation location={e} />}
                                                />
                                        }
                                    />
                                </Form.Group>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-12 col-md-9 col-xl-6'>
                                <Form.Group className='mb-3' controlId='newPlace'>
                                    <Form.Label>Lugar de referencia</Form.Label>
                                    <Form.Control
                                        {...register('place')}
                                        type='text'
                                        autoComplete='off'
                                    />
                                </Form.Group>
                            </div>
                        </div>
                        <Liner>Posesionarios del predio</Liner>
                        <div className='row'>
                            <div className='col-12'>
                                <Form.Group className='mb-3' controlId='newUserFarms'>
                                    <Form.Label>Usuarios o posesionarios</Form.Label>
                                    <Controller
                                        name='userfarms'
                                        control={control}
                                        rules={{ required: true }}
                                        render={
                                            ({ field }) =>
                                                <AsyncSelect
                                                    {...field}
                                                    inputId='newUserFarms'
                                                    classNamePrefix='rc-select'
                                                    styles={{
                                                        control: (baseStyles, state) => ({
                                                            ...baseStyles,
                                                            minHeight: '90px',
                                                        }),
                                                    }}
                                                    isClearable
                                                    defaultOptions
                                                    isMulti
                                                    loadOptions={searchUserFarm}
                                                    menuPlacement={'auto'}
                                                    placeholder={`Buscar...`}
                                                    loadingMessage={({ inputValue }) => `Buscando '${inputValue}'`}
                                                    noOptionsMessage={({ inputValue }) => `Sin resultados con ...${inputValue}`}
                                                    getOptionValue={e => e._id}
                                                    getOptionLabel={e => <OptionUserFarm userfarm={e} />}
                                                />
                                        }
                                    />
                                </Form.Group>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
