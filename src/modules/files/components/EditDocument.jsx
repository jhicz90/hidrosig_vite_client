import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Button, Card, Form, ListGroup, Offcanvas } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import AsyncSelect from 'react-select/async'
import CreatableSelect from 'react-select/creatable'
import validator from 'validator'
import { IoMdCloudUpload } from 'react-icons/io'
import { searchJunta, searchUserFarm, startDeleteFileDocument, startModalResource, startUpdateDocsIdDocument, useDeleteDocumentByIdMutation, useLazyGetDocumentByIdQuery, useUpdateDocumentByIdMutation } from '../../../store/actions'
import { FileUploadSlider, LoadingPage, OptionOrgz, OptionUserFarm } from '../../../components'
import { useNavigateState } from '../../../hooks'

export const EditDocument = () => {

    const [searchParams, setSearchParams] = useSearchParams()
    const { w, id = '' } = Object.fromEntries([...searchParams])
    const [state, redirect, redirectEscape] = useNavigateState('/app/exp/resources/docs')

    const dispatch = useDispatch()
    const [getDocument, { data = null, isLoading, isError }] = useLazyGetDocumentByIdQuery()
    const [updateDocument, { isLoading: isUpdating }] = useUpdateDocumentByIdMutation()
    const [deleteDocument, { isLoading: isDeleting, isSuccess: isDeleted }] = useDeleteDocumentByIdMutation()
    const { register, control, handleSubmit, reset } = useForm()

    const handleUpdate = async ({ directed, ...updateData }) => {
        try {
            await updateDocument({
                id,
                document: {
                    ...updateData,
                    directed: {
                        persons: directed.persons.map(p => p.value),
                        userfarms: directed.userfarms.map(uf => uf._id)
                    }
                }
            })
        } catch (err) {
            console.log(err)
        }
    }

    const handleAddDocument = (document) => {
        dispatch(startModalResource({
            tags: ['documento', document.name],
            groupTypes: 'docs',
            limit: 3,
            maxSize: 10,
            setFiles: (data) => dispatch(startUpdateDocsIdDocument(document._id, data))
        }))
    }

    const handleDeleteFileDocument = (fileId) => {
        dispatch(startDeleteFileDocument(data._id, fileId))
    }

    const handleDelete = async () => {
        try {
            await deleteDocument(data._id)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        reset({
            ...data,
            directed: {
                ...data?.directed,
                persons: !!data?.directed ? data?.directed?.persons.map(p => ({ value: p, label: p })) : []
            }
        })
    }, [reset, data])

    useEffect(() => {
        if (w === 'document_edit' && validator.isMongoId(id)) {
            getDocument(id)
        }
    }, [w, id])

    useEffect(() => {
        if (isDeleted) {
            redirect()
        }
    }, [isDeleted])

    useEffect(() => {
        if (isError) {
            redirectEscape()
        }
    }, [isError])

    return (
        <Offcanvas
            show={w === 'document_edit'}
            onHide={() => setSearchParams()}
            enforceFocus={false}
            placement='end'
        >
            <Offcanvas.Header closeButton={!isUpdating} closeVariant='white'>
                <Offcanvas.Title>
                    <div className='d-flex flex-column'>
                        <span>Documento</span>
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
                                    disabled={isUpdating || isDeleting}
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
                                <form id='form-file-document-edit' onSubmit={handleSubmit(handleUpdate)}>
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
                                        <div className='col-12'>
                                            <Form.Group className='mb-3' controlId='pPersons'>
                                                <Form.Label>Dirigido a personas</Form.Label>
                                                <Controller
                                                    name='directed.persons'
                                                    control={control}
                                                    render={
                                                        ({ field }) =>
                                                            <CreatableSelect
                                                                {...field}
                                                                inputId='pPersons'
                                                                classNamePrefix='rc-select'
                                                                isClearable
                                                                isMulti
                                                                menuPlacement={'auto'}
                                                                placeholder={`Escriba los nombres...`}
                                                                formatCreateLabel={(inputValue) => `Ingresar: ${inputValue}`}
                                                                isValidNewOption={(inputValue) => inputValue.length > 5}
                                                                noOptionsMessage={() => `Escriba los nombres que ingresará luego de ENTER o click en ingresar`}
                                                                components={{ DropdownIndicator: null }}
                                                            />
                                                    }
                                                />
                                                <Form.Text muted>Si este documento va dirigido a personas fuera del ambito o rubro puede ingresar sus nombres</Form.Text>
                                            </Form.Group>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-12'>
                                            <Form.Group className='mb-3' controlId='pUserFarms'>
                                                <Form.Label>Dirigido a usuarios</Form.Label>
                                                <Controller
                                                    name='directed.userfarms'
                                                    control={control}
                                                    render={
                                                        ({ field }) =>
                                                            <AsyncSelect
                                                                {...field}
                                                                inputId='pUserFarms'
                                                                classNamePrefix='rc-select'
                                                                styles={{
                                                                    control: (baseStyles, state) => ({
                                                                        ...baseStyles,
                                                                        minHeight: '90px',
                                                                    }),
                                                                }}
                                                                isClearable
                                                                defaultOptions
                                                                isMulti
                                                                loadOptions={searchUserFarm}
                                                                menuPlacement={'auto'}
                                                                placeholder={`Buscar...`}
                                                                loadingMessage={({ inputValue }) => `Buscando '${inputValue}'`}
                                                                noOptionsMessage={({ inputValue }) => `Sin resultados con ...${inputValue}`}
                                                                getOptionValue={e => e._id}
                                                                getOptionLabel={e => <OptionUserFarm userfarm={e} />}
                                                            />
                                                    }
                                                />
                                                <Form.Text muted>Si este documento va dirigido a usuarios agrarios especificos puede seleccionarlos</Form.Text>
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
                                                                getOptionLabel={e => <OptionOrgz orgz={e} />}
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
                                                <ListGroup.Item disabled={isUpdating || isDeleting} onClick={() => handleAddDocument(data)} className='d-flex align-items-center' action>
                                                    Agregar documentos <IoMdCloudUpload className='ms-2' size={20} color='green' />
                                                </ListGroup.Item>
                                                <ListGroup.Item className='bg-light'>
                                                    <FileUploadSlider files={data.docs} actionDelete={handleDeleteFileDocument} />
                                                </ListGroup.Item>
                                            </ListGroup>
                                        </Form.Group>
                                    </div>
                                </div>
                            </Card.Body>
                        </Offcanvas.Body>
                        <div className='offcanvas-footer offcanvas-danger'>
                            <div className='d-flex justify-content-end gap-2 w-100'>
                                <Button
                                    onClick={handleDelete}
                                    disabled={isUpdating || isDeleting}
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