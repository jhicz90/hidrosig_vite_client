import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import { Button, Form } from 'react-bootstrap'
import AsyncSelect from 'react-select/async'
import { DatePicker, Liner, LoadingPage, OptionOrgz, TooltipInfo } from '../../../components'
import { useNavigateState } from '../../../hooks'
import { searchOrgz, useAddPettyCashMutation, useLazyNewPettyCashQuery } from '../../../store/actions'

export const PettyCashCreatePage = () => {

    const [redirect, redirectEscape] = useNavigateState('/app/acct/petty_cash')

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

    const handleDiscard = () => {
        redirect()
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
        if (isError) {
            redirectEscape()
        }
    }, [isError])

    useEffect(() => {
        if (isSaved) {
            newPettyCash()
        }
    }, [isSaved])

    if (isLoading) {
        return <LoadingPage />
    }

    return (
        <div className='container-fluid'>
            <div className='row my-3'>
                <div className='col-12'>
                    <div className='row align-items-center justify-content-between g-3'>
                        <div className='col-12 col-md-auto'>
                            <h4 className='mb-0'>NUEVA CAJA CHICA</h4>
                        </div>
                        <div className='col-12 col-md-auto'>
                            <div className='d-flex gap-2'>
                                {/* <Link to={`/app/acct/petty_cash`} className='btn btn-secondary'>CAJA CHICA</Link> */}
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
                                    form='form-accounting-pettycash-create'
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
                    <form id='form-accounting-pettycash-create' onSubmit={handleSubmit(handleSave)}>
                        <Liner>Información</Liner>
                        <div className='row'>
                            <div className='col-12 col-md-3 col-xl-2'>
                                <Form.Group className='mb-3' controlId='newCode'>
                                    <Form.Label>Código</Form.Label>
                                    <Form.Control
                                        {...register('code', { required: true })}
                                        type='text'
                                        disabled
                                        autoComplete='off'
                                        readOnly
                                    />
                                </Form.Group>
                            </div>
                            <div className='col-12 col-md-3 col-xl-2'>
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
                            <div className='col-12 col-md-6 col-xl-8'>
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
                        <Liner>Comprobante o ficha</Liner>
                        <div className='row'>
                            <div className='col-12 col-md-3 col-xl-2'>
                                <Form.Group className='mb-3' controlId='newStartDeclaration'>
                                    <Form.Label>Fecha <TooltipInfo message={'La fecha de comprobante se usa para dar inicio a la declaración de la liquidación.'} /></Form.Label>
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
                                </Form.Group>
                            </div>
                            <div className='col-12 col-md-3 col-xl-2'>
                                <Form.Group className='mb-3' controlId='newReceipt'>
                                    <Form.Label>Número</Form.Label>
                                    <Form.Control
                                        {...register('receipt', { required: true })}
                                        type='text'
                                        autoComplete='off'
                                    />
                                </Form.Group>
                            </div>
                        </div>
                        <Liner>Cheque</Liner>
                        <div className='row'>
                            <div className='col-12 col-md-3 col-xl-2'>
                                <Form.Group className='mb-3' controlId='newCheck'>
                                    <Form.Label>Número</Form.Label>
                                    <Form.Control
                                        {...register('check', { required: true })}
                                        type='text'
                                        autoComplete='off'
                                    />
                                </Form.Group>
                            </div>
                            <div className='col-12 col-md-3 col-xl-2'>
                                <Form.Group className='mb-3' controlId='newRemainingAmount'>
                                    <Form.Label>Monto (S/.)</Form.Label>
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
                            <div className='col-12 col-md-3 col-xl-2'>
                                <Form.Group className='mb-3' controlId='newOldBalance'>
                                    <Form.Label>Saldo (S/.) <TooltipInfo message={'Si al momento de iniciar esta declaración existe un saldo previo a esta caja.'} /></Form.Label>
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
                                </Form.Group>
                            </div>
                        </div>
                        {
                            lvlAccess === 1
                            &&
                            <>
                                <Liner>Organización</Liner>
                                <div className='row'>
                                    <div className='col-12 col-md-4 col-xl-3'>
                                        <Form.Group className='mb-3' controlId='newOrgz'>
                                            <Form.Label>Junta o Comisión <TooltipInfo message={'Seleccione la organización a la que pertenecera esta caja chica.'} /></Form.Label>
                                            <Controller
                                                name='organization'
                                                control={control}
                                                rules={{ required: true }}
                                                render={
                                                    ({ field }) =>
                                                        <AsyncSelect
                                                            {...field}
                                                            inputId='newOrgz'
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
                                        </Form.Group>
                                    </div>
                                </div>
                            </>
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}
