import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Button, Card, Form } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import moment from 'moment'
import AsyncSelect from 'react-select/async'
import { searchSocialReason, useUpdateVoucherByIdMutation, voucherApi } from '../../../store/actions'
import { DatePicker, OptionSocialReason } from '../../../components'

export const VoucherInformation = () => {

    const { voucherid } = useParams()
    const { data = null } = useSelector(voucherApi.endpoints.getVoucherById.select(voucherid))
    const [updateVoucher, { isLoading: isUpdating }] = useUpdateVoucherByIdMutation()
    const { register, control, handleSubmit, reset } = useForm()

    const handleUpdate = async ({ socialReason, ...newData }) => {
        try {
            await updateVoucher({
                id: data._id,
                voucher: {
                    ...newData,
                    socialReason,
                    idSocialReason: socialReason ? socialReason?.idSocialReason : '',
                    nameSocialReason: socialReason ? socialReason?.nameSocialReason : '',
                }
            })
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        reset({
            ...data
        })
    }, [reset, data])

    // const dispatch = useDispatch()
    // const { active, isSaving } = useSelector(state => state.voucher)
    // const { register, control, setValue, handleSubmit, reset } = useForm()

    // const handleSave = ({ voucherDay, cancelDay, typeReceipt, serie, numReceipt, socialReason, concept, typeIncomeExpenses, amountReceipt }) => {
    //     dispatch(startUpdateInformationVoucher({
    //         voucherDay,
    //         cancelDay,
    //         typeReceipt,
    //         serie,
    //         numReceipt,
    //         socialReason,
    //         idSocialReason: socialReason ? socialReason?.idSocialReason : '',
    //         nameSocialReason: socialReason ? socialReason?.nameSocialReason : '',
    //         concept,
    //         typeIncomeExpenses,
    //         amountReceipt
    //     }))
    // }

    // useEffect(() => {
    //     reset({
    //         ...active
    //     })
    // }, [reset, active])

    return (
        <Card>
            <Card.Body>
                <form id='form-accounting-voucher-edit-info' onSubmit={handleSubmit(handleUpdate)}>
                    <div className='row'>
                        <div className='col-12 col-md-6'>
                            <Form.Group className='mb-3' controlId='pVoucherDay'>
                                <Form.Label>Fecha del comprobante</Form.Label>
                                <Controller
                                    control={control}
                                    name='voucherDay'
                                    rules={{ required: true }}
                                    render={({
                                        field: { onChange, value },
                                    }) => (
                                        <DatePicker
                                            id='pVoucherDay'
                                            value={value}
                                            onChange={(e) => {
                                                if (moment(e).isBefore(data.pettycash.startDeclaration || new Date())) {
                                                    setValue('cancelDay', data.pettycash.startDeclaration || new Date())
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
                            <Form.Group className='mb-3' controlId='pCancelDay'>
                                <Form.Label>Fecha de cancelación</Form.Label>
                                <Controller
                                    control={control}
                                    name='cancelDay'
                                    rules={{ required: true }}
                                    render={({
                                        field: { onChange, value },
                                    }) => (
                                        <DatePicker
                                            id='pCancelDay'
                                            minDate={moment(data.pettycash.startDeclaration || new Date()).toDate()}
                                            value={value}
                                            onChange={onChange}
                                        />
                                    )}
                                />
                                <Form.Text>
                                    Fecha en que se hizo la cancelación del comprobante.
                                </Form.Text>
                            </Form.Group>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-12 col-md-4'>
                            <Form.Group className='mb-3' controlId='pTypeReceipt'>
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
                            <Form.Group className='mb-3' controlId='pSerie'>
                                <Form.Label>Serie</Form.Label>
                                <Form.Control
                                    {...register('serie', { required: true })}
                                    type='text'
                                    autoComplete='off'
                                />
                            </Form.Group>
                        </div>
                        <div className='col-12 col-md-4'>
                            <Form.Group className='mb-3' controlId='pNumReceipt'>
                                <Form.Label>Número</Form.Label>
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
                            <Form.Group className='mb-3' controlId='pSocialReason'>
                                <Form.Label>Razón social</Form.Label>
                                <Controller
                                    name='socialReason'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) =>
                                        <AsyncSelect
                                            {...field}
                                            inputId='pSocialReason'
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
                            <Form.Group className='mb-3' controlId='pConcept'>
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
                            <Form.Group className='mb-3' controlId='pTypeIncomeExpenses'>
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
                            <Form.Group className='mb-3' controlId='pAmountReceipt'>
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
                            disabled={isUpdating}
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
