import { useEffect } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { LoadingPage } from '../../../components'
import { useNavigateState } from '../../../hooks'
import { useAddUserFarmMutation, useDraftUserFarmMutation, useLazyNewUserFarmQuery, useNewUserFarmQuery } from '../../../store/actions'

export const CreateUserFarm = () => {

    const [searchParams, setSearchParams] = useSearchParams()
    const { w } = Object.fromEntries([...searchParams])
    const [state, redirect, redirectEscape] = useNavigateState('/app/user_reg/user_farm/users')

    const [newUserFarm, { data = null, isLoading, isError }] = useLazyNewUserFarmQuery()
    const [addUserFarm, { isLoading: isSavingAdd, isSuccess: isSaved }] = useAddUserFarmMutation()
    const [draftUserFarm, { isLoading: isSavingDraft, isSuccess: isSavedDraft }] = useDraftUserFarmMutation()
    const { register, watch, handleSubmit, getValues, reset } = useForm()

    const handleSave = async ({ draft, ...newData }) => {
        try {
            if (!!draft) {
                await draftUserFarm(newData)
            } else {
                await addUserFarm(newData)
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        reset({
            ...data
        })
    }, [reset, data])

    useEffect(() => {
        if (w === 'userfarm_create') {
            newUserFarm()
        }
    }, [w])

    useEffect(() => {
        if (isSaved || isSavedDraft) {
            redirect()
        }
    }, [isSaved, isSavedDraft])

    useEffect(() => {
        if (isError) {
            redirectEscape()
        }
    }, [isError])

    return (
        <Modal
            show={w === 'userfarm_create'}
            onHide={() => setSearchParams()}
            backdrop='static'
            size='xl'
            fullscreen='md-down'
            scrollable
        >
            <Modal.Header closeButton={!isSavingAdd || !isSavingDraft} closeVariant='white'>
                <Modal.Title>Agregar un usuario agrario</Modal.Title>
            </Modal.Header>
            {
                (!!data && !isLoading)
                    ?
                    <>
                        <Modal.Body>
                            <form id='form-userregister-userfarm-create' onSubmit={handleSubmit(handleSave)}>
                                <div className='row'>
                                    <div className='col-12 col-sm-6 col-md-6 col-lg-2'>
                                        <Form.Group className='mb-3' controlId='newCode'>
                                            <Form.Label>Código</Form.Label>
                                            <Form.Control
                                                {...register('code', { required: true })}
                                                type='text'
                                                disabled
                                                autoComplete='off'
                                            />
                                        </Form.Group>
                                    </div>
                                    <div className='col-12 col-sm-6 col-md-6 col-lg-2'>
                                        <Form.Group className='mb-3' controlId='newType'>
                                            <Form.Label>Tipo de usuario</Form.Label>
                                            <Form.Select
                                                {...register('type', { required: true })}
                                                autoComplete='off'
                                            >
                                                <option value={1}>Natural</option>
                                                <option value={2}>Juridico</option>
                                                <option value={3}>Institucional</option>
                                                <option value={4}>Sucesión hereditaria</option>
                                                <option value={5}>Asociación conyugal</option>
                                                <option value={6}>Otros</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </div>
                                    <div className='col-12 col-sm-6 col-md-6 col-lg-4'>
                                        <Form.Group className='mb-3' controlId='newDocId'>
                                            <Form.Label>Documento de identidad o RUC</Form.Label>
                                            <Form.Control
                                                {...register('docid', { required: true })}
                                                type='text'
                                                autoComplete='off'
                                            />
                                        </Form.Group>
                                    </div>
                                    <div className='col-12 col-sm-6 col-md-6 col-lg-4'>
                                        <Form.Group className='mb-3' controlId='newStatus'>
                                            <Form.Label>Estado</Form.Label>
                                            <Form.Select
                                                {...register('status', { required: true })}
                                                autoComplete='off'
                                            >
                                                <option value={0}>Fallecido</option>
                                                <option value={1}>Vivo</option>
                                                <option value={2}>Heredero</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-12'>
                                        <Form.Group className='mb-3' controlId='newSocialReason'>
                                            <Form.Label>Razón social</Form.Label>
                                            <Form.Control
                                                {...register('socialReason', { required: Number(watch('type')) > 1 })}
                                                disabled={Number(watch('type')) === 1}
                                                type='text'
                                                autoComplete='off'
                                            />
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-12 col-md-6 col-lg-3'>
                                        <Form.Group className='mb-3' controlId='newGender'>
                                            <Form.Label>Género</Form.Label>
                                            <Form.Select
                                                {...register('gender', { required: Number(watch('type')) === 1 })}
                                                disabled={Number(watch('type')) > 1}
                                                autoComplete='off'
                                            >
                                                <option value={'F'}>Femenino</option>
                                                <option value={'M'}>Masculino</option>
                                                <option value={'O'}>Otro</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </div>
                                    <div className='col-12 col-md-6 col-lg-3'>
                                        <Form.Group className='mb-3' controlId='newNames'>
                                            <Form.Label>Nombres</Form.Label>
                                            <Form.Control
                                                {...register('names', { required: Number(watch('type')) === 1 })}
                                                disabled={Number(watch('type')) > 1}
                                                type='text'
                                                autoComplete='off'
                                            />
                                        </Form.Group>
                                    </div>
                                    <div className='col-12 col-md-6 col-lg-3'>
                                        <Form.Group className='mb-3' controlId='newLastName'>
                                            <Form.Label>Apellidos Paternos</Form.Label>
                                            <Form.Control
                                                {...register('lastName', { required: Number(watch('type')) === 1 })}
                                                disabled={Number(watch('type')) > 1}
                                                type='text'
                                                autoComplete='off'
                                            />
                                        </Form.Group>
                                    </div>
                                    <div className='col-12 col-md-6 col-lg-3'>
                                        <Form.Group className='mb-3' controlId='newMotherLastName'>
                                            <Form.Label>Apellidos Maternos</Form.Label>
                                            <Form.Control
                                                {...register('motherLastName', { required: Number(watch('type')) === 1 })}
                                                disabled={Number(watch('type')) > 1}
                                                type='text'
                                                autoComplete='off'
                                            />
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-12 col-md-4'>
                                        <Form.Group className='mb-3' controlId='newEmail'>
                                            <Form.Label>Correo electronico</Form.Label>
                                            <Form.Control
                                                {...register('email')}
                                                type='email'
                                                autoComplete='off'
                                            />
                                        </Form.Group>
                                    </div>
                                    <div className='col-12 col-md-4'>
                                        <Form.Group className='mb-3' controlId='newCellphone'>
                                            <Form.Label>Celular</Form.Label>
                                            <Form.Control
                                                {...register('cellphone')}
                                                type='text'
                                                autoComplete='off'
                                            />
                                        </Form.Group>
                                    </div>
                                    <div className='col-12 col-md-4'>
                                        <Form.Group className='mb-3' controlId='newAddress'>
                                            <Form.Label>Dirección</Form.Label>
                                            <Form.Control
                                                {...register('address')}
                                                type='text'
                                                autoComplete='off'
                                            />
                                        </Form.Group>
                                    </div>
                                </div>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <div className='d-flex justify-content-end gap-2 w-100'>
                                <Button
                                    onClick={() => {
                                        redirect()
                                    }}
                                    disabled={isSavingAdd || isSavingDraft}
                                    variant='neutral'
                                    type='button'
                                >
                                    Descartar
                                </Button>
                                <Button
                                    onClick={() => {
                                        handleSave({ draft: true, ...getValues() })
                                    }}
                                    disabled={isSavingAdd || isSavingDraft}
                                    variant='neutral'
                                    type='button'
                                    className='text-primary'
                                >
                                    Guardar borrador
                                </Button>
                                <Button
                                    disabled={isSavingAdd || isSavingDraft}
                                    variant='primary'
                                    type='submit'
                                    form='form-userregister-userfarm-create'
                                >
                                    Registrar nuevo
                                </Button>
                            </div>
                        </Modal.Footer>
                    </>
                    :
                    <LoadingPage />
            }
        </Modal>
    )
}
