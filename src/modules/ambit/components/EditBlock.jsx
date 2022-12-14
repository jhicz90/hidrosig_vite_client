import { useState, useEffect } from 'react'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, Form, Offcanvas } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import AsyncSelect from 'react-select/async'
import { editActiveBlock, searchCommitteeByJunta, searchDocument, searchJunta, setActiveBlock, startDeleteBlock, startUpdateBlock, useGetBlockByIdQuery } from '../../../store/actions'
import { LoadingPage, OptionDocument, OptionOrgz } from '../../../components'

export const EditBlock = () => {

    const [show, setShow] = useState(true)
    const { blockid } = useParams()
    const redirect = useNavigate()
    const { state } = useLocation()
    const dispatch = useDispatch()
    const { data = null, isLoading, isError } = useGetBlockByIdQuery(blockid)
    const { active, isSaving } = useSelector(state => state.block)
    const urlBack = state?.from || '/app/exp/resources/docs'

    useEffect(() => {
        if (!!data) {
            dispatch(setActiveBlock(data))
        }

        return () => {
            dispatch(setActiveBlock(null))
        }
    }, [data])

    if (isError) {
        return <Navigate to={urlBack} replace />
    }

    return (
        <Offcanvas
            show={show}
            onHide={() => setShow(false)}
            onExited={() => redirect(urlBack)}
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
                        <Offcanvas.Body>
                            <Card.Body>
                                <EditBlockStep />
                            </Card.Body>
                        </Offcanvas.Body>
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

const EditBlockStep = () => {

    const dispatch = useDispatch()
    const { active } = useSelector(state => state.block)
    const { register, watch, setValue, control, handleSubmit, reset } = useForm()

    const handleSave = ({ name, code, desc, junta, committee, resolution }) => {
        dispatch(editActiveBlock({
            name,
            code,
            desc,
            junta,
            committee,
            resolution
        }))
        dispatch(startUpdateBlock())
    }

    useEffect(() => {
        reset({
            ...active
        })
    }, [reset, active])

    return (
        <form id='form-ambit-block-edit' onSubmit={handleSubmit(handleSave)}>
            <div className='row'>
                <div className='col-12 col-md-6'>
                    <Form.Group className='mb-3' controlId='uName'>
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            {...register('name', { required: true })}
                            type='text'
                            autoComplete='off'
                        />
                    </Form.Group>
                </div>
                <div className='col-12 col-md-6'>
                    <Form.Group className='mb-3' controlId='uCode'>
                        <Form.Label>C??digo</Form.Label>
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
                    <Form.Group className='mb-3' controlId='uDesc'>
                        <Form.Label>Descripci??n</Form.Label>
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
                    <Form.Group className='mb-3' controlId='uJunta'>
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
                                        inputId='uJunta'
                                        classNamePrefix='rc-select'
                                        isClearable
                                        defaultOptions
                                        loadOptions={searchJunta}
                                        menuPlacement={'auto'}
                                        placeholder={`Buscar...`}
                                        loadingMessage={({ inputValue }) => `Buscando '${inputValue}'`}
                                        noOptionsMessage={({ inputValue }) => `Sin resultados con ...${inputValue}`}
                                        getOptionValue={e => e._id}
                                        getOptionLabel={e =>
                                            <OptionOrgz orgz={e} />
                                        }
                                    />
                            }
                        />
                    </Form.Group>
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                    <Form.Group className='mb-3' controlId='uCommittee'>
                        <Form.Label>Comisi??n de usuarios</Form.Label>
                        <Controller
                            name='committee'
                            control={control}
                            rules={{ required: true }}
                            render={
                                ({ field }) =>
                                    <AsyncSelect
                                        {...field}
                                        inputId='uCommittee'
                                        classNamePrefix='rc-select'
                                        isClearable
                                        isDisabled={watch().junta === null}
                                        loadOptions={async (e) => {
                                            return await searchCommitteeByJunta(watch().junta._id, e)
                                        }}
                                        menuPlacement={'auto'}
                                        placeholder={`Buscar...`}
                                        loadingMessage={({ inputValue }) => `Buscando '${inputValue}'`}
                                        noOptionsMessage={({ inputValue }) => `Sin resultados con ...${inputValue}`}
                                        getOptionValue={e => e._id}
                                        getOptionLabel={e =>
                                            <OptionOrgz orgz={e} />
                                        }
                                    />
                            }
                        />
                    </Form.Group>
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                    <Form.Group className='mb-3' controlId='uResolution'>
                        <Form.Label>Resoluci??n</Form.Label>
                        <Controller
                            name='resolution'
                            control={control}
                            rules={{ required: true }}
                            render={
                                ({ field }) =>
                                    <AsyncSelect
                                        {...field}
                                        inputId='uResolution'
                                        classNamePrefix='rc-select'
                                        isClearable
                                        defaultOptions
                                        loadOptions={searchDocument}
                                        menuPlacement={'auto'}
                                        placeholder={`Buscar...`}
                                        loadingMessage={({ inputValue }) => `Buscando '${inputValue}'`}
                                        noOptionsMessage={({ inputValue }) => `Sin resultados con ...${inputValue}`}
                                        getOptionValue={e => e._id}
                                        getOptionLabel={e =>
                                            <OptionDocument docm={e} />
                                        }
                                    />
                            }
                        />
                    </Form.Group>
                </div>
            </div>
        </form>
    )
}