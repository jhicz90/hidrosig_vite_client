import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import { Button, Form, Offcanvas } from 'react-bootstrap'
import AsyncSelect from 'react-select/async'
import { OptionOrgz } from '../../../components'
import { editActiveNewBlock, searchCommitteeByJunta, searchJunta, setActiveNewBlock, startAddNewBlock, startSaveNewBlock } from '../../../store/actions'

export const CreateBlock = ({ junta = null, committee = null, typeButton = 1 }) => {

    const dispatch = useDispatch()
    const { activeNew, isSavingNew } = useSelector(state => state.block)

    useEffect(() => {
        return () => dispatch(setActiveNewBlock(null))
    }, [dispatch])

    return (
        <>
            <Button
                disabled={isSavingNew}
                variant={typeButton === 1 ? 'neutral' : 'link'}
                className='text-primary text-decoration-none'
                onClick={() => {
                    dispatch(startAddNewBlock())
                }}
            >
                Nueva bloque
            </Button>
            <Offcanvas
                show={!!activeNew}
                onHide={() => dispatch(setActiveNewBlock(null))}
                placement='end'
                backdrop='static'
            >
                <Offcanvas.Header className='text-bg-primary' closeButton={!isSavingNew} closeVariant='white'>
                    <Offcanvas.Title>Crear bloque de riego</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Header>
                    <div className='d-flex justify-content-end gap-2 w-100'>
                        <Button
                            disabled={isSavingNew}
                            variant='primary'
                            type='submit'
                            form='form-ambit-block-create'
                            className='w-100'
                        >
                            Guardar nuevo
                        </Button>
                    </div>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <CreateBlockStep juntaActive={junta} committeeActive={committee} />
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

const CreateBlockStep = ({ juntaActive, committeeActive }) => {

    const dispatch = useDispatch()
    const { activeNew } = useSelector(state => state.block)
    const { register, watch, control, handleSubmit, reset } = useForm()

    const handleSave = ({ name, code, desc, junta, committee }) => {
        dispatch(editActiveNewBlock({
            name,
            code,
            desc,
            junta: juntaActive ? juntaActive : junta,
            committee: committeeActive ? committeeActive : committee,
        }))
        dispatch(startSaveNewBlock())
    }

    useEffect(() => {
        reset({
            ...activeNew
        })
    }, [reset, activeNew])

    return (
        <form id='form-ambit-block-create' onSubmit={handleSubmit(handleSave)}>
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
            {
                !juntaActive
                &&
                <div className='row'>
                    <div className='col'>
                        <div className='mb-3'>
                            <label htmlFor='uJunta' className='form-label'>Junta de usuarios</label>
                            <Controller
                                name='junta'
                                control={control}
                                rules={{ required: true }}
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
                        </div>
                    </div>
                </div>
            }
            {
                !committeeActive
                &&
                <div className='row'>
                    <div className='col'>
                        <div className='mb-3'>
                            <label htmlFor='uCommittee' className='form-label'>Comisiones</label>
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
                                            defaultOptions
                                            isDisabled={watch().junta === null}
                                            loadOptions={async (e) => {
                                                return await searchCommitteeByJunta(committeeActive ? committeeActive._id : watch().junta._id, e)
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
                        </div>
                    </div>
                </div>
            }
        </form>
    )
}