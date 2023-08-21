import React from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { Controller } from 'react-hook-form'
import AsyncSelect from 'react-select/async'
import { OptionBlock, OptionOrgz } from '.'
import { useAuthStore } from '../hooks'
import { searchJunta, useLazyGetListBlockByJuntaQuery, useLazyGetListBlockQuery } from '../store/actions'

export const AsyncSelectCustomBlockByJunta = ({ control, setValue, watch }) => {

    const { lvlAccess } = useAuthStore()
    const [searchBlockByJunta] = useLazyGetListBlockByJuntaQuery()
    const [searchBlock] = useLazyGetListBlockQuery()

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
                                            onChange: () => {
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
                                                    isDisabled={watch('junta') === null}
                                                    loadOptions={async (e) => {
                                                        return (await searchBlockByJunta({ junta: watch('junta')?._id || null, search: e })).data
                                                    }}
                                                    menuPlacement={'auto'}
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
                                                    menuPlacement={'auto'}
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