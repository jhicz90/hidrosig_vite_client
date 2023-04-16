import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Form } from 'react-bootstrap'
import { useNavigateState } from '../../../hooks'
import { upperCaseCatch } from '../../../helpers'
import { Liner, LoadingPage } from '../../../components'
import { useAddJuntaMutation, useLazyNewJuntaQuery } from '../../../store/actions'

export const JuntaCreatePage = () => {

    const [redirect, redirectEscape] = useNavigateState('/app/ambit/orgz/junta')

    const [newJunta, { data = null, isLoading, isError }] = useLazyNewJuntaQuery()
    const [addJunta, { isLoading: isSavingAdd, isSuccess: isSaved }] = useAddJuntaMutation()
    const { register, setValue, handleSubmit, reset } = useForm()

    const handleSave = async (newData) => {
        try {
            await addJunta(newData)
        } catch (err) {
            console.log(err)
        }
    }

    const handleDiscard = () => {
        redirect()
    }

    useEffect(() => {
        newJunta()
    }, [])

    useEffect(() => {
        reset({
            ...data
        })
    }, [reset, data])

    useEffect(() => {
        if (isError) {
            redirectEscape()
        }
    }, [isError])

    useEffect(() => {
        if (isSaved) {
            newJunta()
        }
    }, [isSaved])

    if (isLoading) {
        return <LoadingPage />
    }

    return (
        <div className='container-fluid'>
            <div className='row my-3'>
                <div className='col-12'>
                    <div className='row align-items-center justify-content-between g-3'>
                        <div className='col-12 col-md-auto'>
                            <h4 className='mb-0'>NUEVA JUNTA DE USUARIOS</h4>
                        </div>
                        <div className='col-12 col-md-auto'>
                            <div className='d-flex gap-2'>
                                <Button
                                    onClick={handleDiscard}
                                    disabled={isSavingAdd}
                                    variant='secondary'
                                    type='button'
                                >
                                    Descartar
                                </Button>
                                <Button
                                    disabled={isSavingAdd}
                                    variant='primary'
                                    type='submit'
                                    form='form-ambit-junta-create'
                                >
                                    Registro nuevo
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row g-0 justify-content-center'>
                <div className='col'>
                    <form id='form-ambit-junta-create' onSubmit={handleSubmit(handleSave)}>
                        <Liner>Información</Liner>
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
                                        type='text'
                                        autoComplete='off'
                                    />
                                </Form.Group>
                            </div>
                        </div>
                        <Liner>Administración</Liner>
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
                </div>
            </div>
        </div>
    )
}
