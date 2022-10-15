import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import { Alert, Button, Card } from 'react-bootstrap'
import AsyncSelect from 'react-select/async'
import { startUpdateRoleUserSys, searchRole } from '../../../store/actions'

export const UserSysModuleRole = () => {

    const dispatch = useDispatch()
    const { active, isSaving } = useSelector(state => state.usersys)
    const { control, handleSubmit, reset } = useForm()

    const handleSave = ({ role }) => {
        dispatch(startUpdateRoleUserSys({
            role: role !== null ? role._id : null
        }))
    }

    useEffect(() => {
        reset({
            role: active.role
        })
    }, [reset, active])

    return (
        <Card>
            <Card.Body>
                <form onSubmit={handleSubmit(handleSave)}>
                    <div className='row'>
                        <div className='col-12'>
                            {
                                !!active.role
                                    ?
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
                                                        noOptionsMessage={({ inputValue }) => `Sin resultados con '${inputValue}'`}

                                                    />
                                            }
                                        />
                                    </div>
                                    :
                                    <Alert variant='warning'>
                                        <Alert.Heading>Aviso</Alert.Heading>
                                        <p>
                                            Por seguridad, el rol de usuario no puede ser cambiado. La razón en clave es que el propio usuario o algún usuario debajo del nivel necesario de seguridad, no puede modificar o cambiar sus propios permisos.
                                        </p>
                                        <hr />
                                        <p className='mb-0'>
                                            Si necesitas algún cambio solicita los permisos necesarios al administrador.
                                        </p>
                                    </Alert>
                            }
                        </div>
                    </div>
                    <p>Proximamente los CUSTOM PERMISSIONS iran en este apartado</p>
                    <div className='d-flex justify-content-end gap-2'>
                        <Button
                            disabled={isSaving}
                            variant={'primary'}
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
