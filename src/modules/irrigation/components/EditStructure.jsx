import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Button, Form, ListGroup, Nav, Offcanvas, Tab } from 'react-bootstrap'
import { IoMdAddCircleOutline, IoMdClose, IoMdOpen, IoMdTrash } from 'react-icons/io'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import validator from 'validator'
import { startDeleteIdSection, startDeleteImageStructure, startModalResource, startUpdateImageIdStructure, useDeleteStructureByIdMutation, useGetStructureByIdQuery, useUpdateStructureByIdMutation } from '../../../store/actions'
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
    const { data = null, isLoading, isError } = useGetStructureByIdQuery(id, { refetchOnMountOrArgChange: true })
    const [updateStructure, { isLoading: isSaving }] = useUpdateStructureByIdMutation()
    const [deleteStructure, { isLoading: isDeleting }] = useDeleteStructureByIdMutation()
    const { register, control, handleSubmit, reset } = useForm({
        defaultValues: {
            progressive: '000+000.00',
        }
    })
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'appIdentifiers',
    })

    const handleUpdate = async (newData) => {
        try {
            await updateStructure({
                id: data._id,
                structure: {
                    ...newData
                }
            })
        } catch (err) {
            console.log(err)
        }
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
        dispatch(startDeleteImageStructure(data._id, imageId))
    }

    const handleDeleteStructure = async () => {
        try {
            const { _id, name } = data
            const wordConfirm = normalizeText(name, { lowerCase: true, removeSpaces: true })

            SwalReact.fire({
                title:
                    <>
                        <div className='text-uppercase'>Eliminar estructura</div>
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
                    await deleteStructure(_id)
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
                        <span>Estructura</span>
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
                                    form='form-irrig-structure-edit'
                                    className='w-100'
                                >
                                    Guardar cambios
                                </Button>
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
                                    <Nav.Link eventKey={1}>Tramos o secciones</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey={2}>Datos adicionales</Nav.Link>
                                </Nav.Item>
                            </Nav>
                            <Offcanvas.Body>
                                <form id='form-irrig-structure-edit' onSubmit={handleSubmit(handleUpdate)}>
                                    <Tab.Content>
                                        <Tab.Pane eventKey={0}>
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
                                            <div className='row'>
                                                <div className='col'>
                                                    <Form.Group className='mb-3' controlId='pImages'>
                                                        <Form.Label>Imagenes</Form.Label>
                                                        <ListGroup>
                                                            <ListGroup.Item onClick={() => handleAddImage(data)} className='d-flex align-items-center' action>
                                                                Agregar imagen <IoMdAddCircleOutline className='ms-2' size={20} color='green' />
                                                            </ListGroup.Item>
                                                            <ListGroup.Item className='bg-light'>
                                                                <FileImageSlider images={data.images} actionDelete={handleDeleteImageStructure} />
                                                            </ListGroup.Item>
                                                        </ListGroup>
                                                    </Form.Group>
                                                </div>
                                            </div>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey={1}>
                                            <div className='row'>
                                                <div className='col-12'>
                                                    <Form.Group className='mb-3' controlId='pSections'>
                                                        <Form.Label>Tramos</Form.Label>
                                                        <ListGroup>
                                                            <LinkBack
                                                                className='list-group-item list-group-item-action d-flex align-items-center'
                                                                to={`?w=section_create`}
                                                                state={{ structureId: data._id || '' }}
                                                            >
                                                                Agregar tramo <IoMdAddCircleOutline className='ms-2' size={20} color='green' />
                                                            </LinkBack>
                                                            {
                                                                data.sections.map(sect =>
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
                                        </Tab.Pane>
                                        <Tab.Pane eventKey={2}>
                                            <div className='row'>
                                                <div className='col-12'>
                                                    <Form.Group className='mb-3' controlId='pAppIdentifiers'>
                                                        <Form.Label>Identificadores de aplicaciones</Form.Label>
                                                        <ListGroup>
                                                            <ListGroup.Item onClick={() => append({ nameApp: '', idApp: '' })} className='d-flex align-items-center' action>
                                                                Agregar identificador <IoMdAddCircleOutline className='ms-2' size={20} color='green' />
                                                            </ListGroup.Item>
                                                            {
                                                                fields.map((field, index) =>
                                                                    <ListGroup.Item key={`appIdentity_${index}`} variant={!field._id ? 'primary' : ''}>
                                                                        <div className='row align-items-center g-2'>
                                                                            <div className='col'>
                                                                                <Form.Group>
                                                                                    <Form.Control
                                                                                        {...register(`appIdentifiers.${index}.nameApp`, { required: true })}
                                                                                        type='text'
                                                                                        autoComplete='off'
                                                                                        placeholder='Nombre de aplicación'
                                                                                    />
                                                                                </Form.Group>
                                                                            </div>
                                                                            <div className='col'>
                                                                                <Form.Group>
                                                                                    <Form.Control
                                                                                        {...register(`appIdentifiers.${index}.idApp`, { required: true })}
                                                                                        type='text'
                                                                                        autoComplete='off'
                                                                                        placeholder='ID de aplicación'
                                                                                    />
                                                                                </Form.Group>
                                                                            </div>
                                                                            <div className='col-auto'>
                                                                                <Button onClick={() => remove(index)} variant='outline-danger'>
                                                                                    <IoMdClose size={20} />
                                                                                </Button>
                                                                            </div>
                                                                        </div>
                                                                    </ListGroup.Item>
                                                                )
                                                            }
                                                        </ListGroup>
                                                    </Form.Group>
                                                </div>
                                            </div>
                                        </Tab.Pane>
                                    </Tab.Content>
                                </form>
                            </Offcanvas.Body>
                        </Tab.Container>
                        <div className='offcanvas-footer offcanvas-danger'>
                            <div className='d-flex justify-content-end gap-2 w-100'>
                                <Button
                                    onClick={handleDeleteStructure}
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
        </Offcanvas >
    )
}