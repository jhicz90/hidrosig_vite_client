import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import { Button, Card, Form, Modal } from 'react-bootstrap'
import AsyncSelect from 'react-select/async'
import { setActiveNewCommittee, startAddNewCommittee, editActiveNewCommittee, startSaveNewCommittee, searchJunta, searchZoneByJunta } from '../../../store'
import { imageGet, upperCaseCatch } from '../../../helpers'

export const CreateCommittee = () => {

    const dispatch = useDispatch()
    const { activeNew, isSavingNew } = useSelector(state => state.committee)
    const [step, setStep] = useState(1)

    useEffect(() => {
        return () => dispatch(setActiveNewCommittee(null))
    }, [dispatch])

    return (
        <>
            <Button
                disabled={isSavingNew}
                variant='primary'
                onClick={() => {
                    setStep(1)
                    dispatch(startAddNewCommittee())
                }}
            >
                Nueva comisión
            </Button>
            <Modal
                show={!!activeNew}
                onHide={() => dispatch(setActiveNewCommittee(null))}
                backdrop='static'
                size='lg'
            >
                <Modal.Header closeButton={!isSavingNew}>
                    <Modal.Title>Crear comisión de usuarios</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card.Body>
                        {
                            step === 1
                            &&
                            <CreateCommitteeStep1 setStep={setStep} />
                        }
                        {
                            step === 2
                            &&
                            <CreateCommitteeStep2 setStep={setStep} />
                        }
                        {
                            step === 3
                            &&
                            <CreateCommitteeStep3 setStep={setStep} />
                        }
                    </Card.Body>
                </Modal.Body>
            </Modal>
        </>
    )
}

export const CreateCommitteeStep1 = ({ setStep }) => {

    const dispatch = useDispatch()
    const { activeNew } = useSelector(state => state.committee)
    const { register, setValue, handleSubmit, reset } = useForm()

    const handleNext = ({ name, nameAbrev, nameLarge, nameLargeAbrev, desc }) => {
        dispatch(editActiveNewCommittee({
            name,
            nameAbrev,
            nameLarge,
            nameLargeAbrev,
            desc
        }))
        setStep(2)
    }

    useEffect(() => {
        reset({
            ...activeNew
        })
    }, [reset, activeNew])

    return (
        <form onSubmit={handleSubmit(handleNext)}>
            <div className='row'>
                <div className='col-12 col-md-6'>
                    <Form.Group className='mb-3' controlId='uName'>
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
                    <Form.Group className='mb-3' controlId='uNameAbrev'>
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
                    <Form.Group className='mb-3' controlId='uNameLarge'>
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
                    <Form.Group className='mb-3' controlId='uNameLargeAbrev'>
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
            <div className='d-flex justify-content-end gap-2'>
                <Button
                    variant='primary'
                    type='submit'
                >
                    Siguiente
                </Button>
            </div>
        </form>
    )
}

export const CreateCommitteeStep2 = ({ setStep }) => {

    const dispatch = useDispatch()
    const { activeNew } = useSelector(state => state.committee)
    const { register, handleSubmit, reset } = useForm()

    const handleNext = ({ docid, email }) => {
        dispatch(editActiveNewCommittee({
            docid,
            email
        }))
        setStep(3)
    }

    useEffect(() => {
        reset({
            ...activeNew
        })
    }, [reset, activeNew])

    return (
        <form onSubmit={handleSubmit(handleNext)}>
            <div className='row'>
                <div className='col-12 col-md-6'>
                    <Form.Group className='mb-3' controlId='uDocId'>
                        <Form.Label>Código de identidad o RUC</Form.Label>
                        <Form.Control
                            {...register('docid', { required: true, minLength: 8 })}
                            type='text'
                            autoComplete='off'
                        />
                    </Form.Group>
                </div>
                <div className='col-12 col-md-6'>
                    <Form.Group className='mb-3' controlId='uEmail'>
                        <Form.Label>Correo electrónico</Form.Label>
                        <Form.Control
                            {...register('email', { required: true })}
                            type='email'
                            autoComplete='off'
                        />
                    </Form.Group>
                </div>
            </div>
            <div className='d-flex justify-content-end gap-2'>
                <Button
                    onClick={() => setStep(1)}
                    variant='primary'
                >
                    Volver
                </Button>
                <Button
                    variant='primary'
                    type='submit'
                >
                    Guardar
                </Button>
            </div>
        </form>
    )
}

export const CreateCommitteeStep3 = ({ setStep }) => {

    const dispatch = useDispatch()
    const { activeNew, isSavingNew } = useSelector(state => state.committee)
    const { register, control, watch, handleSubmit, reset } = useForm()

    const handleNext = ({ junta, zone, order }) => {
        dispatch(editActiveNewCommittee({
            junta,
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
        <form onSubmit={handleSubmit(handleNext)}>
            <div className='row'>
                <div className='col'>
                    <div className='mb-3'>
                        <label htmlFor='junta' className='form-label'>Junta de usuarios</label>
                        <Controller
                            name='junta'
                            control={control}
                            rules={{ required: true }}
                            render={
                                ({ field }) =>
                                    <AsyncSelect
                                        {...field}
                                        inputId='junta'
                                        classNamePrefix='rc-select'
                                        isClearable
                                        defaultOptions
                                        loadOptions={searchJunta}
                                        menuPlacement={'auto'}
                                        placeholder={`Buscar...`}
                                        loadingMessage={({ inputValue }) => `Buscando '${inputValue}'`}
                                        noOptionsMessage={({ inputValue }) => `Sin resultados con '${inputValue}'`}
                                        getOptionValue={e => e._id}
                                        getOptionLabel={e =>
                                            <div className='d-flex'>
                                                <img src={imageGet(e.image)} alt={e._id} width={32} />
                                                <span className='ms-2 align-self-center'>{e.name}</span>
                                            </div>
                                        }
                                    />
                            }
                        />
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col-12 col-md-6'>
                    <Form.Group className='mb-3' controlId='uOrder'>
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
                    <div className='mb-3'>
                        <label htmlFor='zone' className='form-label'>Zona</label>
                        <Controller
                            name='zone'
                            control={control}
                            rules={{ required: true }}
                            render={
                                ({ field }) =>
                                    <AsyncSelect
                                        {...field}
                                        inputId='zone'
                                        classNamePrefix='rc-select'
                                        isClearable
                                        defaultOptions
                                        loadOptions={async (e) => {
                                            return await searchZoneByJunta(watch().junta._id, e)
                                        }}
                                        menuPlacement={'auto'}
                                        placeholder={`Buscar...`}
                                        loadingMessage={({ inputValue }) => `Buscando '${inputValue}'`}
                                        noOptionsMessage={({ inputValue }) => `Sin resultados con '${inputValue}'`}
                                        getOptionValue={e => e._id}
                                        getOptionLabel={e => e.name}
                                    />
                            }
                        />
                        <Form.Text muted>
                            Area o zonas que conforma el ámbito de la junta de usuarios.
                        </Form.Text>
                    </div>
                </div>
            </div>
            <div className='d-flex justify-content-end gap-2'>
                <Button
                    onClick={() => setStep(2)}
                    disabled={isSavingNew}
                    variant='primary'
                >
                    Volver
                </Button>
                <Button
                    disabled={isSavingNew}
                    variant='success'
                    type='submit'
                >
                    Guardar
                </Button>
            </div>
        </form>
    )
}