import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, Form, Offcanvas } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import AsyncSelect from 'react-select/async'
import { editActiveBlock, searchCommitteeByJunta, searchDocument, searchJunta, setActiveBlock, startUpdateBlock } from '../../../store/actions'
import { OptionDocument, OptionOrgz } from '../../../components'

export const EditBlock = () => {

    const dispatch = useDispatch()
    const { active, isSaving } = useSelector(state => state.block)

    return (
        <Offcanvas
            show={!!active}
            onHide={() => dispatch(setActiveBlock(null))}
            placement='end'
            backdrop='static'
        >
            <Offcanvas.Header className='text-bg-primary' closeButton={!isSaving} closeVariant='white'>
                <Offcanvas.Title>Bloque de riego - {active?.name}</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Header>
                <div className='d-flex justify-content-end gap-2 w-100'>
                    <Button
                        disabled={isSaving}
                        variant='success'
                        type='submit'
                        form='form-ambit-block-edit'
                        className='w-100'
                    >
                        Guardar cambios
                    </Button>
                </div>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Card.Body>
                    <EditBlockStep />
                </Card.Body>
            </Offcanvas.Body>
        </Offcanvas>
    )
}

const EditBlockStep = () => {

    const dispatch = useDispatch()
    const { active } = useSelector(state => state.block)
    const { register, watch, setValue, control, handleSubmit, reset } = useForm()

    const handleSave = ({ name, code, desc, junta, committee, resolution }) => {
        dispatch(editActiveBlock({
            name,
            code,
            desc,
            junta,
            committee,
            resolution
        }))
        dispatch(startUpdateBlock())
    }

    useEffect(() => {
        reset({
            ...active
        })
    }, [reset, active])

    return (
        <form id='form-ambit-block-edit' onSubmit={handleSubmit(handleSave)}>
            <div className='row'>
                <div className='col-12 col-md-6'>
                    <Form.Group className='mb-3' controlId='uName'>
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            {...register('name', { required: true })}
                            type='text'
                            autoComplete='off'
                        />
                    </Form.Group>
                </div>
                <div className='col-12 col-md-6'>
                    <Form.Group className='mb-3' controlId='uCode'>
                        <Form.Label>Código</Form.Label>
                        <Form.Control
                            {...register('code', { required: true })}
                            type='text'
                            autoComplete='off'
                        />
                    </Form.Group>
                </div>
            </div>
            <div className='row'>
                <div className='col-12'>
                    <Form.Group className='mb-3' controlId='uDesc'>
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
            <div className='row'>
                <div className='col'>
                    <Form.Group className='mb-3' controlId='uJunta'>
                        <Form.Label>Junta de usuarios</Form.Label>
                        <Controller
                            name='junta'
                            control={control}
                            rules={{
                                required: true,
                                onChange: () => {
                                    setValue('committee', null)
                                }
                            }}
                            render={
                                ({ field }) =>
                                    <AsyncSelect
                                        {...field}
                                        inputId='uJunta'
                                        classNamePrefix='rc-select'
                                        isClearable
                                        defaultOptions
                                        loadOptions={searchJunta}
                                        menuPlacement={'auto'}
                                        placeholder={`Buscar...`}
                                        loadingMessage={({ inputValue }) => `Buscando '${inputValue}'`}
                                        noOptionsMessage={({ inputValue }) => `Sin resultados con ...${inputValue}`}
                                        getOptionValue={e => e._id}
                                        getOptionLabel={e =>
                                            <OptionOrgz orgz={e} />
                                        }
                                    />
                            }
                        />
                    </Form.Group>
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                    <Form.Group className='mb-3' controlId='uCommittee'>
                        <Form.Label>Comisión de usuarios</Form.Label>
                        <Controller
                            name='committee'
                            control={control}
                            rules={{ required: true }}
                            render={
                                ({ field }) =>
                                    <AsyncSelect
                                        {...field}
                                        inputId='uCommittee'
                                        classNamePrefix='rc-select'
                                        isClearable
                                        isDisabled={watch().junta === null}
                                        loadOptions={async (e) => {
                                            return await searchCommitteeByJunta(watch().junta._id, e)
                                        }}
                                        menuPlacement={'auto'}
                                        placeholder={`Buscar...`}
                                        loadingMessage={({ inputValue }) => `Buscando '${inputValue}'`}
                                        noOptionsMessage={({ inputValue }) => `Sin resultados con ...${inputValue}`}
                                        getOptionValue={e => e._id}
                                        getOptionLabel={e =>
                                            <OptionOrgz orgz={e} />
                                        }
                                    />
                            }
                        />
                    </Form.Group>
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                    <Form.Group className='mb-3' controlId='uResolution'>
                        <Form.Label>Resolución</Form.Label>
                        <Controller
                            name='resolution'
                            control={control}
                            rules={{ required: true }}
                            render={
                                ({ field }) =>
                                    <AsyncSelect
                                        {...field}
                                        inputId='uResolution'
                                        classNamePrefix='rc-select'
                                        isClearable
                                        defaultOptions
                                        loadOptions={searchDocument}
                                        menuPlacement={'auto'}
                                        placeholder={`Buscar...`}
                                        loadingMessage={({ inputValue }) => `Buscando '${inputValue}'`}
                                        noOptionsMessage={({ inputValue }) => `Sin resultados con ...${inputValue}`}
                                        getOptionValue={e => e._id}
                                        getOptionLabel={e =>
                                            <OptionDocument docm={e} />
                                        }
                                    />
                            }
                        />
                    </Form.Group>
                </div>
            </div>
        </form>
    )
}