import { useEffect } from 'react'
import { Button, Card, Form, Table } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { MdEmail } from 'react-icons/md'
import { TbWorld } from 'react-icons/tb'
import { useDispatch, useSelector } from 'react-redux'
import { ListGroupOption, ListGroupOptionItem } from '../../../components'
import { startUpdateOptionsUserSys } from '../../../store/actions'

export const UserSysModuleOptions = () => {

    const dispatch = useDispatch()
    const { active, isSaving } = useSelector(state => state.usersys)
    const { register, control, setValue, handleSubmit, reset } = useForm()

    const handleSave = ({ upload, download, activity_w, activity_e, organization_w, organization_e, onlyOnline_w, onlyOnline_e }) => {
        dispatch(startUpdateOptionsUserSys({
            upload,
            download,
            activity: [activity_w, activity_e],
            organization: [organization_w, organization_e],
            onlyOnline: [onlyOnline_w, onlyOnline_e]
        }))
    }

    useEffect(() => {
        reset({
            upload: active.options.resource.upload,
            download: active.options.resource.download,
            activity_w: active.options.notification.activity[0],
            activity_e: active.options.notification.activity[1],
            organization_w: active.options.notification.organization[0],
            organization_e: active.options.notification.organization[1],
            onlyOnline_w: active.options.notification.onlyOnline[0],
            onlyOnline_e: active.options.notification.onlyOnline[1]
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
                                <ListGroupOption>
                                    {
                                        [
                                            {
                                                name: 'Base de datos',
                                                desc: 'Esta opción permite guardar todos los archivos directamente en la base de datos del sistema',
                                                value: 1
                                            },
                                            {
                                                name: 'Nube',
                                                desc: 'Esta opción al estar activada, hace que los archivos se almacenen en el los servidores de Cloudinary, que es un gestor de archivos',
                                                value: 2
                                            },
                                            {
                                                name: 'Preguntar',
                                                desc: 'Al seleccionar esta opción, al momento de subir un archivo saldra un mensaje para que pueda elegir entre las 2 opciones anteriores',
                                                value: 3
                                            }
                                        ].map(option =>
                                            <ListGroupOptionItem
                                                {...register('upload', {
                                                    setValueAs: v => String(v),
                                                    required: true,
                                                })}
                                                key={`check-${option.name}`}
                                                labelTitle={option.name}
                                                labelDesc={option.desc}
                                                valueOption={option.value}
                                            />
                                        )
                                    }
                                </ListGroupOption>
                            </Form.Group>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-12'>
                            <Form.Group className='mb-3'>
                                <Form.Label className='me-2'>Descarga de archivos</Form.Label>
                                <ListGroupOption>
                                    {
                                        [
                                            {
                                                name: 'Original',
                                                desc: 'Permite descargar los archivos originales',
                                                value: 1
                                            },
                                            {
                                                name: 'Compresión',
                                                desc: 'Los archivos se descargaran en archivos comprimidos en formato ZIP',
                                                value: 2
                                            }
                                        ].map(option =>
                                            <ListGroupOptionItem
                                                {...register('download', {
                                                    setValueAs: v => String(v),
                                                    required: true,
                                                })}
                                                key={`check-${option.name}`}
                                                labelTitle={option.name}
                                                labelDesc={option.desc}
                                                valueOption={option.value}
                                            />
                                        )
                                    }
                                </ListGroupOption>
                            </Form.Group>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-12'>
                            <Form.Group className='mb-3'>
                                <Form.Label className='me-2'>Notificaciones</Form.Label>
                                <Table bordered striped>
                                    <thead className='table-light'>
                                        <tr>
                                            <th className='text-center' style={{ verticalAlign: 'middle' }}>Tipo</th>
                                            <th className='text-center'>
                                                <div className='mb-1'>
                                                    <TbWorld size={30} />
                                                </div>
                                                Web
                                            </th>
                                            <th className='text-center'>
                                                <div className='mb-1'>
                                                    <MdEmail size={30} />
                                                </div>
                                                Correo
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Actividad</td>
                                            <td className='text-center'>
                                                <Form.Check
                                                    inline
                                                    className='me-0'
                                                    {...register('activity_w', {
                                                        setValueAs: v => Boolean(v)
                                                    })}
                                                />
                                            </td>
                                            <td className='text-center'>
                                                <Form.Check
                                                    inline
                                                    className='me-0'
                                                    {...register('activity_e', {
                                                        setValueAs: v => Boolean(v)
                                                    })}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Organización</td>
                                            <td className='text-center'>
                                                <Form.Check
                                                    inline
                                                    className='me-0'
                                                    {...register('organization_w', {
                                                        setValueAs: v => Boolean(v)
                                                    })}
                                                />
                                            </td>
                                            <td className='text-center'>
                                                <Form.Check
                                                    inline
                                                    className='me-0'
                                                    {...register('organization_e', {
                                                        setValueAs: v => Boolean(v)
                                                    })}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Solo en LINEA</td>
                                            <td className='text-center'>
                                                <Form.Check
                                                    inline
                                                    className='me-0'
                                                    {...register('onlyOnline_w', {
                                                        setValueAs: v => Boolean(v)
                                                    })}
                                                />
                                            </td>
                                            <td className='text-center'>
                                                <Form.Check
                                                    inline
                                                    className='me-0'
                                                    {...register('onlyOnline_e', {
                                                        setValueAs: v => Boolean(v)
                                                    })}
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Form.Group>
                        </div>
                    </div>
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
