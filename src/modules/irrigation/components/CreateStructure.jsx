import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import { Button, Form, Offcanvas } from 'react-bootstrap'
import validator from 'validator'
import { useAddStructureMutation, useNewStructureQuery } from '../../../store/actions'
import { DatePicker, InputMask, LoadingPage } from '../../../components'
import { useNavigateState } from '../../../hooks'

export const CreateStructure = () => {
    const [searchParams] = useSearchParams()
    const { activeNode: { id } } = useSelector(state => state.irrigationnetwork)
    const { w, p = id || ''  } = Object.fromEntries([...searchParams])

    return (
        <>
            {
                (w === 'structure_create' && validator.isMongoId(p))
                &&
                <CreateStructureWindow parentId={p} />
            }
        </>
    )
}

const CreateStructureWindow = ({ parentId }) => {

    const [show, setShow] = useState(true)

    const [state, redirect, redirectEscape] = useNavigateState('/app/schm/irrig')

    const { data = null, isLoading, isError } = useNewStructureQuery(parentId, { refetchOnMountOrArgChange: true })
    const [addStructure, { isLoading: isSaving }] = useAddStructureMutation()
    const { register, control, handleSubmit, reset } = useForm({
        defaultValues: {
            progressive: '000+000.00'
        }
    })

    const handleSave = async (newData) => {
        try {
            await addStructure(newData)
            setShow(false)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        reset({
            ...data
        })
    }, [reset, data])

    if (isError) {
        redirectEscape()
    }

    return (
        <>
            <Offcanvas
                show={show}
                onHide={() => setShow(false)}
                onExited={() => redirect()}
                enforceFocus={false}
                placement='end'
            >
                <Offcanvas.Header closeButton={!isSaving} closeVariant='white'>
                    <Offcanvas.Title>Crear estructura</Offcanvas.Title>
                </Offcanvas.Header>
                {
                    (!!data && !isLoading)
                        ?
                        <>
                            <Offcanvas.Header className='offcanvas-primary'>
                                <div className='d-flex justify-content-end gap-2 w-100'>
                                    <Button
                                        disabled={isSaving}
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
                                <form id='form-irrig-structure-create' onSubmit={handleSubmit(handleSave)}>
                                    <div className='row'>
                                        <div className='col-12'>
                                            <Form.Group className='mb-3' controlId='newOrder'>
                                                <Form.Label>Tipo de estructura</Form.Label>
                                                <Form.Select
                                                    {...register('order', { required: true })}
                                                    autoComplete='off'
                                                >
                                                    <option value={''}>Seleccione el tipo</option>
                                                    {
                                                        data?.optionsOrder.map((o) => <option key={o._id} value={o._id}>{o.name}</option>)
                                                    }
                                                </Form.Select>
                                            </Form.Group>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-12'>
                                            <Form.Group className='mb-3' controlId='newName'>
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
                                            <Form.Group className='mb-3' controlId='newObs'>
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
                                            <Form.Group className='mb-3' controlId='newStatus'>
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
                                            <Form.Group className='mb-3' controlId='newDateCons'>
                                                <Form.Label>Fecha de construccion</Form.Label>
                                                <Controller
                                                    control={control}
                                                    name='dateCons'
                                                    rules={{ required: true }}
                                                    render={({
                                                        field: { onChange, value },
                                                    }) => (
                                                        <DatePicker
                                                            id='newDateCons'
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
                                            <Form.Group className='mb-3' controlId='newDateInvt'>
                                                <Form.Label>Fecha de inventario</Form.Label>
                                                <Controller
                                                    control={control}
                                                    name='dateInvt'
                                                    rules={{ required: true }}
                                                    render={({
                                                        field: { onChange, value },
                                                    }) => (
                                                        <DatePicker
                                                            id='newDateInvt'
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
                                            <Form.Group className='mb-3' controlId='newMargin'>
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
                                            <Form.Group className='mb-3' controlId='newProgressive'>
                                                <Form.Label>Progresiva</Form.Label>
                                                <Controller
                                                    control={control}
                                                    name='progressive'
                                                    rules={{ required: true }}
                                                    render={({
                                                        field,
                                                    }) => (
                                                        <InputMask
                                                            mask='999+999.99'
                                                            maskPlaceholder='000+000.00'
                                                            {...field}
                                                        />
                                                    )}
                                                />
                                            </Form.Group>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-12'>
                                            <Form.Group className='mb-3' controlId='newLongitude'>
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
                                            <Form.Group className='mb-3' controlId='newEfficiency'>
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
                                            <Form.Group className='mb-3' controlId='newFlow'>
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
                            </Offcanvas.Body>
                        </>
                        :
                        <LoadingPage />
                }
            </Offcanvas>
        </>
    )
}