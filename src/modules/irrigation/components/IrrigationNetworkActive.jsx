import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, ButtonGroup, Card, Form, ListGroup, Offcanvas } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import { FaTimes } from 'react-icons/fa'
import { DatePicker, InputMask } from '../../../components'
import { clearActiveNodeIrrigationNetwork, setActiveNodeDataIrrigationNetwork, startGetActiveIrrigationNetwork, startUpdateDataStructureInIrrigNet, startUpdateDataWaterSourceInIrrigNet } from '../../../store/actions'

export const IrrigationNetworkActive = ({ typeButton = 1 }) => {

    const dispatch = useDispatch()
    const { activeNode: { id, name, depth, data, loading } } = useSelector(state => state.irrigationnetwork)
    const { register, control, handleSubmit, reset } = useForm()

    const handleSave = (e) => {
        if (depth === 0) {
            dispatch(startUpdateDataWaterSourceInIrrigNet(e))
        } else {
            dispatch(startUpdateDataStructureInIrrigNet(e))
        }
    }

    useEffect(() => {
        reset({
            ...data
        })
    }, [reset, data])

    return (
        <>
            {
                !!id
                &&
                <ButtonGroup>
                    <Button
                        disabled={loading}
                        variant={typeButton === 1 ? 'neutral' : 'link'}
                        className='text-primary text-decoration-none'
                        onClick={() => {
                            dispatch(startGetActiveIrrigationNetwork(id, depth))
                        }}
                    >
                        {name}
                    </Button>
                    <Button
                        variant='neutral'
                        className='d-flex align-items-center'
                        onClick={() => {
                            dispatch(clearActiveNodeIrrigationNetwork())
                        }}
                    >
                        <FaTimes size={20} />
                    </Button>
                </ButtonGroup>
            }
            <Offcanvas
                show={!!data}
                onHide={() => dispatch(setActiveNodeDataIrrigationNetwork(null))}
                placement='end'
                backdrop='static'
            >
                <Offcanvas.Header className='text-bg-primary' closeButton closeVariant='white'>
                    <Offcanvas.Title>Editar {depth === 0 ? 'fuente de agua' : 'estructura'}</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Header>
                    <div className='d-flex justify-content-end gap-2 w-100'>
                        <Button
                            disabled={loading}
                            variant='success'
                            type='submit'
                            form='form-irrig-net-active'
                            className='w-100'
                        >
                            Guardar
                        </Button>
                    </div>
                </Offcanvas.Header>
                <Offcanvas.Body>
                        <form id='form-irrig-net-active' onSubmit={handleSubmit(handleSave)}>
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
                            {
                                depth === 0
                                    ?
                                    <div className='row'>
                                        <div className='col-12'>
                                            <Form.Group className='mb-3' controlId='pDesc'>
                                                <Form.Label>Descripción</Form.Label>
                                                <Form.Control
                                                    {...register('desc')}
                                                    as='textarea'
                                                    type='text'
                                                    rows={4}
                                                    autoComplete='off'
                                                />
                                            </Form.Group>
                                        </div>
                                    </div>
                                    :
                                    <>
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
                                                        data?.sections.map(sect =>
                                                            <ListGroup.Item key={sect._id}>{sect.name}</ListGroup.Item>
                                                        )
                                                    }
                                                </ListGroup>
                                            </div>
                                        </div>
                                    </>
                            }
                        </form>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}
