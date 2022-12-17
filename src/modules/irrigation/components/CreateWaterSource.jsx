import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import { Button, Form, Modal, Offcanvas } from 'react-bootstrap'
import AsyncSelect from 'react-select/async'
import { editActiveNewWaterSource, searchJunta, setActiveNewWaterSource, startAddNewWaterSource, startSaveNewWaterSource } from '../../../store/actions'
import { imageGet } from '../../../helpers'

export const CreateWaterSource = ({ junta = null, typeButton = 1 }) => {

    const dispatch = useDispatch()
    const { activeNew, isSavingNew } = useSelector(state => state.watersource)

    useEffect(() => {
        return () => dispatch(setActiveNewWaterSource(null))
    }, [dispatch])

    return (
        <>
            <Button
                disabled={isSavingNew}
                variant={typeButton === 1 ? 'neutral' : 'link'}
                className='text-primary text-decoration-none'
                onClick={() => {
                    dispatch(startAddNewWaterSource())
                }}
            >
                Nueva fuente de agua
            </Button>
            <Offcanvas
                show={!!activeNew}
                onHide={() => dispatch(setActiveNewWaterSource(null))}
                placement='end'
            >
                <Offcanvas.Header closeButton={!isSavingNew} closeVariant='white'>
                    <Offcanvas.Title>Crear fuente de agua</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Header className='offcanvas-primary'>
                    <div className='d-flex justify-content-end gap-2 w-100'>
                        <Button
                            disabled={isSavingNew}
                            variant='primary'
                            type='submit'
                            form='form-irrig-watersource-create'
                            className='w-100'
                        >
                            Guardar nuevo
                        </Button>
                    </div>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <CreateWaterSourceStep juntaActive={junta} />
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

const CreateWaterSourceStep = ({ juntaActive }) => {

    const dispatch = useDispatch()
    const { activeNew } = useSelector(state => state.watersource)
    const { register, control, handleSubmit, reset } = useForm()

    const handleSave = ({ name, desc, junta, type }) => {
        dispatch(editActiveNewWaterSource({
            name,
            desc,
            junta: juntaActive ? juntaActive : junta,
            type
        }))
        dispatch(startSaveNewWaterSource())
    }

    useEffect(() => {
        reset({
            ...activeNew
        })
    }, [reset, activeNew])

    return (
        <form form='form-irrig-watersource-create' onSubmit={handleSubmit(handleSave)}>
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
                    <Form.Group className='mb-3' controlId='uType'>
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
            {
                !juntaActive
                &&
                <div className='row'>
                    <div className='col'>
                        <div className='mb-3'>
                            <label htmlFor='uJunta' className='form-label'>Junta de usuarios</label>
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
                                                <div className='d-flex'>
                                                    <img src={imageGet(e.image)} alt={e._id} width={32} />
                                                    <span className='ms-2 align-self-center'>{e.name}</span>
                                                </div>
                                            }
                                        />
                                }
                            />
                        </div>
                    </div>
                </div>
            }
        </form>
    )
}