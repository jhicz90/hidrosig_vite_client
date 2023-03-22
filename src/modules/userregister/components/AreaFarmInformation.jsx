import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import { Button, Card, Form } from 'react-bootstrap'
import AsyncSelect from 'react-select/async'
import { Liner, OptionBlock, OptionLocation, OptionOrgz } from '../../../components'
import { farmApi, searchBlockByJunta, searchJunta, searchLocation, useUpdateFarmByIdMutation } from '../../../store/actions'

export const AreaFarmInformation = () => {

    const { prpid } = useParams()
    const { lvlAccess } = useSelector(state => state.auth)
    const { data = null } = useSelector(farmApi.endpoints.getFarmById.select(prpid))
    const [updateFarm, { isLoading: isUpdating }] = useUpdateFarmByIdMutation()
    const { control, register, handleSubmit, watch, setValue, getValues, reset } = useForm()

    const handleUpdate = (updateData) => {
        updateFarm({
            id: prpid,
            farm: updateData
        })
    }

    useEffect(() => {
        reset({
            ...data
        })
    }, [reset, data])

    return (
        <Card>
            <Card.Body>
                <form id='form-userregister-areafarm-edit-info' onSubmit={handleSubmit(handleUpdate)}>
                    <Liner>Detalle</Liner>
                    <div className='row'>
                        <div className='col-12 col-md-6 col-lg-3'>
                            <Form.Group className='mb-3' controlId='pCode'>
                                <Form.Label>Código</Form.Label>
                                <Form.Control
                                    {...register('code', { required: true })}
                                    type='text'
                                    disabled
                                    autoComplete='off'
                                />
                            </Form.Group>
                        </div>
                        <div className='col-12 col-md-6 col-lg-3'>
                            <Form.Group className='mb-3' controlId='pCadUnit'>
                                <Form.Label>Unidad Catastral</Form.Label>
                                <Form.Control
                                    {...register('cadUnit', { required: true })}
                                    type='text'
                                    autoComplete='off'
                                />
                            </Form.Group>
                        </div>
                        <div className='col-12 col-md-6 col-lg-6'>
                            <Form.Group className='mb-3' controlId='pName'>
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
                            <Form.Group className='mb-3' controlId='pDesc'>
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
                        <div className='col-12 col-md-6 col-lg-3'>
                            <Form.Group className='mb-3' controlId='pAreaTotal'>
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
                            <Form.Group className='mb-3' controlId='pAreaLic'>
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
                            <Form.Group className='mb-3' controlId='pAreaPer'>
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
                            <Form.Group className='mb-3' controlId='pAreaUse'>
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
                    <Liner>Bloque de riego y ubicación</Liner>
                    {
                        lvlAccess === 1
                        &&
                        <div className='row'>
                            <div className='col-12 col-md-6'>
                                <Form.Group className='mb-3' controlId='pJunta'>
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
                                                    inputId='pJunta'
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
                            <Form.Group className='mb-3' controlId='pBlock'>
                                <Form.Label>Bloque de riego</Form.Label>
                                <Controller
                                    name='block'
                                    control={control}
                                    rules={{ required: true }}
                                    render={
                                        ({ field }) =>
                                            <AsyncSelect
                                                {...field}
                                                inputId='pBlock'
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
                            <Form.Group className='mb-3' controlId='pLocation'>
                                <Form.Label>Localidad</Form.Label>
                                <Controller
                                    name='location'
                                    control={control}
                                    rules={{ required: true }}
                                    render={
                                        ({ field }) =>
                                            <AsyncSelect
                                                {...field}
                                                inputId='pLocation'
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
                        <div className='col-12 col-md-6'>
                            <Form.Group className='mb-3' controlId='pPlace'>
                                <Form.Label>Lugar de referencia</Form.Label>
                                <Form.Control
                                    {...register('place')}
                                    type='text'
                                    autoComplete='off'
                                />
                            </Form.Group>
                        </div>
                    </div>
                    <div className='d-flex justify-content-end gap-2'>
                        <Button
                            disabled={isUpdating}
                            variant='primary'
                            type='submit'
                        >
                            Guardar cambios
                        </Button>
                    </div>
                </form>
            </Card.Body>
        </Card>
    )
}
