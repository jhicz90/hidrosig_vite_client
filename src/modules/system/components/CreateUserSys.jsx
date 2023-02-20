import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import { Button, Form, Offcanvas } from 'react-bootstrap'
import AsyncSelect from 'react-select/async'
import AsyncCreatable from 'react-select/async-creatable'
import { useWizard } from 'react-use-wizard'
import { setActiveNewUserSys, startAddNewUserSys, editActiveNewUserSys, startSaveNewUserSys, registerOccupation, searchOccupation, searchRole } from '../../../store/actions'
import { DatePicker, LoadingPage, WizardStep } from '../../../components'
import { useNavigateState } from '../../../hooks'

export const CreateUserSys = () => {

    const [show, setShow] = useState(true)

    const [state, redirect, redirectEscape] = useNavigateState('/app/sys/user_sys')

    const dispatch = useDispatch()
    const { activeNew, isSavingNew } = useSelector(state => state.usersys)

    useEffect(() => {
        dispatch(startAddNewUserSys())
        return () => dispatch(setActiveNewUserSys(null))
    }, [dispatch])

    return (
        <Offcanvas
            show={show && !!activeNew}
            onHide={() => setShow(false)}
            onExited={() => redirect()}
            placement='end'
        >
            <Offcanvas.Header closeButton={!isSavingNew} closeVariant='white'>
                <Offcanvas.Title>Crear usuario de sistema</Offcanvas.Title>
            </Offcanvas.Header>
            {
                !!activeNew
                    ?
                    <Offcanvas.Body>
                        <WizardStep>
                            <CreateUserSysStep1 />
                            <CreateUserSysStep2 />
                            <CreateUserSysStep3 />
                        </WizardStep>
                    </Offcanvas.Body>
                    :
                    <LoadingPage />
            }
        </Offcanvas>
    )
}

export const CreateUserSysStep1 = () => {

    const { nextStep } = useWizard()
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
        nextStep()
    }

    useEffect(() => {
        reset({
            ...activeNew
        })
    }, [reset, activeNew])

    return (
        <>
            <form id='form-system-usersys-create-1' onSubmit={handleSubmit(handleNext)}>
                <div className='row'>
                    <div className='col-12 col-md-6'>
                        <Form.Group className='mb-3' controlId='newNames'>
                            <Form.Label>Nombres</Form.Label>
                            <Form.Control
                                {...register('names', { required: true })}
                                type='text'
                                autoComplete='off'
                            />
                        </Form.Group>
                    </div>
                    <div className='col-12 col-md-6'>
                        <Form.Group className='mb-3' controlId='newSurnames'>
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
                        <Form.Group className='mb-3' controlId='newBirthday'>
                            <Form.Label>Fecha de nacimiento</Form.Label>
                            <Controller
                                control={control}
                                name='birthday'
                                rules={{ required: true }}
                                render={({
                                    field: { onChange, value },
                                }) => (
                                    <DatePicker
                                        id='newBirthday'
                                        value={value}
                                        onChange={onChange}
                                    />
                                )}
                            />
                        </Form.Group>
                    </div>
                    <div className='col-12 col-md-6'>
                        <Form.Group className='mb-3' controlId='newDocId'>
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
                        <Form.Group className='mb-3' controlId='newOccupation'>
                            <Form.Label>Ocupación</Form.Label>
                            <Controller
                                name='occupation'
                                control={control}
                                rules={{ required: true }}
                                render={
                                    ({ field }) =>
                                        <AsyncCreatable
                                            {...field}
                                            inputId='newOccupation'
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
                        </Form.Group>
                    </div>
                    <div className='col-12 col-md-6'>
                        <Form.Group className='mb-3' controlId='newGender'>
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
                <div className='d-flex justify-content-end gap-2 w-100'>
                    <Button
                        variant='outline-primary'
                        type='submit'
                        className='w-100'
                    >
                        Siguiente
                    </Button>
                </div>
            </form>
        </>
    )
}

export const CreateUserSysStep2 = () => {

    const { previousStep, nextStep } = useWizard()
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
        nextStep()
    }

    useEffect(() => {
        reset({
            ...activeNew
        })
    }, [reset, activeNew])

    return (
        <>
            <form id='form-system-usersys-create-2' onSubmit={handleSubmit(handleNext)}>
                <div className='row'>
                    <div className='col-12 col-md-6'>
                        <Form.Group className='mb-3' controlId='newUsername'>
                            <Form.Label>Nombre de usuario</Form.Label>
                            <Form.Control
                                {...register('newsername', { required: true })}
                                type='text'
                                autoComplete='off'
                            />
                        </Form.Group>
                    </div>
                    <div className='col-12 col-md-6'>
                        <Form.Group className='mb-3' controlId='newEmail'>
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
                        <Form.Group className='mb-3' controlId='newPassword'>
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                {...register('password', { required: true })}
                                type={'text'}
                                autoComplete='off'
                            />
                        </Form.Group>
                    </div>
                    <div className='col-12 col-md-6'>
                        <Form.Group className='mb-3' controlId='newPasswordConfirm'>
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
                <div className='d-flex justify-content-end gap-2 w-100'>
                    <Button
                        onClick={() => previousStep()}
                        variant='outline-secondary'
                        type='button'
                        className='w-100'
                    >
                        Regresar
                    </Button>
                    <Button
                        variant='outline-primary'
                        type='submit'
                        className='w-100'
                    >
                        Siguiente
                    </Button>
                </div>
            </form>
        </>
    )
}

export const CreateUserSysStep3 = () => {

    const { previousStep } = useWizard()
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
        <>
            <form id='form-system-usersys-create-3' onSubmit={handleSubmit(handleNext)}>
                <div className='row'>
                    <div className='col-12'>
                        <Form.Group className='mb-3' controlId='newRole'>
                            <Form.Label>Rol de usuario</Form.Label>
                            <Controller
                                name='role'
                                control={control}
                                rules={{ required: true }}
                                render={
                                    ({ field }) =>
                                        <AsyncSelect
                                            {...field}
                                            inputId='newRole'
                                            classNamePrefix='rc-select'
                                            isClearable
                                            defaultOptions
                                            loadOptions={searchRole}
                                            menuPlacement={'auto'}
                                            placeholder={`Buscar...`}
                                            loadingMessage={({ inputValue }) => `Buscando '${inputValue}'`}
                                            noOptionsMessage={({ inputValue }) => `Sin resultados con ...${inputValue}`}
                                            getOptionValue={e => e._id}
                                            getOptionLabel={e =>
                                                <div className='d-flex flex-column'>
                                                    <div>{e.name}</div>
                                                    <div>Nivel de acceso: {e.levelRole}</div>
                                                    {e.levelRole > 1 && <div>Junta: {e.junta.name}</div>}
                                                    {e.levelRole === 3 && <div>Comision: {e.committee.name}</div>}
                                                </div>
                                            }
                                        />
                                }
                            />
                        </Form.Group>
                    </div>
                </div>
                <div className='d-flex justify-content-end gap-2 w-100'>
                    <Button
                        onClick={() => previousStep()}
                        variant='outline-secondary'
                        type='button'
                        className='w-100'
                    >
                        Regresar
                    </Button>
                    <Button
                        disabled={isSavingNew}
                        variant='primary'
                        type='submit'
                        className='w-100'
                    >
                        Guardar
                    </Button>
                </div>
            </form>
        </>
    )
}