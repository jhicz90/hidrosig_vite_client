import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Button, Form, Nav, Offcanvas, Tab } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import AsyncSelect from 'react-select/async'
import validator from 'validator'
import { searchGeoObject, searchJunta, useDeleteZoneByIdMutation, useGetZoneByIdQuery, useUpdateZoneByIdMutation } from '../../../store/actions'
import { LoadingPage, LocationMap, OptionGeometry, OptionOrgz } from '../../../components'
import { useNavigateState } from '../../../hooks'
import { normalizeText } from '../../../helpers'

const SwalReact = withReactContent(Swal)

export const EditZone = () => {
    const [searchParams] = useSearchParams()
    const { w, id } = Object.fromEntries([...searchParams])

    return (
        <>
            {
                (w === 'zone_edit' && validator.isMongoId(id))
                &&
                <EditZoneWindow id={id} />
            }
        </>
    )
}

const EditZoneWindow = ({ id }) => {

    const [show, setShow] = useState(true)

    const [state, redirect, redirectEscape] = useNavigateState('/app/ambit/trrty/zone')

    const { data = null, isLoading, isError } = useGetZoneByIdQuery(id, { refetchOnMountOrArgChange: true })
    const [updateZone, { isLoading: isSaving }] = useUpdateZoneByIdMutation()
    const [deleteZone, { isLoading: isDeleting }] = useDeleteZoneByIdMutation()
    const { register, control, handleSubmit, reset, watch } = useForm()

    const handleUpdate = async ({ geometry, ...newData }) => {
        try {
            await updateZone({
                id: data._id,
                zone: {
                    ...newData,
                    geometry,
                    idGeometry: geometry ? geometry._id : '',
                }
            })
        } catch (err) {
            console.log(err)
        }
    }

    const handleDeleteZone = async () => {
        try {
            const { _id, name } = data
            const wordConfirm = normalizeText(name, { lowerCase: true, removeSpaces: true })

            SwalReact.fire({
                title:
                    <>
                        <div className='text-uppercase'>Eliminar zona</div>
                        <div className="fs-5 fw-bold text-info mt-1">{name}</div>
                    </>,
                html:
                    <>
                        <div className='fs-5 mb-2'>¿Estás seguro de eliminar esta zona?</div>
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
                    await deleteZone(_id)
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
                        <span>Zona</span>
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
                                    form='form-ambit-zone-edit'
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
                                    <Nav.Link eventKey={1}>Zona geográfica</Nav.Link>
                                </Nav.Item>
                            </Nav>
                            <Offcanvas.Body>
                                <form id='form-ambit-zone-edit' onSubmit={handleSubmit(handleUpdate)}>
                                    <Tab.Content>
                                        <Tab.Pane eventKey={0}>
                                            <div className='row'>
                                                <div className='col-12 col-md-6'>
                                                    <Form.Group className='mb-3' controlId='pCode'>
                                                        <Form.Label>Orden</Form.Label>
                                                        <Form.Control
                                                            {...register('order', { required: true })}
                                                            type='number'
                                                            min={0}
                                                            autoComplete='off'
                                                        />
                                                    </Form.Group>
                                                </div>
                                                <div className='col-12 col-md-6'>
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
                                                    <Form.Group className='mb-3' controlId='pDesc'>
                                                        <Form.Label>Descripción</Form.Label>
                                                        <Form.Control
                                                            {...register('desc')}
                                                            as='textarea'
                                                            type={'text'}
                                                            autoComplete='off'
                                                        />
                                                    </Form.Group>
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className='col'>
                                                    <Form.Group className='mb-3' controlId='pJunta'>
                                                        <Form.Label>Junta de usuarios</Form.Label>
                                                        <Controller
                                                            name='junta'
                                                            control={control}
                                                            rules={{ required: true }}
                                                            render={
                                                                ({ field }) =>
                                                                    <AsyncSelect
                                                                        {...field}
                                                                        inputId='pJunta'
                                                                        classNamePrefix='rc-select'
                                                                        isClearable
                                                                        defaultOptions
                                                                        loadOptions={searchJunta}
                                                                        menuPlacement={'auto'}
                                                                        placeholder={`Buscar...`}
                                                                        loadingMessage={({ inputValue }) => `Buscando '${inputValue}'`}
                                                                        noOptionsMessage={({ inputValue }) => `Sin resultados con ...${inputValue}`}
                                                                        getOptionValue={e => e._id}
                                                                        getOptionLabel={e => <OptionOrgz orgz={e} />}
                                                                    />
                                                            }
                                                        />
                                                    </Form.Group>
                                                </div>
                                            </div>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey={1}>
                                            <div className='row'>
                                                <div className='col-12'>
                                                    <Form.Group className='mb-3' controlId='pGeometry'>
                                                        <Form.Label>Área geográfica</Form.Label>
                                                        <Controller
                                                            name='geometry'
                                                            control={control}
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
                                                                            return await searchGeoObject(e, 3)
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
                                    onClick={handleDeleteZone}
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