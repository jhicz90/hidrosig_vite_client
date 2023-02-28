import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import AsyncSelect from 'react-select/async'
import { useWizard } from 'react-use-wizard'
import validator from 'validator'
import { Button, Form, FormCheck, InputGroup, Offcanvas } from 'react-bootstrap'
import { editActiveNewSection, searchRugosity, setActiveNewSection, startSaveNewSection, useAddSectionMutation, useGetCalcPropertiesQuery, useNewSectionByStructureQuery } from '../../../store/actions'
import { InputMask, LoadingPage, OptionRugosity, WizardStep } from '../../../components'
import { pDistance, pProgressive } from '../../../helpers'
import { useNavigateState } from '../../../hooks'

export const CreateSection = () => {
    const [searchParams] = useSearchParams()
    const { w, str = '' } = Object.fromEntries([...searchParams])

    return (
        <>
            {
                (w === 'section_create' && validator.isMongoId(str))
                &&
                <CreateSectionWindow structureId={str} />
            }
        </>
    )
}

const CreateSectionWindow = ({ structureId = null }) => {

    const [show, setShow] = useState(true)

    const [state, redirect, redirectEscape] = useNavigateState('/app/schm/irrig')

    const { data = null, isLoading, isError } = useNewSectionByStructureQuery(structureId, { refetchOnMountOrArgChange: true })
    const [addSection, { isLoading: isSaving }] = useAddSectionMutation()
    const { register, control, handleSubmit, reset, watch, setFocus, setValue } = useForm({
        defaultValues: {
            progressiveStart: '000+000.00',
            progressiveEnd: '000+000.00'
        }
    })

    const { data: calcs } = useGetCalcPropertiesQuery({
        type: data?.type || 1,
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
    }, { skip: !watch('rugosity') })

    const handleSave = async ({ rugosity, ...newData }) => {
        if (pDistance(watch('progressiveEnd')) - pDistance(watch('progressiveStart')) > 0) {
            if (pDistance(watch('progressiveEnd')) - pDistance(watch('progressiveStart')) > Number(data.limitStructure.limit)) {
                setValue('progressiveStart', '000+000.00')
                setValue('progressiveEnd', pProgressive(data.limitStructure.limit))
            } else {
                if (calcs?.froudeNumber < 1) {
                    try {
                        await addSection({
                            ...newData,
                            rugosity,
                            idRugosity: rugosity ? rugosity._id : ''
                        })
                        setShow(false)
                    } catch (err) {
                        console.log(err)
                    }
                }
            }
        } else {
            setFocus('progressiveEnd')
        }
    }

    useEffect(() => {
        reset({
            ...data
        })
    }, [reset, data])

    if (isError) {
        redirect()
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
                    <Offcanvas.Title>Crear tramo</Offcanvas.Title>
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
                                        form='form-irrigation-section-create'
                                        className='w-100'
                                    >
                                        Guardar nuevo
                                    </Button>
                                </div>
                            </Offcanvas.Header>
                            <Offcanvas.Header className='flex-column'>
                                <div className='container-fluid'>
                                    <div className='row mb-1'>
                                        <div className='col-12'>
                                            <div className='input-group input-group-sm'>
                                                <span className='input-group-text col-6'>Estructura</span>
                                                <input value={data?.limitStructure.structureName || ''} readOnly type='text' className='form-control col-6' />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row mb-1'>
                                        <div className='col-12'>
                                            <div className='input-group input-group-sm'>
                                                <span className='input-group-text col-6'>Total de tramos</span>
                                                <input value={data?.limitStructure.countSections || 0} readOnly type='text' className='form-control col-6' />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row mb-1'>
                                        <div className='col-12'>
                                            <div className='input-group input-group-sm'>
                                                <span className='input-group-text col-6'>Longitud acumulada</span>
                                                <input value={data?.limitStructure.distanceTotal || 0} readOnly type='text' className='form-control col-6' />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row mb-1'>
                                        <div className='col-12'>
                                            <div className='input-group input-group-sm'>
                                                <span className='input-group-text col-6'>Longitud restante</span>
                                                <input value={data?.limitStructure.limit || 0} readOnly type='text' className='form-control col-6' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <form id='form-irrigation-section-create' onSubmit={handleSubmit(handleSave)}>
                                    <h5 className='liner'>Información</h5>
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
                                        <div className='col-12 col-md-6'>
                                            <Form.Group className='mb-3' controlId='newStatus'>
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
                                            <Form.Group className='mb-3' controlId='newType'>
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
                                            <Form.Group className='mb-3' controlId='newWorkCapacity'>
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
                                            <Form.Group className='mb-3' controlId='newCoatedType'>
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
                                                <FormCheck id='newCoated' {...register('coated')} label='¿La estructura esta revestida?' />
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
                                                            field,
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
                                                            field,
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
                                    <h5 className='liner'>Datos hidraulicos</h5>
                                    <div className='row'>
                                        <div className='col-12 col-md-3'>
                                            <Form.Group className='mb-3' controlId='newMayorBasis'>
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
                                            <Form.Group className='mb-3' controlId='newMinorBasis'>
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
                                            <Form.Group className='mb-3' controlId='newHeight'>
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
                                            <Form.Group className='mb-3' controlId='newTight'>
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
                                            <Form.Group className='mb-3' controlId='newHeight'>
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
                                            <Form.Group className='mb-3' controlId='newDiameter'>
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
                                            <Form.Group className='mb-3' controlId='newLeftSlopeThickness'>
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
                                            <Form.Group className='mb-3' controlId='newRightSlopeThickness'>
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
                                            <Form.Group className='mb-3' controlId='newGrade'>
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
                                            <Form.Group className='mb-3' controlId='newRugosity'>
                                                <Form.Label>Rugosidad</Form.Label>
                                                <Controller
                                                    name='rugosity'
                                                    control={control}
                                                    rules={{ required: true }}
                                                    render={
                                                        ({ field }) =>
                                                            <AsyncSelect
                                                                {...field}
                                                                inputId='newRugosity'
                                                                classNamePrefix='rc-select'
                                                                menuPosition='fixed'
                                                                isClearable
                                                                defaultOptions
                                                                cacheOptions
                                                                loadOptions={searchRugosity}
                                                                menuPlacement={'auto'}
                                                                placeholder={`Buscar...`}
                                                                loadingMessage={({ inputValue }) => `Buscando '${inputValue}'`}
                                                                noOptionsMessage={({ inputValue }) => `Sin resultados con ...${inputValue}`}
                                                                getOptionValue={e => e._id}
                                                                getOptionLabel={e => <OptionRugosity rug={e} />}
                                                            />
                                                    }
                                                />
                                            </Form.Group>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-12'>
                                            <InputGroup className='mb-3'>
                                                <InputGroup.Text>Tipo de flujo:</InputGroup.Text>
                                                <Form.Control
                                                    readOnly
                                                    type='text'
                                                    className={calcs?.froudeNumber === 1 ? 'text-warning' : calcs?.froudeNumber < 1 ? 'text-success' : 'text-danger'}
                                                    value={calcs?.typeFlow || 'Faltan datos'}
                                                />
                                            </InputGroup>
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

const CreateSectionStep1 = () => {

    const { nextStep } = useWizard()
    const dispatch = useDispatch()
    const { activeNew } = useSelector(state => state.section)
    const { register, control, handleSubmit, reset, watch, setFocus, setValue } = useForm({
        defaultValues: {
            progressiveStart: '000+000.00',
            progressiveEnd: '000+000.00'
        }
    })

    const handleSave = ({ name, status, type, workCapacity, coatedType, coated, progressiveStart, progressiveEnd }) => {
        if (pDistance(watch('progressiveEnd')) - pDistance(watch('progressiveStart')) > 0) {
            if (pDistance(watch('progressiveEnd')) - pDistance(watch('progressiveStart')) > Number(activeNew.limitStructure.limit)) {
                setValue('progressiveStart', '000+000.00')
                setValue('progressiveEnd', pProgressive(activeNew.limitStructure.limit))
            } else {
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
                nextStep()
            }
        } else {
            setFocus('progressiveEnd')
        }
    }

    useEffect(() => {
        reset({
            ...activeNew
        })
    }, [reset, activeNew])

    return (
        <>
            <form onSubmit={handleSubmit(handleSave)}>
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
                    <div className='col-12 col-md-6'>
                        <Form.Group className='mb-3' controlId='newStatus'>
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
                        <Form.Group className='mb-3' controlId='newType'>
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
                        <Form.Group className='mb-3' controlId='newWorkCapacity'>
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
                        <Form.Group className='mb-3' controlId='newCoatedType'>
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
                            <FormCheck id='newCoated' {...register('coated')} label='¿La estructura esta revestida?' />
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
                                        field,
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
                                        field,
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
                <div className='d-flex justify-content-end gap-2 w-100'>
                    <Button
                        variant='outline-primary'
                        type='submit'
                        className='w-100'
                    >
                        Siguiente
                    </Button>
                </div>
            </form>
        </>
    )
}

const CreateSectionStep2 = () => {

    const { previousStep } = useWizard()
    const dispatch = useDispatch()
    const { activeNew, isSavingNew } = useSelector(state => state.section)
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
    }, { skip: !watch('rugosity') })

    const handleSave = ({ mayorBasis, minorBasis, height, tight, slope, diameter, leftSlopeThickness, rightSlopeThickness, grade, rugosity }) => {
        if (data?.froudeNumber < 1) {
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
                        <Form.Group className='mb-3' controlId='newMayorBasis'>
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
                        <Form.Group className='mb-3' controlId='newMinorBasis'>
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
                        <Form.Group className='mb-3' controlId='newHeight'>
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
                        <Form.Group className='mb-3' controlId='newTight'>
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
                        <Form.Group className='mb-3' controlId='newHeight'>
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
                        <Form.Group className='mb-3' controlId='newDiameter'>
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
                        <Form.Group className='mb-3' controlId='newLeftSlopeThickness'>
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
                        <Form.Group className='mb-3' controlId='newRightSlopeThickness'>
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
                        <Form.Group className='mb-3' controlId='newGrade'>
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
                        <Form.Group className='mb-3' controlId='newRugosity'>
                            <Form.Label>Rugosidad</Form.Label>
                            <Controller
                                name='rugosity'
                                control={control}
                                rules={{ required: true }}
                                render={
                                    ({ field }) =>
                                        <AsyncSelect
                                            {...field}
                                            inputId='newRugosity'
                                            classNamePrefix='rc-select'
                                            menuPosition='fixed'
                                            isClearable
                                            defaultOptions
                                            cacheOptions
                                            loadOptions={searchRugosity}
                                            menuPlacement={'auto'}
                                            placeholder={`Buscar...`}
                                            loadingMessage={({ inputValue }) => `Buscando '${inputValue}'`}
                                            noOptionsMessage={({ inputValue }) => `Sin resultados con ...${inputValue}`}
                                            getOptionValue={e => e._id}
                                            getOptionLabel={e => <OptionRugosity rug={e} />}
                                        />
                                }
                            />
                        </Form.Group>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-12'>
                        <InputGroup className='mb-3'>
                            <InputGroup.Text>Tipo de flujo:</InputGroup.Text>
                            <Form.Control
                                readOnly
                                type='text'
                                className={data?.froudeNumber === 1 ? 'text-warning' : data?.froudeNumber < 1 ? 'text-success' : 'text-danger'}
                                value={data?.typeFlow || 'Faltan datos'}
                            />
                        </InputGroup>
                    </div>
                </div>
                <div className='d-flex justify-content-end gap-2 w-100'>
                    <Button
                        onClick={() => previousStep()}
                        variant='outline-secondary'
                        type='button'
                        className='w-100'
                    >
                        Regresar
                    </Button>
                    <Button
                        disabled={isSavingNew}
                        variant='primary'
                        type='submit'
                        className='w-100'
                    >
                        Guardar
                    </Button>
                </div>
            </form>
        </>
    )
}