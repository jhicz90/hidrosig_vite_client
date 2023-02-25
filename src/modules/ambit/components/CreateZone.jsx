import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import { Button, Form, Offcanvas } from 'react-bootstrap'
import AsyncSelect from 'react-select/async'
import validator from 'validator'
import { LoadingPage, OptionOrgz } from '../../../components'
import { searchJunta, useAddZoneMutation, useNewZoneQuery } from '../../../store/actions'
import { useNavigateState } from '../../../hooks'

export const CreateZone = () => {
    const [searchParams] = useSearchParams()
    const { w, j = '' } = Object.fromEntries([...searchParams])

    return (
        <>
            {
                (w === 'zone_create' || validator.isMongoId(j))
                &&
                <CreateZoneWindow juntaActive={j} />
            }
        </>
    )
}

const CreateZoneWindow = ({ juntaActive = null }) => {

    const [show, setShow] = useState(true)

    const [state, redirect, redirectEscape] = useNavigateState('/app/ambit/trrty/zone')

    const { data = null, isLoading, isError } = useNewZoneQuery(undefined, { refetchOnMountOrArgChange: true })
    const [addZone, { isLoading: isSaving }] = useAddZoneMutation()
    const { register, control, handleSubmit, reset } = useForm()

    const handleSave = async ({ junta, ...newData }) => {
        try {
            await addZone({
                ...newData,
                junta: juntaActive ? juntaActive : junta,
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
                <Offcanvas.Title>Crear zona</Offcanvas.Title>
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
                                    form='form-ambit-zone-create'
                                    className='w-100'
                                >
                                    Guardar nuevo
                                </Button>
                            </div>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <form id='form-ambit-zone-create' onSubmit={handleSubmit(handleSave)}>
                                <div className='row'>
                                    <div className='col-12 col-md-6'>
                                        <Form.Group className='mb-3' controlId='newOrder'>
                                            <Form.Label>Orden</Form.Label>
                                            <Form.Control
                                                {...register('orden', { required: true })}
                                                type='number'
                                                autoComplete='off'
                                            />
                                        </Form.Group>
                                    </div>
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
                            </form>
                        </Offcanvas.Body>
                    </>
                    :
                    <LoadingPage />
            }
        </Offcanvas>
    )
}