import { useState } from 'react'
import { Button, Card, Form, InputGroup, ListGroup, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import moment from 'moment'
import humanInterval from 'human-interval'
import { filesize } from 'filesize'
import { FaInfoCircle } from 'react-icons/fa'
import { IoListSharp } from 'react-icons/io5'
import { startForceBackupDatabase, startUpdateBackupSchedule } from '../../../store'
import { SettingAction, SettingBlock } from '../../../components'

export const SystemSettings = () => {
    return (
        <Card>
            <ListGroup variant='flush'>
                <SystemStorage />
                <SystemBackupScheduled />
                <SystemForceBackup />
            </ListGroup>
        </Card>
    )
}

export const SystemStorage = () => {

    const { settings } = useSelector(state => state.system)

    return (
        <>
            <ListGroup.Item>
                <SettingBlock title='Almacenamiento'>
                    {filesize(settings.sizeStorageUsed)}
                    /
                    {filesize(settings.sizeStorage)}
                    <OverlayTrigger
                        placement='auto'
                        overlay={
                            <Tooltip>
                                <span className='d-block text-start'>
                                    Carpetas incluidas en el uso del espacio almacenamiento:
                                </span>
                                <div className='d-block text-start'>temp/</div>
                                <div className='d-block text-start'>images/</div>
                                <div className='d-block text-start'>uploads/</div>
                                <div className='d-block text-start'>backups/</div>
                            </Tooltip>
                        }
                    >
                        <div className='d-inline ms-1'>
                            <FaInfoCircle />
                        </div>
                    </OverlayTrigger>
                    <SettingAction>
                        <button
                            className='btn btn-neutral fw-bolder px-3'
                        >
                            Editar
                        </button>
                    </SettingAction>
                </SettingBlock>
            </ListGroup.Item>
        </>
    )
}

export const SystemBackupScheduled = () => {

    const { settings } = useSelector(state => state.system)

    const [showScheduled, setShowScheduled] = useState(false)

    return (
        <>
            <ChangeScheduled
                show={showScheduled}
                onHide={() => setShowScheduled(false)}
            />
            <ListGroup.Item>
                <SettingBlock title='Programación de respaldo'>
                    {`Cada ${moment.duration(humanInterval(settings.backupDatabaseSchedule)).humanize()}`}
                    <SettingAction>
                        <button
                            onClick={() => setShowScheduled(!showScheduled)}
                            className='btn btn-neutral fw-bolder px-3'
                        >
                            Editar
                        </button>
                    </SettingAction>
                </SettingBlock>
            </ListGroup.Item>
        </>
    )
}

export const SystemForceBackup = () => {

    const dispatch = useDispatch()
    const { isGeneratingBackup } = useSelector(state => state.system)

    return (
        <>
            <ListGroup.Item>
                <SettingBlock title='Crear copia de seguridad'>
                    Cree una copia de respaldo de la base de datos (mongodb, mariadb, mysql, etc)
                    <SettingAction>
                        <div className='btn-group'>
                            <button
                                className='btn btn-neutral fw-bolder px-3'
                            >
                                <IoListSharp />
                            </button>
                            <button
                                disabled={isGeneratingBackup}
                                onClick={() => dispatch(startForceBackupDatabase())}
                                className='btn btn-neutral fw-bolder px-3'
                            >
                                {
                                    !isGeneratingBackup
                                        ? 'Generar respaldo'
                                        : <>
                                            <span className='spinner-border spinner-border-sm me-1' />
                                            Generando...
                                        </>
                                }
                            </button>
                        </div>
                    </SettingAction>
                </SettingBlock>
            </ListGroup.Item>
        </>
    )
}

export const ChangeScheduled = ({ show, onHide }) => {

    const dispatch = useDispatch()
    const { register, watch, handleSubmit } = useForm()

    const handleSave = ({ times, interval }) => {
        dispatch(startUpdateBackupSchedule({
            backupDatabaseSchedule: `${times} ${interval}`
        }))
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            backdrop='static'
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Programación de respaldo
                </Modal.Title>
            </Modal.Header>
            <form onSubmit={handleSubmit(handleSave)}>
                <Modal.Body>
                    <div className='row'>
                        <div className='col'>
                            <InputGroup>
                                <Form.Control
                                    {...register('times', { required: true })}
                                    type='number'
                                    autoComplete='off'
                                />
                                <Form.Select
                                    {...register('interval', { required: true })}
                                    autoComplete='off'
                                >
                                    <option value={''}>Elija el intervalo</option>
                                    <option value={watch().times > 1 ? 'hours' : 'hour'}>Horas</option>
                                    <option value={watch().times > 1 ? 'days' : 'day'}>Días</option>
                                    <option value={watch().times > 1 ? 'weeks' : 'week'}>Semanas</option>
                                    <option value={watch().times > 1 ? 'months' : 'month'}>Mes</option>
                                </Form.Select>
                            </InputGroup>
                            <Form.Text muted>
                                Este intervalo se repetira según el intervalo que especifique.
                            </Form.Text>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        onClick={onHide}
                        className='btn btn-neutral me-1'
                    >
                        Cerrar
                    </button>
                    <Button
                        type='submit'
                        variant='primary'
                        className='ms-1'
                    >
                        Cambiar
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}