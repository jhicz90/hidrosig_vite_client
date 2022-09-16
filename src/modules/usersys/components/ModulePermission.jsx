import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import { Button, Card } from 'react-bootstrap'
import AsyncSelect from 'react-select/async'
import { searchPermission } from '../../../store/permission'
import { startUpdatePermissionUserSys } from '../../../store/usersys'

export const UserSysModulePermission = () => {

    const dispatch = useDispatch()
    const { active, isSaving } = useSelector(state => state.usersys)
    const { control, handleSubmit, reset } = useForm()

    const handleSave = ({ permission }) => {
        dispatch(startUpdatePermissionUserSys({
            permission: permission.value || null,
        }))
    }

    useEffect(() => {
        reset({
            permission: active.permission
        })
    }, [reset, active])

    return (
        <Card>
            <Card.Body>
                <form onSubmit={handleSubmit(handleSave)}>
                    <div className='row'>
                        <div className='col-12'>
                            <div className='mb-3'>
                                <label htmlFor='uPermission' className='form-label'>Permisos</label>
                                <Controller
                                    name='permission'
                                    control={control}
                                    rules={{ required: true }}
                                    render={
                                        ({ field }) =>
                                            <AsyncSelect
                                                {...field}
                                                inputId='uPermission'
                                                classNamePrefix='rc-select'
                                                isClearable
                                                defaultOptions
                                                loadOptions={searchPermission}
                                                getOptionLabel={e =>
                                                    <div className="d-flex flex-column">
                                                        <div>{e.name}</div>
                                                        <div>Nivel de acceso: {e.levelOrg}</div>
                                                        {e.levelOrg > 1 && <div>Junta: {e.junta.name}</div>}
                                                        {e.levelOrg === 3 && <div>Comision(es): {e.committee.map(c => c.name).join(', ')}</div>}
                                                    </div>
                                                }
                                                getOptionValue={e => e._id}
                                                menuPlacement={'auto'}
                                                placeholder={`Busque el permiso...`}
                                                loadingMessage={({ inputValue }) => `Buscando '${inputValue}'`}
                                                noOptionsMessage={({ inputValue }) => `Sin resultados con '${inputValue}'`}

                                            />
                                    }
                                />
                            </div>
                        </div>
                    </div>
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
