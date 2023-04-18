import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import { Alert, Button, Card, Form } from 'react-bootstrap'
import AsyncSelect from 'react-select/async'
import { Liner } from '../../../components'
import { searchRole, useUpdateUserSysByIdMutation, usersysApi } from '../../../store/actions'

export const UserSysRole = () => {

    const { userid } = useParams()
    const { data = null } = useSelector(usersysApi.endpoints.getUserSysById.select(userid))
    const [updateUserSys, { isLoading: isUpdating }] = useUpdateUserSysByIdMutation()
    const { control, handleSubmit, reset } = useForm()

    const handleUpdate = ({ role }) => {
        updateUserSys({
            id: userid,
            usersys: { role }
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
                <form id='form-system-usersys-edit-role' onSubmit={handleSubmit(handleUpdate)}>
                    <Liner>Roles de usuario</Liner>
                    <div className='row'>
                        {
                            data.role !== null
                                ?
                                <div className='col-12 col-md-6 col-lg-6'>
                                    <Form.Group className='mb-3' controlId='pRole'>
                                        <Form.Label>Rol</Form.Label>
                                        <Controller
                                            name='role'
                                            control={control}
                                            rules={{ required: true }}
                                            render={
                                                ({ field }) =>
                                                    <AsyncSelect
                                                        {...field}
                                                        inputId='pRole'
                                                        classNamePrefix='rc-select'
                                                        styles={{
                                                            control: (baseStyles, state) => ({
                                                                ...baseStyles,
                                                                minHeight: '90px',
                                                            }),
                                                        }}
                                                        isClearable
                                                        defaultOptions
                                                        loadOptions={searchRole}
                                                        getOptionLabel={e =>
                                                            <div className='d-flex flex-column align-items-start' style={{ height: '100%' }}>
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
                                    </Form.Group>
                                </div>
                                :
                                <div className='col'>
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
                                </div>
                        }
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
