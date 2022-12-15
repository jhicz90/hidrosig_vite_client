import { useState, useEffect } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, Form, ListGroup, Offcanvas } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import { editActiveStructure, setActiveStructure, startUpdateStructure, useGetStructureByIdQuery } from '../../../store/actions'
import { DatePicker, InputMask, LoadingPage } from '../../../components'

export const EditStructure = () => {

    const [show, setShow] = useState(true)
    const { strid } = useParams()
    const redirect = useNavigate()
    const dispatch = useDispatch()
    const { data = null, isLoading, isError } = useGetStructureByIdQuery(strid)
    const { active, isSaving } = useSelector(state => state.structure)

    useEffect(() => {
        if (!!data) {
            dispatch(setActiveStructure(data))
        }

        return () => {
            dispatch(setActiveStructure(null))
        }
    }, [data])

    if (isError) {
        return <Navigate to={`/app/schm/irrig#net`} replace />
    }

    return (
        <Offcanvas
            show={show}
            onHide={() => setShow(false)}
            onExited={() => redirect(`/app/schm/irrig#net`)}
            placement='end'
            backdrop='static'
        >
            <Offcanvas.Header className='text-bg-primary' closeButton={!isSaving} closeVariant='white'>
                <Offcanvas.Title>
                    <div className='d-flex flex-column'>
                        <span>Estructura</span>
                        <span>{active ? active?.name : 'Cargando...'}</span>
                    </div>
                </Offcanvas.Title>
            </Offcanvas.Header>
            {
                !!active
                    ?
                    <>
                        <Offcanvas.Header>
                            <div className='d-flex justify-content-end gap-2 w-100'>
                                <Button
                                    disabled={isSaving}
                                    variant='success'
                                    type='submit'
                                    form='form-irrig-structure-edit'
                                    className='w-100'
                                >
                                    Guardar cambios
                                </Button>
                            </div>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Card.Body>
                                <EditStructureStep />
                            </Card.Body>
                        </Offcanvas.Body>
                    </>
                    :
                    <LoadingPage />
            }
        </Offcanvas>
    )
}

