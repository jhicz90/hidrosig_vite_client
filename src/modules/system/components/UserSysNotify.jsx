import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Button, Card, Form, Table } from 'react-bootstrap'
import { MdEmail } from 'react-icons/md'
import { TbWorld } from 'react-icons/tb'
import { useUpdateUserSysByIdMutation, usersysApi } from '../../../store/actions'

export const UserSysNotify = () => {

    const { userid } = useParams()
    const { data = null } = useSelector(usersysApi.endpoints.getUserSysById.select(userid))
    const [updateUserSys, { isLoading: isUpdating }] = useUpdateUserSysByIdMutation()
    const { register, handleSubmit, reset } = useForm()

    const handleUpdate = ({ activity_w, activity_e, organization_w, organization_e, onlyOnline_w, onlyOnline_e }) => {
        updateUserSys({
            id: userid,
            usersys: {
                options: {
                    notification: {
                        activity: [activity_w, activity_e],
                        organization: [organization_w, organization_e],
                        onlyOnline: [onlyOnline_w, onlyOnline_e]
                    }
                }
            }
        })
    }

    useEffect(() => {
        reset({
            activity_w: data.options.notification.activity[0],
            activity_e: data.options.notification.activity[1],
            organization_w: data.options.notification.organization[0],
            organization_e: data.options.notification.organization[1],
            onlyOnline_w: data.options.notification.onlyOnline[0],
            onlyOnline_e: data.options.notification.onlyOnline[1]
        })
    }, [reset, data])

    return (
        <Card>
            <Card.Body>
                <form onSubmit={handleSubmit(handleUpdate)}>
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
                            disabled={isUpdating}
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
