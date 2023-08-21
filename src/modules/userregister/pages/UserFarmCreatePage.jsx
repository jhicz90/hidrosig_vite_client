import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { HiArrowUturnLeft } from 'react-icons/hi2'
import { Liner, LoadingPage } from '../../../components'
import { useAddUserFarmMutation, useDraftUserFarmMutation, useLazyNewUserFarmQuery } from '../../../store/actions'

export const UserFarmCreatePage = () => {

    const [newUserFarm, { data = null, isLoading, isError }] = useLazyNewUserFarmQuery()
    const [addUserFarm, { isLoading: isSavingAdd, isSuccess: isSaved }] = useAddUserFarmMutation()
    const [draftUserFarm, { isLoading: isSavingDraft, isSuccess: isSavedDraft }] = useDraftUserFarmMutation()
    const { register, watch, handleSubmit, getValues, reset } = useForm()

    const handleSave = async ({ draft, ...newData }) => {
        if (!!draft) {
            await draftUserFarm(newData)
        } else {
            await addUserFarm(newData)
        }
    }

    useEffect(() => {
        newUserFarm()
    }, [])

    useEffect(() => {
        reset({
            ...data
        })
    }, [reset, data])

    useEffect(() => {
        if (isSaved || isSavedDraft) {
            newUserFarm()
        }
    }, [isSaved, isSavedDraft])

    if (isLoading) {
        return <LoadingPage />
    }

    return (
        <div className='container'>
            <div className='d-lg-flex align-items-lg-center justify-content-lg-between my-3'>
                <div className='min-w-400 flex-1'>
                    <h4 className='mb-0 text-uppercase'>NUEVO USUARIO AGRARIO</h4>
                    {/* <div className='mt-1 mt-sm-0 d-flex flex-column flex-sm-row gap-0 gap-sm-4'>
                            <div className='mt-2 d-flex align-items-center gap-1 text-muted'>
                                <MdOutlineNumbers size={20} />
                                {data.receipt}
                            </div>
                            <div className='mt-2 d-flex align-items-center gap-1 text-muted'>
                                <HiCurrencyDollar size={20} />
                                {data.remainingAmount.toFixed(2)}
                            </div>
                            <div className='mt-2 d-flex align-items-center gap-1 text-muted'>
                                <LiaMoneyCheckAltSolid size={20} />
                                {data.check}
                            </div>
                            <div className='mt-2 d-flex align-items-center gap-1 text-muted'>
                                <HiCalendar size={20} />
                                <span className='text-capitalize'>{moment(data.startDeclaration).format('DD MMMM, YYYY')}</span>
                            </div>
                        </div> */}
                </div>
                <div className='mt-3 ms-lg-5 mt-lg-0 d-flex gap-2 flex-wrap'>
                    <Link
                        to={`/app/user_reg/user_farm/users`}
                        className='btn btn-sm btn-neutral d-flex align-items-center gap-2'
                    >
                        <HiArrowUturnLeft />
                        Lista de usuarios
                    </Link>
                </div>
            </div>
            <div className='mt-2'>
                <form id='form-userregister-userfarm-create' onSubmit={handleSubmit(handleSave)}>
                    <div className='d-flex justify-content-end gap-2'>
                        <Button
                            disabled={isSavingAdd || isSavingDraft}
                            onClick={() => {
                                handleSave({ draft: true, ...getValues() })
                            }}
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
                        >
                            Registrar nuevo
                        </Button>
                    </div>
                    <Liner>Información personal</Liner>
                    <Row>
                        <Col md={6}>
                            <Form.Group as={Row} className='mb-3'>
                                <Form.Label column md={4}>
                                    Código
                                </Form.Label>
                                <Col md={8}>
                                    <Form.Control
                                        {...register('code', { required: true })}
                                        type='text'
                                        autoComplete='off'
                                        readOnly
                                    />
                                </Col>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group as={Row} className='mb-3'>
                                <Form.Label column md={4}>
                                    Tipo de usuario
                                </Form.Label>
                                <Col md={8}>
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
                                </Col>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group as={Row} className='mb-3'>
                                <Form.Label column md={4}>
                                    Documento de identidad o RUC
                                </Form.Label>
                                <Col md={8}>
                                    <Form.Control
                                        {...register('docid', { required: true })}
                                        type='text'
                                        autoComplete='off'
                                    />
                                </Col>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group as={Row} className='mb-3'>
                                <Form.Label column md={4}>
                                    Estado
                                </Form.Label>
                                <Col md={8}>
                                    <Form.Select
                                        {...register('status', { required: true })}
                                        autoComplete='off'
                                    >
                                        <option value={0}>Fallecido</option>
                                        <option value={1}>Vivo</option>
                                        <option value={2}>Heredero</option>
                                    </Form.Select>
                                </Col>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group as={Row} className='mb-3'>
                                <Form.Label column md={2}>
                                    Razón social
                                </Form.Label>
                                <Col md={10}>
                                    <Form.Control
                                        {...register('socialReason', { required: Number(watch('type')) > 1 })}
                                        disabled={Number(watch('type')) === 1}
                                        type='text'
                                        autoComplete='off'
                                    />
                                </Col>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group as={Row} className='mb-3'>
                                <Form.Label column md={4}>
                                    Género
                                </Form.Label>
                                <Col md={8}>
                                    <Form.Select
                                        {...register('gender', { required: Number(watch('type')) === 1 })}
                                        disabled={Number(watch('type')) > 1}
                                        autoComplete='off'
                                    >
                                        <option value={'F'}>Femenino</option>
                                        <option value={'M'}>Masculino</option>
                                        <option value={'O'}>Otro</option>
                                    </Form.Select>
                                </Col>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group as={Row} className='mb-3'>
                                <Form.Label column md={4}>
                                    Nombres
                                </Form.Label>
                                <Col md={8}>
                                    <Form.Control
                                        {...register('names', { required: Number(watch('type')) === 1 })}
                                        disabled={Number(watch('type')) > 1}
                                        type='text'
                                        autoComplete='off'
                                    />
                                </Col>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group as={Row} className='mb-3'>
                                <Form.Label column md={4}>
                                    Apellidos Paternos
                                </Form.Label>
                                <Col md={8}>
                                    <Form.Control
                                        {...register('lastName', { required: Number(watch('type')) === 1 })}
                                        disabled={Number(watch('type')) > 1}
                                        type='text'
                                        autoComplete='off'
                                    />
                                </Col>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group as={Row} className='mb-3'>
                                <Form.Label column md={4}>
                                    Apellidos Maternos
                                </Form.Label>
                                <Col md={8}>
                                    <Form.Control
                                        {...register('motherLastName', { required: Number(watch('type')) === 1 })}
                                        disabled={Number(watch('type')) > 1}
                                        type='text'
                                        autoComplete='off'
                                    />
                                </Col>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Liner>Contacto</Liner>
                    <Row>
                        <Col md={6}>
                            <Form.Group as={Row} className='mb-3'>
                                <Form.Label column md={4}>
                                    Correo electronico
                                </Form.Label>
                                <Col md={8}>
                                    <Form.Control
                                        {...register('email')}
                                        type='email'
                                        autoComplete='off'
                                    />
                                </Col>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group as={Row} className='mb-3'>
                                <Form.Label column md={4}>
                                    Celular
                                </Form.Label>
                                <Col md={8}>
                                    <Form.Control
                                        {...register('cellphone')}
                                        type='text'
                                        autoComplete='off'
                                    />
                                </Col>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group as={Row} className='mb-3'>
                                <Form.Label column md={2}>
                                    Dirección
                                </Form.Label>
                                <Col md={10}>
                                    <Form.Control
                                        {...register('address')}
                                        type='text'
                                        autoComplete='off'
                                    />
                                </Col>
                            </Form.Group>
                        </Col>
                    </Row>
                </form>
            </div>
        </div>
    )
}
