import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form, Nav, Offcanvas, Tab } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import AsyncSelect from 'react-select/async'
import { editActiveBlock, searchCommitteeByJunta, searchDocument, searchGeoObject, searchJunta, setActiveBlock, startDeleteBlock, startUpdateBlock, useGetBlockByIdQuery } from '../../../store/actions'
import { LoadingPage, LocationMap, OptionDocument, OptionGeometry, OptionOrgz } from '../../../components'
import { useNavigateState } from '../../../hooks'

export const EditBlock = ({ blockid }) => {

    const [show, setShow] = useState(true)
    const { register, control, handleSubmit, reset, watch, setFocus, setValue } = useForm()

    const [state, redirect, redirectEscape] = useNavigateState('/app/ambit/trrty/block')

    const dispatch = useDispatch()
    const { data = null, isLoading, isError } = useGetBlockByIdQuery(blockid)
    const { active, isSaving } = useSelector(state => state.block)

    const handleChange = ({ name, code, desc, junta, committee, resolution, geometry }) => {
        dispatch(editActiveBlock({
            name,
            code,
            desc,
            junta,
            committee,
            resolution,
            geometry,
            idGeometry: geometry ? geometry._id : ''
        }))
        dispatch(startUpdateBlock())
    }

    useEffect(() => {
        reset({
            ...active
        })
    }, [reset, active])

    useEffect(() => {
        if (!!data) {
            dispatch(setActiveBlock(data))
        }

        return () => {
            dispatch(setActiveBlock(null))
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
                        <span>Bloque de riego</span>
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
                                    form='form-ambit-block-edit'
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
                                <form id='form-ambit-block-edit' onSubmit={handleSubmit(handleChange)}>
                                    <Tab.Content>
                                        <Tab.Pane eventKey={0}>
                                            <EditBlockStep1 register={register} control={control} watch={watch} setValue={setValue} />
                                        </Tab.Pane>
                                        <Tab.Pane eventKey={1}>
                                            <EditBlockStep2 control={control} watch={watch} />
                                        </Tab.Pane>
                                    </Tab.Content>
                                </form>
                            </Offcanvas.Body>
                        </Tab.Container>
                        <div className='offcanvas-footer offcanvas-danger'>
                            <div className='d-flex justify-content-end gap-2 w-100'>
                                <Button
                                    onClick={() => {
                                        dispatch(startDeleteBlock())
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

const EditBlockStep1 = ({ register, control, watch, setValue }) => {
    return (
        <>
            <div className='row'>
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
                <div className='col-12 col-md-6'>
                    <Form.Group className='mb-3' controlId='pCode'>
                        <Form.Label>Código</Form.Label>
                        <Form.Control
                            {...register('code', { required: true })}
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
                            rules={{
                                required: true,
                                onChange: () => {
                                    setValue('committee', null)
                                }
                            }}
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
            <div className='row'>
                <div className='col'>
                    <Form.Group className='mb-3' controlId='pCommittee'>
                        <Form.Label>Comisión de usuarios</Form.Label>
                        <Controller
                            name='committee'
                            control={control}
                            rules={{ required: true }}
                            render={
                                ({ field }) =>
                                    <AsyncSelect
                                        {...field}
                                        inputId='pCommittee'
                                        classNamePrefix='rc-select'
                                        isClearable
                                        isDisabled={watch('junta') === null}
                                        loadOptions={async (e) => {
                                            return await searchCommitteeByJunta(watch('junta')._id, e)
                                        }}
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
            <div className='row'>
                <div className='col'>
                    <Form.Group className='mb-3' controlId='pResolution'>
                        <Form.Label>Resolución</Form.Label>
                        <Controller
                            name='resolution'
                            control={control}
                            rules={{ required: true }}
                            render={
                                ({ field }) =>
                                    <AsyncSelect
                                        {...field}
                                        inputId='pResolution'
                                        classNamePrefix='rc-select'
                                        isClearable
                                        defaultOptions
                                        loadOptions={searchDocument}
                                        menuPlacement={'auto'}
                                        placeholder={`Buscar...`}
                                        loadingMessage={({ inputValue }) => `Buscando '${inputValue}'`}
                                        noOptionsMessage={({ inputValue }) => `Sin resultados con ...${inputValue}`}
                                        getOptionValue={e => e._id}
                                        getOptionLabel={e => <OptionDocument docm={e} />}
                                    />
                            }
                        />
                    </Form.Group>
                </div>
            </div>
        </>
    )
}

const EditBlockStep2 = ({ control, watch }) => {
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