import { useEffect } from 'react'
import { Button, Card, Form, Table } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { MdEmail } from 'react-icons/md'
import { TbWorld } from 'react-icons/tb'
import { useDispatch, useSelector } from 'react-redux'
import { startUpdateOptionsUserSys } from '../../../store/actions'

export const UserSysModuleNotify = () => {

    const dispatch = useDispatch()
    const { active, isSaving } = useSelector(state => state.usersys)
    const { register, handleSubmit, reset } = useForm()

    const handleSave = ({ activity_w, activity_e, organization_w, organization_e, onlyOnline_w, onlyOnline_e }) => {
        dispatch(startUpdateOptionsUserSys({
            activity: [activity_w, activity_e],
            organization: [organization_w, organization_e],
            onlyOnline: [onlyOnline_w, onlyOnline_e]
        }))
    }

    useEffect(() => {
        reset({
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
