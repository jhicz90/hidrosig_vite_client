import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import { Button, Form, Modal } from 'react-bootstrap'
import { editActiveNewPettycash, setActiveNewPettycash, startAddNewPettycash, startSaveNewPettycash } from '../../../store/actions'
import { DatePicker } from '../../../components'

export const CreatePettyCash = ({ typeButton = 1 }) => {

    const dispatch = useDispatch()
    const { activeNew, isSavingNew } = useSelector(state => state.pettycash)

    useEffect(() => {
        return () => dispatch(setActiveNewPettycash(null))
    }, [dispatch])

    return (
        <>
            <Button
                disabled={isSavingNew}
                variant={typeButton === 1 ? 'neutral' : 'link'}
                className='text-primary text-decoration-none'
                onClick={() => {
                    dispatch(startAddNewPettycash())
                }}
            >
                Nueva caja chica
            </Button>
            <Modal
                show={!!activeNew}
                onHide={() => dispatch(setActiveNewPettycash(null))}
                backdrop='static'
                size='lg'
            >
                <Modal.Header closeButton={!isSavingNew}>
                    <Modal.Title>Crear caja chica</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CreatePettyCashStep />
                </Modal.Body>
            </Modal>
        </>
    )
}

export const CreatePettyCashStep = () => {

    const dispatch = useDispatch()
    const { activeNew, isSavingNew } = useSelector(state => state.pettycash)
    const { register, control, handleSubmit, reset } = useForm()

    const handleSave = ({ code, year, name, desc, receipt, check, remainingAmount, oldBalance, startDeclaration }) => {
        dispatch(editActiveNewPettycash({
            code,
            year,
            name,
            desc,
            receipt,
            check,
            remainingAmount,
            oldBalance,
            startDeclaration
        }))
        dispatch(startSaveNewPettycash())
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
                    <Form.Group className='mb-3' controlId='pCode'>
                        <Form.Label>Código</Form.Label>
                        <Form.Control
                            {...register('code', { required: true })}
                            type='text'
                            autoComplete='off'
                        />
                    </Form.Group>
                </div>
                <div className='col-12 col-md-6'>
                    <Form.Group className='mb-3' controlId='pYear'>
                        <Form.Label>Año</Form.Label>
                        <Form.Control
                            {...register('year', {
                                required: true,
                                min: 1990,
                                max: new Date().getFullYear()
                            })}
                            type='number'
                            autoComplete='off'
                        />
                    </Form.Group>
                </div>
            </div>
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
                    <Form.Group className='mb-3' controlId='pDesc'>
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
                    <div className='mb-3'>
                        <label htmlFor='pStartDeclaration' className='form-label'>Fecha del comprobante</label>
                        <Controller
                            control={control}
                            name='startDeclaration'
                            rules={{ required: true }}
                            render={({
                                field: { onChange, value },
                            }) => (
                                <DatePicker
                                    id='pStartDeclaration'
                                    value={value}
                                    onChange={onChange}
                                />
                            )}
                        />
                        <div className='form-text'>
                            La fecha de comprobante se usa para dar inicio a la declaración de la liquidación.
                        </div>
                    </div>
                </div>
                <div className='col-12 col-md-6'>
                    <Form.Group className='mb-3' controlId='pReceipt'>
                        <Form.Label>Número de comprobante</Form.Label>
                        <Form.Control
                            {...register('receipt', { required: true })}
                            type='text'
                            autoComplete='off'
                        />
                    </Form.Group>
                </div>
            </div>
            <div className='row'>
                <div className='col-12 col-md-4'>
                    <Form.Group className='mb-3' controlId='pCheck'>
                        <Form.Label>Número de cheque</Form.Label>
                        <Form.Control
                            {...register('check', { required: true })}
                            type='text'
                            autoComplete='off'
                        />
                    </Form.Group>
                </div>
                <div className='col-12 col-md-4'>
                    <Form.Group className='mb-3' controlId='pRemainingAmount'>
                        <Form.Label>Monto del cheque (S/.)</Form.Label>
                        <Form.Control
                            {...register('remainingAmount', {
                                required: true,
                                min: 0.01
                            })}
                            type='number'
                            min={0.01}
                            step={0.01}
                            autoComplete='off'
                        />
                    </Form.Group>
                </div>
                <div className='col-12 col-md-4'>
                    <Form.Group className='mb-3' controlId='pOldBalance'>
                        <Form.Label>Saldo anterior (S/.)</Form.Label>
                        <Form.Control
                            {...register('oldBalance', {
                                required: true,
                                min: 0
                            })}
                            type='number'
                            min={0}
                            step={0.01}
                            autoComplete='off'
                        />
                        <Form.Text>
                            Si al momento de iniciar esta declaración existe un saldo previo a esta caja.
                        </Form.Text>
                    </Form.Group>
                </div>
            </div>
            <div className='d-flex justify-content-end gap-2'>
                <Button
                    disabled={isSavingNew}
                    variant='success'
                    type='submit'
                >
                    Guardar
                </Button>
            </div>
        </form>
    )
}