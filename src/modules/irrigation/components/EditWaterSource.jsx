import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { Button, Card, Form, Offcanvas } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import AsyncSelect from 'react-select/async'
import { editActiveWaterSource, searchJunta, setActiveWaterSource, startUpdateWaterSource, useGetWaterSourceByIdQuery } from '../../../store/actions'
import { LoadingPage, OptionOrgz } from '../../../components'

export const EditWaterSource = () => {

    const [show, setShow] = useState(true)
    const { wsid } = useParams()
    const redirect = useNavigate()
    const dispatch = useDispatch()
    const { data = null, isLoading, isError } = useGetWaterSourceByIdQuery(wsid)
    const { active, isSaving } = useSelector(state => state.watersource)

    useEffect(() => {
        if (!!data) {
            dispatch(setActiveWaterSource(data))
        }

        return () => {
            dispatch(setActiveWaterSource(null))
        }
    }, [data])

    if (isError) {
        return <Navigate to={`/app/schm/irrig#source`} replace />
    }

    return (
        <Offcanvas
            show={show}
            onHide={() => setShow(false)}
            onExited={() => redirect(`/app/schm/irrig#source`)}
            placement='end'
        >
            <Offcanvas.Header closeButton={!isSaving} closeVariant='white'>
                <Offcanvas.Title>
                    <div className='d-flex flex-column'>
                        <span>Fuente de agua</span>
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
                                    form='form-irrig-watersource-edit'
                                    className='w-100'
                                >
                                    Guardar cambios
                                </Button>
                            </div>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Card.Body>
                                <EditWaterSourceStep />
                            </Card.Body>
                        </Offcanvas.Body>
                    </>
                    :
                    <LoadingPage />
            }
        </Offcanvas>
    )
}

const EditWaterSourceStep = () => {

    const dispatch = useDispatch()
    const { active } = useSelector(state => state.watersource)
    const { register, control, handleSubmit, reset } = useForm()

    const handleSave = ({ name, desc, junta, type }) => {
        dispatch(editActiveWaterSource({
            name,
            desc,
            junta,
            type,
        }))
        dispatch(startUpdateWaterSource())
    }

    useEffect(() => {
        reset({
            ...active
        })
    }, [reset, active])

    return (
        <form id='form-irrig-watersource-edit' onSubmit={handleSubmit(handleSave)}>
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
                    <Form.Group className='mb-3' controlId='pType'>
                        <Form.Label>Tipo de fuente</Form.Label>
                        <Form.Select
                            {...register('type', { required: true })}
                            autoComplete='off'
                        >
                            <option value={''}>Elija el tipo de fuente</option>
                            <option value={1}>Agua de la red (Represas, canales)</option>
                            <option value={2}>Aguas superficiales (Rios, Lagos)</option>
                            <option value={3}>Agua de lluvia</option>
                            <option value={4}>Agua subterránea</option>
                            <option value={5}>Agua de mar desalada</option>
                            <option value={6}>Aguas residuales urbanas depuradas</option>
                            <option value={7}>Agua de drenaje</option>
                        </Form.Select>
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
                            rows={6}
                        />
                    </Form.Group>
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                    <div className='mb-3'>
                        <label htmlFor='pJunta' className='form-label'>Junta de usuarios</label>
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
                                        getOptionLabel={e =>
                                            <OptionOrgz orgz={e} />
                                        }
                                    />
                            }
                        />
                    </div>
                </div>
            </div>
        </form>
    )
}