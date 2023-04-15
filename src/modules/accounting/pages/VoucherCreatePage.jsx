import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import { Button, Form } from 'react-bootstrap'
import AsyncSelect from 'react-select/async'
import moment from 'moment'
import { DatePicker, Liner, LoadingPage, OptionSocialReason, TooltipInfo } from '../../../components'
import { useNavigateState } from '../../../hooks'
import { searchSocialReason, useAddVoucherMutation, useLazyNewVoucherQuery } from '../../../store/actions'

export const VoucherCreatePage = () => {

    const { state: params } = useLocation()
    const [redirect, redirectEscape] = useNavigateState('/app/acct/voucher')

    const [newVoucher, { data = null, isLoading, isError }] = useLazyNewVoucherQuery()
    const [addVoucher, { isLoading: isSavingAdd, isSuccess: isSaved }] = useAddVoucherMutation()
    const { control, register, handleSubmit, reset, setValue } = useForm()

    const handleSave = async ({ socialReason, ...newData }) => {
        try {
            await addVoucher({
                ...newData,
                socialReason,
                idSocialReason: socialReason ? socialReason?.idSocialReason : '',
                nameSocialReason: socialReason ? socialReason?.nameSocialReason : '',
            })
        } catch (err) {
            console.log(err)
        }
    }

    const handleDiscard = () => {
        redirect()
    }

    useEffect(() => {
        newVoucher(params?.pettycashId)
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
            newVoucher(params?.pettycashId)
        }
    }, [isSaved])

    if (isLoading) {
        return <LoadingPage />
    }

    return (
        <>
            <div className='container-fluid'>
                <div className='row my-3'>
                    <div className='col-12'>
                        <div className='row align-items-center justify-content-between g-3'>
                            <div className='col-12 col-md-auto'>
                                <h4 className='mb-0'>NUEVO COMPROBANTE</h4>
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
                                        form='form-accounting-voucher-create'
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
                        <form id='form-accounting-voucher-create' onSubmit={handleSubmit(handleSave)}>
                            <Liner>Información</Liner>
                            <div className='row'>
                                <div className='col-12 col-md-3 col-xl-2'>
                                    <Form.Group className='mb-3' controlId='newVoucherDay'>
                                        <Form.Label>Fecha del comprobante <TooltipInfo message={'La fecha de comprobante se usa para dar inicio a la declaración de la liquidación.'} /></Form.Label>
                                        <Controller
                                            control={control}
                                            name='voucherDay'
                                            rules={{ required: true }}
                                            render={({
                                                field: { onChange, value },
                                            }) => (
                                                <DatePicker
                                                    id='newVoucherDay'
                                                    value={value}
                                                    onChange={(e) => {
                                                        if (moment(e).isBefore(data?.pettycash?.startDeclaration || new Date())) {
                                                            setValue('cancelDay', data?.pettycash?.startDeclaration || new Date())
                                                        } else {
                                                            setValue('cancelDay', e)
                                                        }
                                                        onChange(e)
                                                    }}
                                                />
                                            )}
                                        />
                                    </Form.Group>
                                </div>
                                <div className='col-12 col-md-3 col-xl-2'>
                                    <Form.Group className='mb-3' controlId='newCancelDay'>
                                        <Form.Label>Fecha de cancelación <TooltipInfo message={'Fecha en que se hizo la cancelación del comprobante.'} /></Form.Label>
                                        <Controller
                                            control={control}
                                            name='cancelDay'
                                            rules={{ required: true }}
                                            render={({
                                                field: { onChange, value },
                                            }) => (
                                                <DatePicker
                                                    id='newCancelDay'
                                                    minDate={moment(data?.pettycash?.startDeclaration || new Date()).toDate()}
                                                    value={value}
                                                    onChange={onChange}
                                                />
                                            )}
                                        />
                                    </Form.Group>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-12 col-md-3 col-xl-2'>
                                    <Form.Group className='mb-3' controlId='newTypeReceipt'>
                                        <Form.Label>Tipo</Form.Label>
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
                                <div className='col-12 col-md-3 col-xl-2'>
                                    <Form.Group className='mb-3' controlId='newSerie'>
                                        <Form.Label>Serie</Form.Label>
                                        <Form.Control
                                            {...register('serie', { required: true })}
                                            type='text'
                                            autoComplete='off'
                                        />
                                    </Form.Group>
                                </div>
                                <div className='col-12 col-md-3 col-xl-2'>
                                    <Form.Group className='mb-3' controlId='newNumReceipt'>
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
                                <div className='col-12 col-md-9 col-xl-6'>
                                    <Form.Group className='mb-3' controlId='newSocialReason'>
                                        <Form.Label>Razón social</Form.Label>
                                        <Controller
                                            name='socialReason'
                                            control={control}
                                            rules={{ required: true }}
                                            render={
                                                ({ field }) =>
                                                    <AsyncSelect
                                                        {...field}
                                                        inputId='newSocialReason'
                                                        classNamePrefix='rc-select'
                                                        isClearable
                                                        defaultOptions
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
                            <Liner>Detalle</Liner>
                            <div className='row'>
                                <div className='col-12'>
                                    <Form.Group className='mb-3' controlId='newConcept'>
                                        <Form.Label>Concepto</Form.Label>
                                        <Form.Control
                                            {...register('concept', { required: true, minLength: 4 })}
                                            type='text'
                                            autoComplete='off'
                                        />
                                    </Form.Group>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-12 col-md-3 col-xl-2'>
                                    <Form.Group className='mb-3' controlId='newTypeIncomeExpenses'>
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
                                <div className='col-12 col-md-3 col-xl-2'>
                                    <Form.Group className='mb-3' controlId='newAmountReceipt'>
                                        <Form.Label>Importe (S/.)</Form.Label>
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
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