const EditStructureStep = () => {

    const dispatch = useDispatch()
    const { active } = useSelector(state => state.structure)
    const { register, control, handleSubmit, reset } = useForm()

    const handleSave = ({ name, obs, status, dateCons, dateInvt, margin, progressive, longitude, efficiency, flow }) => {
        dispatch(editActiveStructure({
            name,
            obs,
            status,
            dateCons,
            dateInvt,
            margin,
            progressive,
            longitude,
            efficiency,
            flow
        }))
        dispatch(startUpdateStructure())
    }

    useEffect(() => {
        reset({
            ...active
        })
    }, [reset, active])

    return (
        <form id='form-irrig-structure-edit' onSubmit={handleSubmit(handleSave)}>
            <div className='row'>
                <div className='col-12'>
                    <Form.Group className='mb-3' controlId='pName'>
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            {...register('name', { required: true })}
                            type='text'
                            autoComplete='off'
                        />
                    </Form.Group>
                </div>
            </div>
            <div className='row'>
                <div className='col-12'>
                    <Form.Group className='mb-3' controlId='pObs'>
                        <Form.Label>Observación</Form.Label>
                        <Form.Control
                            {...register('obs')}
                            as='textarea'
                            type='text'
                            rows={4}
                            autoComplete='off'
                        />
                    </Form.Group>
                </div>
            </div>
            <div className='row'>
                <div className='col-12'>
                    <Form.Group className='mb-3' controlId='pStatus'>
                        <Form.Label>Estado de la estructura</Form.Label>
                        <Form.Select
                            {...register('status', { required: true })}
                            autoComplete='off'
                        >
                            <option value={1}>Bueno</option>
                            <option value={2}>Malo</option>
                            <option value={3}>Regular</option>
                            <option value={4}>Requiere reparación</option>
                            <option value={5}>Requiere construcción</option>
                        </Form.Select>
                    </Form.Group>
                </div>
            </div>
            <div className='row'>
                <div className='col-12'>
                    <Form.Group className='mb-3' controlId='pDateCons'>
                        <Form.Label>Fecha de construccion</Form.Label>
                        <Controller
                            control={control}
                            name='dateCons'
                            rules={{ required: true }}
                            render={({
                                field: { onChange, value },
                            }) => (
                                <DatePicker
                                    id='pDateCons'
                                    value={value}
                                    onChange={onChange}
                                />
                            )}
                        />
                    </Form.Group>
                </div>
            </div>
            <div className='row'>
                <div className='col-12'>
                    <Form.Group className='mb-3' controlId='pDateInvt'>
                        <Form.Label>Fecha de inventario</Form.Label>
                        <Controller
                            control={control}
                            name='dateInvt'
                            rules={{ required: true }}
                            render={({
                                field: { onChange, value },
                            }) => (
                                <DatePicker
                                    id='pDateInvt'
                                    value={value}
                                    onChange={onChange}
                                />
                            )}
                        />
                    </Form.Group>
                </div>
            </div>
            <div className='row'>
                <div className='col-12'>
                    <Form.Group className='mb-3' controlId='pMargin'>
                        <Form.Label>Margen</Form.Label>
                        <Form.Select
                            {...register('margin', { required: true })}
                            autoComplete='off'
                        >
                            <option value={'D'}>Derecha</option>
                            <option value={'I'}>Izquierda</option>
                        </Form.Select>
                    </Form.Group>
                </div>
            </div>
            <div className='row'>
                <div className='col-12'>
                    <Form.Group className='mb-3' controlId='pProgressive'>
                        <Form.Label>Progresiva</Form.Label>
                        <Controller
                            control={control}
                            name='progressive'
                            rules={{ required: true }}
                            render={({
                                field: { onChange, value },
                            }) => (
                                <InputMask
                                    id='pProgressive'
                                    mask='999+999.99'
                                    maskPlaceholder='000+000.00'
                                    value={value}
                                    onChange={onChange}
                                />
                            )}
                        />
                    </Form.Group>
                </div>
            </div>
            <div className='row'>
                <div className='col-12'>
                    <Form.Group className='mb-3' controlId='pLongitude'>
                        <Form.Label>Longitud (metros)</Form.Label>
                        <Form.Control
                            {...register('longitude', {
                                required: true,
                                setValueAs: v => Number(v).toFixed(2)
                            })}
                            type='number'
                            min={0.01}
                            step={0.01}
                            autoComplete='off'
                        />
                    </Form.Group>
                </div>
            </div>
            <div className='row'>
                <div className='col-12'>
                    <Form.Group className='mb-3' controlId='pEfficiency'>
                        <Form.Label>Eficiencia (%)</Form.Label>
                        <Form.Control
                            {...register('efficiency', { required: true })}
                            type='number'
                            min={0.01}
                            step={0.01}
                            autoComplete='off'
                        />
                    </Form.Group>
                </div>
            </div>
            <div className='row'>
                <div className='col-12'>
                    <Form.Group className='mb-3' controlId='pFlow'>
                        <Form.Label>Caudal (m3/seg)</Form.Label>
                        <Form.Control
                            {...register('flow', { required: true })}
                            type='number'
                            min={0.01}
                            step={0.01}
                            autoComplete='off'
                        />
                    </Form.Group>
                </div>
            </div>
            <div className='row mb-3'>
                <div className='col-12'>
                    <Form.Label>Tramos</Form.Label>
                    <ListGroup>
                        {
                            active.sections.map(sect =>
                                <ListGroup.Item key={sect._id}>{sect.name}</ListGroup.Item>
                            )
                        }
                    </ListGroup>
                </div>
            </div>
        </form>
    )
}