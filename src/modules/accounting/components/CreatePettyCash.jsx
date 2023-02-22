import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import { Button, Form, Offcanvas } from 'react-bootstrap'
import { useAddPettyCashMutation, useNewPettyCashQuery } from '../../../store/actions'
import { DatePicker, LoadingPage } from '../../../components'
import { useNavigateState } from '../../../hooks'

export const CreatePettyCash = () => {
    const [searchParams] = useSearchParams()
    const { w } = Object.fromEntries([...searchParams])

    return (
        <>
            {
                (w === 'pettycash_create')
                &&
                <CreatePettyCashWindow />
            }
        </>
    )
}

const CreatePettyCashWindow = () => {

    const [show, setShow] = useState(true)

    const [state, redirect, redirectEscape] = useNavigateState('/app/acct/petty_cash')

    const { data = null, isLoading, isError } = useNewPettyCashQuery(undefined, { refetchOnMountOrArgChange: true })
    const [addPettyCash, { isLoading: isSaving }] = useAddPettyCashMutation()
    const { register, control, handleSubmit, reset } = useForm()

    const handleSave = async (newData) => {
        try {
            await addPettyCash(newData)
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
                <Offcanvas.Title>Crear caja chica</Offcanvas.Title>
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
                                    form='form-accounting-pettycash-create'
                                    className='w-100'
                                >
                                    Guardar nuevo
                                </Button>
                            </div>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <form id='form-accounting-pettycash-create' onSubmit={handleSubmit(handleSave)}>
                                <div className='row'>
                                    <div className='col-12 col-md-6'>
                                        <Form.Group className='mb-3' controlId='newCode'>
                                            <Form.Label>Código</Form.Label>
                                            <Form.Control
                                                {...register('code', { required: true })}
                                                type='text'
                                                autoComplete='off'
                                            />
                                        </Form.Group>
                                    </div>
                                    <div className='col-12 col-md-6'>
                                        <Form.Group className='mb-3' controlId='newYear'>
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
                                <div className='row'>
                                    <div className='col-12 col-md-6'>
                                        <Form.Group className='mb-3' controlId='newStartDeclaration'>
                                            <Form.Label>Fecha del comprobante</Form.Label>
                                            <Controller
                                                control={control}
                                                name='startDeclaration'
                                                rules={{ required: true }}
                                                render={({
                                                    field: { onChange, value },
                                                }) => (
                                                    <DatePicker
                                                        id='newStartDeclaration'
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
                                        <Form.Group className='mb-3' controlId='newReceipt'>
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
                                        <Form.Group className='mb-3' controlId='newCheck'>
                                            <Form.Label>Número de cheque</Form.Label>
                                            <Form.Control
                                                {...register('check', { required: true })}
                                                type='text'
                                                autoComplete='off'
                                            />
                                        </Form.Group>
                                    </div>
                                    <div className='col-12 col-md-4'>
                                        <Form.Group className='mb-3' controlId='newRemainingAmount'>
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
                                        <Form.Group className='mb-3' controlId='newOldBalance'>
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
                            </form>
                        </Offcanvas.Body>
                    </>
                    :
                    <LoadingPage />
            }
        </Offcanvas>
    )
}