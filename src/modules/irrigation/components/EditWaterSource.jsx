import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Button, Card, Form, Offcanvas } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import AsyncSelect from 'react-select/async'
import validator from 'validator'
import { searchJunta, useDeleteWaterSourceByIdMutation, useGetWaterSourceByIdQuery, useUpdateWaterSourceByIdMutation } from '../../../store/actions'
import { LoadingPage, OptionOrgz } from '../../../components'
import { useNavigateState } from '../../../hooks'

export const EditWaterSource = () => {
    const [searchParams] = useSearchParams()
    const { w, id } = Object.fromEntries([...searchParams])

    return (
        <>
            {
                (w === 'watersource_edit' && validator.isMongoId(id))
                &&
                <EditWaterSourceWindow id={id} />
            }
        </>
    )
}

const EditWaterSourceWindow = ({ id }) => {

    const [show, setShow] = useState(true)

    const [state, redirect, redirectEscape] = useNavigateState('/app/schm/irrig/ws')

    const { data = null, isLoading, isError } = useGetWaterSourceByIdQuery(id, { refetchOnMountOrArgChange: true })
    const [updateWaterSource, { isLoading: isSaving }] = useUpdateWaterSourceByIdMutation()
    const [deleteWaterSource, { isLoading: isDeleting }] = useDeleteWaterSourceByIdMutation()
    const { register, control, handleSubmit, reset } = useForm()

    const handleUpdate = async (newData) => {
        try {
            await updateWaterSource({
                id: data._id,
                watersource: {
                    ...newData
                }
            })
        } catch (err) {
            console.log(err)
        }
    }

    const handleDeleteWaterSource = async () => {
        try {
            const { _id, name } = data
            const wordConfirm = normalizeText(name, { lowerCase: true, removeSpaces: true })

            SwalReact.fire({
                title:
                    <>
                        <div className='text-uppercase'>Eliminar fuente de agua</div>
                        <div className="fs-5 fw-bold text-info mt-1">{name}</div>
                    </>,
                html:
                    <>
                        <div className='fs-5 mb-2'>¿Estás seguro de eliminar esta fuente de agua?</div>
                        <div className='fs-5'>Si es asi, escriba <strong>{wordConfirm}</strong> para confirmar</div>
                    </>,
                showCancelButton: true,
                confirmButtonText: 'Eliminar',
                cancelButtonText: 'Cancelar',
                allowOutsideClick: false,
                icon: 'question',
                customClass: {
                    confirmButton: `btn btn-warning`,
                    cancelButton: `btn btn-neutral`
                },
                input: 'text',
                inputAttributes: {
                    autocapitalize: 'off'
                },
                buttonsStyling: false,
                reverseButtons: true,
                preConfirm: (typed) => {
                    if (typed === wordConfirm) {
                        return true
                    } else {
                        return false
                    }
                }
            }).then(async (result) => {
                if (result.value) {
                    await deleteWaterSource(_id)
                    setShow(false)
                }
            })
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
            <Offcanvas.Header closeButton={!isSaving || !isDeleting} closeVariant='white'>
                <Offcanvas.Title>
                    <div className='d-flex flex-column'>
                        <span>Fuente de agua</span>
                        <span>{!!data ? data?.name : 'Cargando...'}</span>
                    </div>
                </Offcanvas.Title>
            </Offcanvas.Header>
            {
                (!!data && !isLoading)
                    ?
                    <>
                        <Offcanvas.Header className='offcanvas-success'>
                            <div className='d-flex justify-content-end gap-2 w-100'>
                                <Button
                                    disabled={isSaving}
                                    variant='success'
                                    type='submit'
                                    form='form-irrig-watersource-edit'
                                    className='w-100'
                                >
                                    Guardar cambios
                                </Button>
                            </div>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Card.Body>
                                <form id='form-irrig-watersource-edit' onSubmit={handleSubmit(handleUpdate)}>
                                    <div className='row'>
                                        <div className='col-12'>
                                            <Form.Group className='mb-3' controlId='pName'>
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
                                            <Form.Group className='mb-3' controlId='pType'>
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
                                            <Form.Group className='mb-3' controlId='pDesc'>
                                                <Form.Label>Descripción</Form.Label>
                                                <Form.Control
                                                    {...register('desc')}
                                                    as='textarea'
                                                    type={'text'}
                                                    autoComplete='off'
                                                    rows={6}
                                                />
                                            </Form.Group>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col'>
                                            <div className='mb-3'>
                                                <label htmlFor='pJunta' className='form-label'>Junta de usuarios</label>
                                                <Controller
                                                    name='junta'
                                                    control={control}
                                                    rules={{ required: true }}
                                                    render={
                                                        ({ field }) =>
                                                            <AsyncSelect
                                                                {...field}
                                                                inputId='pJunta'
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
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </Card.Body>
                        </Offcanvas.Body>
                        <div className='offcanvas-footer offcanvas-danger'>
                            <div className='d-flex justify-content-end gap-2 w-100'>
                                <Button
                                    onClick={handleDeleteWaterSource}
                                    disabled={isSaving || isDeleting}
                                    variant='danger'
                                    type='button'
                                    className='w-100'
                                >
                                    Eliminar
                                </Button>
                            </div>
                        </div>
                    </>
                    :
                    <LoadingPage />
            }
        </Offcanvas>
    )
}