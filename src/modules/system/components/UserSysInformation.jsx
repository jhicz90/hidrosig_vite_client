import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import { Button, Card, Form } from 'react-bootstrap'
import AsyncSelect from 'react-select/async'
import { DatePicker, Liner } from '../../../components'
import { searchOccupation, usersysApi, useUpdateUserSysByIdMutation } from '../../../store/actions'

export const UserSysInformation = () => {

    const { userid } = useParams()
    const { data = null } = useSelector(usersysApi.endpoints.getUserSysById.select(userid))
    const [updateUserSys, { isLoading: isUpdating }] = useUpdateUserSysByIdMutation()
    const { control, register, handleSubmit, reset } = useForm()

    const handleUpdate = ({ names, surnames, birthday, docid, occupation, gender }) => {
        updateUserSys({
            id: userid,
            usersys: { names, surnames, birthday, docid, occupation, gender }
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
                <form id='form-system-usersys-edit-info' onSubmit={handleSubmit(handleUpdate)}>
                    <Liner>Información personal</Liner>
                    <div className='row'>
                        <div className='col-12 col-md-6'>
                            <Form.Group className='mb-3' controlId='pNames'>
                                <Form.Label>Nombres</Form.Label>
                                <Form.Control
                                    {...register('names', { required: true })}
                                    type='text'
                                    autoComplete='off'
                                />
                            </Form.Group>
                        </div>
                        <div className='col-12 col-md-6'>
                            <Form.Group className='mb-3' controlId='pSurnames'>
                                <Form.Label>Apellidos</Form.Label>
                                <Form.Control
                                    {...register('surnames', { required: true })}
                                    type='text'
                                    autoComplete='off'
                                />
                            </Form.Group>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-12 col-md-4'>
                            <Form.Group className='mb-3' controlId='pBirthday'>
                                <Form.Label>Fecha de nacimiento</Form.Label>
                                <Controller
                                    control={control}
                                    name='birthday'
                                    rules={{ required: true }}
                                    render={({
                                        field: { onChange, value },
                                    }) => (
                                        <DatePicker
                                            id='pBirthday'
                                            value={value}
                                            onChange={onChange}
                                        />
                                    )}
                                />
                            </Form.Group>
                        </div>
                        <div className='col-12 col-md-4'>
                            <Form.Group className='mb-3' controlId='pDocId'>
                                <Form.Label>Documento de identidad</Form.Label>
                                <Form.Control
                                    {...register('docid', { required: true, minLength: 8 })}
                                    type={'text'}
                                    autoComplete='off'
                                />
                            </Form.Group>
                        </div>
                        <div className='col-12 col-md-4'>
                            <Form.Group className='mb-3' controlId='pGender'>
                                <Form.Label>Género</Form.Label>
                                <Form.Select
                                    {...register('gender', { required: true })}
                                    autoComplete='off'
                                >
                                    <option value={'F'}>Femenino</option>
                                    <option value={'M'}>Masculino</option>
                                    <option value={'O'}>Otro</option>
                                </Form.Select>
                            </Form.Group>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-12 col-md-4'>
                            <Form.Group className='mb-3' controlId='pOccupation'>
                                <Form.Label>Ocupación</Form.Label>
                                <Controller
                                    name='occupation'
                                    control={control}
                                    rules={{ required: true }}
                                    render={
                                        ({ field }) =>
                                            // <AsyncCreatable
                                            //     {...field}
                                            //     inputId='pOccupation'
                                            //     classNamePrefix='rc-select'
                                            //     isClearable
                                            //     defaultOptions
                                            //     isDisabled={loadingNewOccupation}
                                            //     isLoading={loadingNewOccupation}
                                            //     loadOptions={searchOccupation}
                                            //     menuPlacement={'auto'}
                                            //     onCreateOption={async e => {
                                            //         setLoadingNewOccupation(true)
                                            //         setValue('occupation', await registerOccupation(e))
                                            //         setLoadingNewOccupation(false)
                                            //     }}
                                            //     placeholder={`Buscar...`}
                                            //     loadingMessage={({ inputValue }) => `Buscando '${inputValue}'`}
                                            //     noOptionsMessage={({ inputValue }) => `Sin resultados con ...${inputValue}`}
                                            //     formatCreateLabel={e => `Crear ocupación: '${e}'`}
                                            //     getOptionValue={e => e._id}
                                            //     getOptionLabel={e => e.name}
                                            // />
                                            <AsyncSelect
                                                {...field}
                                                inputId='pOccupation'
                                                classNamePrefix='rc-select'
                                                isClearable
                                                defaultOptions
                                                loadOptions={searchOccupation}
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
        </Card >
    )
}
