import { useState, useEffect } from 'react'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form, ListGroup, Offcanvas } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import AsyncSelect from 'react-select/async'
import moment from 'moment'
import { IoMdAddCircleOutline } from 'react-icons/io'
import { editActiveVoucher, searchSocialReason, setActiveVoucher, startDeleteVoucher, startModalResource, startUpdateImageVoucher, startUpdateVoucher, useGetVoucherByIdQuery } from '../../../store/actions'
import { DatePicker, FileUpload, LoadingPage, OptionSocialReason } from '../../../components'

export const EditVoucher = () => {

    const [show, setShow] = useState(true)
    const { voucherid } = useParams()
    const redirect = useNavigate()
    const { state } = useLocation()
    const dispatch = useDispatch()
    const { data = null, isLoading, isError } = useGetVoucherByIdQuery(voucherid)
    const { active, isSaving } = useSelector(state => state.voucher)
    const urlBack = state?.from || '/app/acct/petty_cash'

    useEffect(() => {
        if (!!data) {
            dispatch(setActiveVoucher(data))
        }

        return () => {
            dispatch(setActiveVoucher(null))
        }
    }, [data])

    if (isError) {
        return <Navigate to={urlBack} replace />
    }

    return (
        <Offcanvas
            show={show}
            onHide={() => setShow(false)}
            onExited={() => redirect(urlBack)}
            enforceFocus={false}
            placement='end'
        >
            <Offcanvas.Header closeButton={!isSaving} closeVariant='white'>
                <Offcanvas.Title>
                    <div className='d-flex flex-column'>
                        <span>Comprobante</span>
                        <span>{active ? `${active.serie}-${active.numReceipt}` : 'Cargando...'}</span>
                    </div>
                </Offcanvas.Title>
            </Offcanvas.Header>
            {
                !!active
                    ?
                    <>
                        <Offcanvas.Header className='offcanvas-success'>
                            <div className='d-flex justify-content-end gap-2 w-100'>
                                <Button
                                    disabled={isSaving}
                                    variant='success'
                                    type='submit'
                                    form='form-accounting-voucher-edit'
                                    className='w-100'
                                >
                                    Guardar cambios
                                </Button>
                            </div>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <EditVoucherStep />
                        </Offcanvas.Body>
                        <div className='offcanvas-footer offcanvas-danger'>
                            <div className='d-flex justify-content-end gap-2 w-100'>
                                <Button
                                    onClick={() => {
                                        dispatch(startDeleteVoucher())
                                    }}
                                    disabled={isSaving}
                                    variant='danger'
                                    type='button'
                                    className='w-100'
                                >
                                    Eliminar
                                </Button>
                            </div>
                        </div>
                    </>
                    :
                    <LoadingPage />
            }
        </Offcanvas>
    )
}

const EditVoucherStep = () => {

    const dispatch = useDispatch()
    const { active } = useSelector(state => state.voucher)
    const { register, control, setValue, handleSubmit, reset } = useForm()

    const handleSave = ({ voucherDay, cancelDay, typeReceipt, serie, numReceipt, socialReason, concept, typeIncomeExpenses, amountReceipt }) => {
        dispatch(editActiveVoucher({
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
        dispatch(startUpdateVoucher())
    }

    const handleAddImage = () => {
        dispatch(startModalResource({
            tags: ['comprobante', `${active.serie}-${active.numReceipt}`],
            groupTypes: 'images',
            limit: 1,
            maxSize: 5,
            setFiles: (data) => dispatch(startUpdateImageVoucher(data))
        }))
    }

    useEffect(() => {
        reset({
            ...active
        })
    }, [reset, active])

    return (
        <>
            <form id='form-accounting-voucher-edit' onSubmit={handleSubmit(handleSave)}>
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
                        <Form.Group className='mb-3' controlId='pCancelDay'>
                            <Form.Label>Fecha de cancelaci??n</Form.Label>
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
                                Fecha en que se hizo la cancelaci??n del comprobante.
                            </div>
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
                                <option value={'DJ'}>Declaraci??n jurada</option>
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
                            <Form.Label>N??mero</Form.Label>
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
                            <Form.Label>Raz??n social</Form.Label>
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
            </form>
            <div className='row'>
                <div className='col'>
                    <Form.Group className='mb-3' controlId='pImages'>
                        <Form.Label>Imagenes</Form.Label>
                        <ListGroup>
                            <ListGroup.Item onClick={handleAddImage} className='d-flex align-items-center' action>
                                Agregar imagen <IoMdAddCircleOutline className='ms-2' size={20} color='green' />
                            </ListGroup.Item>
                            {
                                active.images.map(img =>
                                    <ListGroup.Item key={img.fileName}>
                                        <FileUpload file={img} />
                                    </ListGroup.Item>
                                )
                            }
                        </ListGroup>
                    </Form.Group>
                </div>
            </div>
        </>
    )
}