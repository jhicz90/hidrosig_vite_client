import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import AsyncSelect from 'react-select/async'
import { pettycashApi, searchOrgz, useUpdatePettyCashByIdMutation } from '../../../store/actions'
import { DatePicker, Liner, OptionOrgz, TooltipInfo } from '../../../components'
import moment from 'moment'

export const PettyCashInformation = () => {

    const { pettycashid } = useParams()
    const { lvlAccess } = useSelector(state => state.auth)
    const { data = null } = useSelector(pettycashApi.endpoints.getPettyCashById.select(pettycashid))
    const [updateUserFarm, { isLoading: isUpdating }] = useUpdatePettyCashByIdMutation()
    const { register, control, handleSubmit, reset } = useForm()

    const handleUpdate = ({ organization, ...updateData }) => {
        updateUserFarm({
            id: pettycashid,
            pettycash: {
                ...updateData,
                organization: organization._id,
                docModelOrg: organization.orgz
            }
        })
    }

    useEffect(() => {
        reset({
            ...data,
            startDeclaration: moment(data.startDeclaration).format('YYYY-MM-DD')
        })
    }, [reset, data])

    return (
        <form id='form-accounting-pettycash-edit-info' onSubmit={handleSubmit(handleUpdate)}>
            <div className='d-flex justify-content-end gap-2'>
                <Button
                    disabled={isUpdating}
                    variant='primary'
                    type='submit'
                >
                    Guardar cambios
                </Button>
            </div>
            <Liner>Información</Liner>
            <Form.Group as={Row} className='mb-3' controlId='pCode'>
                <Form.Label column sm='2'>
                    Código
                </Form.Label>
                <Col sm='10'>
                    <Form.Control
                        {...register('code', { required: true })}
                        type='text'
                        // disabled
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
    )
}