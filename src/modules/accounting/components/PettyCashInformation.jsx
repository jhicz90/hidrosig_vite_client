import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Button, Card, Form } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import AsyncSelect from 'react-select/async'
import { pettycashApi, searchOrgz, useUpdatePettyCashByIdMutation } from '../../../store/actions'
import { DatePicker, Liner, OptionOrgz } from '../../../components'

export const PettyCashInformation = () => {

    const { pettycashid } = useParams()
    const { lvlAccess } = useSelector(state => state.auth)
    const { data = null } = useSelector(pettycashApi.endpoints.getPettyCashById.select(pettycashid))
    const [updateUserFarm, { isLoading: isUpdating }] = useUpdatePettyCashByIdMutation()
    const { register, control, handleSubmit, reset } = useForm({
        defaultValues: {
            organization: !!data?.organization?.orgId ? { _id: data?.organization?.orgId, name: data?.organization?.orgName, docid: data?.organization?.docId } : null
        }
    })

    const handleUpdate = ({ organization, ...updateData }) => {
        updateUserFarm({
            id: pettycashid,
            pettycash: {
                ...updateData,
                organization: {
                    orgId: organization._id,
                    orgName: organization.name,
                    docId: organization.docid
                }
            }
        })
    }

    useEffect(() => {
        reset({
            ...data,
            organization: !!data?.organization?.orgId ? { _id: data?.organization?.orgId, name: data?.organization?.orgName, docid: data?.organization?.docId } : null
        })
    }, [reset, data])

    return (
        <Card>
            <Card.Body>
                <form id='form-accounting-pettycash-edit' onSubmit={handleSubmit(handleUpdate)}>
                    <Liner>Información</Liner>
                    <div className='row'>
                        <div className='col-12 col-md-3'>
                            <Form.Group className='mb-3' controlId='pCode'>
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
                        <div className='col-12 col-md-3'>
                            <Form.Group className='mb-3' controlId='pYear'>
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
                        <div className='col-12 col-md-6'>
                            <Form.Group className='mb-3' controlId='pName'>
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
                            <Form.Group className='mb-3' controlId='pDesc'>
                                <Form.Label>Descripción</Form.Label>
                                <Form.Control
                                    {...register('desc')}
                                    as='textarea'
                                    type={'text'}
                                    autoComplete='off'
                                    rows={6}
                                />
                            </Form.Group>
                        </div>
                    </div>
                    <Liner>Detalle de efectivo</Liner>
                    <div className='row'>
                        <div className='col-12 col-md-6'>
                            <Form.Group className='mb-3' controlId='pStartDeclaration'>
                                <Form.Label>Fecha del comprobante</Form.Label>
                                <Controller
                                    control={control}
                                    name='startDeclaration'
                                    rules={{ required: true }}
                                    render={({
                                        field: { onChange, value },
                                    }) => (
                                        <DatePicker
                                            id='pStartDeclaration'
                                            value={value}
                                            onChange={onChange}
                                        />
                                    )}
                                />
                                <Form.Text>
                                    La fecha de comprobante se usa para dar inicio a la declaración de la liquidación.
                                </Form.Text>
                            </Form.Group>
                        </div>
                        <div className='col-12 col-md-6'>
                            <Form.Group className='mb-3' controlId='pReceipt'>
                                <Form.Label>Número de comprobante</Form.Label>
                                <Form.Control
                                    {...register('receipt', { required: true })}
                                    type='text'
                                    autoComplete='off'
                                />
                            </Form.Group>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-12 col-md-4'>
                            <Form.Group className='mb-3' controlId='pDocId'>
                                <Form.Label>Número de cheque</Form.Label>
                                <Form.Control
                                    {...register('check', { required: true })}
                                    type='text'
                                    autoComplete='off'
                                />
                            </Form.Group>
                        </div>
                        <div className='col-12 col-md-4'>
                            <Form.Group className='mb-3' controlId='pRemainingAmount'>
                                <Form.Label>Monto del cheque (S/.)</Form.Label>
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
                        <div className='col-12 col-md-4'>
                            <Form.Group className='mb-3' controlId='pOldBalance'>
                                <Form.Label>Saldo anterior (S/.)</Form.Label>
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
                                <Form.Text>
                                    Si al momento de iniciar esta declaración existe un saldo previo a esta caja.
                                </Form.Text>
                            </Form.Group>
                        </div>
                    </div>
                    {
                        lvlAccess === 1
                        &&
                        <div className='row'>
                            <div className='col'>
                                <Form.Group className='mb-3' controlId='pOrgz'>
                                    <Form.Label>Organización</Form.Label>
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
                                                            minHeight: '90px',
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
                    }
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
        </Card>
    )
}
