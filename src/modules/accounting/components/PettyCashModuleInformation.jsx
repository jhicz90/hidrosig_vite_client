import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, Form } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import { startUpdateInformationPettycash } from '../../../store/actions'
import { DatePicker } from '../../../components'

export const PettyCashModuleInformation = () => {

    const dispatch = useDispatch()
    const { active, isSaving } = useSelector(state => state.pettycash)
    const { register, control, handleSubmit, reset } = useForm()

    const handleSave = ({ code, year, name, desc, receipt, check, remainingAmount, oldBalance, startDeclaration }) => {
        dispatch(startUpdateInformationPettycash({
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
                            <Form.Group className='mb-3' controlId='uCode'>
                                <Form.Label>Código</Form.Label>
                                <Form.Control
                                    {...register('code', { required: true })}
                                    type='text'
                                    autoComplete='off'
                                    readOnly
                                />
                            </Form.Group>
                        </div>
                        <div className='col-12 col-md-6'>
                            <Form.Group className='mb-3' controlId='uYear'>
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
                        <div className='col-12 col-md-6'>
                            <Form.Group className='mb-3' controlId='uStartDeclaration'>
                                <Form.Label>Fecha del comprobante</Form.Label>
                                <Controller
                                    control={control}
                                    name='startDeclaration'
                                    rules={{ required: true }}
                                    render={({
                                        field: { onChange, value },
                                    }) => (
                                        <DatePicker
                                            id='uStartDeclaration'
                                            value={value}
                                            onChange={onChange}
                                        />
                                    )}
                                />
                                <Form.Text>
                                    La fecha de comprobante se usa para dar inicio a la declaración de la liquidación.
                                </Form.Text>
                            </Form.Group>
                        </div>
                        <div className='col-12 col-md-6'>
                            <Form.Group className='mb-3' controlId='uReceipt'>
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
                            <Form.Group className='mb-3' controlId='uDocId'>
                                <Form.Label>Número de cheque</Form.Label>
                                <Form.Control
                                    {...register('check', { required: true })}
                                    type='text'
                                    autoComplete='off'
                                />
                            </Form.Group>
                        </div>
                        <div className='col-12 col-md-4'>
                            <Form.Group className='mb-3' controlId='uRemainingAmount'>
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
                            <Form.Group className='mb-3' controlId='uOldBalance'>
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
