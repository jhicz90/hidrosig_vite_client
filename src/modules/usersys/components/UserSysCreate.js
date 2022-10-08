import { Button, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import AsyncSelect from 'react-select/async'
import { useWizard } from 'react-use-wizard'
import { Controller, useForm } from 'react-hook-form'
import { IoChevronBackSharp, IoChevronForwardSharp } from 'react-icons/io5'
import validator from 'validator'
import { closeModalNewUserSys, editActiveNewUserSys, removeActiveNewUserSys, startNewUserSys, startSaveActiveNewUserSys, searchOccup, searchPerms } from '../../../actions'
import { OptionImage, LoadingPage, WizardStep, DatePicker, ButtonIcon } from '../../../components'
import { formatDate } from '../../../helpers'
import { StepsNav } from '../../../styles'

export const UserSysCreate = () => {

    const dispatch = useDispatch()
    const { activeNew, modalNew } = useSelector(state => state.usersys)

    const closeModal = () => {
        dispatch(removeActiveNewUserSys())
        dispatch(closeModalNewUserSys())
    }

    return (
        <>
            <button
                onClick={() => dispatch(startNewUserSys())}
                className='btn btn-primary'
            >
                Crear Usuario
            </button>
            <Modal
                size='lg'
                show={modalNew}
                onHide={closeModal}
                backdrop='static'
            >
                <Modal.Header closeButton closeVariant='white'>
                    <Modal.Title>
                        Nuevo usuario de sistema
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        Object.keys(activeNew).length === 0 ? <LoadingPage /> :
                            <WizardStep>
                                <Step1 />
                                <Step2 />
                                <Step3 />
                            </WizardStep>
                    }
                </Modal.Body>
            </Modal>
        </>
    )
}

const Step1 = () => {

    const { previousStep, nextStep, isLoading, isFirstStep } = useWizard()
    const dispatch = useDispatch()
    const { activeNew } = useSelector(state => state.usersys)
    const { names, surnames, docid, gender, birthday, occupation } = activeNew
    const { register, control, handleSubmit } = useForm({
        defaultValues: {
            names,
            surnames,
            docid,
            gender,
            birthday,
            occupation
        }
    })

    const handleNext = (data) => {
        dispatch(editActiveNewUserSys(data))
        nextStep()
    }

    return (
        <form onSubmit={handleSubmit(handleNext)} className='animate__animated animate__fadeIn'>
            <div className='row'>
                <div className='col-12 col-md-6'>
                    <div className='mb-3'>
                        <label htmlFor='names' className='form-label'>Nombres</label>
                        <input
                            {...register('names', { required: true })}
                            className='form-control'
                            type={'text'}
                            autoFocus
                            autoComplete='off'
                        />
                    </div>
                </div>
                <div className='col-12 col-md-6'>
                    <div className='mb-3'>
                        <label htmlFor='surnames' className='form-label'>Apellidos</label>
                        <input
                            {...register('surnames', { required: true })}
                            className='form-control'
                            type={'text'}
                            autoComplete='off'
                        />
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col-12 col-md-6'>
                    <div className='mb-3'>
                        <label htmlFor='birthday' className='form-label'>Fecha de nacimiento</label>
                        <Controller
                            control={control}
                            name='birthday'
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
                        <div className='form-text'>
                            La fecha de nacimiento es requerida para contrataciones o acuerdos.
                        </div>
                    </div>
                </div>
                <div className='col-12 col-md-6'>
                    <div className='mb-3'>
                        <label htmlFor='gender' className='form-label'>Género</label>
                        <select
                            {...register('gender', { required: true })}
                            className='form-select'
                            autoComplete='off'
                        >
                            <option value={'F'}>Femenino</option>
                            <option value={'M'}>Masculino</option>
                            <option value={'O'}>Otro</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col-12 col-md-6'>
                    <div className='mb-3'>
                        <label htmlFor='docid' className='form-label'>Documento de identidad</label>
                        <input
                            {...register('docid', { required: true, minLength: 8 })}
                            className='form-control'
                            type={'text'}
                            autoComplete='off'
                        />
                        <div className='form-text'>
                            El documento de identidad debe de tener exactamente 8 caracteres.
                        </div>
                    </div>
                </div>
                <div className='col-12 col-md-6'>
                    <div className='mb-3'>
                        <label htmlFor='occup' className='form-label'>Ocupación</label>
                        <Controller
                            name='occupation'
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => <AsyncSelect
                                {...field}
                                cacheOptions
                                defaultOptions
                                isClearable
                                getOptionLabel={e =>
                                    <OptionImage option={e} />
                                }
                                getOptionValue={e => e._id}
                                loadOptions={searchOccup}
                                placeholder='Busque la ocupación'
                                loadingMessage={() => 'Buscando...'}
                                noOptionsMessage={() => 'Sin resultados'}
                                menuPlacement={'auto'}
                            />}
                        />
                    </div>
                </div>

            </div>
            <StepsNav>
                <ButtonIcon
                    onClick={previousStep}
                    disabled={isLoading || isFirstStep}
                    variant='neutral'
                >
                    <IoChevronBackSharp size={20} className='me-1' />
                    Regresar
                </ButtonIcon>
                <ButtonIcon
                    type='submit'
                    variant='primary'
                >
                    Siguiente
                    <IoChevronForwardSharp size={20} className='ms-1' />
                </ButtonIcon>
            </StepsNav>
        </form>
    )
}

