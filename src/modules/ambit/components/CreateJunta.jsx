import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Button, Form, Offcanvas } from 'react-bootstrap'
import { setActiveNewJunta, startAddNewJunta, editActiveNewJunta, startSaveNewJunta } from '../../../store/actions'
import { upperCaseCatch } from '../../../helpers'

export const CreateJunta = ({ className = '', children }) => {

    const dispatch = useDispatch()
    const { activeNew, isSavingNew } = useSelector(state => state.junta)

    useEffect(() => {
        return () => dispatch(setActiveNewJunta(null))
    }, [dispatch])

    return (
        <>
            <button
                disabled={isSavingNew}
                className={className === '' ? 'btn btn-neutral text-primary text-decoration-none' : className}
                onClick={() => dispatch(startAddNewJunta())}
            >
                {children || 'Nueva junta'}
            </button>
            <Offcanvas
                show={!!activeNew}
                onHide={() => dispatch(setActiveNewJunta(null))}
                placement='end'
            >
                <Offcanvas.Header closeButton={!isSavingNew} closeVariant='white'>
                    <Offcanvas.Title>Crear junta de usuarios</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Header className='offcanvas-primary'>
                    <div className='d-flex justify-content-end gap-2 w-100'>
                        <Button
                            disabled={isSavingNew}
                            variant='primary'
                            type='submit'
                            form='form-ambit-junta-create'
                            className='w-100'
                        >
                            Guardar nuevo
                        </Button>
                    </div>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <CreateJuntaStep />
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export const CreateJuntaStep = () => {

    const dispatch = useDispatch()
    const { activeNew, isSavingNew } = useSelector(state => state.junta)
    const { register, setValue, handleSubmit, reset } = useForm()

    const handleNext = ({ name, nameAbrev, nameLarge, nameLargeAbrev, desc, docid, email }) => {
        dispatch(editActiveNewJunta({
            name,
            nameAbrev,
            nameLarge,
            nameLargeAbrev,
            desc,
            docid,
            email,
        }))
        dispatch(startSaveNewJunta())
    }

    useEffect(() => {
        reset({
            ...activeNew
        })
    }, [reset, activeNew])

    return (
        <form id='form-ambit-junta-create' onSubmit={handleSubmit(handleNext)}>
            <div className='row'>
                <div className='col-12 col-md-6'>
                    <Form.Group className='mb-3' controlId='uName'>
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            {...register('name', {
                                required: true,
                                onChange: (e) => {
                                    setValue('nameAbrev', upperCaseCatch(e.target.value))
                                }
                            })}
                            type='text'
                            autoComplete='off'
                        />
                    </Form.Group>
                </div>
                <div className='col-12 col-md-6'>
                    <Form.Group className='mb-3' controlId='uNameAbrev'>
                        <Form.Label>Nombre abreviado</Form.Label>
                        <Form.Control
                            {...register('nameAbrev', { required: true })}
                            type='text'
                            autoComplete='off'
                        />
                    </Form.Group>
                </div>
            </div>
            <div className='row'>
                <div className='col-12 col-md-6'>
                    <Form.Group className='mb-3' controlId='uNameLarge'>
                        <Form.Label>Nombre largo o juridico</Form.Label>
                        <Form.Control
                            {...register('nameLarge', {
                                required: true,
                                onChange: (e) => {
                                    setValue('nameLargeAbrev', upperCaseCatch(e.target.value))
                                }
                            })}
                            type='text'
                            autoComplete='off'
                        />
                    </Form.Group>
                </div>
                <div className='col-12 col-md-6'>
                    <Form.Group className='mb-3' controlId='uNameLargeAbrev'>
                        <Form.Label>Nombre largo abreviado</Form.Label>
                        <Form.Control
                            {...register('nameLargeAbrev', { required: true })}
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
                <div className='col-12 col-md-6'>
                    <Form.Group className='mb-3' controlId='uDocId'>
                        <Form.Label>Código de identidad o RUC</Form.Label>
                        <Form.Control
                            {...register('docid', { required: true, minLength: 8 })}
                            type='text'
                            autoComplete='off'
                        />
                    </Form.Group>
                </div>
                <div className='col-12 col-md-6'>
                    <Form.Group className='mb-3' controlId='uEmail'>
                        <Form.Label>Correo electrónico</Form.Label>
                        <Form.Control
                            {...register('email', { required: true })}
                            type='email'
                            autoComplete='off'
                        />
                    </Form.Group>
                </div>
            </div>
        </form>
    )
}