import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Button, Form, Offcanvas } from 'react-bootstrap'
import { useNewJuntaQuery, useAddJuntaMutation } from '../../../store/actions'
import { upperCaseCatch } from '../../../helpers'
import { useNavigateState } from '../../../hooks'
import { LoadingPage } from '../../../components'

export const CreateJunta = () => {
    const [searchParams] = useSearchParams()
    const { w } = Object.fromEntries([...searchParams])

    return (
        <>
            {
                (w === 'junta_create')
                &&
                <CreateJuntaWindow />
            }
        </>
    )
}

export const CreateJuntaWindow = () => {

    const [show, setShow] = useState(true)

    const [state, redirect, redirectEscape] = useNavigateState('/app/ambit/orgz/junta')

    const { data = null, isLoading, isError } = useNewJuntaQuery(undefined, { refetchOnMountOrArgChange: true })
    const [addJunta, { isLoading: isSaving }] = useAddJuntaMutation()
    const { register, setValue, handleSubmit, reset } = useForm()

    const handleSave = async (newData) => {
        try {
            await addJunta(newData)
            setShow(false)
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
            <Offcanvas.Header closeButton={!isSaving} closeVariant='white'>
                <Offcanvas.Title>Crear junta de usuarios</Offcanvas.Title>
            </Offcanvas.Header>
            {
                (!!data && !isLoading)
                    ?
                    <>
                        <Offcanvas.Header className='offcanvas-primary'>
                            <div className='d-flex justify-content-end gap-2 w-100'>
                                <Button
                                    disabled={isSaving}
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
                            <form id='form-ambit-junta-create' onSubmit={handleSubmit(handleSave)}>
                                <div className='row'>
                                    <div className='col-12 col-md-6'>
                                        <Form.Group className='mb-3' controlId='newName'>
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
                                        <Form.Group className='mb-3' controlId='newNameAbrev'>
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
                                        <Form.Group className='mb-3' controlId='newNameLarge'>
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
                                        <Form.Group className='mb-3' controlId='newNameLargeAbrev'>
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
                                <div className='row'>
                                    <div className='col-12 col-md-6'>
                                        <Form.Group className='mb-3' controlId='newDocId'>
                                            <Form.Label>Código de identidad o RUC</Form.Label>
                                            <Form.Control
                                                {...register('docid', { required: true, minLength: 8 })}
                                                type='text'
                                                autoComplete='off'
                                            />
                                        </Form.Group>
                                    </div>
                                    <div className='col-12 col-md-6'>
                                        <Form.Group className='mb-3' controlId='newEmail'>
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
                        </Offcanvas.Body>
                    </>
                    :
                    <LoadingPage />
            }
        </Offcanvas>
    )
}