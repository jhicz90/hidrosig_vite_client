import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import { Button, Form } from 'react-bootstrap'
import AsyncSelect from 'react-select/async'
import { useNavigateState } from '../../../hooks'
import { Liner, LoadingPage, OptionOrgz } from '../../../components'
import { searchJunta, useAddZoneMutation, useLazyNewZoneQuery } from '../../../store/actions'

export const ZoneCreatePage = () => {

    const [redirect, redirectEscape] = useNavigateState('/app/ambit/trrty/zone')

    const { lvlAccess } = useSelector(state => state.auth)
    const [newZone, { data = null, isLoading, isError }] = useLazyNewZoneQuery()
    const [addZone, { isLoading: isSavingAdd, isSuccess: isSaved }] = useAddZoneMutation()
    const { register, control, handleSubmit, reset } = useForm()

    const handleSave = async (newData) => {
        try {
            await addZone(newData)
        } catch (err) {
            console.log(err)
        }
    }

    const handleDiscard = () => {
        redirect()
    }

    useEffect(() => {
        newZone()
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
            newZone()
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
                            <h4 className='mb-0'>NUEVA ZONA</h4>
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
                                    form='form-ambit-zone-create'
                                >
                                    Registro nuevo
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row g-0 justify-content-center'>
                <div className='col'>
                    <form id='form-ambit-zone-create' onSubmit={handleSubmit(handleSave)}>
                        <Liner>Información</Liner>
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
                            lvlAccess === 1
                            &&
                            <>
                                <Liner>Organización</Liner>
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
                                        </Form.Group>
                                    </div>
                                </div>
                            </>
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}
