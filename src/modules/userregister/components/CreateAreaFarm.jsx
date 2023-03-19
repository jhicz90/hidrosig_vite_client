import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import { Button, Form, Modal } from 'react-bootstrap'
import AsyncSelect from 'react-select/async'
import { LoadingPage, OptionBlock, OptionLocation, OptionOrgz, OptionUserFarm } from '../../../components'
import { useNavigateState } from '../../../hooks'
import { searchBlockByJunta, searchJunta, searchLocation, searchUserFarm, useAddFarmMutation, useDraftFarmMutation, useLazyNewFarmQuery } from '../../../store/actions'

export const CreateAreaFarm = () => {

    const [searchParams, setSearchParams] = useSearchParams()
    const { w } = Object.fromEntries([...searchParams])
    const [state, redirect, redirectEscape] = useNavigateState('/app/user_reg/user_farm/prps')

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

    useEffect(() => {
        reset({
            ...data
        })
    }, [reset, data])

    useEffect(() => {
        if (w === 'areafarm_create') {
            newAreaFarm()
        }
    }, [w])

    useEffect(() => {
        if (isSaved || isSavedDraft) {
            redirect()
        }
    }, [isSaved, isSavedDraft])

    useEffect(() => {
        if (isError) {
            redirectEscape()
        }
    }, [isError])

    return (
        <Modal
            show={w === 'areafarm_create'}
            onHide={() => setSearchParams()}
            backdrop='static'
            size='xl'
            fullscreen='md-down'
            scrollable
        >
            <Modal.Header closeButton={!isSavingAdd || !isSavingDraft} closeVariant='white'>
                <Modal.Title>Agregar un predio agrario</Modal.Title>
            </Modal.Header>
            {
                (!!data && !isLoading)
                    ?
                    <>
                        <Modal.Body>
                            <form id='form-userregister-areafarm-create' onSubmit={handleSubmit(handleSave)}>
                                <div className='row'>
                                    <div className='col-12 col-md-6 col-lg-3'>
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
                                    <div className='col-12 col-md-6 col-lg-6'>
                                        <Form.Group className='mb-3' controlId='newName'>
                                            <Form.Label>Nombre del predio</Form.Label>
                                            <Form.Control
                                                {...register('name', { required: true })}
                                                type='text'
                                                autoComplete='off'
                                            />
                                        </Form.Group>
                                    </div>
                                    <div className='col-12 col-md-6 col-lg-3'>
                                        <Form.Group className='mb-3' controlId='newCadUnit'>
                                            <Form.Label>Unidad Catastral</Form.Label>
                                            <Form.Control
                                                {...register('cadUnit', { required: true })}
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
                                <div className='row'>
                                    <div className='col-12 col-md-6 col-lg-3'>
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
                                    <div className='col-12 col-md-6 col-lg-3'>
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
                                    <div className='col-12 col-md-6 col-lg-3'>
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
                                    <div className='col-12 col-md-6 col-lg-3'>
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
                                {
                                    lvlAccess === 1
                                    &&
                                    <div className='row'>
                                        <div className='col-12 col-md-6'>
                                            <Form.Group className='mb-3' controlId='newJunta'>
                                                <Form.Label>Junta de usuarios</Form.Label>
                                                <Controller
                                                    name='junta'
                                                    control={control}
                                                    rules={{
                                                        required: true,
                                                        onChange: () => {
                                                            setValue('block', null)
                                                            setValue('location', null)
                                                        }
                                                    }}
                                                    render={
                                                        ({ field }) =>
                                                            <AsyncSelect
                                                                {...field}
                                                                inputId='newJunta'
                                                                classNamePrefix='rc-select'
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
                                    </div>
                                }
                                <div className='row'>
                                    <div className='col-12 col-md-6'>
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
                                    <div className='col-12 col-md-6'>
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
                                                            isDisabled={watch('junta') === null}
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
                                    <div className='col-12 col-md-6'>
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
                        </Modal.Body>
                        <Modal.Footer>
                            <div className='d-flex justify-content-end gap-2 w-100'>
                                <Button
                                    onClick={() => {
                                        redirect()
                                    }}
                                    disabled={isSavingAdd || isSavingDraft}
                                    variant='neutral'
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
                                    Registrar nuevo
                                </Button>
                            </div>
                        </Modal.Footer>
                    </>
                    :
                    <LoadingPage />
            }
        </Modal>
    )
}
