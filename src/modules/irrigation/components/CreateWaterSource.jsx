import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import { Button, Form, Offcanvas } from 'react-bootstrap'
import AsyncSelect from 'react-select/async'
import validator from 'validator'
import { searchJunta, useAddWaterSourceMutation, useNewWaterSourceQuery } from '../../../store/actions'
import { LoadingPage, OptionOrgz } from '../../../components'
import { useNavigateState } from '../../../hooks'

export const CreateWaterSource = () => {
    const [searchParams] = useSearchParams()
    const { w, j = '' } = Object.fromEntries([...searchParams])

    return (
        <>
            {
                (w === 'watersource_create' || validator.isMongoId(j))
                &&
                <CreateWaterSourceWindow juntaActive={j} />
            }
        </>
    )
}

const CreateWaterSourceWindow = ({ juntaActive = null }) => {

    const [show, setShow] = useState(true)

    const [state, redirect, redirectEscape] = useNavigateState('/app/schm/irrig')

    const { data = null, isLoading, isError } = useNewWaterSourceQuery(undefined, { refetchOnMountOrArgChange: true })
    const [addWaterSource, { isLoading: isSaving }] = useAddWaterSourceMutation()
    const { register, control, handleSubmit, reset } = useForm()

    const handleSave = async ({ junta, ...newData }) => {
        try {
            await addWaterSource({
                ...newData,
                junta,
                juntaId: juntaActive ? juntaActive : junta._id,
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
                <Offcanvas.Title>Crear fuente de agua</Offcanvas.Title>
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
                                    form='form-irrig-watersource-create'
                                    className='w-100'
                                >
                                    Guardar nuevo
                                </Button>
                            </div>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <form id='form-irrig-watersource-create' onSubmit={handleSubmit(handleSave)}>
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