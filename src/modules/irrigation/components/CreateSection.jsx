import { useEffect } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import AsyncSelect from 'react-select/async'
import { Button, Form, FormCheck, InputGroup, Modal } from 'react-bootstrap'
import { searchRugosity, useAddSectionMutation, useGetCalcPropertiesQuery, useLazyNewSectionByStructureQuery } from '../../../store/actions'
import { InputMask, Liner, LoadingPage, OptionRugosity } from '../../../components'
import { pDistance, pProgressive } from '../../../helpers'
import { useNavigateState } from '../../../hooks'

export const CreateSection = () => {

    const [searchParams, setSearchParams] = useSearchParams()
    const { state: params } = useLocation()
    const { w } = Object.fromEntries([...searchParams])
    const [redirect, redirectEscape] = useNavigateState('/app/schm/irrig')

    const [newSection, { data = null, isLoading, isError, error }] = useLazyNewSectionByStructureQuery()
    const [addSection, { isLoading: isSavingAdd, isSuccess: isSaved }] = useAddSectionMutation()
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

    useEffect(() => {
        if (w === 'section_create') {
            newSection(params?.structureId)
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
            show={w === 'section_create'}
            onHide={() => setSearchParams()}
            size='lg'
        >
            <Modal.Header closeButton={!isSavingAdd} closeVariant='white'>
                <Modal.Title>Crear tramo</Modal.Title>
            </Modal.Header>
            {
                (!!data && !isLoading)
                    ?
                    <>
                        <div className='flex-column p-2'>
                            <div className='container-fluid'>
                                <div className='row mb-1'>
                                    <div className='col-6'>
                                        <div className='input-group input-group-sm'>
                                            <span className='input-group-text col-6'>Estructura</span>
                                            <input value={data?.limitStructure.structureName || ''} readOnly type='text' className='form-control col-6' />
                                        </div>
                                    </div>
                                    <div className='col-6'>
                                        <div className='input-group input-group-sm'>
                                            <span className='input-group-text col-6'>Total de tramos</span>
                                            <input value={data?.limitStructure.countSections || 0} readOnly type='text' className='form-control col-6' />
                                        </div>
                                    </div>
                                </div>
                                <div className='row mb-1'>
                                    <div className='col-6'>
                                        <div className='input-group input-group-sm'>
                                            <span className='input-group-text col-6'>Longitud acumulada</span>
                                            <input value={data?.limitStructure.distanceTotal || 0} readOnly type='text' className='form-control col-6' />
                                        </div>
                                    </div>
                                    <div className='col-6'>
                                        <div className='input-group input-group-sm'>
                                            <span className='input-group-text col-6'>Longitud restante</span>
                                            <input value={data?.limitStructure.limit || 0} readOnly type='text' className='form-control col-6' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Modal.Body>
                            <form id='form-irrigation-section-create' onSubmit={handleSubmit(handleSave)}>
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
                                </div>
                                <div className='row'>
                                    <div className='col-12 col-md-4'>
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
                                    <div className='col-12 col-md-4'>
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
                                    <div className='col-12 col-md-4'>
                                        <Form.Group className='mb-3' controlId='newCoatedType'>
                                            <Form.Label>Tipo de revestimiento</Form.Label>
                                            <Form.Select
                                                {...register('coatedType', { required: true })}
                                                autoComplete='off'
                                                disabled={!watch('coated')}
                                            >
                                                <option value={0}>Ninguno</option>
                                                <option value={1}>Solera</option>
                                                <option value={2}>Talud derecho</option>
                                                <option value={3}>Talud izquierdo</option>
                                                <option value={4}>Talud derecho y solera</option>
                                                <option value={5}>Talud izquierdo y solera</option>
                                                <option value={6}>Total</option>
                                            </Form.Select>
                                            <FormCheck
                                                id='newCoated'
                                                {...register('coated', {
                                                    onChange: () => {
                                                        setValue('coatedType', 0)
                                                        setValue('leftSlopeThickness', 0)
                                                        setValue('rightSlopeThickness', 0)
                                                    }
                                                })}
                                                label='¿La estructura esta revestida?'
                                            />
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
                                                        field: { value, onChange }
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
                                                        field: { value, onChange }
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
                                <Liner>Datos hidraulicos</Liner>
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
                                    <div className='col-12 col-md-2'>
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
                                    <div className='col-12 col-md-7'>
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
                                    <div className='col-12 col-md-3'>
                                        <Form.Group controlId='typeFlow'>
                                            <Form.Label>Tipo de flujo</Form.Label>
                                            <Form.Control
                                                readOnly
                                                type='text'
                                                className={calcs?.froudeNumber === 1 ? 'text-warning' : calcs?.froudeNumber < 1 ? 'text-success' : 'text-danger'}
                                                value={calcs?.typeFlow || 'Faltan datos'}
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
                                form='form-irrigation-section-create'
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