import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { HiArrowUturnLeft } from 'react-icons/hi2'
import AsyncSelect from 'react-select/async'
import { useAuthStore } from '@/hooks'
import { searchJunta, useAddWaterSourceMutation, useLazyNewWaterSourceQuery } from '@/store/actions'
import { EditorTextArea, Liner, LoadingPage, OptionOrgz } from '@/components'

export const WaterSourceCreatePage = () => {

    const { lvlAccess } = useAuthStore()
    const [newWaterSource, { data = null, isLoading, isError }] = useLazyNewWaterSourceQuery()
    const [addWaterSource, { isLoading: isSavingAdd, isSuccess: isSaved }] = useAddWaterSourceMutation()
    const { register, control, handleSubmit, reset } = useForm()

    const handleSave = async (newData) => {
        await addWaterSource(newData)
    }

    useEffect(() => {
        newWaterSource()
    }, [])

    useEffect(() => {
        reset({
            ...data
        })
    }, [reset, data])

    useEffect(() => {
        if (isSaved) {
            newWaterSource()
        }
    }, [isSaved])

    if (isLoading) {
        return <LoadingPage />
    }

    return (
        <div className='container'>
            <div className='d-lg-flex align-items-lg-center justify-content-lg-between my-3'>
                <div className='min-w-400 flex-1'>
                    <h4 className='mb-0 text-uppercase'>NUEVO FUENTE DE AGUA</h4>
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
                        to={`/app/schm/irrig/net`}
                        className='btn btn-sm btn-neutral d-flex align-items-center gap-2'
                    >
                        <HiArrowUturnLeft />
                        Red de riego
                    </Link>
                    <Link
                        to={`/app/schm/irrig/ws`}
                        className='btn btn-sm btn-neutral d-flex align-items-center gap-2'
                    >
                        <HiArrowUturnLeft />
                        Fuentes de agua
                    </Link>
                </div>
            </div>
            <div className='mt-2'>
                <form id='form-irrigation-watersource-create' onSubmit={handleSubmit(handleSave)}>
                    <div className='d-flex justify-content-end gap-2'>
                        <Button
                            disabled={isSavingAdd}
                            variant='primary'
                            type='submit'
                        >
                            Registrar nuevo
                        </Button>
                    </div>
                    <Liner>Información</Liner>
                    <Row>
                        <Col md={6}>
                            <Form.Group as={Row} className='mb-3'>
                                <Form.Label column md={4}>
                                    Nombre
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
                                    Tipo de fuente
                                </Form.Label>
                                <Col md={8}>
                                    <Form.Select
                                        {...register('type', { required: true })}
                                        autoComplete='off'
                                    >
                                        <option value={''}>Elija el tipo de fuente</option>
                                        <option value={1}>Agua de la red (Represas, canales)</option>
                                        <option value={2}>Aguas superficiales (Rios, Lagos)</option>
                                        <option value={3}>Agua de lluvia</option>
                                        <option value={4}>Agua subterránea</option>
                                        <option value={5}>Agua de mar desalada</option>
                                        <option value={6}>Aguas residuales urbanas depuradas</option>
                                        <option value={7}>Agua de drenaje</option>
                                    </Form.Select>
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
                                    <Controller
                                        name='desc'
                                        control={control}
                                        rules={{ required: true }}
                                        render={
                                            ({ field: { onChange, value } }) =>
                                                <EditorTextArea
                                                    value={value}
                                                    onChnage={onChange}
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
                                    Observación
                                </Form.Label>
                                <Col md={10}>
                                    <Form.Control
                                        {...register('obs', { required: true })}
                                        as='textarea'
                                        type='text'
                                        autoComplete='off'
                                    />
                                </Col>
                            </Form.Group>
                        </Col>
                    </Row>
                    {
                        lvlAccess === 1
                        &&
                        <>
                            <Liner>Organización</Liner>
                            <Row>
                                <Col md={6}>
                                    <Form.Group as={Row} className='mb-3'>
                                        <Form.Label column md={4}>
                                            Junta de usuarios
                                        </Form.Label>
                                        <Col md={8}>
                                            <Controller
                                                name='junta'
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
                                                            loadOptions={searchJunta}
                                                            hideSelectedOptions
                                                            menuPlacement={'auto'}
                                                            placeholder={`Buscar...`}
                                                            loadingMessage={({ inputValue }) => `Buscando '${inputValue}'`}
                                                            noOptionsMessage={({ inputValue }) => `Sin resultados con ...${inputValue}`}
                                                            getOptionValue={e => e._id}
                                                            getOptionLabel={e => <OptionOrgz orgz={e} />}
                                                        />
                                                }
                                            />
                                        </Col>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </>
                    }
                </form>
            </div>
        </div>
    )
}
