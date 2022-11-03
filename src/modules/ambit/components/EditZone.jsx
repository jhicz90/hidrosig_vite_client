import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, Form, Offcanvas } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import AsyncSelect from 'react-select/async'
import { editActiveZone, searchJunta, setActiveZone, startUpdateZone } from '../../../store/actions'
import { OptionOrgz } from '../../../components'

export const EditZone = () => {

    const dispatch = useDispatch()
    const { active, isSaving } = useSelector(state => state.zone)

    return (
        <Offcanvas
            show={!!active}
            onHide={() => dispatch(setActiveZone(null))}
            placement='end'
            backdrop='static'
        >
            <Offcanvas.Header closeButton={!isSaving}>
                <Offcanvas.Title>Zona - {active?.name}</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Card.Body>
                    <EditZoneStep />
                </Card.Body>
            </Offcanvas.Body>
        </Offcanvas>
    )
}

const EditZoneStep = () => {

    const dispatch = useDispatch()
    const { active, isSaving } = useSelector(state => state.zone)
    const { register, control, handleSubmit, reset } = useForm()

    const handleSave = ({ name, code, desc, junta }) => {
        dispatch(editActiveZone({
            name,
            code,
            desc,
            junta,
        }))
        dispatch(startUpdateZone())
    }

    useEffect(() => {
        reset({
            ...active
        })
    }, [reset, active])

    return (
        <form onSubmit={handleSubmit(handleSave)}>
            <div className='row'>
                <div className='col-12 col-md-6'>
                    <Form.Group className='mb-3' controlId='uCode'>
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
                    <Form.Group className='mb-3' controlId='uName'>
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
            <div className='row'>
                <div className='col'>
                    <Form.Group className='mb-3' controlId='uJunta'>
                        <Form.Label>Junta de usuarios</Form.Label>
                        <Controller
                            name='junta'
                            control={control}
                            rules={{ required: true }}
                            render={
                                ({ field }) =>
                                    <AsyncSelect
                                        {...field}
                                        inputId='uJunta'
                                        classNamePrefix='rc-select'
                                        isClearable
                                        defaultOptions
                                        loadOptions={searchJunta}
                                        menuPlacement={'auto'}
                                        placeholder={`Buscar...`}
                                        loadingMessage={({ inputValue }) => `Buscando '${inputValue}'`}
                                        noOptionsMessage={({ inputValue }) => `Sin resultados con ...${inputValue}`}
                                        getOptionValue={e => e._id}
                                        getOptionLabel={e =>
                                            <OptionOrgz orgz={e} />
                                        }
                                    />
                            }
                        />
                    </Form.Group>
                </div>
            </div>
            <div className='d-flex justify-content-end gap-2'>
                <Button
                    disabled={isSaving}
                    variant='success'
                    type='submit'
                >
                    Guardar
                </Button>
            </div>
        </form>
    )
}