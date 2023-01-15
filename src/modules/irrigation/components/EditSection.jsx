import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form, FormCheck, InputGroup, Nav, Offcanvas, Tab } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import { editActiveSection, setActiveSection, startUpdateSection, useGetSectionByIdQuery } from '../../../store/actions'
import { InputMask, LoadingPage } from '../../../components'
import { useNavigateState } from '../../../hooks'
import { pDistance, pProgressive } from '../../../helpers'

export const EditSection = () => {

    const [show, setShow] = useState(true)
    const { register, control, handleSubmit, reset, watch, setFocus } = useForm({
        defaultValues: {
            progressiveStart: '000+000.00',
            progressiveEnd: '000+000.00'
        }
    })

    const { secid } = useParams()
    const [state, redirect, redirectEscape] = useNavigateState('/app/schm/irrig/net')

    const dispatch = useDispatch()
    const { data = null, isLoading, isError } = useGetSectionByIdQuery(secid)
    const { active, isSaving } = useSelector(state => state.section)

    const handleChange = ({ name, status, type, workCapacity, coatedType, coated, progressiveStart, progressiveEnd }) => {
        if (pDistance(progressiveEnd) - pDistance(progressiveStart) > 0) {
            if (
                pDistance(progressiveEnd) - pDistance(progressiveStart)
                <= Number(active.limitStructure.limit + (pDistance(active.progressiveEnd) - pDistance(active.progressiveStart)))
            ) {
                dispatch(editActiveSection({
                    name,
                    status,
                    type,
                    workCapacity,
                    coatedType,
                    coated,
                    progressiveStart,
                    progressiveEnd,
                }))
                dispatch(startUpdateSection())
            } else {
                setFocus('progressiveEnd')
            }
        } else {
            setFocus('progressiveEnd')
        }
    }

    useEffect(() => {
        reset({
            ...active
        })
    }, [reset, active])

    useEffect(() => {
        if (!!data) {
            dispatch(setActiveSection(data))
        }

        return () => {
            dispatch(setActiveSection(null))
        }
    }, [data])

    if (isError) {
        redirectEscape()
    }

    return (
        <Offcanvas
            show={show}
            onHide={() => setShow(false)}
            onExited={() => redirect()}
            enforceFocus={false}
            placement='end'
        >
            <Offcanvas.Header closeButton={!isSaving} closeVariant='white'>
                <Offcanvas.Title>
                    {active ? `Tramo - ${active?.name}` : 'Cargando...'}
                </Offcanvas.Title>
            </Offcanvas.Header>
            {
                !!active
                    ?
                    <>
                        <Offcanvas.Header className='offcanvas-success'>
                            <div className='d-flex justify-content-end gap-2 w-100'>
                                <Button
                                    disabled={isSaving}
                                    variant='success'
                                    type='submit'
                                    form='form-irrig-section-edit'
                                    className='w-100'
                                >
                                    Guardar cambios
                                </Button>
                            </div>
                        </Offcanvas.Header>
                        <Offcanvas.Header className='flex-column'>
                            <div className='container-fluid'>
                                <div className='row mb-1'>
                                    <div className='col-12'>
                                        <div className='input-group'>
                                            <span className='input-group-text col-6'>Estructura</span>
                                            <input value={active?.limitStructure.structureName || ''} readOnly type='text' className='form-control col-6' />
                                        </div>
                                    </div>
                                </div>
                                <div className='row mb-1'>
                                    <div className='col-12'>
                                        <div className='input-group'>
                                            <span className='input-group-text col-6'>Total de tramos</span>
                                            <input value={active?.limitStructure.countSections || 0} readOnly type='text' className='form-control col-6' />
                                        </div>
                                    </div>
                                </div>
                                <div className='row mb-1'>
                                    <div className='col-12'>
                                        <div className='input-group'>
                                            <span className='input-group-text col-6'>Longitud acumulada</span>
                                            <input value={active?.limitStructure.distanceTotal || 0} readOnly type='text' className='form-control col-6' />
                                        </div>
                                    </div>
                                </div>
                                <div className='row mb-1'>
                                    <div className='col-12'>
                                        <div className='input-group'>
                                            <span className='input-group-text col-6'>Longitud restante</span>
                                            <input value={active?.limitStructure.limit || 0} readOnly type='text' className='form-control col-6' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Offcanvas.Header>
                        <Tab.Container
                            defaultActiveKey={0}
                        >
                            <Nav variant='tabs' justify className='px-3 pt-1'>
                                <Nav.Item>
                                    <Nav.Link eventKey={0}>Información básica</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey={1}>Propiedades del canal</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey={2}>Ubicación</Nav.Link>
                                </Nav.Item>
                            </Nav>
                            <Offcanvas.Body>
                                <form id='form-irrig-section-edit' onSubmit={handleSubmit(handleChange)}>
                                    <Tab.Content>
                                        <Tab.Pane eventKey={0}>
                                            <EditSectionStep1 register={register} control={control} watch={watch} />
                                        </Tab.Pane>
                                        <Tab.Pane eventKey={1}>
                                            <EditSectionStep2 register={register} />
                                        </Tab.Pane>
                                    </Tab.Content>
                                </form>
                            </Offcanvas.Body>
                        </Tab.Container>
                    </>
                    :
                    <LoadingPage />
            }
        </Offcanvas>
    )
}

