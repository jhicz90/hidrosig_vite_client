import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import { Button, Form } from 'react-bootstrap'
import AsyncSelect from 'react-select/async'
import { useNavigateState } from '../../../hooks'
import { searchJunta, useAddWaterSourceMutation, useLazyNewWaterSourceQuery } from '../../../store/actions'
import { Liner, LoadingPage, OptionOrgz } from '../../../components'

export const WaterSourceCreatePage = () => {

    const [redirect, redirectEscape] = useNavigateState('/app/schm/irrig/ws')

    const { lvlAccess } = useSelector(state => state.auth)
    const [newWaterSource, { data = null, isLoading, isError }] = useLazyNewWaterSourceQuery()
    const [addWaterSource, { isLoading: isSavingAdd, isSuccess: isSaved }] = useAddWaterSourceMutation()
    const { register, control, handleSubmit, reset } = useForm()

    const handleSave = async (newData) => {
        try {
            await addWaterSource(newData)
        } catch (err) {
            console.log(err)
        }
    }

    const handleDiscard = () => {
        redirect()
    }

    useEffect(() => {
        newWaterSource()
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
            newWaterSource()
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
                            <h4 className='mb-0'>NUEVA FUENTE DE AGUA</h4>
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
                                    form='form-irrig-watersource-create'
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
                    <form id='form-irrig-watersource-create' onSubmit={handleSubmit(handleSave)}>
                        <Liner>Información</Liner>
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
                                <Form.Group className='mb-3' controlId='newType'>
                                    <Form.Label>Tipo de fuente</Form.Label>
                                    <Form.Select
                                        {...register('type', { required: true })}
                                        autoComplete='off'
                                    >
                                        <option value={''}>Elija el tipo de fuente</option>
                                        <option value={1}>Agua de la red (Represas, canales)</option>
                                        <option value={2}>Aguas superficiales (Rios, Lagos)</option>
                                        <option value={3}>Agua de lluvia</option>
                                        <option value={4}>Agua subterránea</option>
                                        <option value={5}>Agua de mar desalada</option>
                                        <option value={6}>Aguas residuales urbanas depuradas</option>
                                        <option value={7}>Agua de drenaje</option>
                                    </Form.Select>
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
                                    <div className='col-12 col-md-4 col-xl-3'>
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
