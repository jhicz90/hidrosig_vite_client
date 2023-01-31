import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import { Button, Form, Offcanvas } from 'react-bootstrap'
import AsyncSelect from 'react-select/async'
import { OptionOrgz } from '../../../components'
import { editActiveNewZone, searchJunta, setActiveNewZone, startAddNewZone, startSaveNewZone } from '../../../store/actions'

export const CreateZone = ({ junta = null, className = '', children }) => {

    const dispatch = useDispatch()
    const { activeNew, isSavingNew } = useSelector(state => state.zone)

    useEffect(() => {
        return () => dispatch(setActiveNewZone(null))
    }, [dispatch])

    return (
        <>
            <button
                disabled={isSavingNew}
                className={className === '' ? 'btn btn-neutral text-primary text-decoration-none' : className}
                onClick={() => dispatch(startAddNewZone())}
            >
                {children || 'Nueva zona'}
            </button>
            <Offcanvas
                show={!!activeNew}
                onHide={() => dispatch(setActiveNewZone(null))}
                placement='end'
            >
                <Offcanvas.Header closeButton={!isSavingNew} closeVariant='white'>
                    <Offcanvas.Title>Crear zona</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Header className='offcanvas-primary'>
                    <div className='d-flex justify-content-end gap-2 w-100'>
                        <Button
                            disabled={isSavingNew}
                            variant='primary'
                            type='submit'
                            form='form-ambit-zone-create'
                            className='w-100'
                        >
                            Guardar nuevo
                        </Button>
                    </div>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <CreateZoneStep juntaActive={junta} />
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

const CreateZoneStep = ({ juntaActive }) => {

    const dispatch = useDispatch()
    const { activeNew } = useSelector(state => state.zone)
    const { register, control, handleSubmit, reset } = useForm()

    const handleSave = ({ order, name, desc, junta }) => {
        dispatch(editActiveNewZone({
            order,
            name,
            desc,
            junta: juntaActive ? juntaActive : junta,
        }))
        dispatch(startSaveNewZone())
    }

    useEffect(() => {
        reset({
            ...activeNew
        })
    }, [reset, activeNew])

    return (
        <form id='form-ambit-zone-create' onSubmit={handleSubmit(handleSave)}>
            <div className='row'>
                <div className='col-12 col-md-6'>
                    <Form.Group className='mb-3' controlId='newOrder'>
                        <Form.Label>Orden</Form.Label>
                        <Form.Control
                            {...register('orden', { required: true })}
                            type='number'
                            autoComplete='off'
                        />
                    </Form.Group>
                </div>
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
            </div>
            <div className='row'>
                <div className='col-12'>
                    <Form.Group className='mb-3' controlId='newDesc'>
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
            {
                !juntaActive
                &&
                <div className='row'>
                    <div className='col'>
                        <Form.Group className='mb-3' controlId='newJunta'>
                            <Form.Label>Razón social</Form.Label>
                            <Controller
                                name='junta'
                                control={control}
                                rules={{ required: true }}
                                render={
                                    ({ field }) =>
                                        <AsyncSelect
                                            {...field}
                                            inputId='newJunta'
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
            }
        </form >
    )
}