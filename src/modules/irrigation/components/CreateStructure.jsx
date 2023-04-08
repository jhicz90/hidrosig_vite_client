import { useEffect } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import { Button, Form, Modal } from 'react-bootstrap'
import { useAddStructureMutation, useLazyNewStructureQuery } from '../../../store/actions'
import { DatePicker, InputMask, Liner, LoadingPage } from '../../../components'
import { useNavigateState } from '../../../hooks'

export const CreateStructure = () => {

    const [searchParams, setSearchParams] = useSearchParams()
    const { state: params } = useLocation()
    const { w } = Object.fromEntries([...searchParams])
    const [redirect, redirectEscape] = useNavigateState('/app/schm/irrig')

    const [newStructure, { data = null, isLoading, isError, error }] = useLazyNewStructureQuery()
    const [addStructure, { isLoading: isSavingAdd, isSuccess: isSaved }] = useAddStructureMutation()
    const { register, control, handleSubmit, reset } = useForm({
        defaultValues: {
            progressive: '000+000.00'
        }
    })

    const handleSave = async (newData) => {
        try {
            await addStructure(newData)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        reset({
            ...data
        })
    }, [reset, data])

    useEffect(() => {
        if (w === 'structure_create') {
            newStructure(params?.parent)
        }
    }, [w])

    useEffect(() => {
        if (isSaved) {
            redirect()
        }
    }, [isSaved])

    useEffect(() => {
        if (isError) {
            // SE HIZO ESTE POR SER UN CASO ESPECIAL
            if (error.status === 401) {
                redirect()
            } else {
                redirectEscape()
            }
        }
    }, [isError])

    return (
        <Modal
            show={w === 'structure_create'}
            onHide={() => setSearchParams()}
            size='lg'
        >
            <Modal.Header closeButton={!isSavingAdd} closeVariant='white'>
                <Modal.Title>Crear estructura</Modal.Title>
            </Modal.Header>
            {
                (!!data && !isLoading)
                    ?
                    <>
                        <Modal.Body>
                            <form id='form-irrig-structure-create' onSubmit={handleSubmit(handleSave)}>
                                <Liner>Información</Liner>
                                <div className='row'>
                                    <div className='col-12 col-md-6'>
                                        <Form.Group className='mb-3' controlId='newName'>
                                            <Form.Label>Nombre</Form.Label>
                                            <Form.Control
                                                {...register('name', { required: true })}
                                                type='text'
                                                autoComplete='off'
                                            />
                                        </Form.Group>
                                    </div>
                                    <div className='col-12 col-md-6'>
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
                                    <div className='col-12 col-md-4'>
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
                                    <div className='col-12 col-md-4'>
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
                                    <div className='col-12 col-md-4'>
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
                                    <div className='col-12 col-md-4'>
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
                                    <div className='col-12 col-md-4'>
                                        <Form.Group className='mb-3' controlId='newProgressive'>
                                            <Form.Label>Progresiva</Form.Label>
                                            <Controller
                                                control={control}
                                                name='progressive'
                                                rules={{ required: true }}
                                                render={({
                                                    field: { onChange, value }
                                                }) => (
                                                    <InputMask
                                                        id='newProgressive'
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
                                <Liner>Operación</Liner>
                                <div className='row'>
                                    <div className='col-12 col-md-4'>
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
                                    <div className='col-12 col-md-4'>
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
                        </Modal.Body>
                        <Modal.Footer className='flex-column align-items-stretch w-100 gap-2 border-top-0'>
                            <Button
                                disabled={isSavingAdd}
                                variant='primary'
                                type='submit'
                                form='form-irrig-structure-create'
                                size='lg'
                            >
                                Guardar nuevo
                            </Button>
                        </Modal.Footer>
                    </>
                    :
                    <LoadingPage />
            }
        </Modal>
    )
}