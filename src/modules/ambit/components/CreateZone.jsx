import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import { Button, Card, Form, Modal } from 'react-bootstrap'
import AsyncSelect from 'react-select/async'
import { editActiveNewZone, searchJunta, setActiveNewZone, startAddNewZone, startSaveNewZone } from '../../../store/actions'
import { imageGet } from '../../../helpers'

export const CreateZone = ({ junta = null, typeButton = 1 }) => {

    const dispatch = useDispatch()
    const { activeNew, isSavingNew } = useSelector(state => state.zone)

    useEffect(() => {
        return () => dispatch(setActiveNewZone(null))
    }, [dispatch])

    return (
        <>
            <Button
                disabled={isSavingNew}
                variant={typeButton === 1 ? 'neutral' : 'link'}
                className='text-primary text-decoration-none'
                onClick={() => {
                    dispatch(startAddNewZone())
                }}
            >
                Nueva zona
            </Button>
            <Modal
                show={!!activeNew}
                onHide={() => dispatch(setActiveNewZone(null))}
                backdrop='static'
                size='lg'
            >
                <Modal.Header closeButton={!isSavingNew}>
                    <Modal.Title>Crear zona</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card.Body>
                        <CreateZoneStep juntaActive={junta} />
                    </Card.Body>
                </Modal.Body>
            </Modal>
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
        <form onSubmit={handleSubmit(handleSave)}>
            <div className='row'>
                <div className='col-12 col-md-6'>
                    <Form.Group className='mb-3' controlId='uOrder'>
                        <Form.Label>Orden</Form.Label>
                        <Form.Control
                            {...register('orden', { required: true })}
                            type='number'
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
            {
                !juntaActive
                &&
                <div className='row'>
                    <div className='col'>
                        <div className='mb-3'>
                            <label htmlFor='junta' className='form-label'>Junta de usuarios</label>
                            <Controller
                                name='junta'
                                control={control}
                                rules={{ required: true }}
                                render={
                                    ({ field }) =>
                                        <AsyncSelect
                                            {...field}
                                            inputId='junta'
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
            <div className='d-flex justify-content-end gap-2'>
                <Button
                    variant='success'
                    type='submit'
                >
                    Guardar
                </Button>
            </div>
        </form>
    )
}