import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { Button, Col, Form, Row } from 'react-bootstrap'
import AsyncSelect from 'react-select/async'
import { AsyncSelectCustomBlockByJunta, Liner, OptionLocation } from '../../../components'
import { searchLocation, useGetFarmByIdQuery, useUpdateFarmByIdMutation } from '../../../store/actions'

export const AreaFarmInformation = () => {

    const { prpid } = useParams()
    const { data = null } = useGetFarmByIdQuery(prpid)
    const [updateFarm, { isLoading: isUpdating }] = useUpdateFarmByIdMutation()
    const methods = useForm()
    const { control, register, handleSubmit, watch, setValue, getValues, reset } = methods

    const handleUpdate = (updateData) => {
        updateFarm({
            id: prpid,
            farm: updateData
        })
    }

    useEffect(() => {
        reset({
            ...data
        })
    }, [reset, data])

    return (
        <FormProvider {...methods} >
            <form id='form-userregister-areafarm-edit-info' onSubmit={handleSubmit(handleUpdate)}>
                <div className='d-flex justify-content-end gap-2'>
                    <Button
                        disabled={isUpdating}
                        variant='primary'
                        type='submit'
                    >
                        Guardar cambios
                    </Button>
                </div>
                <Liner>Detalle</Liner>
                <Row>
                    <Col md={6}>
                        <Form.Group as={Row} className='mb-3'>
                            <Form.Label column md={4}>
                                Código
                            </Form.Label>
                            <Col md={8}>
                                <Form.Control
                                    {...register('code', { required: true })}
                                    type='text'
                                    disabled
                                    autoComplete='off'
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Group as={Row} className='mb-3'>
                            <Form.Label column md={4}>
                                Nombre del predio
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
                    <Col md={6}>
                        <Form.Group as={Row} className='mb-3'>
                            <Form.Label column md={4}>
                                Unidad Catastral
                            </Form.Label>
                            <Col md={8}>
                                <Form.Control
                                    {...register('cadUnit', { required: true })}
                                    type='text'
                                    autoComplete='off'
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group as={Row} className='mb-3'>
                            <Form.Label column md={2}>
                                Descripción
                            </Form.Label>
                            <Col md={10}>
                                <Form.Control
                                    {...register('desc')}
                                    type='text'
                                    as='textarea'
                                    autoComplete='off'
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                </Row>
                <Liner>Área</Liner>
                <Row>
                    <Col md={6}>
                        <Form.Group as={Row} className='mb-3'>
                            <Form.Label column md={4}>
                                Area total
                            </Form.Label>
                            <Col md={8}>
                                <Form.Control
                                    {...register('areaTotal', {
                                        required: true,
                                        min: 0.00001
                                    })}
                                    type='number'
                                    min={0}
                                    step={0.00001}
                                    autoComplete='off'
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group as={Row} className='mb-3'>
                            <Form.Label column md={4}>
                                Area de uso
                            </Form.Label>
                            <Col md={8}>
                                <Form.Control
                                    {...register('areaUse', { required: true, min: 0.00001 })}
                                    disabled
                                    readOnly
                                    type='number'
                                    min={0}
                                    step={0.00001}
                                    autoComplete='off'
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Group as={Row} className='mb-3'>
                            <Form.Label column md={4}>
                                Area de permiso
                            </Form.Label>
                            <Col md={8}>
                                <Form.Control
                                    {...register('areaPer', {
                                        required: true,
                                        onChange: (e) => setValue('areaUse', Number(getValues('areaLic')) + Number(e.target.value))
                                    })}
                                    type='number'
                                    min={0}
                                    step={0.00001}
                                    autoComplete='off'
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group as={Row} className='mb-3'>
                            <Form.Label column md={4}>
                                Area de licencia
                            </Form.Label>
                            <Col md={8}>
                                <Form.Control
                                    {...register('areaLic', {
                                        required: true,
                                        onChange: (e) => setValue('areaUse', Number(getValues('areaPer')) + Number(e.target.value))
                                    })}
                                    type='number'
                                    min={0}
                                    step={0.00001}
                                    autoComplete='off'
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                </Row>
                <Liner>Bloque de riego y ubicación</Liner>
                <Row>
                    <AsyncSelectCustomBlockByJunta />
                    <Col md={6}>
                        <Form.Group as={Row} className='mb-3'>
                            <Form.Label column md={4}>
                                Localidad
                            </Form.Label>
                            <Col md={8}>
                                <Controller
                                    name='location'
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
                                                        minHeight: '90px',
                                                    }),
                                                }}
                                                isClearable
                                                defaultOptions
                                                loadOptions={searchLocation}
                                                menuPlacement={'auto'}
                                                placeholder={`Buscar...`}
                                                loadingMessage={({ inputValue }) => `Buscando '${inputValue}'`}
                                                noOptionsMessage={({ inputValue }) => `Sin resultados con ...${inputValue}`}
                                                getOptionValue={e => e._id}
                                                getOptionLabel={e => <OptionLocation location={e} />}
                                            />
                                    }
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group as={Row} className='mb-3'>
                            <Form.Label column md={2}>
                                Lugar de referencia
                            </Form.Label>
                            <Col md={10}>
                                <Form.Control
                                    {...register('place')}
                                    type='text'
                                    autoComplete='off'
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                </Row>
            </form>
        </FormProvider>
    )
}
