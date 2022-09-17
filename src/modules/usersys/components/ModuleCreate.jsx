import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import { Button, Form } from 'react-bootstrap'
import AsyncCreatable from 'react-select/async-creatable'
import { editActiveNewUserSys } from '../../../store/usersys'
import { DatePicker } from '../../../components'
import { registerOccupation, searchOccupation } from '../../../store/occupation'

export const CreateUserStep1 = () => {

    const navigate = useNavigate()
    const { state } = useLocation()
    const dispatch = useDispatch()
    const { activeNew } = useSelector(state => state.usersys)
    const { register, control, setValue, handleSubmit, reset } = useForm()

    const [loadingNewOccupation, setLoadingNewOccupation] = useState(false)

    const handleNext = ({ names, surnames, birthday, docid, occupation, gender }) => {
        dispatch(editActiveNewUserSys({
            names,
            surnames,
            birthday,
            docid,
            occupation,
            gender
        }))
        navigate('./step2', { state })
    }

    useEffect(() => {
        if (!state?.background) {
            navigate(-1)
        }

        reset({
            ...activeNew
        })
    }, [reset, activeNew])

    return (
        <form onSubmit={handleSubmit(handleNext)}>
            <div className='row'>
                <div className='col-12 col-md-6'>
                    <Form.Group className='mb-3' controlId='uNames'>
                        <Form.Label>Nombres</Form.Label>
                        <Form.Control
                            {...register('names', { required: true })}
                            type='text'
                            autoComplete='off'
                        />
                    </Form.Group>
                </div>
                <div className='col-12 col-md-6'>
                    <Form.Group className='mb-3' controlId='uSurnames'>
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
                                        classNamePrefix='rc-select'
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
                                        placeholder={`Ocupación...`}
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
                            type='text'
                            autoComplete='off'
                        />
                    </Form.Group>
                </div>
            </div>
            <div className='d-flex justify-content-end gap-2'>
                <Button
                    variant='primary'
                    type='submit'
                >
                    Siguiente
                </Button>
            </div>
        </form>
    )
}

export const CreateUserStep2 = () => {

    const navigate = useNavigate()
    const { state } = useLocation()
    const dispatch = useDispatch()
    const { activeNew } = useSelector(state => state.usersys)
    const { register, getValues, handleSubmit, reset } = useForm()

    const handleNext = ({ username, email, password, passwordConfirm }) => {
        dispatch(editActiveNewUserSys({
            username,
            email,
            password,
            passwordConfirm
        }))
        navigate('./step3', { state })
    }

    useEffect(() => {
        if (!state?.background) {
            navigate(-1)
        }

        reset({
            ...activeNew
        })
    }, [reset, activeNew])

    return (
        <form onSubmit={handleSubmit(handleNext)}>
            <div className='row'>
                <div className='col-12 col-md-6'>
                    <Form.Group className='mb-3' controlId='uUsername'>
                        <Form.Label>Nombre de usuario</Form.Label>
                        <Form.Control
                            {...register('username', { required: true })}
                            type='text'
                            autoComplete='off'
                        />
                    </Form.Group>
                </div>
                <div className='col-12 col-md-6'>
                    <Form.Group className='mb-3' controlId='uEmail'>
                        <Form.Label>Correo electrónico</Form.Label>
                        <Form.Control
                            {...register('email', { required: true })}
                            type='email'
                            autoComplete='off'
                        />
                    </Form.Group>
                </div>
            </div>
            <div className='row'>
                <div className='col-12 col-md-6'>
                    <Form.Group className='mb-3' controlId='uPassword'>
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control
                            {...register('password', { required: true })}
                            type={'text'}
                            autoComplete='off'
                        />
                    </Form.Group>
                </div>
                <div className='col-12 col-md-6'>
                    <Form.Group className='mb-3' controlId='uPasswordConfirm'>
                        <Form.Label>Confirmar contraseña</Form.Label>
                        <Form.Control
                            {...register('passwordConfirm', {
                                required: true,
                                validate: {
                                    matchesPreviousPassword: (value) => {
                                        const { password } = getValues()
                                        return password === value || 'Las contraseñas no coinciden'
                                    }
                                }
                            })}
                            type={'text'}
                            autoComplete='off'
                        />
                    </Form.Group>
                </div>
            </div>
            <p className='fs-6 mb-2'>Asegúrese de que la contraseña cumplan estos requisitos:</p>
            <ul className='fs-6'>
                <li>Mínimo 8 caracteres de largo - cuanto más, mejor</li>
                <li>Al menos un carácter en minúscula</li>
                <li>Al menos un carácter en mayúscula</li>
                <li>Al menos un número, símbolo o espacio en blanco</li>
            </ul>
            <div className='d-flex justify-content-end gap-2'>
                <Button
                    onClick={() => navigate(-1, { state })}
                    variant='primary'
                >
                    Volver
                </Button>
                <Button
                    variant='primary'
                    type='submit'
                >
                    Siguiente
                </Button>
            </div>
        </form>
    )
}