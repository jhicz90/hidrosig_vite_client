import { useEffect, useState } from 'react'
import { useParams, Navigate, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, Form, ListGroup, Offcanvas } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import AsyncSelect from 'react-select/async'
import { editActiveDocument, searchJunta, setActiveDocument, startDeleteDocument, startModalResource, startUpdateDocsDocument, startUpdateDocument, useGetDocumentByIdQuery } from '../../../store/actions'
import { FilesUploadInline, FileUpload, LoadingPage, OptionOrgz } from '../../../components'
import { IoMdCloudUpload } from 'react-icons/io'

export const EditDocument = () => {

    const [show, setShow] = useState(true)
    const { docid } = useParams()
    const redirect = useNavigate()
    const { state } = useLocation()
    const dispatch = useDispatch()
    const { data = null, isLoading, isError } = useGetDocumentByIdQuery(docid)
    const { active, isSaving } = useSelector(state => state.document)
    const urlBack = state?.from || '/app/exp/resources/docs'

    useEffect(() => {
        if (!!data) {
            dispatch(setActiveDocument(data))
        }

        return () => {
            dispatch(setActiveDocument(null))
        }
    }, [data])

    if (isError) {
        return <Navigate to={urlBack} replace />
    }

    return (
        <Offcanvas
            show={show}
            onHide={() => setShow(false)}
            onExited={() => redirect(urlBack)}
            enforceFocus={false}
            placement='end'
        >
            <Offcanvas.Header closeButton={!isSaving} closeVariant='white'>
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
                        <Offcanvas.Header className='offcanvas-success'>
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
                        <div className='offcanvas-footer offcanvas-danger'>
                            <div className='d-flex justify-content-end gap-2 w-100'>
                                <Button
                                    onClick={() => {
                                        dispatch(startDeleteDocument())
                                    }}
                                    disabled={isSaving}
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

    const handleUpload = () => {
        dispatch(startModalResource({
            tags: ['documento', active.name],
            groupTypes: 'docs',
            limit: 3,
            maxSize: 5,
            setFiles: (data) => dispatch(startUpdateDocsDocument(data))
        }))
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
                <div className='row'>
                    <div className='col-12'>
                        <Form.Group className='mb-3' controlId='pSigner'>
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
                    <Form.Group className='mb-3' controlId='pDocs'>
                        <Form.Label>Documentos</Form.Label>
                        <ListGroup>
                            <ListGroup.Item onClick={handleUpload} className='d-flex align-items-center' action>
                                Agregar documentos <IoMdCloudUpload className='ms-2' size={20} color='green' />
                            </ListGroup.Item>
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
        </>
    )
}