const Step2 = () => {

    const { previousStep, nextStep, isLoading, isFirstStep } = useWizard()
    const dispatch = useDispatch()
    const { activeNew } = useSelector(state => state.usersys)
    const { username, email, password, permission } = activeNew
    const { register, control, getValues, formState: { errors }, handleSubmit } = useForm({
        defaultValues: {
            username,
            email,
            password,
            passwordConfirmation: password,
            permission
        }
    })

    const handleNext = (data) => {
        dispatch(editActiveNewUserSys(data))
        nextStep()
    }

    return (
        <form onSubmit={handleSubmit(handleNext)} className='animate__animated animate__fadeIn'>
            <div className='row'>
                <div className='col-12 col-md-6'>
                    <div className='mb-3'>
                        <label htmlFor='username' className='form-label'>Nombre de usuario</label>
                        <input
                            {...register('username', { required: true, minLength: 4 })}
                            className='form-control'
                            type={'text'}
                            autoFocus
                            autoComplete='off'
                        />
                    </div>
                </div>
                <div className='col-12 col-md-6'>
                    <div className='mb-3'>
                        <label htmlFor='email' className='form-label'>Correo electrónico</label>
                        <input
                            {...register('email', {
                                required: true,
                                validate: {
                                    checkEmail: (value) => {
                                        return validator.isEmail(value) || 'Ingrese un correo electrónico válido'
                                    }
                                }
                            })}
                            className='form-control'
                            type={'email'}
                            autoComplete='off'
                        />
                        {errors.email && (
                            <div className='text-danger'>
                                {errors.email.message}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col-12 col-md-6'>
                    <div className='mb-3'>
                        <label htmlFor='password' className='form-label'>Contraseña</label>
                        <input
                            {...register('password', { required: true })}
                            className='form-control'
                            type={'text'}
                            autoComplete='off'
                        />
                    </div>
                </div>
                <div className='col-12 col-md-6'>
                    <div className='mb-3'>
                        <label htmlFor='passwordConfirmation' className='form-label'>Confirmar contraseña</label>
                        <input
                            {...register('passwordConfirmation', {
                                required: 'Por favor, confirme la contraseña!',
                                validate: {
                                    matchesPreviousPassword: (value) => {
                                        const { password } = getValues()
                                        return password === value || 'Las contraseñas deben coincidir!'
                                    }
                                }
                            })}
                            className='form-control'
                            type={'text'}
                            autoComplete='off'
                        />
                        {errors.passwordConfirmation && (
                            <div className='text-danger'>
                                {errors.passwordConfirmation.message}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                    <div className='mb-3'>
                        <label htmlFor='permission' className='form-label'>Permiso</label>
                        <Controller
                            name='permission'
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => <AsyncSelect
                                {...field}
                                cacheOptions
                                defaultOptions
                                isClearable
                                getOptionLabel={e => e.name}
                                getOptionValue={e => e._id}
                                loadOptions={searchPerms}
                                placeholder='Busque la permiso'
                                loadingMessage={() => 'Buscando...'}
                                noOptionsMessage={() => 'Sin resultados'}
                                menuPlacement={'auto'}
                            />}
                        />
                    </div>
                </div>
            </div>
            <StepsNav>
                <ButtonIcon
                    onClick={previousStep}
                    disabled={isLoading || isFirstStep}
                    variant='neutral'
                >
                    <IoChevronBackSharp size={20} className='me-1' />
                    Regresar
                </ButtonIcon>
                <ButtonIcon
                    type='submit'
                    variant='primary'
                >
                    Siguiente
                    <IoChevronForwardSharp size={20} className='ms-1' />
                </ButtonIcon>
            </StepsNav>
        </form>
    )
}

const Step3 = () => {

    const { previousStep, isLoading, isFirstStep } = useWizard()
    const dispatch = useDispatch()
    const { activeNew } = useSelector(state => state.usersys)

    const handleSaved = () => {
        dispatch(startSaveActiveNewUserSys())
    }

    return (
        <>
            <div className='animate__animated animate__fadeIn'>
                <div className='h5 text-uppercase'>Resumen de registro</div>
                <div className='my-3'>
                    <div className='row'>
                        <label htmlFor='resume-data1' className='col-3 col-form-label'>Nombres:</label>
                        <div className='col-9'>
                            <input value={activeNew.names} type='text' readOnly className='form-control-plaintext' id='resume-data1' />
                        </div>
                    </div>
                    <div className='row'>
                        <label htmlFor='resume-data2' className='col-3 col-form-label'>Apellidos:</label>
                        <div className='col-9'>
                            <input value={activeNew.surnames} type='text' readOnly className='form-control-plaintext' id='resume-data2' />
                        </div>
                    </div>
                    <div className='row'>
                        <label htmlFor='resume-data3' className='col-3 col-form-label'>Fecha de nacimiento:</label>
                        <div className='col-9'>
                            <input value={formatDate(activeNew.birthday)} type='text' readOnly className='form-control-plaintext' id='resume-data3' />
                        </div>
                    </div>
                    <div className='row'>
                        <label htmlFor='resume-data4' className='col-3 col-form-label'>Documento de identidad:</label>
                        <div className='col-9'>
                            <input value={activeNew.docid} type='text' readOnly className='form-control-plaintext' id='resume-data4' />
                        </div>
                    </div>
                    <div className='row'>
                        <label htmlFor='resume-data5' className='col-3 col-form-label'>Ocupación:</label>
                        <div className='col-9'>
                            <input value={activeNew.occupation ? activeNew.occupation.name : ''} type='text' readOnly className='form-control-plaintext' id='resume-data5' />
                        </div>
                    </div>
                    <div className='row'>
                        <label htmlFor='resume-data6' className='col-3 col-form-label'>Género:</label>
                        <div className='col-9'>
                            <input value={activeNew.gender} type='text' readOnly className='form-control-plaintext' id='resume-data6' />
                        </div>
                    </div>
                    <div className='row'>
                        <label htmlFor='resume-data7' className='col-3 col-form-label'>Nombre de usuario:</label>
                        <div className='col-9'>
                            <input value={activeNew.username} type='text' readOnly className='form-control-plaintext' id='resume-data7' />
                        </div>
                    </div>
                    <div className='row'>
                        <label htmlFor='resume-data8' className='col-3 col-form-label'>Correo electrónico:</label>
                        <div className='col-9'>
                            <input value={activeNew.email} type='text' readOnly className='form-control-plaintext' id='resume-data8' />
                        </div>
                    </div>
                    <div className='row'>
                        <label htmlFor='resume-data9' className='col-3 col-form-label'>Contraseña:</label>
                        <div className='col-9'>
                            <input value={activeNew.password} type='text' readOnly className='form-control-plaintext' id='resume-data9' />
                        </div>
                    </div>
                    <div className='row'>
                        <label htmlFor='resume-data10' className='col-3 col-form-label'>Estado de la cuenta:</label>
                        <div className='col-9'>
                            <input value={activeNew.active ? 'Activo' : 'Desactivado'} type='text' readOnly className='form-control-plaintext' id='resume-data10' />
                        </div>
                    </div>
                    <div className='row'>
                        <label htmlFor='resume-data11' className='col-3 col-form-label'>Permisos:</label>
                        <div className='col-9'>
                            <input value={activeNew.permission ? activeNew.permission.name : ''} type='text' readOnly className='form-control-plaintext' id='resume-data11' />
                        </div>
                    </div>
                </div>
            </div>
            <StepsNav>
                <ButtonIcon
                    onClick={previousStep}
                    disabled={isLoading || isFirstStep}
                    variant='neutral'
                >
                    <IoChevronBackSharp size={20} className='me-1' />
                    Regresar
                </ButtonIcon>
                <Button
                    onClick={handleSaved}
                    variant='primary'
                >
                    Crear usuario de sistema
                </Button>
            </StepsNav>
        </>
    )
}