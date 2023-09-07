import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import AsyncSelect from 'react-select/async'
import { searchJunta, useGetWaterSourceByIdQuery, useUpdateWaterSourceByIdMutation } from '@/store/actions'
import { EditorTextArea, Liner, OptionOrgz } from '@/components'
import { useAuthStore } from '@/hooks'

export const WaterSourceInformation = () => {

    const { wsid } = useParams()
    const { lvlAccess } = useAuthStore()
    const { data = null, isLoading, isSuccess } = useGetWaterSourceByIdQuery(wsid)
    const [updateWaterSource, { isLoading: isUpdating }] = useUpdateWaterSourceByIdMutation()
    const { register, control, handleSubmit, reset } = useForm()

    const handleUpdate = async (newData) => {
        await updateWaterSource({
            id: wsid,
            watersource: newData
        })
    }

    useEffect(() => {
        reset({
            ...data
        })
    }, [reset, data])

    return (
        <form id='form-irrigation-watersource-edit' onSubmit={handleSubmit(handleUpdate)}>
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
                    <Form.Group as={Row} className='mb-3'>
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
                <Col md={6}>
                    <Form.Group as={Row} className='mb-3'>
                        <Form.Label column md={4}>
                            Tipo de fuente
                        </Form.Label>
                        <Col md={8}>
                            <Form.Select
                                {...register('type', { required: true })}
                                autoComplete='off'
                            >
                                <option value={''}>Elija el tipo de fuente</option>
                                <option value={1}>Agua de la red (Represas, canales)</option>
                                <option value={2}>Aguas superficiales (Rios, Lagos)</option>
                                <option value={3}>Agua de lluvia</option>
                                <option value={4}>Agua subterránea</option>
                                <option value={5}>Agua de mar desalada</option>
                                <option value={6}>Aguas residuales urbanas depuradas</option>
                                <option value={7}>Agua de drenaje</option>
                            </Form.Select>
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
                            <Controller
                                name='desc'
                                control={control}
                                rules={{ required: true }}
                                render={
                                    ({ field: { onChange, value } }) =>
                                        <EditorTextArea
                                            value={value}
                                            onChnage={onChange}
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
                            Observación
                        </Form.Label>
                        <Col md={10}>
                            <Form.Control
                                {...register('obs', { required: true })}
                                as='textarea'
                                type='text'
                                autoComplete='off'
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
                            <Form.Group as={Row} className='mb-3'>
                                <Form.Label column md={4}>
                                    Junta de usuarios
                                </Form.Label>
                                <Col md={8}>
                                    <Controller
                                        name='junta'
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
                                                    loadOptions={searchJunta}
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
                                </Col>
                            </Form.Group>
                        </Col>
                    </Row>
                </React.Fragment>
            }
        </form>
    )
}
