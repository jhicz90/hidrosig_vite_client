import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import { Button, Card, Col, Form, FormCheck, InputGroup, Row } from 'react-bootstrap'
import AsyncSelect from 'react-select/async'
import { InputMask, Liner, OptionRugosity } from '../../../components'
import { pDistance } from '../../../helpers'
import { searchRugosity, sectionApi, useGetCalcPropertiesQuery, useUpdateSectionByIdMutation } from '../../../store/actions'

export const SectionInformation = () => {

    const { sectid } = useParams()
    const { data = null } = useSelector(sectionApi.endpoints.getSectionById.select(sectid))
    const [updateSection, { isLoading: isUpdating }] = useUpdateSectionByIdMutation()
    const { register, control, handleSubmit, reset, watch, setFocus, setValue } = useForm({
        defaultValues: {
            progressiveStart: '000+000.00',
            progressiveEnd: '000+000.00'
        }
    })
    const { data: calcs } = useGetCalcPropertiesQuery({
        type: data?.type || 1,
        mayorBasis: watch('mayorBasis'),
        minorBasis: watch('minorBasis'),
        height: watch('height'),
        tight: watch('tight'),
        slope: watch('slope'),
        diameter: watch('diameter'),
        coated: watch('mayorBasis'),
        leftSlopeThickness: watch('leftSlopeThickness'),
        rightSlopeThickness: watch('rightSlopeThickness'),
        grade: watch('grade'),
        rugosity: watch('rugosity')?.value || 0,
    }, { skip: !watch('rugosity') })

    const handleUpdate = async ({ progressiveStart, progressiveEnd, rugosity, ...updateData }) => {
        if (pDistance(progressiveEnd) - pDistance(progressiveStart) > 0) {
            if (
                pDistance(progressiveEnd) - pDistance(progressiveStart)
                <= Number(data.limitchannel.limit + (pDistance(data.progressiveEnd) - pDistance(data.progressiveStart)))
            ) {
                console.log(updateData)
                await updateSection({
                    id: sectid,
                    section: {
                        ...updateData,
                        rugosity,
                        idRugosity: rugosity ? rugosity._id : '',
                    }
                })
            } else {
                setFocus('progressiveEnd')
            }
        } else {
            setFocus('progressiveEnd')
        }
    }

    useEffect(() => {
        reset({
            ...data
        })
    }, [reset, data])

    return (
        <form className='container-flex-stack' id='form-irrigation-section-info' onSubmit={handleSubmit(handleUpdate)}>
            <div className='d-flex justify-content-end gap-2'>
                <Button
                    disabled={isUpdating}
                    variant='primary'
                    type='submit'
                >
                    Guardar cambios
                </Button>
            </div>
            <Liner>Información</Liner>
            <Row>
                <Col md={6}>
                    <Form.Group as={Row}>
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
                    <Form.Group as={Row}>
                        <Form.Label column md={4}>
                            Estado
                        </Form.Label>
                        <Col md={8}>
                            <Form.Select
                                {...register('status', { required: true })}
                                autoComplete='off'
                            >
                                <option value={1}>Bueno</option>
                                <option value={2}>Malo</option>
                                <option value={3}>Regular</option>
                                <option value={4}>Requiere reparación</option>
                                <option value={5}>Requiere construcción</option>
                            </Form.Select>
                        </Col>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <Form.Group as={Row}>
                        <Form.Label column md={4}>
                            Tipo de estructura
                        </Form.Label>
                        <Col md={8}>
                            <Form.Select
                                {...register('type', { required: true })}
                                autoComplete='off'
                            >
                                <option value={1}>Trapezoidal</option>
                                <option value={2}>Rectangular</option>
                                <option value={3}>Triangular</option>
                                <option value={4}>Circular</option>
                            </Form.Select>
                        </Col>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group as={Row}>
                        <Form.Label column md={4}>
                            Capacidad de trabajo
                        </Form.Label>
                        <Col md={8}>
                            <Form.Select
                                {...register('workCapacity', { required: true })}
                                autoComplete='off'
                            >
                                <option value={0}>No idonea sin estructura</option>
                                <option value={1}>Idonea sin estructura</option>
                                <option value={2}>No idonea con estructura no adecuada al sistema</option>
                                <option value={3}>No idonea con estructura adecuada al sistema</option>
                                <option value={4}>Idonea con estructura no adecuada al sistema</option>
                                <option value={5}>Idonea con estructura adecuada al sistema</option>
                            </Form.Select>
                        </Col>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <Form.Group as={Row}>
                        <Form.Label column md={4}>
                            Tipo de revestimiento
                        </Form.Label>
                        <Col md={8}>
                            <Form.Select
                                {...register('coatedType', { required: true })}
                                autoComplete='off'
                                disabled={!watch('coatedCheck')}
                            >
                                <option value={0}>Ninguno</option>
                                <option value={1}>Solera</option>
                                <option value={2}>Talud derecho</option>
                                <option value={3}>Talud izquierdo</option>
                                <option value={4}>Talud derecho y solera</option>
                                <option value={5}>Talud izquierdo y solera</option>
                                <option value={6}>Total</option>
                            </Form.Select>
                            <FormCheck
                                id='newCoated'
                                {...register('coatedCheck', {
                                    onChange: () => {
                                        setValue('coatedType', 0)
                                        // setValue('leftSlopeThickness', 0)
                                        // setValue('rightSlopeThickness', 0)
                                    }
                                })}
                                label='¿La estructura esta revestida?'
                            />
                        </Col>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group as={Row}>
                        <Form.Label column md={2}>
                            Progresiva inicial - final
                        </Form.Label>
                        <Col md={10}>
                            <InputGroup>
                                <Controller
                                    control={control}
                                    name='progressiveStart'
                                    rules={{ required: true }}
                                    render={({
                                        field: { value, onChange }
                                    }) => (
                                        <InputMask
                                            id='pProgressiveStart'
                                            mask='999+999.99'
                                            maskPlaceholder='000+000.00'
                                            value={value}
                                            onChange={onChange}
                                        />
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name='progressiveEnd'
                                    rules={{ required: true }}
                                    render={({
                                        field: { value, onChange }
                                    }) => (
                                        <InputMask
                                            id='pProgressiveEnd'
                                            mask='999+999.99'
                                            maskPlaceholder='000+000.00'
                                            value={value}
                                            onChange={onChange}
                                        />
                                    )}
                                />
                                <InputGroup.Text>
                                    {
                                        pDistance(watch('progressiveEnd')) - pDistance(watch('progressiveStart')) >= 0
                                            ?
                                            `${pDistance(watch('progressiveEnd')) - pDistance(watch('progressiveStart'))} metros`
                                            :
                                            `La progresiva inicial no puede ser mayor que la final`
                                    }
                                </InputGroup.Text>
                            </InputGroup>
                        </Col>
                    </Form.Group>
                </Col>
            </Row>
            <Liner>Datos hidraulicos</Liner>
            <Row>
                <Col md={6}>
                    <Form.Group as={Row}>
                        <Form.Label column md={4}>
                            Base mayor
                        </Form.Label>
                        <Col md={8}>
                            <Form.Control
                                {...register('mayorBasis', { required: true, setValueAs: v => Number(v) })}
                                type='number'
                                min={0}
                                step={0.01}
                                autoComplete='off'
                            />
                        </Col>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group as={Row}>
                        <Form.Label column md={4}>
                            Base menor
                        </Form.Label>
                        <Col md={8}>
                            <Form.Control
                                {...register('minorBasis', { required: true, setValueAs: v => Number(v) })}
                                type='number'
                                min={0}
                                step={0.01}
                                autoComplete='off'
                            />
                        </Col>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <Form.Group as={Row}>
                        <Form.Label column md={4}>
                            Altura (H)
                        </Form.Label>
                        <Col md={8}>
                            <Form.Control
                                {...register('height', { required: true, setValueAs: v => Number(v) })}
                                type='number'
                                min={0}
                                step={0.01}
                                autoComplete='off'
                            />
                        </Col>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group as={Row}>
                        <Form.Label column md={4}>
                            Tirante (Y)
                        </Form.Label>
                        <Col md={8}>
                            <Form.Control
                                {...register('tight', { required: true, setValueAs: v => Number(v) })}
                                type='number'
                                min={0}
                                step={0.01}
                                autoComplete='off'
                            />
                        </Col>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <Form.Group as={Row}>
                        <Form.Label column md={4}>
                            Talud (Z)
                        </Form.Label>
                        <Col md={8}>
                            <Form.Control
                                {...register('slope', { required: true, setValueAs: v => Number(v) })}
                                type='number'
                                min={0}
                                step={0.01}
                                autoComplete='off'
                            />
                        </Col>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group as={Row}>
                        <Form.Label column md={4}>
                            Diametro (D)
                        </Form.Label>
                        <Col md={8}>
                            <Form.Control
                                {...register('diameter', { required: true, setValueAs: v => Number(v) })}
                                type='number'
                                min={0}
                                step={0.01}
                                autoComplete='off'
                            />
                        </Col>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <Form.Group as={Row}>
                        <Form.Label column md={4}>
                            Revest. Talud Izq.
                        </Form.Label>
                        <Col md={8}>
                            <Form.Control
                                disabled={!watch('coatedCheck')}
                                {...register('leftSlopeThickness', { required: true, setValueAs: v => Number(v) })}
                                type='number'
                                min={0}
                                step={0.01}
                                autoComplete='off'
                            />
                        </Col>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group as={Row}>
                        <Form.Label column md={4}>
                            Revest. Talud Der.
                        </Form.Label>
                        <Col md={8}>
                            <Form.Control
                                disabled={!watch('coatedCheck')}
                                {...register('rightSlopeThickness', { required: true, setValueAs: v => Number(v) })}
                                type='number'
                                min={0}
                                step={0.01}
                                autoComplete='off'
                            />
                        </Col>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <Form.Group as={Row}>
                        <Form.Label column md={4}>
                            Pendiente (S)
                        </Form.Label>
                        <Col md={8}>
                            <Form.Control
                                {...register('grade', { required: true, setValueAs: v => Number(v) })}
                                type='number'
                                min={0}
                                step={0.0001}
                                autoComplete='off'
                            />
                        </Col>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <Form.Group as={Row}>
                        <Form.Label column md={4}>
                            Rugosidad
                        </Form.Label>
                        <Col md={8}>
                            <Controller
                                name='rugosity'
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
                                                    minHeight: '60px',
                                                }),
                                            }}
                                            isClearable
                                            defaultOptions
                                            cacheOptions
                                            loadOptions={searchRugosity}
                                            hideSelectedOptions
                                            menuPlacement={'auto'}
                                            placeholder={`Buscar...`}
                                            loadingMessage={({ inputValue }) => `Buscando '${inputValue}'`}
                                            noOptionsMessage={({ inputValue }) => `Sin resultados con ...${inputValue}`}
                                            getOptionValue={e => e._id}
                                            getOptionLabel={e => <OptionRugosity rug={e} />}
                                        />
                                }
                            />
                        </Col>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group as={Row}>
                        <Form.Label column md={4}>
                            Tipo de flujo
                        </Form.Label>
                        <Col md={8}>
                            <Form.Control
                                readOnly
                                type='text'
                                className={calcs?.froudeNumber === 1 ? 'text-warning' : calcs?.froudeNumber < 1 ? 'text-success' : 'text-danger'}
                                value={calcs?.typeFlow || 'Faltan datos'}
                            />
                        </Col>
                    </Form.Group>
                </Col>
            </Row>
        </form>
    )
}
