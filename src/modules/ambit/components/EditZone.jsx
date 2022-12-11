import { useState, useEffect } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form, Offcanvas } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import AsyncSelect from 'react-select/async'
import { editActiveZone, searchJunta, setActiveZone, startUpdateZone, useGetZoneByIdQuery } from '../../../store/actions'
import { LoadingPage, OptionOrgz } from '../../../components'

export const EditZone = () => {

    const [show, setShow] = useState(true)
    const { zoneid } = useParams()
    const redirect = useNavigate()
    const dispatch = useDispatch()
    const { data = null, isLoading, isError } = useGetZoneByIdQuery(zoneid)
    const { active, isSaving } = useSelector(state => state.zone)

    useEffect(() => {
        if (!!data) {
            dispatch(setActiveZone(data))
        }

        return () => {
            dispatch(setActiveZone(null))
        }
    }, [data])

    if (isError) {
        return <Navigate to={`/app/ambit/trrty#zone`} replace />
    }

    return (
        <Offcanvas
            show={show}
            onHide={() => setShow(false)}
            onExited={() => redirect(`/app/ambit/trrty#zone`)}
            placement='end'
            backdrop='static'
        >
            <Offcanvas.Header className='text-bg-primary' closeButton={!isSaving} closeVariant='white'>
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
                        <Offcanvas.Header>
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
                        <Offcanvas.Body>
                            <EditZoneStep />
                        </Offcanvas.Body>
                    </>
                    :
                    <LoadingPage />
            }
        </Offcanvas>
    )
}

const EditZoneStep = () => {

    const dispatch = useDispatch()
    const { active } = useSelector(state => state.zone)
    const { register, control, handleSubmit, reset } = useForm()

    const handleSave = ({ name, code, desc, junta }) => {
        dispatch(editActiveZone({
            name,
            code,
            desc,
            junta,
        }))
        dispatch(startUpdateZone())
    }

    useEffect(() => {
        reset({
            ...active
        })
    }, [reset, active])

    return (
        <form id='form-ambit-zone-edit' onSubmit={handleSubmit(handleSave)}>
            <div className='row'>
                <div className='col-12 col-md-6'>
                    <Form.Group className='mb-3' controlId='uCode'>
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
                    <Form.Group className='mb-3' controlId='uName'>
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
                    <Form.Group className='mb-3' controlId='uDesc'>
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
                    <Form.Group className='mb-3' controlId='uJunta'>
                        <Form.Label>Junta de usuarios</Form.Label>
                        <Controller
                            name='junta'
                            control={control}
                            rules={{ required: true }}
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
        </form>
    )
}