const EditSectionStep1 = ({ register, control, watch }) => {
    return (
        <>
            <div className='row'>
                <div className='col-12'>
                    <Form.Group className='mb-3' controlId='pSectionName'>
                        <Form.Label>Nombre del tramo</Form.Label>
                        <Form.Control
                            {...register('name', { required: true })}
                            type='text'
                            autoComplete='off'
                        />
                    </Form.Group>
                </div>
            </div>
            <div className='row'>
                <div className='col-12 col-md-6'>
                    <Form.Group className='mb-3' controlId='pSectionStatus'>
                        <Form.Label>Estado del tramo</Form.Label>
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
                <div className='col-12 col-md-6'>
                    <Form.Group className='mb-3' controlId='pStructureType'>
                        <Form.Label>Tipo de estructura</Form.Label>
                        <Form.Select
                            {...register('type', { required: true })}
                            autoComplete='off'
                        >
                            <option value={1}>Trapezoidal</option>
                            <option value={2}>Rectangular</option>
                            <option value={3}>Triangular</option>
                            <option value={4}>Circular</option>
                        </Form.Select>
                    </Form.Group>
                </div>
            </div>
            <div className='row'>
                <div className='col-12'>
                    <Form.Group className='mb-3' controlId='pWorkCapacity'>
                        <Form.Label>Capacidad de trabajo</Form.Label>
                        <Form.Select
                            {...register('workCapacity', { required: true })}
                            autoComplete='off'
                        >
                            <option value={0}>No idonea sin estructura</option>
                            <option value={1}>Idonea sin estructura</option>
                            <option value={2}>No idonea con estructura no adecuada al sistema</option>
                            <option value={3}>No idonea con estructura adecuada al sistema</option>
                            <option value={4}>Idonea con estructura no adecuada al sistema</option>
                            <option value={5}>Idonea con estructura adecuada al sistema</option>
                        </Form.Select>
                    </Form.Group>
                </div>
            </div>
            <div className='row'>
                <div className='col-12'>
                    <Form.Group className='mb-3' controlId='pCoatedType'>
                        <Form.Label>Tipo de revestimiento</Form.Label>
                        <Form.Select
                            {...register('coatedType', { required: true })}
                            autoComplete='off'
                        >
                            <option value={1}>Solera</option>
                            <option value={2}>Talud derecho</option>
                            <option value={3}>Talud izquierdo</option>
                            <option value={4}>Talud derecho y solera</option>
                            <option value={5}>Talud izquierdo y solera</option>
                            <option value={6}>Total</option>
                        </Form.Select>
                        <FormCheck id='pCoated' {...register('coated')} label='¿La estructura esta revestida?' />
                    </Form.Group>
                </div>
            </div>
            <div className='row'>
                <div className='col-12'>
                    <Form.Group className='mb-3'>
                        <Form.Label>Progresiva inicial - final</Form.Label>
                        <InputGroup>
                            <Controller
                                control={control}
                                name='progressiveStart'
                                rules={{ required: true }}
                                render={({
                                    field
                                }) => (
                                    <InputMask
                                        mask='999+999.99'
                                        maskPlaceholder='000+000.00'
                                        {...field}
                                    />
                                )}
                            />
                            <Controller
                                control={control}
                                name='progressiveEnd'
                                rules={{ required: true }}
                                render={({
                                    field
                                }) => (
                                    <InputMask
                                        mask='999+999.99'
                                        maskPlaceholder='000+000.00'
                                        {...field}
                                    />
                                )}
                            />
                            <InputGroup.Text>
                                {
                                    pDistance(watch('progressiveEnd')) - pDistance(watch('progressiveStart')) >= 0
                                        ?
                                        `${pDistance(watch('progressiveEnd')) - pDistance(watch('progressiveStart'))} metros`
                                        :
                                        `La progresiva inicial no puede ser mayor que la final`
                                }
                            </InputGroup.Text>
                        </InputGroup>
                    </Form.Group>
                </div>
            </div>
        </>
    )
}

const EditSectionStep2 = ({ register }) => {

    const { active } = useSelector(state => state.section)

    return (
        <>
            {JSON.stringify(active, null, '\t')}
        </>
    )
}