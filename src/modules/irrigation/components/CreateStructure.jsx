import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import { Button, Form, Offcanvas } from 'react-bootstrap'
import { editActiveNewStructure, setActiveNewStructure, startAddNewStructure, startSaveNewStructure } from '../../../store/actions'
import { DatePicker, InputMask } from '../../../components'

export const CreateStructure = ({ typeButton = 1 }) => {

    const dispatch = useDispatch()
    const { activeNew, isSavingNew } = useSelector(state => state.structure)

    useEffect(() => {
        return () => dispatch(setActiveNewStructure(null))
    }, [dispatch])

    return (
        <>
            <Button
                disabled={isSavingNew}
                variant={typeButton === 1 ? 'neutral' : 'link'}
                className='text-primary text-decoration-none'
                onClick={() => {
                    dispatch(startAddNewStructure())
                }}
            >
                Nueva estructura
            </Button>
            <Offcanvas
                show={!!activeNew}
                onHide={() => dispatch(setActiveNewStructure(null))}
                placement='end'
            >
                <Offcanvas.Header closeButton={!isSavingNew} closeVariant='white'>
                    <Offcanvas.Title>Crear estructura</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Header className='offcanvas-primary'>
                    <div className='d-flex justify-content-end gap-2 w-100'>
                        <Button
                            disabled={isSavingNew}
                            variant='primary'
                            type='submit'
                            form='form-irrig-structure-create'
                            className='w-100'
                        >
                            Guardar nuevo
                        </Button>
                    </div>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <CreateStructureStep />
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

const CreateStructureStep = () => {

    const dispatch = useDispatch()
    const { activeNew } = useSelector(state => state.structure)
    const { register, control, handleSubmit, reset } = useForm()

    const handleSave = ({ order, name, obs, status, dateCons, dateInvt, margin, progressive, longitude, efficiency, flow }) => {
        dispatch(editActiveNewStructure({
            order,
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
        dispatch(startSaveNewStructure())
    }

    useEffect(() => {
        reset({
            ...activeNew
        })
    }, [reset, activeNew])

    return (
        <form id='form-irrig-structure-create' onSubmit={handleSubmit(handleSave)}>
            <div className='row'>
                <div className='col-12'>
                    <Form.Group className='mb-3' controlId='pName'>
                        <Form.Label>Tipo de estructura</Form.Label>
                        <Form.Select
                            {...register('order', { required: true })}
                            autoComplete='off'
                        >
                            <option value={''}>Seleccione el tipo</option>
                            {
                                activeNew?.optionsOrder.map((o) => <option key={o._id} value={o._id}>{o.name}</option>)
                            }
                        </Form.Select>
                    </Form.Group>
                </div>
            </div>
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
                        <Form.Label>Observaci??n</Form.Label>
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
                            <option value={4}>Requiere reparaci??n</option>
                            <option value={5}>Requiere construcci??n</option>
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
        </form>
    )
}