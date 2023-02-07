import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form, Nav, Offcanvas, Tab } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import AsyncSelect from 'react-select/async'
import { editActiveZone, searchGeoObject, searchJunta, setActiveZone, startDeleteZone, startUpdateZone, useGetZoneByIdQuery } from '../../../store/actions'
import { LoadingPage, LocationMap, OptionGeometry, OptionOrgz } from '../../../components'

export const EditZoneModal = () => {

    const dispatch = useDispatch()
    const { active, isSaving } = useSelector(state => state.zone)
    const { register, control, handleSubmit, reset, watch } = useForm()

    const handleChange = ({ name, code, desc, junta, geometry }) => {
        dispatch(editActiveZone({
            name,
            code,
            desc,
            junta,
            geometry,
            idGeometry: geometry ? geometry._id : ''
        }))
        dispatch(startUpdateZone())
    }

    useEffect(() => {
        reset({
            ...active
        })
    }, [reset, active])

    return (
        <Offcanvas
            show={!!active}
            onHide={() => dispatch(setActiveZone(null))}
            enforceFocus={false}
            placement='end'
        >
            <Offcanvas.Header closeButton={!isSaving} closeVariant='white'>
                <Offcanvas.Title>
                    <div className='d-flex flex-column'>
                        <span>Zona</span>
                        <span>{active ? active?.name : 'Cargando...'}</span>
                    </div>
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
                                <form id='form-ambit-zone-edit' onSubmit={handleSubmit(handleChange)}>
                                    <Tab.Content>
                                        <Tab.Pane eventKey={0}>
                                            <EditZoneStep1 register={register} control={control} />
                                        </Tab.Pane>
                                        <Tab.Pane eventKey={1}>
                                            <EditZoneStep2 control={control} watch={watch} />
                                        </Tab.Pane>
                                    </Tab.Content>
                                </form>
                            </Offcanvas.Body>
                        </Tab.Container>
                        <div className='offcanvas-footer offcanvas-danger'>
                            <div className='d-flex justify-content-end gap-2 w-100'>
                                <Button
                                    onClick={() => {
                                        dispatch(startDeleteZone())
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

const EditZoneStep1 = ({ register, control }) => {
    return (
        <>
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
        </>
    )
}

const EditZoneStep2 = ({ control, watch }) => {
    return (
        <>
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
        </>
    )
}