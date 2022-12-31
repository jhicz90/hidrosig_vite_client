import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import AsyncSelect from 'react-select/async'
import { Button, Form, FormCheck, InputGroup, Modal, Nav, Tab } from 'react-bootstrap'
import { IoMdAddCircleOutline } from 'react-icons/io'
import { editActiveNewSection, searchRugosity, setActiveNewSection, startAddNewSection, startSaveNewSection, useGetCalcPropertiesQuery } from '../../../store/actions'
import { DatePicker, InputMask } from '../../../components'
import { pDistance } from '../../../helpers'

export const CreateSection = ({ className = '', children }) => {

    const dispatch = useDispatch()
    const { activeNew, isSavingNew } = useSelector(state => state.section)
    const [step, setStep] = useState(0)

    useEffect(() => {
        return () => dispatch(setActiveNewSection(null))
    }, [dispatch])

    return (
        <>
            <button
                disabled={isSavingNew}
                className={className}
                onClick={() => {
                    setStep(0)
                    dispatch(startAddNewSection())
                }}
            >
                {children || <>Agregar tramo <IoMdAddCircleOutline className='ms-2' size={20} color='green' /></>} 
            </button>
            <Modal
                show={!!activeNew}
                onHide={() => dispatch(setActiveNewSection(null))}
                backdrop='static'
                size='xl'
            >
                <Modal.Header closeButton={!isSavingNew}>
                    <Modal.Title>Crear tramo</Modal.Title>
                </Modal.Header>
                <Tab.Container
                    activeKey={step}
                    mountOnEnter
                    unmountOnExit
                >
                    <Nav variant='tabs' justify className='px-3 mt-1'>
                        <Nav.Item>
                            <Nav.Link eventKey={0}>Información básica</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey={1}>Propiedades del canal</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Tab.Content>
                        <Tab.Pane eventKey={0}>
                            <Modal.Body>
                                <EditSectionStep1 next={() => setStep(Number(step) + 1)} />
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant='neutral' type='submit' form='form-irrig-section-create-1'>Siguiente</Button>
                            </Modal.Footer>
                        </Tab.Pane>
                        <Tab.Pane eventKey={1}>
                            <Modal.Body>
                                <EditSectionStep2 next={() => dispatch(startSaveNewSection())} />
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant='neutral' type='button' onClick={() => setStep(Number(step) - 1)}>Atrás</Button>
                                <Button disabled={isSavingNew} variant='neutral' type='submit' form='form-irrig-section-create-2'>Guardar</Button>
                            </Modal.Footer>
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </Modal>
        </>
    )
}

