import { useEffect, useState } from 'react'
import { useParams, Navigate, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, Form, ListGroup, Offcanvas } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import AsyncSelect from 'react-select/async'
import { editActiveDocument, searchJunta, setActiveDocument, startUpdateDocsDocument, startUpdateDocument, useGetDocumentByIdQuery } from '../../../store/actions'
import { FileUpload, LoadingPage, OptionOrgz, ResourceUploadInline } from '../../../components'

export const EditDocument = () => {

    const [show, setShow] = useState(true)
    const { docid } = useParams()
    const redirect = useNavigate()
    const dispatch = useDispatch()
    const { data = null, isLoading, isError } = useGetDocumentByIdQuery(docid)
    const { active, isSaving } = useSelector(state => state.document)

    useEffect(() => {
        if (!!data) {
            dispatch(setActiveDocument(data))
        }

        return () => {
            dispatch(setActiveDocument(null))
        }
    }, [data])

    if (isError) {
        return <Navigate to={`/app/exp/resources#docs`} replace />
    }

    return (
        <Offcanvas
            show={show}
            onHide={() => setShow(false)}
            onExited={() => redirect(`/app/exp/resources#docs`)}
            placement='end'
            backdrop='static'
        >
            <Offcanvas.Header className='text-bg-primary' closeButton={!isSaving} closeVariant='white'>
                <Offcanvas.Title>
                    <div className='d-flex flex-column'>
                        <span>Documento</span>
                        <span>{active ? active?.name : 'Cargando...'}</span>
                    </div>
                </Offcanvas.Title>
            </Offcanvas.Header>
            {
                !!active
                    ?
                    <>
                        <Offcanvas.Header>
                            <div className='d-flex justify-content-end gap-2 w-100'>
                                <Button
                                    disabled={isSaving}
                                    variant='success'
                                    type='submit'
                                    form='form-file-document-edit'
                                    className='w-100'
                                >
                                    Guardar cambios
                                </Button>
                            </div>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Card.Body>
                                <EditDocumentStep />
                            </Card.Body>
                        </Offcanvas.Body>
                    </>
                    :
                    <LoadingPage />
            }
        </Offcanvas>
    )
}

const EditDocumentStep = () => {

    const dispatch = useDispatch()
    const { active } = useSelector(state => state.document)
    const { register, control, handleSubmit, reset } = useForm()

    const handleSave = ({ name, desc, type, signer, junta }) => {
        dispatch(editActiveDocument({
            name,
            desc,
            type,
            signer,
            junta,
        }))
        dispatch(startUpdateDocument())
    }

    useEffect(() => {
        reset({
            ...active
        })
    }, [reset, active])

    return (
        <>
            <form id='form-file-document-edit' onSubmit={handleSubmit(handleSave)}>
                <div className='row'>
                    <div className='col-12'>
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
                    <div className='col-12'>
                        <Form.Group className='mb-3' controlId='uSigner'>
                            <Form.Label>Persona o institución que firma el documento</Form.Label>
                            <Form.Control
                                {...register('signer', { required: true })}
                                type='text'
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
            </form>
            <div className='row'>
                <div className='col'>
                    <Form.Group className='mb-3' controlId='uDocs'>
                        <Form.Label>Documentos</Form.Label>
                        <ListGroup>
                            {
                                active.docs.map(doc =>
                                    <ListGroup.Item key={doc.fileName}>
                                        <FileUpload file={doc} />
                                    </ListGroup.Item>
                                )
                            }
                        </ListGroup>
                    </Form.Group>
                </div>
            </div>
            <ResourceUploadInline
                multiple={true}
                accept='docs'
                tags={['Documento', active.name]}
                actionUpload={(data) => dispatch(startUpdateDocsDocument(data))}
            />
        </>
    )
}