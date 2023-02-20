import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import { Button, Form, Offcanvas } from 'react-bootstrap'
import AsyncSelect from 'react-select/async'
import { LoadingPage, OptionOrgz } from '../../../components'
import { editActiveNewBlock, searchCommitteeByJunta, searchJunta, setActiveNewBlock, startAddNewBlock, startSaveNewBlock } from '../../../store/actions'
import { useNavigateState } from '../../../hooks'

export const CreateBlock = ({ junta = null, committee = null }) => {

    const [show, setShow] = useState(true)

    const [state, redirect, redirectEscape] = useNavigateState('/app/ambit/trrty/block')

    const dispatch = useDispatch()
    const { activeNew, isSavingNew } = useSelector(state => state.block)

    useEffect(() => {
        dispatch(startAddNewBlock())
        return () => dispatch(setActiveNewBlock(null))
    }, [dispatch])

    return (
        <Offcanvas
            show={show && !!activeNew}
            onHide={() => setShow(false)}
            onExited={() => redirect()}
            placement='end'
        >
            <Offcanvas.Header closeButton={!isSavingNew} closeVariant='white'>
                <Offcanvas.Title>Crear bloque de riego</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Header className='offcanvas-primary'>
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
            {
                !!activeNew
                    ?
                    <Offcanvas.Body>
                        <CreateBlockStep juntaActive={junta} committeeActive={committee} />
                    </Offcanvas.Body>
                    :
                    <LoadingPage />
            }
        </Offcanvas>
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
                    <Form.Group className='mb-3' controlId='newName'>
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            {...register('name', { required: true })}
                            type='text'
                            autoComplete='off'
                        />
                    </Form.Group>
                </div>
                <div className='col-12 col-md-6'>
                    <Form.Group className='mb-3' controlId='newCode'>
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
                    <Form.Group className='mb-3' controlId='newDesc'>
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
                        <Form.Group className='mb-3' controlId='newJunta'>
                            <Form.Label>Junta de usuarios</Form.Label>
                            <Controller
                                name='junta'
                                control={control}
                                rules={{ required: true }}
                                render={
                                    ({ field }) =>
                                        <AsyncSelect
                                            {...field}
                                            inputId='newJunta'
                                            classNamePrefix='rc-select'
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
                        </Form.Group>
                    </div>
                </div>
            }
            {
                !committeeActive
                &&
                <div className='row'>
                    <div className='col'>
                        <Form.Group className='mb-3' controlId='newCommittee'>
                            <Form.Label>Comisiones</Form.Label>
                            <Controller
                                name='committee'
                                control={control}
                                rules={{ required: true }}
                                render={
                                    ({ field }) =>
                                        <AsyncSelect
                                            {...field}
                                            inputId='newCommittee'
                                            classNamePrefix='rc-select'
                                            isClearable
                                            defaultOptions
                                            isDisabled={watch().junta === null}
                                            loadOptions={async (e) => {
                                                return await searchCommitteeByJunta(committeeActive ? committeeActive._id : watch('junta')._id, e)
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
            }
        </form >
    )
}