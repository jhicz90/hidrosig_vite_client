import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import { Button, Form, Offcanvas } from 'react-bootstrap'
import AsyncSelect from 'react-select/async'
import { useWizard } from 'react-use-wizard'
import { setActiveNewCommittee, startAddNewCommittee, editActiveNewCommittee, startSaveNewCommittee, searchJunta, searchZoneByJunta } from '../../../store/actions'
import { upperCaseCatch } from '../../../helpers'
import { LoadingPage, OptionOrgz, WizardStep } from '../../../components'
import { useNavigateState } from '../../../hooks'

export const CreateCommittee = ({ junta = null }) => {

    const [show, setShow] = useState(true)

    const [state, redirect, redirectEscape] = useNavigateState('/app/ambit/orgz/comm')

    const dispatch = useDispatch()
    const { activeNew, isSavingNew } = useSelector(state => state.committee)

    useEffect(() => {
        dispatch(startAddNewCommittee())
        return () => dispatch(setActiveNewCommittee(null))
    }, [dispatch])

    return (
        <Offcanvas
            show={show && !!activeNew}
            onHide={() => setShow(false)}
            onExited={() => redirect()}
            placement='end'
        >
            <Offcanvas.Header closeButton={!isSavingNew} closeVariant='white'>
                <Offcanvas.Title>Crear comisión de usuarios</Offcanvas.Title>
            </Offcanvas.Header>
            {
                !!activeNew
                    ?
                    <Offcanvas.Body>
                        <WizardStep>
                            <CreateCommitteeStep1 />
                            <CreateCommitteeStep2 juntaActive={junta} />
                        </WizardStep>
                    </Offcanvas.Body>
                    :
                    <LoadingPage />
            }
        </Offcanvas>
    )
}

export const CreateCommitteeStep1 = () => {

    const { nextStep } = useWizard()
    const dispatch = useDispatch()
    const { activeNew } = useSelector(state => state.committee)
    const { register, setValue, handleSubmit, reset } = useForm()

    const handleNext = ({ name, nameAbrev, nameLarge, nameLargeAbrev, desc, docid, email }) => {
        dispatch(editActiveNewCommittee({
            name,
            nameAbrev,
            nameLarge,
            nameLargeAbrev,
            desc,
            docid,
            email
        }))
        nextStep()
    }

    useEffect(() => {
        reset({
            ...activeNew
        })
    }, [reset, activeNew])

    return (
        <>
            <form id='form-ambit-committee-create-1' onSubmit={handleSubmit(handleNext)}>
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
                <div className='d-flex justify-content-end gap-2 w-100'>
                    <Button
                        variant='outline-primary'
                        type='submit'
                        className='w-100'
                    >
                        Siguiente
                    </Button>
                </div>
            </form>
        </>
    )
}

export const CreateCommitteeStep2 = ({ juntaActive }) => {

    const { previousStep } = useWizard()
    const dispatch = useDispatch()
    const { activeNew, isSavingNew } = useSelector(state => state.committee)
    const { register, control, watch, handleSubmit, reset } = useForm()

    const handleNext = ({ junta, zone, order }) => {
        dispatch(editActiveNewCommittee({
            junta: juntaActive ? juntaActive : junta,
            zone,
            order
        }))
        dispatch(startSaveNewCommittee())
    }

    useEffect(() => {
        reset({
            ...activeNew
        })
    }, [reset, activeNew])

    return (
        <>
            <form id='form-ambit-committee-create-2' onSubmit={handleSubmit(handleNext)}>
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
                <div className='d-flex justify-content-end gap-2 w-100'>
                    <Button
                        onClick={() => previousStep()}
                        variant='outline-secondary'
                        type='button'
                        className='w-100'
                    >
                        Regresar
                    </Button>
                    <Button
                        disabled={isSavingNew}
                        variant='primary'
                        type='submit'
                        className='w-100'
                    >
                        Guardar
                    </Button>
                </div>
            </form>
        </>
    )
}