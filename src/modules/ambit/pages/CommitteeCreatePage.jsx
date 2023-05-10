import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import { Button, Card, Form } from 'react-bootstrap'
import AsyncSelect from 'react-select/async'
import { useNavigateState } from '../../../hooks'
import { upperCaseCatch } from '../../../helpers'
import { Liner, LoadingPage, OptionOrgz, TooltipInfo } from '../../../components'
import { searchJunta, searchZone, searchZoneByJunta, useAddCommMutation, useLazyNewCommQuery } from '../../../store/actions'

export const CommitteeCreatePage = () => {

    const [redirect, redirectEscape] = useNavigateState('/app/ambit/orgz/comm')

    const { lvlAccess } = useSelector(state => state.auth)
    const [newComm, { data = null, isLoading, isError }] = useLazyNewCommQuery()
    const [addComm, { isLoading: isSavingAdd, isSuccess: isSaved }] = useAddCommMutation()
    const { register, control, watch, setValue, handleSubmit, reset } = useForm()

    const handleSave = async (newData) => {
        try {
            await addComm(newData)
        } catch (err) {
            console.log(err)
        }
    }

    const handleDiscard = () => {
        redirect()
    }

    useEffect(() => {
        newComm()
    }, [])

    useEffect(() => {
        reset({
            ...data
        })
    }, [reset, data])

    useEffect(() => {
        if (isError) {
            redirectEscape()
        }
    }, [isError])

    useEffect(() => {
        if (isSaved) {
            newComm()
        }
    }, [isSaved])

    if (isLoading) {
        return <LoadingPage />
    }

    return (
        <div className='container-fluid'>
            <div className='row my-3'>
                <div className='col-12'>
                    <div className='row align-items-center justify-content-between g-3'>
                        <div className='col-12 col-md-auto'>
                            <h2 className='mb-0'>NUEVA COMISIÓN DE USUARIOS</h2>
                            <h5>Cree una comision detallando su información y zona</h5>
                        </div>
                        <div className='col-12 col-md-auto'>
                            <div className='d-flex gap-2'>
                                <Button
                                    onClick={handleDiscard}
                                    disabled={isSavingAdd}
                                    variant='secondary'
                                    type='button'
                                >
                                    Descartar
                                </Button>
                                <Button
                                    disabled={isSavingAdd}
                                    variant='primary'
                                    type='submit'
                                    form='form-ambit-committee-create'
                                >
                                    Registro nuevo
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col-12 col-xl-8'>
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
                                        type='text'
                                        autoComplete='off'
                                    />
                                </Form.Group>
                            </div>
                        </div>
                        <Liner>Administración</Liner>
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
                        <div className='row'>
                            <div className='col-12 col-md-4'>
                                <Form.Group className='mb-3' controlId='newOrder'>
                                    <Form.Label>Orden <TooltipInfo message={'Puede agregar un orden a la comisión si no es asi, solo dejelo en 1.'} /></Form.Label>
                                    <Form.Control
                                        {...register('order', { required: true })}
                                        type='number'
                                        autoComplete='off'
                                    />
                                </Form.Group>
                            </div>
                            {
                                lvlAccess === 1
                                    ?
                                    <>
                                        <div className='col-12 col-md-4'>
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
                                        <div className='col-12 col-md-4'>
                                            <Form.Group className='mb-3' controlId='newZone'>
                                                <Form.Label>Zona <TooltipInfo message={'Area o zonas que conforma el ámbito de la junta de usuarios.'} /></Form.Label>
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
                                                                isDisabled={!watch('junta')}
                                                                loadOptions={async (e) => {
                                                                    return await searchZoneByJunta(watch('junta')._id, e)
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
                                            </Form.Group>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <div className='col-12 col-md-4'>
                                            <Form.Group className='mb-3' controlId='newZone'>
                                                <Form.Label>Zona <TooltipInfo message={'Area o zonas que conforma el ámbito de la junta de usuarios.'} /></Form.Label>
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
                                                                loadOptions={searchZone}
                                                                menuPlacement={'auto'}
                                                                placeholder={`Buscar...`}
                                                                loadingMessage={({ inputValue }) => `Buscando '${inputValue}'`}
                                                                noOptionsMessage={({ inputValue }) => `Sin resultados con ...${inputValue}`}
                                                                getOptionValue={e => e._id}
                                                                getOptionLabel={e => e.name}
                                                            />
                                                    }
                                                />
                                            </Form.Group>
                                        </div>
                                    </>
                            }
                        </div>
                    </form>
                </div>
                <div className='col-12 col-xl-4'>
                    <Card className='shadow-none'>
                        <Card.Body>
                            Información sobre la junta de usuarios actual
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    )
}
