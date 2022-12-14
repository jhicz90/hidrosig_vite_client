import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { Button, Form, Offcanvas } from 'react-bootstrap'
import AsyncSelect from 'react-select/async'
import { editActiveNewDocument, searchJunta, setActiveNewDocument, startAddNewDocument, startSaveNewDocument } from '../../../store/actions'
import { OptionOrgz } from '../../../components'

export const CreateDocument = ({ typeButton = 1 }) => {

    const dispatch = useDispatch()
    const { activeNew, isSavingNew } = useSelector(state => state.document)

    useEffect(() => {
        return () => dispatch(setActiveNewDocument(null))
    }, [dispatch])

    return (
        <>
            <Button
                disabled={isSavingNew}
                variant={typeButton === 1 ? 'neutral' : 'link'}
                className='text-primary text-decoration-none'
                onClick={() => {
                    dispatch(startAddNewDocument())
                }}
            >
                Nuevo documento
            </Button>
            <Offcanvas
                show={!!activeNew}
                onHide={() => dispatch(setActiveNewDocument(null))}
                placement='end'
                backdrop='static'
            >
                <Offcanvas.Header className='text-bg-primary' closeButton={!isSavingNew} closeVariant='white'>
                    <Offcanvas.Title>Crear documento</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Header>
                    <div className='d-flex justify-content-end gap-2 w-100'>
                        <Button
                            disabled={isSavingNew}
                            variant='primary'
                            type='submit'
                            form='form-file-document-create'
                            className='w-100'
                        >
                            Guardar nuevo
                        </Button>
                    </div>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <CreateDocumentStep />
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

const CreateDocumentStep = () => {

    const dispatch = useDispatch()
    const { activeNew } = useSelector(state => state.document)
    const { register, control, handleSubmit, reset } = useForm()

    const handleSave = ({ name, desc, type, signer, junta }) => {
        dispatch(editActiveNewDocument({
            name,
            desc,
            type,
            signer,
            junta
        }))

        if (activeNew?.junta) {
            dispatch(editActiveNewDocument({
                junta: activeNew.junta
            }))
        }

        dispatch(startSaveNewDocument())
    }

    useEffect(() => {
        reset({
            ...activeNew
        })
    }, [reset, activeNew])

    return (
        <form id='form-file-document-create' onSubmit={handleSubmit(handleSave)}>
            <div className='row'>
                <div className='col-12'>
                    <Form.Group className='mb-3' controlId='uName'>
                        <Form.Label>Nombre del documento</Form.Label>
                        <Form.Control
                            {...register('name', { required: true, minLength: 6 })}
                            type='text'
                            autoComplete='off'
                        />
                    </Form.Group>
                </div>
            </div>
            <div className='row'>
                <div className='col-12'>
                    <Form.Group className='mb-3' controlId='uType'>
                        <Form.Label>Tipo de documento</Form.Label>
                        <Form.Select
                            {...register('type', { required: true })}
                            autoComplete='off'
                        >
                            <option value={1}>RESOLUCION SUPREMA</option>
                            <option value={2}>RESOLUCION MINISTERIAL</option>
                            <option value={3}>RESOLUCION JEFATURAL</option>
                            <option value={4}>RESOLUCION DIRECTORIAL</option>
                            <option value={5}>RESOLUCION ADMINISTRATIVA</option>
                            <option value={6}>POR COSTUMBRE</option>
                            <option value={7}>TEMPORAL</option>
                            <option value={8}>INFORME</option>
                            <option value={9}>INTENDENCIA</option>
                            <option value={10}>OFICIO</option>
                            <option value={11}>CARTA</option>
                        </Form.Select>
                    </Form.Group>
                </div>
            </div>
            <div className='row'>
                <div className='col-12'>
                    <Form.Group className='mb-3' controlId='uDesc'>
                        <Form.Label>Descripci??n</Form.Label>
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
                <div className='col-12'>
                    <Form.Group className='mb-3' controlId='uSigner'>
                        <Form.Label>Persona o instituci??n que firma el documento</Form.Label>
                        <Form.Control
                            {...register('signer', { required: true })}
                            type='text'
                            autoComplete='off'
                        />
                    </Form.Group>
                </div>
            </div>
            {
                activeNew?.junta === null
                &&
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
            }
        </form>
    )
}