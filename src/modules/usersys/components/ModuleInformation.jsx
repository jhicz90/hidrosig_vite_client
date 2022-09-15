import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, Form } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import AsyncCreatable from 'react-select/async-creatable'
import { DatePicker } from '../../../components'
import { registerOccupation, searchOccupation } from '../../../store/occupation'
import { startUpdateInformationUserSys } from '../../../store/usersys'

export const UserSysModuleInformation = () => {

    const dispatch = useDispatch()
    const { active, isSaving } = useSelector(state => state.usersys)
    const { register, control, setValue, getValues, handleSubmit, reset } = useForm()

    const [loadingNewOccupation, setLoadingNewOccupation] = useState(false)

    const handleSave = ({ names, surnames, birthday, docid, occupation, gender }) => {
        dispatch(startUpdateInformationUserSys({
            names,
            surnames,
            birthday,
            docid,
            occupation: occupation.value || null,
            gender
        }))
    }

    useEffect(() => {
        reset({
            ...active,
            occupation: active.occupation ? { value: active.occupation._id, label: active.occupation.name } : null
        })
    }, [reset, active])

    return (
        <Card>
            <Card.Body>
                <form onSubmit={handleSubmit(handleSave)}>
                    <div className='row'>
                        <div className='col-12 col-md-6'>
                            <Form.Group className='mb-3' controlId='uNames'>
                                <Form.Label>Nombres</Form.Label>
                                <Form.Control
                                    {...register('names', { required: true })}
                                    type={'text'}
                                    autoComplete='off'
                                />
                            </Form.Group>
                        </div>
                        <div className='col-12 col-md-6'>
                            <Form.Group className='mb-3' controlId='uSurnames'>
                                <Form.Label>Apellidos</Form.Label>
                                <Form.Control
                                    {...register('surnames', { required: true })}
                                    type={'text'}
                                    autoComplete='off'
                                />
                            </Form.Group>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-12 col-md-6'>
                            <div className='mb-3'>
                                <label htmlFor='uBirthday' className='form-label'>Fecha de nacimiento</label>
                                <Controller
                                    control={control}
                                    name='birthday'
                                    rules={{ required: true }}
                                    render={({
                                        field: { onChange, value },
                                    }) => (
                                        <DatePicker
                                            id='uBirthday'
                                            value={value}
                                            onChange={onChange}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                        <div className='col-12 col-md-6'>
                            <Form.Group className='mb-3' controlId='uDocId'>
                                <Form.Label>Documento de identidad</Form.Label>
                                <Form.Control
                                    {...register('docid', { required: true, minLength: 8 })}
                                    type={'text'}
                                    autoComplete='off'
                                />
                            </Form.Group>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-12 col-md-6'>
                            <div className='mb-3'>
                                <label htmlFor='uOccupation' className='form-label'>Ocupación</label>
                                <Controller
                                    name='occupation'
                                    control={control}
                                    rules={{ required: true }}
                                    render={
                                        ({ field }) =>
                                            <AsyncCreatable
                                                {...field}
                                                inputId='uOccupation'
                                                classNamePrefix={'rc-select'}
                                                isClearable
                                                defaultOptions
                                                isDisabled={loadingNewOccupation}
                                                isLoading={loadingNewOccupation}
                                                loadOptions={async e => {
                                                    const fetchData = await searchOccupation(e)
                                                    return fetchData.map(d => ({ value: d._id, label: d.name }))
                                                }}
                                                menuPlacement={'auto'}
                                                onCreateOption={async e => {
                                                    setLoadingNewOccupation(true)
                                                    const { _id, name } = await registerOccupation(e)
                                                    setValue('occupation', { value: _id, label: name })
                                                    setLoadingNewOccupation(false)
                                                }}
                                                placeholder={`Busque la ocupación...`}
                                                loadingMessage={({ inputValue }) => `Buscando '${inputValue}'`}
                                                noOptionsMessage={({ inputValue }) => `Sin resultados con '${inputValue}'`}
                                                formatCreateLabel={e => `Crear ocupación: '${e}'`}
                                            />
                                    }
                                />
                            </div>
                        </div>
                        <div className='col-12 col-md-6'>
                            <Form.Group className='mb-3' controlId='uGender'>
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
                    <div className='row justify-content-end'>
                        <div className='col-auto'>
                            <Button
                                disabled={isSaving}
                                variant={'primary'}
                                type='submit'
                            >
                                Guardar cambios
                            </Button>
                        </div>
                    </div>
                </form>
            </Card.Body>
        </Card>
    )
}
