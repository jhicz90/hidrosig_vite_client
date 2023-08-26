import React, { useEffect, useState, useCallback } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { Controller } from 'react-hook-form'
import Select from 'react-select'
import AsyncSelect from 'react-select/async'
import { OptionBlock, OptionOrgz } from '.'
import { useAuthStore } from '../hooks'
import { searchJunta, useLazyGetListBlockQuery } from '../store/actions'

export const AsyncSelectCustomBlockByJunta = ({ control, setValue, watch }) => {

    const { lvlAccess } = useAuthStore()
    const [searchBlock] = useLazyGetListBlockQuery()
    const [optionsCommittee, setOptionsCommittee] = useState([])
    const [optionsBlock, setOptionsBlock] = useState([])

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
        if (Object.values(watch()).length > 0) {
            console.log('entramos')
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

    console.log('DATOS', watch())
    console.log('COMMITTEES', optionsCommittee)
    console.log('BLOCKS', optionsBlock)

    return (
        <React.Fragment>
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
        </React.Fragment>
    )
}