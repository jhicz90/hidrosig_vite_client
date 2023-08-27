import React, { useState, useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import { Button, Col, Form, Row } from 'react-bootstrap'
import Select from 'react-select'
import AsyncSelect from 'react-select/async'
import { Liner, OptionBlock, OptionLocation, OptionOrgz } from '../../../components'
import { searchJunta, searchLocation, useGetFarmByIdQuery, useLazyGetListBlockQuery, useUpdateFarmByIdMutation } from '../../../store/actions'
import { useAuthStore } from '../../../hooks'

export const AreaFarmInformation = () => {

    const { prpid } = useParams()
    const { lvlAccess } = useAuthStore()
    const { data = null } = useGetFarmByIdQuery(prpid)
    const [updateFarm, { isLoading: isUpdating }] = useUpdateFarmByIdMutation()
    const { control, register, handleSubmit, watch, setValue, getValues, reset } = useForm()

    const [searchBlock] = useLazyGetListBlockQuery()
    const [optionsCommittee, setOptionsCommittee] = useState(watch('junta')?.committees || [])
    const [optionsBlock, setOptionsBlock] = useState(watch('committee')?.blocks || [])

    const handleUpdate = (updateData) => {
        updateFarm({
            id: prpid,
            farm: updateData
        })
    }

    const customFilterCommittee = useCallback((candidate, input) => {
        if (input.length > 0) {
            return (
                candidate.data.name.toLowerCase().includes(input.toLowerCase()) ||
                candidate.data.nameAbrev.toLowerCase().includes(input.toLowerCase()) ||
                candidate.data.nameLarge.toLowerCase().includes(input.toLowerCase()) ||
                candidate.data.nameLargeAbrev.toLowerCase().includes(input.toLowerCase()) ||
                candidate.data.docid.toLowerCase().includes(input.toLowerCase()) ||
                candidate.data.email.toLowerCase().includes(input.toLowerCase())
            )
        }
        return true
    }, [])

    const customFilterBlock = useCallback((candidate, input) => {
        if (input.length > 0) {
            return (
                candidate.data.name.toLowerCase().includes(input.toLowerCase()) ||
                candidate.data.code.toLowerCase().includes(input.toLowerCase()) ||
                candidate.data.desc.toLowerCase().includes(input.toLowerCase())
            )
        }
        return true
    }, [])

    useEffect(() => {
        reset({
            ...data
        })
    }, [reset, data])

    useEffect(() => {
        if (Object.values(watch()).length > 0) {
            if (watch('junta').hasOwnProperty('committees')) {
                setOptionsCommittee(watch('junta')?.committees || [])
            } else {
                setOptionsCommittee([])
            }

            if (watch('committee').hasOwnProperty('blocks')) {
                setOptionsBlock(watch('committee')?.blocks || [])
            } else {
                setOptionsBlock([])
            }
        }
    }, [watch])

    return (
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
                {/* <AsyncSelectCustomBlockByJunta
                    control={control}
                    setValue={setValue}
                    watch={watch}
                /> */}
                {
                    lvlAccess === 1
                        ?
                        <React.Fragment>
                            <Col md={6}>
                                <Form.Group as={Row} className='mb-3'>
                                    <Form.Label column md={4}>
                                        Junta de usuarios
                                    </Form.Label>
                                    <Col md={8}>
                                        <Controller
                                            name='junta'
                                            control={control}
                                            rules={{
                                                required: true,
                                                onChange: ({ target }) => {
                                                    if (target.value?.committees?.length > 0) {
                                                        setOptionsCommittee(target.value.committees)
                                                    } else {
                                                        setOptionsCommittee([])
                                                    }
                                                    // setOptionsBlock([])
                                                    setValue('committee', null)
                                                    setValue('block', null)
                                                }
                                            }}
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
                                                        menuPlacement='auto'
                                                        menuPosition='absolute'
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
                            <Col md={6}>
                                <Form.Group as={Row} className='mb-3'>
                                    <Form.Label column md={4}>
                                        Comisión de usuarios
                                    </Form.Label>
                                    <Col md={8}>
                                        <Controller
                                            name='committee'
                                            control={control}
                                            rules={{
                                                required: true,
                                                onChange: ({ target }) => {
                                                    if (target.value?.blocks?.length > 0) {
                                                        setOptionsBlock(target.value.blocks)
                                                    } else {
                                                        setOptionsBlock([])
                                                    }
                                                    setValue('block', null)
                                                }
                                            }}
                                            render={
                                                ({ field }) =>
                                                    <Select
                                                        {...field}
                                                        classNamePrefix='rc-select'
                                                        styles={{
                                                            control: (baseStyles, state) => ({
                                                                ...baseStyles,
                                                                minHeight: '90px',
                                                            }),
                                                        }}
                                                        isClearable
                                                        isDisabled={watch('junta') === null || optionsCommittee.length === 0}
                                                        options={optionsCommittee}
                                                        filterOption={customFilterCommittee}
                                                        hideSelectedOptions
                                                        menuPlacement='auto'
                                                        menuPosition='absolute'
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
                            <Col md={6}>
                                <Form.Group as={Row} className='mb-3'>
                                    <Form.Label column md={4}>
                                        Bloque de riego
                                    </Form.Label>
                                    <Col md={8}>
                                        <Controller
                                            name='block'
                                            control={control}
                                            rules={{ required: true }}
                                            render={
                                                ({ field }) =>
                                                    <Select
                                                        {...field}
                                                        classNamePrefix='rc-select'
                                                        styles={{
                                                            control: (baseStyles, state) => ({
                                                                ...baseStyles,
                                                                minHeight: '90px',
                                                            }),
                                                        }}
                                                        isClearable
                                                        isDisabled={watch('junta') === null || optionsBlock.length === 0}
                                                        options={optionsBlock}
                                                        filterOption={customFilterBlock}
                                                        hideSelectedOptions
                                                        menuPlacement='auto'
                                                        menuPosition='absolute'
                                                        placeholder={`Buscar...`}
                                                        loadingMessage={({ inputValue }) => `Buscando '${inputValue}'`}
                                                        noOptionsMessage={({ inputValue }) => `Sin resultados con ...${inputValue}`}
                                                        getOptionValue={e => e._id}
                                                        getOptionLabel={e => <OptionBlock block={e} />}
                                                    />
                                            }
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </React.Fragment>
                        :
                        <React.Fragment>
                            <Col md={6}>
                                <Form.Group as={Row} className='mb-3'>
                                    <Form.Label column md={4}>
                                        Bloque de riego
                                    </Form.Label>
                                    <Col md={8}>
                                        <Controller
                                            name='block'
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
                                                        loadOptions={async (e) => {
                                                            return (await searchBlock(e)).data
                                                        }}
                                                        menuPlacement='auto'
                                                        menuPosition='fixed'
                                                        placeholder={`Buscar...`}
                                                        loadingMessage={({ inputValue }) => `Buscando '${inputValue}'`}
                                                        noOptionsMessage={({ inputValue }) => `Sin resultados con ...${inputValue}`}
                                                        getOptionValue={e => e._id}
                                                        getOptionLabel={e => <OptionBlock block={e} />}
                                                    />
                                            }
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </React.Fragment>
                }
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
    )
}
