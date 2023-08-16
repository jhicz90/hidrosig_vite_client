import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap'
import AsyncSelect from 'react-select/async'
import { HiArrowUturnLeft } from 'react-icons/hi2'
import { DatePicker, Liner, LoadingPage, OptionOrgz } from '../../../components'
import { searchOrgz, useAddPettyCashMutation, useLazyNewPettyCashQuery } from '../../../store/actions'

export const PettyCashCreatePage = () => {

    const { lvlAccess } = useSelector(state => state.auth)
    const [newPettyCash, { data = null, isLoading, isError }] = useLazyNewPettyCashQuery()
    const [addPettyCash, { isLoading: isSavingAdd, isSuccess: isSaved }] = useAddPettyCashMutation()
    const { control, register, handleSubmit, reset, setValue } = useForm()

    const handleSave = async ({ organization, ...newData }) => {
        try {
            await addPettyCash({
                ...newData,
                organization: organization._id,
                docModelOrg: organization.orgz
            })
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        newPettyCash()
    }, [])

    useEffect(() => {
        reset({
            ...data
        })
    }, [reset, data])

    useEffect(() => {
        if (isSaved) {
            newPettyCash()
        }
    }, [isSaved])

    if (isLoading) {
        return <LoadingPage />
    }

    return (
        <React.Fragment>
            <div className='container'>
                <div className='d-lg-flex align-items-lg-center justify-content-lg-between my-3'>
                    <div className='min-w-400 flex-1'>
                        <h4 className='mb-0 text-uppercase'>NUEVA CAJA CHICA</h4>
                        {/* <div className='mt-1 mt-sm-0 d-flex flex-column flex-sm-row gap-0 gap-sm-4'>
                            <div className='mt-2 d-flex align-items-center gap-1 text-muted'>
                                <MdOutlineNumbers size={20} />
                                {data.receipt}
                            </div>
                            <div className='mt-2 d-flex align-items-center gap-1 text-muted'>
                                <HiCurrencyDollar size={20} />
                                {data.remainingAmount.toFixed(2)}
                            </div>
                            <div className='mt-2 d-flex align-items-center gap-1 text-muted'>
                                <LiaMoneyCheckAltSolid size={20} />
                                {data.check}
                            </div>
                            <div className='mt-2 d-flex align-items-center gap-1 text-muted'>
                                <HiCalendar size={20} />
                                <span className='text-capitalize'>{moment(data.startDeclaration).format('DD MMMM, YYYY')}</span>
                            </div>
                        </div> */}
                    </div>
                    <div className='mt-3 ms-lg-5 mt-lg-0 d-flex gap-2 flex-wrap'>
                        <Link
                            to={`/app/acct/petty_cash`}
                            className='btn btn-sm btn-neutral d-flex align-items-center gap-2'
                        >
                            <HiArrowUturnLeft />
                            Lista de caja chica
                        </Link>
                        {/* <Button
                            variant='primary'
                            size='sm'
                            className='d-flex align-items-center gap-2'
                            type='submit'
                            form='form-accounting-pettycash-create'
                        >
                            <FaRegFileExcel color='green' />
                            Exportar EXCEL
                        </Button> */}
                    </div>
                </div>
            </div>
            <div className='container'>
                <div className='mt-2'>
                    <form id='form-accounting-pettycash-create' onSubmit={handleSubmit(handleSave)}>
                        <div className='d-flex justify-content-end gap-2'>
                            <Button
                                disabled={isSavingAdd}
                                variant='primary'
                                type='submit'
                            >
                                Guardar cambios
                            </Button>
                        </div>
                        <Liner>Información</Liner>
                        <Form.Group as={Row} className='mb-3' controlId='newCode'>
                            <Form.Label column sm='2'>
                                Código
                            </Form.Label>
                            <Col sm='10'>
                                <Form.Control
                                    {...register('code', { required: true })}
                                    type='text'
                                    autoComplete='off'
                                    readOnly
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className='mb-3' controlId='pYearName'>
                            <Form.Label column sm='2'>
                                Año / Nombre
                            </Form.Label>
                            <Col sm='10'>
                                <InputGroup>
                                    <Form.Control
                                        {...register('year', {
                                            required: true,
                                            min: 1990,
                                            max: new Date().getFullYear()
                                        })}
                                        type='number'
                                        autoComplete='off'
                                    />
                                    <Form.Control
                                        {...register('name', { required: true })}
                                        type='text'
                                        autoComplete='off'
                                    />
                                </InputGroup>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className='mb-3' controlId='pDesc'>
                            <Form.Label column sm='2'>
                                Descripción
                            </Form.Label>
                            <Col sm='10'>
                                <Form.Control
                                    {...register('desc')}
                                    as='textarea'
                                    type={'text'}
                                    autoComplete='off'
                                    rows={6}
                                />
                            </Col>
                        </Form.Group>
                        {
                            lvlAccess === 1
                            &&
                            <>
                                <Liner>Organización</Liner>
                                <Form.Group as={Row} className='mb-3' controlId='pOrgz'>
                                    <Form.Label column sm='2'>
                                        Junta o Comisión
                                    </Form.Label>
                                    <Col sm='10'>
                                        <Controller
                                            name='organization'
                                            control={control}
                                            rules={{ required: true }}
                                            render={
                                                ({ field }) =>
                                                    <AsyncSelect
                                                        {...field}
                                                        inputId='pOrgz'
                                                        classNamePrefix='rc-select'
                                                        styles={{
                                                            control: (baseStyles, state) => ({
                                                                ...baseStyles,
                                                                minHeight: '60px',
                                                            }),
                                                        }}
                                                        isClearable
                                                        defaultOptions
                                                        loadOptions={searchOrgz}
                                                        menuPlacement={'auto'}
                                                        placeholder={`Buscar...`}
                                                        loadingMessage={({ inputValue }) => `Buscando '${inputValue}'`}
                                                        noOptionsMessage={({ inputValue }) => `Sin resultados con ...${inputValue}`}
                                                        getOptionValue={e => e._id}
                                                        getOptionLabel={e => <OptionOrgz orgz={e} />}
                                                    />
                                            }
                                        />
                                        <Form.Text muted>
                                            Seleccione la organización a la que pertenecera esta caja chica.
                                        </Form.Text>
                                    </Col>
                                </Form.Group>
                            </>
                        }
                        <Liner>Comprobante o ficha</Liner>
                        <Form.Group as={Row} className='mb-3' controlId='pStartDeclarationReceipt'>
                            <Form.Label column sm='2'>
                                Fecha / Número
                            </Form.Label>
                            <Col sm='10'>
                                <InputGroup>
                                    <Controller
                                        control={control}
                                        name='startDeclaration'
                                        rules={{ required: true }}
                                        render={({
                                            field: { onChange, value },
                                        }) => (
                                            <DatePicker
                                                value={value}
                                                onChange={onChange}
                                            />
                                        )}
                                    />
                                    <Form.Control
                                        {...register('receipt', { required: true })}
                                        type='text'
                                        autoComplete='off'
                                    />
                                </InputGroup>
                                <Form.Text muted>
                                    La fecha de comprobante se usa para dar inicio a la declaración de la liquidación. Y el número para llevar una correlación con contabilidad.
                                </Form.Text>
                            </Col>
                        </Form.Group>
                        <Liner>Cheque</Liner>
                        <Form.Group as={Row} className='mb-3' controlId='pCheckRemainingAmountOldBalance'>
                            <Form.Label column sm='2'>
                                Número / Monto / Saldo
                            </Form.Label>
                            <Col sm='10'>
                                <InputGroup>
                                    <Form.Control
                                        {...register('check', { required: true })}
                                        type='text'
                                        autoComplete='off'
                                    />
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
                                </InputGroup>
                                <Form.Text muted>
                                    Si al momento de iniciar esta declaración existe un saldo previo a esta caja ingresar en saldo ese monto.
                                </Form.Text>
                            </Col>
                        </Form.Group>
                    </form>
                </div>
            </div>
        </React.Fragment>
    )
}
