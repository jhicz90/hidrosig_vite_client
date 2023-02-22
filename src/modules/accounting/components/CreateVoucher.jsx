import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Button, Form, Offcanvas } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import moment from 'moment'
import validator from 'validator'
import AsyncSelect from 'react-select/async'
import { searchSocialReason, useAddVoucherMutation, useNewVoucherQuery } from '../../../store/actions'
import { DatePicker, LoadingPage, OptionSocialReason } from '../../../components'
import { useNavigateState } from '../../../hooks'

export const CreateVoucher = () => {
    const [searchParams] = useSearchParams()
    const { w, ptt = '' } = Object.fromEntries([...searchParams])

    return (
        <>
            {
                (w === 'voucher_create' && validator.isMongoId(ptt))
                &&
                <CreateVoucherWindow ptt={ptt} />
            }
        </>
    )
}

const CreateVoucherWindow = ({ ptt = null }) => {

    const [show, setShow] = useState(true)

    const [state, redirect, redirectEscape] = useNavigateState('/app/acct/petty_cash')

    const { data = null, isLoading, isError } = useNewVoucherQuery(ptt, { refetchOnMountOrArgChange: true })
    const [addVoucher, { isLoading: isSaving }] = useAddVoucherMutation()
    const { register, control, setValue, handleSubmit, reset } = useForm()

    const handleSave = async ({ socialReason, ...newData }) => {
        try {
            await addVoucher({
                ...newData,
                socialReason,
                idSocialReason: socialReason ? socialReason?.idSocialReason : '',
                nameSocialReason: socialReason ? socialReason?.nameSocialReason : '',
            })
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
                <Offcanvas.Title>Crear comprobante</Offcanvas.Title>
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
                                    form='form-accounting-voucher-create'
                                    className='w-100'
                                >
                                    Guardar nuevo
                                </Button>
                            </div>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <form id='form-accounting-voucher-create' onSubmit={handleSubmit(handleSave)}>
                                <div className='row'>
                                    <div className='col-12 col-md-6'>
                                        <Form.Group className='mb-3' controlId='newVoucherDay'>
                                            <Form.Label>Fecha del comprobante</Form.Label>
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
                                            <Form.Text>
                                                La fecha de comprobante se usa para dar inicio a la declaración de la liquidación.
                                            </Form.Text>
                                        </Form.Group>
                                    </div>
                                    <div className='col-12 col-md-6'>
                                        <Form.Group className='mb-3' controlId='newCancelDay'>
                                            <Form.Label>Fecha de cancelación</Form.Label>
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
                                            <Form.Text>
                                                Fecha en que se hizo la cancelación del comprobante.
                                            </Form.Text>
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-12 col-md-4'>
                                        <Form.Group className='mb-3' controlId='newTypeReceipt'>
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
                                        <Form.Group className='mb-3' controlId='newSerie'>
                                            <Form.Label>Serie</Form.Label>
                                            <Form.Control
                                                {...register('serie', { required: true })}
                                                type='text'
                                                autoComplete='off'
                                            />
                                        </Form.Group>
                                    </div>
                                    <div className='col-12 col-md-4'>
                                        <Form.Group className='mb-3' controlId='newNumReceipt'>
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
                                    <div className='col-12 col-md-6'>
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
                                    <div className='col-12 col-md-6'>
                                        <Form.Group className='mb-3' controlId='newAmountReceipt'>
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
                            </form>
                        </Offcanvas.Body>
                    </>
                    :
                    <LoadingPage />
            }
        </Offcanvas>
    )
}