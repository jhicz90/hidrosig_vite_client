import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, Form, ListGroup, Offcanvas } from 'react-bootstrap'
import { IoMdAddCircleOutline, IoMdOpen, IoMdTrash } from 'react-icons/io'
import { Controller, useForm } from 'react-hook-form'
import validator from 'validator'
import { editActiveStructure, setActiveStructure, startDeleteIdSection, startDeleteImageStructure, startDeleteStructure, startModalResource, startUpdateImageIdStructure, startUpdateStructure, useGetStructureByIdQuery } from '../../../store/actions'
import { DatePicker, FileImageSlider, Image, InputMask, LinkBack, LoadingPage } from '../../../components'
import { useNavigateState } from '../../../hooks'

export const EditStructure = () => {
    const [searchParams] = useSearchParams()
    const { w, id } = Object.fromEntries([...searchParams])

    return (
        <>
            {
                (w === 'structure_edit' && validator.isMongoId(id))
                &&
                <EditStructureWindow id={id} />
            }
        </>
    )
}

export const EditStructureWindow = ({ id }) => {

    const [show, setShow] = useState(true)

    const [state, redirect, redirectEscape] = useNavigateState('/app/schm/irrig/net')

    const dispatch = useDispatch()
    const { data = null, isLoading, isError } = useGetStructureByIdQuery(id)
    const { active, isSaving } = useSelector(state => state.structure)

    useEffect(() => {
        if (!!data) {
            dispatch(setActiveStructure(data))
        }

        return () => {
            dispatch(setActiveStructure(null))
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
                    <div className='d-flex flex-column'>
                        <span>Estructura</span>
                        <span>{active ? active?.name : 'Cargando...'}</span>
                    </div>
                </Offcanvas.Title>
            </Offcanvas.Header>
            {
                (!!active && !isLoading)
                    ?
                    <>
                        <Offcanvas.Header className='offcanvas-success'>
                            <div className='d-flex justify-content-end gap-2 w-100'>
                                <Button
                                    disabled={isSaving}
                                    variant='success'
                                    type='submit'
                                    form='form-irrig-structure-edit'
                                    className='w-100'
                                >
                                    Guardar cambios
                                </Button>
                            </div>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Card.Body>
                                <EditStructureStep />
                            </Card.Body>
                        </Offcanvas.Body>
                        <div className='offcanvas-footer offcanvas-danger'>
                            <div className='d-flex justify-content-end gap-2 w-100'>
                                <Button
                                    onClick={() => {
                                        dispatch(startDeleteStructure())
                                    }}
                                    disabled={isSaving}
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

const EditStructureStep = () => {

    const dispatch = useDispatch()
    const { active } = useSelector(state => state.structure)
    const { register, control, handleSubmit, reset } = useForm({
        defaultValues: {
            progressive: '000+000.00'
        }
    })

    const handleSave = ({ name, obs, status, dateCons, dateInvt, margin, progressive, longitude, efficiency, flow }) => {
        dispatch(editActiveStructure({
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
        dispatch(startUpdateStructure())
    }

    const handleAddImage = (structure) => {

        const images = structure?.images?.length || 0
        const limit = 4 - images

        if (images < 4) {
            dispatch(startModalResource({
                tags: ['estructura', `${structure.name}`],
                groupTypes: 'images',
                limit,
                maxSize: 10,
                setFiles: (data) => dispatch(startUpdateImageIdStructure(structure._id, data))
            }))
        }
    }

    const handleDeleteImageStructure = (imageId) => {
        dispatch(startDeleteImageStructure(active._id, imageId))
    }

    useEffect(() => {
        reset({
            ...active
        })
    }, [reset, active])

    return (
        <>
            <form id='form-irrig-structure-edit' onSubmit={handleSubmit(handleSave)}>
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
            </form >
            <div className='row'>
                <div className='col-12'>
                    <Form.Group className='mb-3' controlId='pSections'>
                        <Form.Label>Tramos</Form.Label>
                        <ListGroup>
                            <LinkBack className='list-group-item list-group-item-action d-flex align-items-center' to={`?w=section_create&str=${active._id}`} >
                                Agregar tramo <IoMdAddCircleOutline className='ms-2' size={20} color='green' />
                            </LinkBack>
                            {
                                active.sections.map(sect =>
                                    <ListGroup.Item key={sect._id}>
                                        <div className='d-flex flex-wrap align-items-center'>
                                            <Image className='me-3' noImg={3024} size='sm' />
                                            <div className='flex-grow-1'>
                                                <div className='d-block h6 mb-1'>{sect.name}</div>
                                                <p className='text-sm text-muted my-0'>{`${sect.progressiveStart} - ${sect.progressiveEnd}`}</p>
                                            </div>
                                            <div className='flex-shrink-0'>
                                                <div className='btn-group'>
                                                    <LinkBack
                                                        className='btn btn-neutral-icon text-primary'
                                                        to={`?w=section_edit&id=${sect._id}`}
                                                    >
                                                        <IoMdOpen size={20} />
                                                    </LinkBack>
                                                    <Button
                                                        onClick={() => dispatch(startDeleteIdSection(sect))}
                                                        variant='neutral-icon'
                                                        className='text-danger'
                                                    >
                                                        <IoMdTrash size={20} />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </ListGroup.Item>
                                )
                            }
                        </ListGroup>
                    </Form.Group>
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                    <Form.Group className='mb-3' controlId='pImages'>
                        <Form.Label>Imagenes</Form.Label>
                        <ListGroup>
                            <ListGroup.Item onClick={() => handleAddImage(active)} className='d-flex align-items-center' action>
                                Agregar imagen <IoMdAddCircleOutline className='ms-2' size={20} color='green' />
                            </ListGroup.Item>
                            <ListGroup.Item className='bg-light'>
                                <FileImageSlider images={active.images} actionDelete={handleDeleteImageStructure} />
                            </ListGroup.Item>
                        </ListGroup>
                    </Form.Group>
                </div>
            </div>
        </>
    )
}