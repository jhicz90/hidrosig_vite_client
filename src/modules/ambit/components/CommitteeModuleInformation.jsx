import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { startUpdateInformationCommittee } from '../../../store/actions'

export const CommitteeModuleInformation = () => {

    const dispatch = useDispatch()
    const { active, isSaving } = useSelector(state => state.committee)
    const { register, handleSubmit, reset } = useForm()

    const handleSave = ({ name, nameAbrev, nameLarge, nameLargeAbrev, desc, docid, email }) => {
        dispatch(startUpdateInformationCommittee({
            name,
            nameAbrev,
            nameLarge,
            nameLargeAbrev,
            desc,
            docid,
            email
        }))
    }

    useEffect(() => {
        reset({
            ...active
        })
    }, [reset, active])

    return (
        <Card>
            <Card.Body>
                <form onSubmit={handleSubmit(handleSave)}>
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
                                    {...register('nameLarge', { required: true })}
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
                                    {...register('docid', { required: true })}
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
                                    type='text'
                                    autoComplete='off'
                                />
                            </Form.Group>
                        </div>
                    </div>
                    <div className='d-flex justify-content-end gap-2'>
                        <Button
                            disabled={isSaving}
                            variant='primary'
                            type='submit'
                        >
                            Guardar cambios
                        </Button>
                    </div>
                </form>
            </Card.Body>
        </Card>
    )
}
