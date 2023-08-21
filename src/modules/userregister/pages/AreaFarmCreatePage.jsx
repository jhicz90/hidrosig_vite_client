import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { HiArrowUturnLeft } from 'react-icons/hi2'
import AsyncSelect from 'react-select/async'
import { useAuthStore } from '../../../hooks'
import { AsyncSelectCustomBlockByJunta, Liner, LoadingPage, OptionLocation, OptionOrgz, OptionUserFarm } from '../../../components'
import { searchJunta, searchLocation, searchUserFarm, useAddFarmMutation, useDraftFarmMutation, useLazyNewFarmQuery } from '../../../store/actions'

export const AreaFarmCreatePage = () => {

    const { lvlAccess } = useAuthStore()
    const [newAreaFarm, { data = null, isLoading, isError }] = useLazyNewFarmQuery()
    const [addFarm, { isLoading: isSavingAdd, isSuccess: isSaved }] = useAddFarmMutation()
    const [draftFarm, { isLoading: isSavingDraft, isSuccess: isSavedDraft }] = useDraftFarmMutation()
    const { control, register, handleSubmit, watch, setValue, getValues, reset } = useForm()

    const handleSave = async ({ draft, ...newData }) => {
        if (!!draft) {
            await draftFarm(newData)
        } else {
            await addFarm(newData)
        }
    }

    useEffect(() => {
        newAreaFarm()
    }, [])

    useEffect(() => {
        reset({
            ...data
        })
    }, [reset, data])

    useEffect(() => {
        if (isSaved || isSavedDraft) {
            newAreaFarm()
        }
    }, [isSaved, isSavedDraft])

    if (isLoading) {
        return <LoadingPage />
    }

    return (
        <div className='container'>
            <div className='d-lg-flex align-items-lg-center justify-content-lg-between my-3'>
                <div className='min-w-400 flex-1'>
                    <h4 className='mb-0 text-uppercase'>NUEVO PREDIO AGRARIO</h4>
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
                        to={`/app/user_reg/user_farm/prps`}
                        className='btn btn-sm btn-neutral d-flex align-items-center gap-2'
                    >
                        <HiArrowUturnLeft />
                        Lista de predios
                    </Link>
                </div>
            </div>
            <div className='mt-2'>
                <form id='form-userregister-areafarm-create' onSubmit={handleSubmit(handleSave)}>
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
                    <Liner>Detalle</Liner>
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
                                        disabled
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
                                    Nombre del predio
                                </Form.Label>
                                <Col md={8}>
                                    <Form.Control
                                        {...register('name', { required: true })}
                                        type='text'
                                        autoComplete='off'
                                    />
                                </Col>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group as={Row} className='mb-3'>
                                <Form.Label column md={4}>
                                    Unidad Catastral
                                </Form.Label>
                                <Col md={8}>
                                    <Form.Control
                                        {...register('cadUnit', { required: true })}
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
                                    Descripción
                                </Form.Label>
                                <Col md={10}>
                                    <Form.Control
                                        {...register('desc')}
                                        type='text'
                                        as='textarea'
                                        autoComplete='off'
                                    />
                                </Col>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Liner>Área</Liner>
                    <Row>
                        <Col md={6}>
                            <Form.Group as={Row} className='mb-3'>
                                <Form.Label column md={4}>
                                    Area total
                                </Form.Label>
                                <Col md={8}>
                                    <Form.Control
                                        {...register('areaTotal', {
                                            required: true,
                                            min: 0.00001
                                        })}
                                        type='number'
                                        min={0}
                                        step={0.00001}
                                        autoComplete='off'
                                    />
                                </Col>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group as={Row} className='mb-3'>
                                <Form.Label column md={4}>
                                    Area de licencia
                                </Form.Label>
                                <Col md={8}>
                                    <Form.Control
                                        {...register('areaLic', {
                                            required: true,
                                            onChange: (e) => setValue('areaUse', Number(getValues('areaPer')) + Number(e.target.value))
                                        })}
                                        type='number'
                                        min={0}
                                        step={0.00001}
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
                                    Area de permiso
                                </Form.Label>
                                <Col md={8}>
                                    <Form.Control
                                        {...register('areaPer', {
                                            required: true,
                                            onChange: (e) => setValue('areaUse', Number(getValues('areaLic')) + Number(e.target.value))
                                        })}
                                        type='number'
                                        min={0}
                                        step={0.00001}
                                        autoComplete='off'
                                    />
                                </Col>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group as={Row} className='mb-3'>
                                <Form.Label column md={4}>
                                    Area de uso
                                </Form.Label>
                                <Col md={8}>
                                    <Form.Control
                                        {...register('areaUse', { required: true, min: 0.00001 })}
                                        readOnly
                                        type='number'
                                        min={0}
                                        step={0.00001}
                                        autoComplete='off'
                                    />
                                </Col>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Liner>Bloque y ubicación</Liner>
                    <Row>
                        <AsyncSelectCustomBlockByJunta
                            control={control}
                            setValue={setValue}
                            watch={watch}
                        />
                        <Col md={6}>
                            <Form.Group as={Row} className='mb-3'>
                                <Form.Label column md={4}>
                                    Localidad
                                </Form.Label>
                                <Col md={8}>
                                    <Controller
                                        name='location'
                                        control={control}
                                        rules={{ required: true }}
                                        render={
                                            ({ field }) =>
                                                <AsyncSelect
                                                    {...field}
                                                    classNamePrefix='rc-select'
                                                    styles={{
                                                        control: (baseStyles, state) => ({
                                                            ...baseStyles,
                                                            minHeight: '90px',
                                                        }),
                                                    }}
                                                    isClearable
                                                    defaultOptions
                                                    loadOptions={searchLocation}
                                                    menuPlacement={'auto'}
                                                    placeholder={`Buscar...`}
                                                    loadingMessage={({ inputValue }) => `Buscando '${inputValue}'`}
                                                    noOptionsMessage={({ inputValue }) => `Sin resultados con ...${inputValue}`}
                                                    getOptionValue={e => e._id}
                                                    getOptionLabel={e => <OptionLocation location={e} />}
                                                />
                                        }
                                    />
                                </Col>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group as={Row} className='mb-3'>
                                <Form.Label column md={2}>
                                    Lugar de referencia
                                </Form.Label>
                                <Col md={10}>
                                    <Form.Control
                                        {...register('place')}
                                        type='text'
                                        autoComplete='off'
                                    />
                                </Col>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Liner>Posesionarios del predio</Liner>
                    <Row>
                        <Col>
                            <Form.Group as={Row} className='mb-3'>
                                <Form.Label column md={2}>
                                    Usuarios o posesionarios
                                </Form.Label>
                                <Col md={10}>
                                    <Controller
                                        name='userfarms'
                                        control={control}
                                        rules={{ required: true }}
                                        render={
                                            ({ field }) =>
                                                <AsyncSelect
                                                    {...field}
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
                                                    menuPlacement={'top'}
                                                    placeholder={`Buscar...`}
                                                    loadingMessage={({ inputValue }) => `Buscando '${inputValue}'`}
                                                    noOptionsMessage={({ inputValue }) => `Sin resultados con ...${inputValue}`}
                                                    getOptionValue={e => e._id}
                                                    getOptionLabel={e => <OptionUserFarm userfarm={e} />}
                                                />
                                        }
                                    />
                                    <Form.Text muted>
                                        Si el o los posesionario(s) aun no se registran, acceda a este <Link to={`/app/user_reg/user_farm/users/create`}>enlace</Link> para registrarlo.
                                    </Form.Text>
                                </Col>
                            </Form.Group>
                        </Col>
                    </Row>
                </form>
            </div>
        </div>
    )
}
