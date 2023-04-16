import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import { Button, Card, Dropdown, Form } from 'react-bootstrap'
import { IoEllipsisVertical, IoReturnUpBack } from 'react-icons/io5'
import AsyncSelect from 'react-select/async'
import { useNavigateState } from '../../../hooks'
import { Liner, LoadingPage, OptionOrgz } from '../../../components'
import { questionDeleteWaterSource, searchJunta, useDeleteWaterSourceByIdMutation, useGetWaterSourceByIdQuery, useUpdateWaterSourceByIdMutation } from '../../../store/actions'

export const WaterSourcePage = () => {

    const { wsid } = useParams()
    const [redirect, redirectEscape] = useNavigateState('/app/schm/irrig/ws')

    const { lvlAccess } = useSelector(state => state.auth)
    const { data = null, isLoading, isError } = useGetWaterSourceByIdQuery(wsid)
    const [updateWaterSource, { isLoading: isUpdating }] = useUpdateWaterSourceByIdMutation()
    const [deleteWaterSource, { isLoading: isDeleting }] = useDeleteWaterSourceByIdMutation()
    const { register, control, handleSubmit, reset } = useForm()

    const handleUpdate = async (newData) => {
        try {
            await updateWaterSource({
                id: wsid,
                watersource: newData
            })
        } catch (err) {
            console.log(err)
        }
    }

    const handleDelete = async (id, name) => {
        if (await questionDeleteWaterSource(name)) {
            deleteWaterSource(id).unwrap().then(() => {
                redirect()
            })
        }
    }

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

    if (isLoading) {
        return <LoadingPage />
    }

    return (
        !!data
        &&
        <div className='container-fluid my-3'>
            <div className='row'>
                <div className='col-12'>
                    <div className='row align-items-center justify-content-between g-3 mb-3'>
                        <div className='col-12 col-md-auto'>
                            <h4 className='mb-0'>FUENTE DE AGUA</h4>
                        </div>
                        <div className='col-12 col-md-auto'>
                            <div className='d-flex gap-2'>
                                <Link to={`/app/schm/irrig/ws`} className='btn btn-neutral-secondary'>
                                    <IoReturnUpBack size={24} />
                                    FUENTES DE AGUA
                                </Link>
                                <Dropdown className='dropdown-noarrow'>
                                    <Dropdown.Toggle variant='neutral' className='d-flex align-items-center'>
                                        <IoEllipsisVertical size={24} />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item>Reportes</Dropdown.Item>
                                        <Dropdown.Item>Imprimir</Dropdown.Item>
                                        <Dropdown.Item
                                            onClick={() => handleDelete(wsid, data?.name)}
                                            className='text-danger'
                                        >
                                            Eliminar
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col-12'>
                    <form id='form-irrig-watersource-edit' onSubmit={handleSubmit(handleUpdate)}>
                        <Liner>Información</Liner>
                        <div className='row'>
                            <div className='col-12 col-md-6'>
                                <Form.Group className='mb-3' controlId='pName'>
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control
                                        {...register('name', { required: true })}
                                        type='text'
                                        autoComplete='off'
                                    />
                                </Form.Group>
                            </div>
                            <div className='col-12 col-md-6'>
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
                        <div className='d-flex justify-content-end gap-2'>
                            <Button
                                disabled={isUpdating || isDeleting}
                                variant='primary'
                                type='submit'
                            >
                                Guardar cambios
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
