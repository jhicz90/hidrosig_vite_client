import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import { Button, Card, Form, Modal } from 'react-bootstrap'
import AsyncSelect from 'react-select/async'
import AsyncCreatable from 'react-select/async-creatable'
import { setActiveNewUserSys, startAddNewUserSys, editActiveNewUserSys, startSaveNewUserSys, registerOccupation, searchOccupation, searchRole } from '../../../store/actions'
import { DatePicker } from '../../../components'

export const CreateUserSys = ({ typeButton = 1 }) => {

    const dispatch = useDispatch()
    const { activeNew, isSavingNew } = useSelector(state => state.usersys)
    const [step, setStep] = useState(1)

    useEffect(() => {
        return () => dispatch(setActiveNewUserSys(null))
    }, [dispatch])

    return (
        <>
            <Button
                disabled={isSavingNew}
                variant={typeButton === 1 ? 'neutral' : 'link'}
                className='text-primary text-decoration-none'
                onClick={() => {
                    setStep(1)
                    dispatch(startAddNewUserSys())
                }}
            >
                Nuevo usuario
            </Button>
            <Modal
                show={!!activeNew}
                onHide={() => dispatch(setActiveNewUserSys(null))}
                backdrop='static'
                size='lg'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Crear usuario de sistema</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card.Body>
                        {
                            step === 1
                            &&
                            <CreateUserStep1 setStep={setStep} />
                        }
                        {
                            step === 2
                            &&
                            <CreateUserStep2 setStep={setStep} />
                        }
                        {
                            step === 3
                            &&
                            <CreateUserStep3 setStep={setStep} />
                        }
                    </Card.Body>
                </Modal.Body>
            </Modal>
        </>
    )
}

export const CreateUserStep1 = ({ setStep }) => {

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
        setStep(2)
    }

    useEffect(() => {
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
                                        loadOptions={searchOccupation}
                                        menuPlacement={'auto'}
                                        onCreateOption={async e => {
                                            setLoadingNewOccupation(true)
                                            setValue('occupation', await registerOccupation(e))
                                            setLoadingNewOccupation(false)
                                        }}
                                        placeholder={`Buscar...`}
                                        loadingMessage={({ inputValue }) => `Buscando '${inputValue}'`}
                                        noOptionsMessage={({ inputValue }) => `Sin resultados con ...${inputValue}`}
                                        formatCreateLabel={e => `Crear ocupación: '${e}'`}
                                        getOptionValue={e => e._id}
                                        getOptionLabel={e => e.name}
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

export const CreateUserStep2 = ({ setStep }) => {

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
        setStep(3)
    }

    useEffect(() => {
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
                    onClick={() => setStep(1)}
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

export const CreateUserStep3 = ({ setStep }) => {

    const dispatch = useDispatch()
    const { activeNew, isSavingNew } = useSelector(state => state.usersys)
    const { control, handleSubmit, reset } = useForm()

    const handleNext = ({ role }) => {
        dispatch(editActiveNewUserSys({
            role
        }))
        dispatch(startSaveNewUserSys())
    }

    useEffect(() => {
        reset({
            ...activeNew
        })
    }, [reset, activeNew])

    return (
        <form onSubmit={handleSubmit(handleNext)}>
            <div className='row'>
                <div className='col-12'>
                    <div className='mb-3'>
                        <label htmlFor='uRole' className='form-label'>Rol de usuario</label>
                        <Controller
                            name='role'
                            control={control}
                            rules={{ required: true }}
                            render={
                                ({ field }) =>
                                    <AsyncSelect
                                        {...field}
                                        inputId='uRole'
                                        classNamePrefix='rc-select'
                                        isClearable
                                        defaultOptions
                                        loadOptions={searchRole}
                                        getOptionLabel={e =>
                                            <div className='d-flex flex-column'>
                                                <div>{e.name}</div>
                                                <div>Nivel de acceso: {e.levelRole}</div>
                                                {e.levelRole > 1 && <div>Junta: {e.junta.name}</div>}
                                                {e.levelRole === 3 && <div>Comision: {e.committee.name}</div>}
                                            </div>
                                        }
                                        getOptionValue={e => e._id}
                                        menuPlacement={'auto'}
                                        placeholder={`Buscar...`}
                                        loadingMessage={({ inputValue }) => `Buscando '${inputValue}'`}
                                        noOptionsMessage={({ inputValue }) => `Sin resultados con ...${inputValue}`}

                                    />
                            }
                        />
                    </div>
                </div>
            </div>
            <div className='d-flex justify-content-end gap-2'>
                <Button
                    onClick={() => setStep(2)}
                    disabled={isSavingNew}
                    variant='primary'
                >
                    Volver
                </Button>
                <Button
                    disabled={isSavingNew}
                    variant='success'
                    type='submit'
                >
                    Guardar
                </Button>
            </div>
        </form>
    )
}