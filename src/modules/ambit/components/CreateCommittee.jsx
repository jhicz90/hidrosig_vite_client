import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import { Button, Form, Offcanvas } from 'react-bootstrap'
import AsyncSelect from 'react-select/async'
import validator from 'validator'
import { searchJunta, searchZoneByJunta, useNewCommQuery, useAddCommMutation } from '../../../store/actions'
import { upperCaseCatch } from '../../../helpers'
import { Liner, LoadingPage, OptionOrgz } from '../../../components'
import { useNavigateState } from '../../../hooks'

export const CreateCommittee = () => {
    const [searchParams] = useSearchParams()
    const { w, j = '' } = Object.fromEntries([...searchParams])

    return (
        <>
            {
                (w === 'comm_create' || validator.isMongoId(j))
                &&
                <CreateCommitteeWindow juntaActive={j} />
            }
        </>
    )
}

const CreateCommitteeWindow = ({ juntaActive = null }) => {

    const [show, setShow] = useState(true)

    const [state, redirect, redirectEscape] = useNavigateState('/app/ambit/orgz/comm')

    const { data = null, isLoading, isError } = useNewCommQuery(undefined, { refetchOnMountOrArgChange: true })
    const [addComm, { isLoading: isSaving }] = useAddCommMutation()
    const { register, control, watch, setValue, handleSubmit, reset } = useForm()

    const handleSave = async ({ junta, zone, ...newData }) => {
        try {
            await addComm({
                ...newData,
                junta,
                zone,
                juntaId: juntaActive ? juntaActive : junta?._id,
                zoneId: zone?._id
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
                <Offcanvas.Title>Crear comisión de usuarios</Offcanvas.Title>
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
                                    form='form-ambit-committee-create'
                                    className='w-100'
                                >
                                    Guardar nuevo
                                </Button>
                            </div>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <form id='form-ambit-committee-create' onSubmit={handleSubmit(handleSave)}>
                                <Liner>Información</Liner>
                                <div className='row'>
                                    <div className='col-12 col-md-6'>
                                        <Form.Group className='mb-3' controlId='newName'>
                                            <Form.Label>Nombre</Form.Label>
                                            <Form.Control
                                                {...register('name', {
                                                    required: true,
                                                    onChange: (e) => {
                                                        setValue('nameAbrev', upperCaseCatch(e.target.value))
                                                    }
                                                })}
                                                type='text'
                                                autoComplete='off'
                                            />
                                        </Form.Group>
                                    </div>
                                    <div className='col-12 col-md-6'>
                                        <Form.Group className='mb-3' controlId='newNameAbrev'>
                                            <Form.Label>Nombre abreviado</Form.Label>
                                            <Form.Control
                                                {...register('nameAbrev', { required: true })}
                                                type='text'
                                                autoComplete='off'
                                            />
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-12 col-md-6'>
                                        <Form.Group className='mb-3' controlId='newNameLarge'>
                                            <Form.Label>Nombre largo o juridico</Form.Label>
                                            <Form.Control
                                                {...register('nameLarge', {
                                                    required: true,
                                                    onChange: (e) => {
                                                        setValue('nameLargeAbrev', upperCaseCatch(e.target.value))
                                                    }
                                                })}
                                                type='text'
                                                autoComplete='off'
                                            />
                                        </Form.Group>
                                    </div>
                                    <div className='col-12 col-md-6'>
                                        <Form.Group className='mb-3' controlId='newNameLargeAbrev'>
                                            <Form.Label>Nombre largo abreviado</Form.Label>
                                            <Form.Control
                                                {...register('nameLargeAbrev', { required: true })}
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
                                <div className='row'>
                                    <div className='col-12 col-md-6'>
                                        <Form.Group className='mb-3' controlId='newDocId'>
                                            <Form.Label>Código de identidad o RUC</Form.Label>
                                            <Form.Control
                                                {...register('docid', { required: true, minLength: 8 })}
                                                type='text'
                                                autoComplete='off'
                                            />
                                        </Form.Group>
                                    </div>
                                    <div className='col-12 col-md-6'>
                                        <Form.Group className='mb-3' controlId='newEmail'>
                                            <Form.Label>Correo electrónico</Form.Label>
                                            <Form.Control
                                                {...register('email', { required: true })}
                                                type='email'
                                                autoComplete='off'
                                            />
                                        </Form.Group>
                                    </div>
                                </div>
                                <Liner>Ámbito</Liner>
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
                                                    rules={{
                                                        required: true,
                                                        onChange: () => {
                                                            setValue('zone', null)
                                                        }
                                                    }}
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
                                <div className='row'>
                                    <div className='col-12 col-md-6'>
                                        <Form.Group className='mb-3' controlId='newOrder'>
                                            <Form.Label>Orden</Form.Label>
                                            <Form.Control
                                                {...register('order', { required: true })}
                                                type='number'
                                                autoComplete='off'
                                            />
                                            <Form.Text muted>
                                                Puede agregar un orden a la comisión si no es asi, solo dejelo en 1.
                                            </Form.Text>
                                        </Form.Group>
                                    </div>
                                    <div className='col-12 col-md-6'>
                                        <Form.Group className='mb-3' controlId='newZone'>
                                            <Form.Label>Zona</Form.Label>
                                            <Controller
                                                name='zone'
                                                control={control}
                                                rules={{ required: true }}
                                                render={
                                                    ({ field }) =>
                                                        <AsyncSelect
                                                            {...field}
                                                            inputId='newZone'
                                                            classNamePrefix='rc-select'
                                                            isClearable
                                                            defaultOptions
                                                            loadOptions={async (e) => {
                                                                return await searchZoneByJunta(juntaActive ? juntaActive._id : watch('junta')._id, e)
                                                            }}
                                                            menuPlacement={'auto'}
                                                            placeholder={`Buscar...`}
                                                            loadingMessage={({ inputValue }) => `Buscando '${inputValue}'`}
                                                            noOptionsMessage={({ inputValue }) => `Sin resultados con ...${inputValue}`}
                                                            getOptionValue={e => e._id}
                                                            getOptionLabel={e => e.name}
                                                        />
                                                }
                                            />
                                            <Form.Text muted>
                                                Area o zonas que conforma el ámbito de la junta de usuarios.
                                            </Form.Text>
                                        </Form.Group>
                                    </div>
                                </div>
                            </form>
                        </Offcanvas.Body>
                    </>
                    :
                    <LoadingPage />
            }
        </Offcanvas>
    )
}