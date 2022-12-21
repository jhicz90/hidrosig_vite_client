import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, Form } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import moment from 'moment'
import AsyncSelect from 'react-select/async'
import { searchSocialReason, startUpdateInformationVoucher } from '../../../store/actions'
import { DatePicker, OptionSocialReason } from '../../../components'

export const VoucherModuleInformation = () => {

    const dispatch = useDispatch()
    const { active, isSaving } = useSelector(state => state.voucher)
    const { register, control, setValue, handleSubmit, reset } = useForm()

    const handleSave = ({ voucherDay, cancelDay, typeReceipt, serie, numReceipt, socialReason, concept, typeIncomeExpenses, amountReceipt }) => {
        dispatch(startUpdateInformationVoucher({
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
            amountReceipt
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
                            <Form.Group className='mb-3' controlId='uVoucherDay'>
                                <Form.Label>Fecha del comprobante</Form.Label>
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
                                                if (moment(e).isBefore(active.pettycash.startDeclaration || new Date())) {
                                                    setValue('cancelDay', active.pettycash.startDeclaration || new Date())
                                                } else {
                                                    setValue('cancelDay', e)
                                                }
                                                onChange(e)
                                            }}
                                        />
                                    )}
                                />
                                <Form.Text>
                                    La fecha descrita en el comprobante al momento de emitirlo.
                                </Form.Text>
                            </Form.Group>
                        </div>
                        <div className='col-12 col-md-6'>
                            <Form.Group className='mb-3' controlId='uCancelDay'>
                                <Form.Label>Fecha de cancelación</Form.Label>
                                <Controller
                                    control={control}
                                    name='cancelDay'
                                    rules={{ required: true }}
                                    render={({
                                        field: { onChange, value },
                                    }) => (
                                        <DatePicker
                                            id='uCancelDay'
                                            minDate={moment(active.pettycash.startDeclaration || new Date()).toDate()}
                                            value={value}
                                            onChange={onChange}
                                        />
                                    )}
                                />
                                <div className='form-text'>
                                    Fecha en que se hizo la cancelación del comprobante.
                                </div>
                            </Form.Group>
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
                                    <option value={'DJ'}>Declaración jurada</option>
                                    <option value={'PM'}>Planilla de movilidad</option>
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
                            <Form.Group className='mb-3' controlId='uSocialReason'>
                                <Form.Label>Razón social</Form.Label>
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
                                            cacheOptions
                                            loadOptions={searchSocialReason}
                                            menuPlacement={'auto'}
                                            placeholder={`Buscar...`}
                                            loadingMessage={({ inputValue }) => `Buscando '${inputValue}'`}
                                            noOptionsMessage={({ inputValue }) => `Sin resultados con ...${inputValue}`}
                                            getOptionValue={e => e._id}
                                            getOptionLabel={e => <OptionSocialReason scr={e} />}
                                        />
                                    }
                                />
                            </Form.Group>
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
                            disabled={isSaving}
                            variant='primary'
                            type='submit'
                        >
                            Guardar cambios
                        </Button>
                    </div>
                </form>
            </Card.Body>
        </Card >
    )
}
