import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import moment from 'moment'
import AsyncSelect from 'react-select/async'
import { SocialReasonCreate } from '.'
import { searchSocialReason, useGetVoucherByIdQuery, useUpdateVoucherByIdMutation } from '../../../store/actions'
import { DatePicker, Liner, OptionSocialReason } from '../../../components'

export const VoucherInformation = () => {

    const { voucherid } = useParams()
    const { data = null } = useGetVoucherByIdQuery(voucherid)
    const [updateVoucher, { isLoading: isUpdating }] = useUpdateVoucherByIdMutation()
    const { register, control, handleSubmit, reset, setValue } = useForm()

    const handleUpdate = ({ socialReason, ...newData }) => {
        updateVoucher({
            id: data._id,
            voucher: {
                ...newData,
                socialReason,
                idSocialReason: socialReason ? socialReason?.idSocialReason : '',
                nameSocialReason: socialReason ? socialReason?.nameSocialReason : '',
            }
        })
    }

    useEffect(() => {
        reset({
            ...data
        })
    }, [reset, data])

    return (
        <form className='container-flex-stack' id='form-accounting-voucher-edit-info' onSubmit={handleSubmit(handleUpdate)}>
            <div className='d-flex justify-content-end gap-2'>
                <Button
                    disabled={isUpdating}
                    type='submit'
                    variant='primary'
                >
                    Guardar cambios
                </Button>
            </div>
            <Liner>Información</Liner>
            <Form.Group as={Row}>
                <Form.Label column sm='2'>
                    Fecha del comprobante / Cancelación
                </Form.Label>
                <Col sm='10'>
                    <InputGroup>
                        <Controller
                            control={control}
                            name='voucherDay'
                            rules={{ required: true }}
                            render={({
                                field: { onChange, value },
                            }) => (
                                <DatePicker
                                    title='Fecha del comprobante'
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
                        <Controller
                            control={control}
                            name='cancelDay'
                            rules={{ required: true }}
                            render={({
                                field: { onChange, value },
                            }) => (
                                <DatePicker
                                    title='Fecha de cancelación'
                                    minDate={moment(data.pettycash.startDeclaration || new Date()).toDate()}
                                    value={value}
                                    onChange={onChange}
                                />
                            )}
                        />
                    </InputGroup>
                    <Form.Text muted>
                        Ingrese la fecha del comprobante fisico y la fecha en que se hizo la cancelación del comprobante.
                    </Form.Text>
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm='2'>
                    Tipo de comprobante / Serie / Número
                </Form.Label>
                <Col sm='10'>
                    <InputGroup>
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
                        <Form.Control
                            {...register('serie', { required: true })}
                            type='text'
                            autoComplete='off'
                        />
                        <Form.Control
                            {...register('numReceipt', { required: true, min: 0.01 })}
                            type='number'
                            min={0.01}
                            step={0.01}
                            autoComplete='off'
                        />
                    </InputGroup>
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm='2'>
                    Documento o Razón social
                </Form.Label>
                <Col sm='10'>
                    <Controller
                        name='socialReason'
                        control={control}
                        rules={{ required: true }}
                        render={
                            ({ field }) =>
                                <AsyncSelect
                                    {...field}
                                    classNamePrefix='rc-select'
                                    isClearable
                                    defaultOptions
                                    loadOptions={searchSocialReason}
                                    hideSelectedOptions
                                    menuPlacement={'auto'}
                                    placeholder={`Buscar...`}
                                    loadingMessage={({ inputValue }) => `Buscando '${inputValue}'`}
                                    noOptionsMessage={({ inputValue }) => `Sin resultados con ...${inputValue}`}
                                    getOptionValue={e => e._id}
                                    getOptionLabel={e => <OptionSocialReason scr={e} />}
                                />
                        }
                    />
                    <Form.Text muted>
                        Si el documento o la razón social no se encuentra en la lista <SocialReasonCreate message='ingrese nueva razón social' />.
                    </Form.Text>
                </Col>
            </Form.Group>
            <Liner>Detalle</Liner>
            <Form.Group as={Row}>
                <Form.Label column sm='2'>
                    Concepto
                </Form.Label>
                <Col sm='10'>
                    <Form.Control
                        {...register('concept', { required: true, minLength: 4 })}
                        as='textarea'
                        type='text'
                        autoComplete='off'
                        rows={6}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm='2'>
                    Ingreso - egreso / Importe
                </Form.Label>
                <Col sm='10'>
                    <InputGroup>
                        <Form.Select
                            {...register('typeIncomeExpenses', {
                                required: true
                            })}
                            autoComplete='off'
                        >
                            <option value={1}>Ingresos</option>
                            <option value={2}>Egresos</option>
                        </Form.Select>
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
                    </InputGroup>
                </Col>
            </Form.Group>
        </form>
    )
}
