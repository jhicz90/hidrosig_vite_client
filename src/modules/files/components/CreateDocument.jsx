import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { Button, Form, Offcanvas } from 'react-bootstrap'
import AsyncSelect from 'react-select/async'
import validator from 'validator'
import { searchJunta, useAddDocumentMutation, useNewDocumentQuery } from '../../../store/actions'
import { LoadingPage, OptionOrgz } from '../../../components'
import { useNavigateState } from '../../../hooks'

export const CreateDocument = () => {
    const [searchParams] = useSearchParams()
    const { w, j = '' } = Object.fromEntries([...searchParams])

    return (
        <>
            {
                (w === 'document_create' || validator.isMongoId(j))
                &&
                <CreateDocumentWindow juntaActive={j} />
            }
        </>
    )
}

const CreateDocumentWindow = ({ juntaActive = null }) => {

    const [show, setShow] = useState(true)

    const [state, redirect, redirectEscape] = useNavigateState('/app/files/res/docs')

    const { data = null, isLoading, isError } = useNewDocumentQuery(ptt, { refetchOnMountOrArgChange: true })
    const [addDocument, { isLoading: isSaving }] = useAddDocumentMutation()
    const { register, control, handleSubmit, reset } = useForm()

    const handleSave = async (newData) => {
        try {
            await addDocument(newData)
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
                <Offcanvas.Title>Crear documento</Offcanvas.Title>
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
                                    form='form-file-document-create'
                                    className='w-100'
                                >
                                    Guardar nuevo
                                </Button>
                            </div>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
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
                                                <option value={12}>NOTIFICACIÓN</option>
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
                                {
                                    !juntaActive
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
                        </Offcanvas.Body>
                    </>
                    :
                    <LoadingPage />
            }
        </Offcanvas>
    )
}