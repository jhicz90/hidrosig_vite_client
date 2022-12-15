import { useEffect } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { startUpdateOptionsUserSys } from '../../../store/actions'

export const UserSysModuleOptions = () => {

    const dispatch = useDispatch()
    const { active, isSaving } = useSelector(state => state.usersys)
    const { register, control, setValue, handleSubmit, reset } = useForm()

    const handleSave = ({ upload, download, activity, organization, onlyOnline }) => {
        console.log(upload)
        // dispatch(startUpdateOptionsUserSys({
        //     upload,
        //     download,
        //     activity,
        //     organization,
        //     onlyOnline
        // }))
    }

    useEffect(() => {
        reset({
            upload: active.options.resource.upload,
            download: active.options.resource.download,
            activity: active.options.notification.activity,
            organization: active.options.notification.organization,
            onlyOnline: active.options.notification.onlyOnline
        })
    }, [reset, active])

    return (
        <Card>
            <Card.Body>
                <form onSubmit={handleSubmit(handleSave)}>
                    <div className='row'>
                        <div className='col-12'>
                            <Form.Group className='mb-3'>
                                <Form.Label className='me-2'>Como guardar los recursos a subir</Form.Label>
                                <Form.Check
                                    inline
                                    type='radio'
                                    value={1}
                                    label='Base de datos'
                                    id='uUpload1'
                                    {...register('upload', { required: true })}
                                />
                                <Form.Check
                                    inline
                                    type='radio'
                                    value={2}
                                    label='Nube (Cloudinary)'
                                    id='uUpload2'
                                    {...register('upload', { required: true })}
                                />
                                <Form.Check
                                    inline
                                    type='radio'
                                    value={3}
                                    label='Preguntar antes de subir el archivo'
                                    id='uUpload3'
                                    {...register('upload', { required: true })}
                                />
                            </Form.Group>
                        </div>
                        {/* <div className='col-12 col-md-6'>
                            <Form.Group className='mb-3' controlId='uSurnames'>
                                <Form.Label>Apellidos</Form.Label>
                                <Form.Control
                                    {...register('surnames', { required: true })}
                                    type={'text'}
                                    autoComplete='off'
                                />
                            </Form.Group>
                        </div> */}
                    </div>
                    {/* <div className='row'>
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
                    </div> */}
                    <div className='d-flex justify-content-end gap-2'>
                        <Button
                            disabled={isSaving}
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