const EditSectionStep1 = ({ next }) => {

    const dispatch = useDispatch()
    const { activeNew } = useSelector(state => state.section)
    const { register, control, handleSubmit, reset, watch } = useForm({
        defaultValues: {
            progressiveStart: '000+000.00',
            progressiveEnd: '000+000.00'
        }
    })

    const handleSave = ({ name, status, type, workCapacity, coatedType, coated, progressiveStart, progressiveEnd }) => {
        dispatch(editActiveNewSection({
            name,
            status,
            type,
            workCapacity,
            coatedType,
            coated,
            progressiveStart,
            progressiveEnd,
        }))
        next()
    }

    useEffect(() => {
        reset({
            ...activeNew
        })
    }, [reset, activeNew])

    return (
        <>
            <form id='form-irrig-section-create-1' onSubmit={handleSubmit(handleSave)}>
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
                    <div className='col-12 col-md-6'>
                        <Form.Group className='mb-3' controlId='pStatus'>
                            <Form.Label>Estado</Form.Label>
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
                        <Form.Group className='mb-3' controlId='pType'>
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
                                        field: { onChange, value },
                                    }) => (
                                        <InputMask
                                            id='pProgressiveStart'
                                            mask='999+999.99'
                                            maskPlaceholder='000+000.00'
                                            value={value}
                                            onChange={onChange}
                                        />
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name='progressiveEnd'
                                    rules={{ required: true }}
                                    render={({
                                        field: { onChange, value },
                                    }) => (
                                        <InputMask
                                            id='pProgressiveEnd'
                                            mask='999+999.99'
                                            maskPlaceholder='000+000.00'
                                            value={value}
                                            onChange={onChange}
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
            </form>
        </>
    )
}

const EditSectionStep2 = ({ next }) => {

    const dispatch = useDispatch()
    const { activeNew } = useSelector(state => state.section)
    const { register, control, handleSubmit, reset, watch } = useForm()
    const { data } = useGetCalcPropertiesQuery({
        type: activeNew?.type || 1,
        mayorBasis: watch('mayorBasis'),
        minorBasis: watch('minorBasis'),
        height: watch('height'),
        tight: watch('tight'),
        slope: watch('slope'),
        diameter: watch('diameter'),
        coated: watch('mayorBasis'),
        leftSlopeThickness: watch('leftSlopeThickness'),
        rightSlopeThickness: watch('rightSlopeThickness'),
        grade: watch('grade'),
        rugosity: watch('rugosity')?.value || 0,
    })

    const handleSave = ({ mayorBasis, minorBasis, height, tight, slope, diameter, leftSlopeThickness, rightSlopeThickness, grade, rugosity }) => {
        dispatch(editActiveNewSection({
            mayorBasis,
            minorBasis,
            height,
            tight,
            slope,
            diameter,
            leftSlopeThickness,
            rightSlopeThickness,
            grade,
            rugosity,
            idRugosity: rugosity ? rugosity._id : ''
        }))
        dispatch(startSaveNewSection())
    }

    useEffect(() => {
        reset({
            ...activeNew
        })
    }, [reset, activeNew])

    return (
        <>
            <form id='form-irrig-section-create-2' onSubmit={handleSubmit(handleSave)}>
                <div className='row'>
                    <div className='col-12 col-md-3'>
                        <Form.Group className='mb-3' controlId='pMayorBasis'>
                            <Form.Label>Base mayor</Form.Label>
                            <Form.Control
                                {...register('mayorBasis', { required: true, setValueAs: v => Number(v) })}
                                type='number'
                                min={0}
                                step={0.01}
                                autoComplete='off'
                            />
                        </Form.Group>
                    </div>
                    <div className='col-12 col-md-3'>
                        <Form.Group className='mb-3' controlId='pMinorBasis'>
                            <Form.Label>Base menor</Form.Label>
                            <Form.Control
                                {...register('minorBasis', { required: true, setValueAs: v => Number(v) })}
                                type='number'
                                min={0}
                                step={0.01}
                                autoComplete='off'
                            />
                        </Form.Group>
                    </div>
                    <div className='col-12 col-md-3'>
                        <Form.Group className='mb-3' controlId='pHeight'>
                            <Form.Label>Altura (H)</Form.Label>
                            <Form.Control
                                {...register('height', { required: true, setValueAs: v => Number(v) })}
                                type='number'
                                min={0}
                                step={0.01}
                                autoComplete='off'
                            />
                        </Form.Group>
                    </div>
                    <div className='col-12 col-md-3'>
                        <Form.Group className='mb-3' controlId='pTight'>
                            <Form.Label>Tirante (Y)</Form.Label>
                            <Form.Control
                                {...register('tight', { required: true, setValueAs: v => Number(v) })}
                                type='number'
                                min={0}
                                step={0.01}
                                autoComplete='off'
                            />
                        </Form.Group>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-12 col-md-3'>
                        <Form.Group className='mb-3' controlId='pHeight'>
                            <Form.Label>Talud (Z)</Form.Label>
                            <Form.Control
                                {...register('slope', { required: true, setValueAs: v => Number(v) })}
                                type='number'
                                min={0}
                                step={0.01}
                                autoComplete='off'
                            />
                        </Form.Group>
                    </div>
                    <div className='col-12 col-md-3'>
                        <Form.Group className='mb-3' controlId='pTight'>
                            <Form.Label>Diametro (D)</Form.Label>
                            <Form.Control
                                {...register('diameter', { required: true, setValueAs: v => Number(v) })}
                                type='number'
                                min={0}
                                step={0.01}
                                autoComplete='off'
                            />
                        </Form.Group>
                    </div>
                    <div className='col-12 col-md-3'>
                        <Form.Group className='mb-3' controlId='pLeftSlopeThickness'>
                            <Form.Label>Revest. Talud Izq.</Form.Label>
                            <Form.Control
                                disabled={!watch('coated')}
                                {...register('leftSlopeThickness', { required: true, setValueAs: v => Number(v) })}
                                type='number'
                                min={0}
                                step={0.01}
                                autoComplete='off'
                            />
                        </Form.Group>
                    </div>
                    <div className='col-12 col-md-3'>
                        <Form.Group className='mb-3' controlId='pRightSlopeThickness'>
                            <Form.Label>Revest. Talud Der.</Form.Label>
                            <Form.Control
                                disabled={!watch('coated')}
                                {...register('rightSlopeThickness', { required: true, setValueAs: v => Number(v) })}
                                type='number'
                                min={0}
                                step={0.01}
                                autoComplete='off'
                            />
                        </Form.Group>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-12 col-md-3'>
                        <Form.Group className='mb-3' controlId='pGrade'>
                            <Form.Label>Pendiente (S)</Form.Label>
                            <Form.Control
                                {...register('grade', { required: true, setValueAs: v => Number(v) })}
                                type='number'
                                min={0}
                                step={0.0001}
                                autoComplete='off'
                            />
                        </Form.Group>
                    </div>
                    <div className='col-12 col-md-9'>
                        <Form.Group className='mb-3' controlId='pRugosity'>
                            <Form.Label>Rugosidad</Form.Label>
                            <Controller
                                name='rugosity'
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) =>
                                    <AsyncSelect
                                        {...field}
                                        inputId='pRugosity'
                                        classNamePrefix='rc-select'
                                        isClearable
                                        defaultOptions
                                        cacheOptions
                                        loadOptions={searchRugosity}
                                        menuPlacement={'auto'}
                                        placeholder={`Buscar...`}
                                        loadingMessage={({ inputValue }) => `Buscando '${inputValue}'`}
                                        noOptionsMessage={({ inputValue }) => `Sin resultados con ...${inputValue}`}
                                        getOptionValue={e => e._id}
                                        getOptionLabel={e =>
                                            <div>
                                                <strong>{e.name}</strong> - <i>{e.value}</i>
                                            </div>
                                        }
                                    />
                                }
                            />
                        </Form.Group>
                    </div>
                </div>
            </form>
        </>
    )
}