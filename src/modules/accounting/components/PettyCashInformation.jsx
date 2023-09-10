import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import AsyncSelect from 'react-select/async'
import { searchOrgz, useGetPettyCashByIdQuery, useUpdatePettyCashByIdMutation } from '../../../store/actions'
import { DatePicker, Liner, OptionOrgz, TooltipInfo } from '../../../components'

export const PettyCashInformation = () => {

    const { pettycashid } = useParams()
    const { lvlAccess } = useSelector(state => state.auth)
    const { data = null } = useGetPettyCashByIdQuery(pettycashid)
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
            ...data
        })
    }, [reset, data])

    return (
        <form className='container-flex-stack' id='form-accounting-pettycash-edit-info' onSubmit={handleSubmit(handleUpdate)}>
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
            <Row>
                <Col md={6}>
                    <Form.Group as={Row}>
                        <Form.Label column md={4}>
                            Código
                        </Form.Label>
                        <Col md={8}>
                            <Form.Control
                                {...register('code', { required: true })}
                                type='text'
                                disabled
                                autoComplete='off'
                                readOnly
                            />
                        </Col>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <Form.Group as={Row}>
                        <Form.Label column md={4}>
                            Año
                        </Form.Label>
                        <Col md={8}>
                            <Form.Control
                                {...register('year', {
                                    required: true,
                                    min: 1990,
                                    max: new Date().getFullYear()
                                })}
                                type='number'
                                autoComplete='off'
                            />
                        </Col>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group as={Row}>
                        <Form.Label column md={4}>
                            Nombre
                        </Form.Label>
                        <Col md={8}>
                            <Form.Control
                                {...register('name', { required: true })}
                                type='text'
                                autoComplete='off'
                            />
                        </Col>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group as={Row}>
                        <Form.Label column md={2}>
                            Descripción
                        </Form.Label>
                        <Col md={10}>
                            <Form.Control
                                {...register('desc')}
                                as='textarea'
                                type='text'
                                autoComplete='off'
                                rows={6}
                            />
                        </Col>
                    </Form.Group>
                </Col>
            </Row>
            {
                lvlAccess === 1
                &&
                <React.Fragment>
                    <Liner>Organización</Liner>
                    <Row>
                        <Col md={6}>
                            <Form.Group as={Row}>
                                <Form.Label column md={4}>
                                    Junta o Comisión
                                </Form.Label>
                                <Col md={8}>
                                    <Controller
                                        name='organization'
                                        control={control}
                                        rules={{ required: true }}
                                        render={
                                            ({ field }) =>
                                                <AsyncSelect
                                                    {...field}
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
                                                    hideSelectedOptions
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
                        </Col>
                    </Row>
                </React.Fragment>
            }
            <Liner>Comprobante o ficha</Liner>
            <Row>
                <Col md={6}>
                    <Form.Group as={Row}>
                        <Form.Label column md={4}>
                            Fecha / Número
                        </Form.Label>
                        <Col md={8}>
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
                            <Form.Text muted>
                                La fecha de comprobante se usa para dar inicio a la declaración de la liquidación.
                            </Form.Text>
                        </Col>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group as={Row}>
                        <Form.Label column md={4}>
                            Número
                        </Form.Label>
                        <Col md={8}>
                            <Form.Control
                                {...register('receipt', { required: true })}
                                type='text'
                                autoComplete='off'
                            />
                            <Form.Text muted>
                                El número para llevar una correlación con contabilidad.
                            </Form.Text>
                        </Col>
                    </Form.Group>
                </Col>
            </Row>
            <Liner>Cheque</Liner>
            <Row>
                <Col md={6}>
                    <Form.Group as={Row}>
                        <Form.Label column md={4}>
                            Número
                        </Form.Label>
                        <Col md={8}>
                            <Form.Control
                                {...register('check', { required: true })}
                                type='text'
                                autoComplete='off'
                            />
                        </Col>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group as={Row}>
                        <Form.Label column md={4}>
                            Monto
                        </Form.Label>
                        <Col md={8}>
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
                        </Col>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <Form.Group as={Row}>
                        <Form.Label column md={4}>
                            Saldo
                        </Form.Label>
                        <Col md={8}>
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
                            <Form.Text muted>
                                Si al momento de iniciar esta declaración existe un saldo previo a esta caja ingresar en saldo ese monto.
                            </Form.Text>
                        </Col>
                    </Form.Group>
                </Col>
            </Row>
        </form>
    )
}