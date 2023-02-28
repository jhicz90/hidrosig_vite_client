import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Button, Form, FormCheck, InputGroup, Nav, Offcanvas, Tab } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import AsyncSelect from 'react-select/async'
import validator from 'validator'
import { searchGeoObject, searchRugosity, useDeleteSectionByIdMutation, useGetCalcPropertiesQuery, useGetSectionByIdQuery, useUpdateSectionByIdMutation } from '../../../store/actions'
import { InputMask, LoadingPage, LocationMap, OptionGeometry, OptionRugosity } from '../../../components'
import { useNavigateState } from '../../../hooks'
import { pDistance } from '../../../helpers'

const SwalReact = withReactContent(Swal)

export const EditSection = () => {
    const [searchParams] = useSearchParams()
    const { w, id } = Object.fromEntries([...searchParams])

    return (
        <>
            {
                (w === 'section_edit' && validator.isMongoId(id))
                &&
                <EditSectionWindow id={id} />
            }
        </>
    )
}

const EditSectionWindow = ({ id }) => {

    const [show, setShow] = useState(true)
    const { register, control, handleSubmit, reset, watch, setFocus } = useForm({
        defaultValues: {
            progressiveStart: '000+000.00',
            progressiveEnd: '000+000.00'
        }
    })

    const [state, redirect, redirectEscape] = useNavigateState('/app/schm/irrig/net')

    const { data = null, isLoading, isError } = useGetSectionByIdQuery(id, { refetchOnMountOrArgChange: true })
    const [updateSection, { isLoading: isSaving }] = useUpdateSectionByIdMutation()
    const [deleteSection, { isLoading: isDeleting }] = useDeleteSectionByIdMutation()

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

    const handleUpdate = async ({ progressiveStart, progressiveEnd, rugosity, geometry, ...newData }) => {
        if (pDistance(progressiveEnd) - pDistance(progressiveStart) > 0) {
            if (
                pDistance(progressiveEnd) - pDistance(progressiveStart)
                <= Number(data.limitStructure.limit + (pDistance(data.progressiveEnd) - pDistance(data.progressiveStart)))
            ) {
                try {
                    await updateSection({
                        id: data._id,
                        section: {
                            ...newData,
                            rugosity,
                            idRugosity: rugosity ? rugosity._id : '',
                            geometry,
                            idGeometry: geometry ? geometry._id : ''
                        }
                    })
                } catch (err) {
                    console.log(err)
                }
            } else {
                setFocus('progressiveEnd')
            }
        } else {
            setFocus('progressiveEnd')
        }
    }

    const handleDeleteSection = async () => {
        try {
            const { _id, name } = data
            const wordConfirm = normalizeText(name, { lowerCase: true, removeSpaces: true })

            SwalReact.fire({
                title:
                    <>
                        <div className='text-uppercase'>Eliminar tramo</div>
                        <div className="fs-5 fw-bold text-info mt-1">{name}</div>
                    </>,
                html:
                    <>
                        <div className='fs-5 mb-2'>¿Estás seguro de eliminar?</div>
                        <div className='fs-5'>Si es asi, escriba <strong>{wordConfirm}</strong> para confirmar</div>
                    </>,
                showCancelButton: true,
                confirmButtonText: 'Eliminar',
                cancelButtonText: 'Cancelar',
                allowOutsideClick: false,
                icon: 'question',
                customClass: {
                    confirmButton: `btn btn-warning`,
                    cancelButton: `btn btn-neutral`
                },
                input: 'text',
                inputAttributes: {
                    autocapitalize: 'off'
                },
                buttonsStyling: false,
                reverseButtons: true,
                preConfirm: (typed) => {
                    if (typed === wordConfirm) {
                        return true
                    } else {
                        return false
                    }
                }
            }).then(async (result) => {
                if (result.value) {
                    await deleteSection(_id)
                    setShow(false)
                }
            })
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
        <Offcanvas
            show={show}
            onHide={() => setShow(false)}
            onExited={() => redirect()}
            enforceFocus={false}
            placement='end'
        >
            <Offcanvas.Header closeButton={!isSaving || !isDeleting} closeVariant='white'>
                <Offcanvas.Title>
                    <div className='d-flex flex-column'>
                        <span>Tramo</span>
                        <span>{!!data ? data?.name : 'Cargando...'}</span>
                    </div>
                </Offcanvas.Title>
            </Offcanvas.Header>
            {
                (!!data && !isLoading)
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
                        <Tab.Container
                            defaultActiveKey={0}
                            mountOnEnter={true}
                            unmountOnExit={true}
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
                                <form id='form-irrig-section-edit' onSubmit={handleSubmit(handleUpdate)}>
                                    <Tab.Content>
                                        <Tab.Pane eventKey={0}>
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
                                        </Tab.Pane>
                                        <Tab.Pane eventKey={1}>
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
                                                    <Form.Group className='mb-3' controlId='pDiameter'>
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
                                        </Tab.Pane>
                                        <Tab.Pane eventKey={2}>
                                            <div className='row'>
                                                <div className='col-12'>
                                                    <Form.Group className='mb-3' controlId='pGeometry'>
                                                        <Form.Label>Estructura geográfica</Form.Label>
                                                        <Controller
                                                            name='geometry'
                                                            control={control}
                                                            rules={{ required: true }}
                                                            render={({ field }) =>
                                                                <AsyncSelect
                                                                    {...field}
                                                                    inputId='pGeometry'
                                                                    classNamePrefix='rc-select'
                                                                    menuPosition='absolute'
                                                                    isClearable
                                                                    defaultOptions
                                                                    cacheOptions
                                                                    loadOptions={
                                                                        async (e) => {
                                                                            return await searchGeoObject(e, 1)
                                                                        }
                                                                    }
                                                                    menuPlacement={'auto'}
                                                                    placeholder={`Buscar...`}
                                                                    loadingMessage={({ inputValue }) => `Buscando '${inputValue}'`}
                                                                    noOptionsMessage={({ inputValue }) => `Sin resultados con ...${inputValue}`}
                                                                    getOptionValue={e => e._id}
                                                                    getOptionLabel={e => <OptionGeometry geo={e} />}
                                                                />
                                                            }
                                                        />
                                                    </Form.Group>
                                                </div>
                                            </div>
                                            {
                                                !!watch('geometry')
                                                &&
                                                <LocationMap data={watch('geometry')?.geometry.features || []} view={watch('geometry')?.view || {}} />
                                            }
                                        </Tab.Pane>
                                    </Tab.Content>
                                </form>
                            </Offcanvas.Body>
                        </Tab.Container>
                        <div className='offcanvas-footer offcanvas-danger'>
                            <div className='d-flex justify-content-end gap-2 w-100'>
                                <Button
                                    onClick={handleDeleteSection}
                                    disabled={isSaving || isDeleting}
                                    variant='danger'
                                    type='button'
                                    className='w-100'
                                >
                                    Eliminar
                                </Button>
                            </div>
                        </div>
                    </>
                    :
                    <LoadingPage />
            }
        </Offcanvas>
    )
}