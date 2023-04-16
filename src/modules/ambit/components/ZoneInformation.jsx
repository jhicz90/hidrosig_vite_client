import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import { Button, Card, Form } from 'react-bootstrap'
import AsyncSelect from 'react-select/async'
import { Liner, OptionOrgz } from '../../../components'
import { searchJunta, useUpdateZoneByIdMutation, zoneApi } from '../../../store/actions'

export const ZoneInformation = () => {

    const { znid } = useParams()
    const { lvlAccess } = useSelector(state => state.auth)
    const { data = null } = useSelector(zoneApi.endpoints.getZoneById.select(znid))
    const [updateZone, { isLoading: isSaving }] = useUpdateZoneByIdMutation()
    const { register, control, handleSubmit, reset } = useForm()

    const handleUpdate = ({ order, name, desc, junta }) => {
        updateZone({
            id: znid,
            zone: { order, name, desc, junta }
        })
    }

    useEffect(() => {
        reset({
            ...data
        })
    }, [reset, data])

    return (
        <Card>
            <Card.Body>
                <form id='form-ambit-zone-edit-info' onSubmit={handleSubmit(handleUpdate)}>
                    <Liner>Información</Liner>
                    <div className='row'>
                        <div className='col-12 col-md-6'>
                            <Form.Group className='mb-3' controlId='pCode'>
                                <Form.Label>Orden</Form.Label>
                                <Form.Control
                                    {...register('order', { required: true })}
                                    type='number'
                                    min={0}
                                    autoComplete='off'
                                />
                            </Form.Group>
                        </div>
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
                                    <Form.Group className='mb-3' controlId='pJunta'>
                                        <Form.Label>Junta de usuarios</Form.Label>
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
                                    </Form.Group>
                                </div>
                            </div>
                        </>
                    }
                    <div className='d-flex justify-content-end gap-2'>
                        <Button
                            disabled={isSaving}
                            variant='primary'
                            type='submit'
                        >
                            Guardar cambios
                        </Button>
                    </div>
                </form>
            </Card.Body>
        </Card>
    )
}
