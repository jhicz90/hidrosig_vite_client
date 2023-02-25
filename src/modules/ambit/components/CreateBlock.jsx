import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import { Button, Form, Offcanvas } from 'react-bootstrap'
import AsyncSelect from 'react-select/async'
import validator from 'validator'
import { LoadingPage, OptionOrgz } from '../../../components'
import { searchCommitteeByJunta, searchJunta, useAddBlockMutation, useNewBlockQuery } from '../../../store/actions'
import { useNavigateState } from '../../../hooks'

export const CreateBlock = () => {
    const [searchParams] = useSearchParams()
    const { w, j = '', c = '' } = Object.fromEntries([...searchParams])

    return (
        <>
            {
                (w === 'block_create' && (validator.isMongoId(j) || validator.isMongoId(c)))
                &&
                <CreateBlockWindow juntaActive={j} committeeActive={c} />
            }
        </>
    )
}

const CreateBlockWindow = ({ juntaActive = null, committeeActive = null }) => {

    const [show, setShow] = useState(true)

    const [state, redirect, redirectEscape] = useNavigateState('/app/ambit/trrty/block')

    const { data = null, isLoading, isError } = useNewBlockQuery(undefined, { refetchOnMountOrArgChange: true })
    const [addBlock, { isLoading: isSaving }] = useAddBlockMutation()
    const { register, watch, control, handleSubmit, reset } = useForm()

    const handleSave = async ({ junta, committee, ...newData }) => {
        try {
            await addBlock({
                ...newData,
                junta: juntaActive ? juntaActive : junta,
                committee: committeeActive ? committeeActive : committee,
            })
            setShow(false)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        reset({
            ...data
        })
    }, [reset, data])

    if (isError) {
        redirectEscape()
    }

    return (
        <Offcanvas
            show={show}
            onHide={() => setShow(false)}
            onExited={() => redirect()}
            enforceFocus={false}
            placement='end'
        >
            <Offcanvas.Header closeButton={!isSaving} closeVariant='white'>
                <Offcanvas.Title>Crear bloque de riego</Offcanvas.Title>
            </Offcanvas.Header>
            {
                (!!data && !isLoading)
                    ?
                    <>
                        <Offcanvas.Header className='offcanvas-primary'>
                            <div className='d-flex justify-content-end gap-2 w-100'>
                                <Button
                                    disabled={isSaving}
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
                                                                    return await searchCommitteeByJunta(committeeActive ? committeeActive : watch('junta')._id, e)
                                                                }}
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
                            </form >
                        </Offcanvas.Body>
                    </>
                    :
                    <LoadingPage />
            }
        </Offcanvas>
    )
}