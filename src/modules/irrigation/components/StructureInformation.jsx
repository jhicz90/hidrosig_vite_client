import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import { Button, Card, Form } from 'react-bootstrap'
import { DatePicker, InputMask, Liner } from '../../../components'
import { structureApi, useUpdateStructureByIdMutation } from '../../../store/actions'

export const StructureInformation = () => {

    const { strid } = useParams()
    const { data = null } = useSelector(structureApi.endpoints.getStructureById.select(strid))
    const [updateStructure, { isLoading: isUpdating }] = useUpdateStructureByIdMutation()
    const { register, control, handleSubmit, reset } = useForm({
        defaultValues: {
            progressive: '000+000.00',
        }
    })

    const handleUpdate = (updateData) => {
        updateStructure({
            id: strid,
            structure: updateData
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
                <form id='form-irrig-structure-edit-info' onSubmit={handleSubmit(handleUpdate)}>
                    <Liner>Detalle</Liner>
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
                        <div className='col-12 col-md-4'>
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
                        <div className='col-12 col-md-4'>
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
                        <div className='col-12 col-md-4'>
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
                        <div className='col-12 col-md-4'>
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
                        <div className='col-12 col-md-4'>
                            <Form.Group className='mb-3' controlId='pProgressive'>
                                <Form.Label>Progresiva</Form.Label>
                                <Controller
                                    control={control}
                                    name='progressive'
                                    rules={{ required: true }}
                                    render={({
                                        field: { value, onChange }
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
                        <div className='col-12 col-md-4'>
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
                    <Liner>Operación</Liner>
                    <div className='row'>
                        <div className='col-12 col-md-4'>
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
                        <div className='col-12 col-md-4'>
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
