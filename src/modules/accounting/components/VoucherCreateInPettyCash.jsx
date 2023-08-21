import React, { useState, useEffect } from 'react'
import { Button, Form, Offcanvas } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import moment from 'moment'
import AsyncSelect from 'react-select/async'
import { SocialReasonCreate } from '.'
import { OffCanvasFooterStyled } from '../../../style'
import { DatePicker, Liner, LoadingPage, OptionSocialReason } from '../../../components'
import { searchSocialReason, useAddVoucherMutation, useLazyNewVoucherQuery } from '../../../store/actions'

export const VoucherCreateInPettyCash = ({ pettycash = null }) => {

    const [show, setShow] = useState(false)

    const [newVoucher, { data = null, isLoading }] = useLazyNewVoucherQuery()
    const [addVoucher, { isLoading: isSavingAdd }] = useAddVoucherMutation()

    const { control, register, handleSubmit, reset, setValue } = useForm()

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleSave = async ({ socialReason, ...newData }) => {
        await addVoucher({
            ...newData,
            socialReason,
            idSocialReason: socialReason ? socialReason?.idSocialReason : '',
            nameSocialReason: socialReason ? socialReason?.nameSocialReason : '',
        }).unwrap()
            .then(() => newVoucher(pettycash))
    }

    useEffect(() => {
        newVoucher(pettycash)
    }, [show])

    useEffect(() => {
        reset({
            ...data
        })
    }, [reset, data])

    return (
        <React.Fragment>
            <Button
                onClick={handleShow}
                variant='primary'
            >
                Nuevo comprobante
            </Button>
            <Offcanvas
                show={show}
                onHide={handleClose}
                placement='end'
            >
                <Offcanvas.Header closeButton closeVariant='white'>
                    <div className='d-flex flex-column'>
                        <Offcanvas.Title>Comprobante #NUEVO</Offcanvas.Title>
                    </div>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {
                        isLoading
                            ?
                            <LoadingPage />
                            :
                            <form id='form-accounting-voucher-pettycash-create' onSubmit={handleSubmit(handleSave)}>
                                <Liner>Información</Liner>
                                <div className='row'>
                                    <div className='col-12'>
                                        <Form.Group className='mb-3'>
                                            <Form.Label>Fecha del comprobante</Form.Label>
                                            <Controller
                                                control={control}
                                                name='voucherDay'
                                                rules={{ required: true }}
                                                render={({
                                                    field: { onChange, value },
                                                }) => (
                                                    <DatePicker
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
                                            <Form.Text muted>Ingrese la fecha del comprobante fisico.</Form.Text>
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-12'>
                                        <Form.Group className='mb-3'>
                                            <Form.Label>Fecha de cancelación</Form.Label>
                                            <Controller
                                                control={control}
                                                name='cancelDay'
                                                rules={{ required: true }}
                                                render={({
                                                    field: { onChange, value },
                                                }) => (
                                                    <DatePicker
                                                        minDate={moment(data?.pettycash?.startDeclaration || new Date()).toDate()}
                                                        value={value}
                                                        onChange={onChange}
                                                    />
                                                )}
                                            />
                                            <Form.Text muted>Fecha en que se hizo la cancelación del comprobante.</Form.Text>
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-12'>
                                        <Form.Group className='mb-3'>
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
                                </div>
                                <div className='row'>
                                    <div className='col-6'>
                                        <Form.Group className='mb-3'>
                                            <Form.Label>Serie</Form.Label>
                                            <Form.Control
                                                {...register('serie', { required: true })}
                                                type='text'
                                                autoComplete='off'
                                            />
                                        </Form.Group>
                                    </div>
                                    <div className='col-6'>
                                        <Form.Group className='mb-3'>
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
                                        <Form.Group className='mb-3'>
                                            <Form.Label>Documento o Razón social</Form.Label>
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
                                            <Form.Text muted>Si el documento o la razón social no se encuentra en la lista <SocialReasonCreate message='ingrese nueva razón social' />.</Form.Text>
                                        </Form.Group>
                                    </div>
                                </div>
                                <Liner>Detalle</Liner>
                                <div className='row'>
                                    <div className='col-12'>
                                        <Form.Group className='mb-3'>
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
                                    <div className='col-6'>
                                        <Form.Group className='mb-3'>
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
                                    <div className='col-6'>
                                        <Form.Group className='mb-3'>
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
                    }
                </Offcanvas.Body>
                <OffCanvasFooterStyled>
                    <Button
                        disabled={isSavingAdd}
                        onClick={handleClose}
                        type='button'
                        variant='neutral'
                    >
                        Cancelar
                    </Button>
                    <Button
                        disabled={isSavingAdd}
                        type='submit'
                        form='form-accounting-voucher-pettycash-create'
                        variant='primary'
                    >
                        Guardar
                    </Button>
                </OffCanvasFooterStyled>
            </Offcanvas>
        </React.Fragment>
    )
}
