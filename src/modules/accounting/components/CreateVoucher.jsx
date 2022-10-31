import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form, Modal, Offcanvas } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import moment from 'moment'
import AsyncSelect from 'react-select/async'
import { editActiveNewVoucher, searchSocialReason, setActiveNewVoucher, startAddNewVoucher, startSaveNewVoucher } from '../../../store/actions'
import { DatePicker } from '../../../components'

export const CreateVoucher = ({ pettycash = null, typeButton = 1 }) => {

    const dispatch = useDispatch()
    const { activeNew, isSavingNew } = useSelector(state => state.voucher)
    const [step, setStep] = useState(1)

    useEffect(() => {
        return () => dispatch(setActiveNewVoucher(null))
    }, [dispatch])

    return (
        <>
            <Button
                disabled={isSavingNew}
                variant={typeButton === 1 ? 'neutral' : 'link'}
                className='text-primary text-decoration-none'
                onClick={() => {
                    dispatch(startAddNewVoucher())
                }}
            >
                Nuevo comprobante
            </Button>
            <Modal
                show={!!activeNew}
                onHide={() => dispatch(setActiveNewVoucher(null))}
                backdrop='static'
                size='lg'
            >
                <Modal.Header closeButton={!isSavingNew}>
                    <Modal.Title>Crear comprobante</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CreateVoucherStep pettycashActive={pettycash} />
                </Modal.Body>
            </Modal>
        </>
    )
}

export const CreateVoucherStep = ({ pettycashActive }) => {

    const dispatch = useDispatch()
    const { activeNew, isSavingNew } = useSelector(state => state.voucher)
    const { register, control, setValue, handleSubmit, reset } = useForm()

    const handleSave = ({ voucherDay, cancelDay, typeReceipt, serie, numReceipt, socialReason, concept, typeIncomeExpenses, amountReceipt }) => {
        dispatch(editActiveNewVoucher({
            voucherDay,
            cancelDay,
            typeReceipt,
            serie,
            numReceipt,
            socialReason,
            idSocialReason: socialReason ? socialReason?.idSocialReason : '',
            nameSocialReason: socialReason ? socialReason?.nameSocialReason : '',
            concept,
            typeIncomeExpenses,
            amountReceipt,
            pettycash: pettycashActive ? pettycashActive?._id : null
        }))
        dispatch(startSaveNewVoucher())
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
                    <div className='mb-3'>
                        <label htmlFor='uVoucherDay' className='form-label'>Fecha del comprobante</label>
                        <Controller
                            control={control}
                            name='voucherDay'
                            rules={{ required: true }}
                            render={({
                                field: { onChange, value },
                            }) => (
                                <DatePicker
                                    id='uVoucherDay'
                                    value={value}
                                    onChange={(e) => {
                                        if (moment(e).isBefore(pettycashActive?.startDeclaration || new Date())) {
                                            setValue('cancelDay', pettycashActive?.startDeclaration || new Date())
                                        } else {
                                            setValue('cancelDay', e)
                                        }
                                        onChange(e)
                                    }}
                                />
                            )}
                        />
                        <div className='form-text'>
                            La fecha descrita en el comprobante al momento de emitirlo.
                        </div>
                    </div>
                </div>
                <div className='col-12 col-md-6'>
                    <div className='mb-3'>
                        <label htmlFor='uCancelDay' className='form-label'>Fecha de cancelación</label>
                        <Controller
                            control={control}
                            name='cancelDay'
                            rules={{ required: true }}
                            render={({
                                field: { onChange, value },
                            }) => (
                                <DatePicker
                                    id='uCancelDay'
                                    minDate={moment(pettycashActive?.startDeclaration || new Date()).toDate()}
                                    value={value}
                                    onChange={onChange}
                                />
                            )}
                        />
                        <div className='form-text'>
                            Fecha en que se hizo la cancelación del comprobante.
                        </div>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col-12 col-md-4'>
                    <Form.Group className='mb-3' controlId='uTypeReceipt'>
                        <Form.Label>Tipo de comprobante</Form.Label>
                        <Form.Select
                            {...register('typeReceipt', { required: true })}
                            autoComplete='off'
                        >
                            <option value={'1'}>Factura</option>
                            <option value={'2'}>Recibo por honorarios</option>
                            <option value={'3'}>Boleta</option>
                            <option value={'PL'}>Planilla</option>
                            <option value={'RC'}>Recibo</option>
                            <option value={'NC'}>Nota de contabilidad</option>
                        </Form.Select>
                    </Form.Group>
                </div>
                <div className='col-12 col-md-4'>
                    <Form.Group className='mb-3' controlId='uSerie'>
                        <Form.Label>Serie</Form.Label>
                        <Form.Control
                            {...register('serie', { required: true })}
                            type='text'
                            autoComplete='off'
                        />
                    </Form.Group>
                </div>
                <div className='col-12 col-md-4'>
                    <Form.Group className='mb-3' controlId='uNumReceipt'>
                        <Form.Label>Número de comprobante</Form.Label>
                        <Form.Control
                            {...register('numReceipt', { required: true, min: 0.01 })}
                            type='number'
                            min={0.01}
                            step={0.01}
                            autoComplete='off'
                        />
                    </Form.Group>
                </div>
            </div>
            <div className='row'>
                <div className='col-12'>
                    <div className='mb-3'>
                        <label htmlFor='uSocialReason' className='form-label'>Razón social</label>
                        <Controller
                            name='socialReason'
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) =>
                                <AsyncSelect
                                    {...field}
                                    inputId='uSocialReason'
                                    classNamePrefix='rc-select'
                                    isClearable
                                    defaultOptions
                                    loadOptions={searchSocialReason}
                                    menuPlacement={'auto'}
                                    placeholder={`Buscar...`}
                                    loadingMessage={({ inputValue }) => `Buscando '${inputValue}'`}
                                    noOptionsMessage={({ inputValue }) => `Sin resultados con ...${inputValue}`}
                                    getOptionValue={e => e._id}
                                    getOptionLabel={e => `${e.idSocialReason} - ${e.nameSocialReason}`}
                                />
                            }
                        />
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col-12'>
                    <Form.Group className='mb-3' controlId='uConcept'>
                        <Form.Label>Concepto</Form.Label>
                        <Form.Control
                            {...register('concept')}
                            as='textarea'
                            type='text'
                            autoComplete='off'
                        />
                    </Form.Group>
                </div>
            </div>
            <div className='row'>
                <div className='col-12 col-md-6'>
                    <Form.Group className='mb-3' controlId='uTypeIncomeExpenses'>
                        <Form.Label>Ingreso / egreso</Form.Label>
                        <Form.Select
                            {...register('typeIncomeExpenses', { required: true })}
                            autoComplete='off'
                        >
                            <option value={1}>Ingresos</option>
                            <option value={2}>Egresos</option>
                        </Form.Select>
                    </Form.Group>
                </div>
                <div className='col-12 col-md-6'>
                    <Form.Group className='mb-3' controlId='uAmountReceipt'>
                        <Form.Label>Importe rendido (S/.)</Form.Label>
                        <Form.Control
                            {...register('amountReceipt', {
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