import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Card, Form, Modal } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import AsyncSelect from 'react-select/async'
import { Liner, LoadingPage, OptionInputIrrig, OptionYearRate } from '../../../components'
import { searchInputIrrigByFarm, searchYearRateByJunta, useGenerateDebtMutation, useGetFarmByIdQuery } from '../../../store/actions'

export const FeeCollectBillDebt = () => {

    const { collect_prpid } = useParams()
    const [showGenDebt, setShowGenDebt] = useState(false)
    const { data = null, isLoading } = useGetFarmByIdQuery(collect_prpid)

    if (isLoading) {
        return <LoadingPage />
    }

    return (
        !!data
        &&
        <>
            <GenerateDebt show={showGenDebt} setShow={setShowGenDebt} areaFarm={data} />
            <div className='container-fluid'>
                <div className='row my-3'>
                    <div className='col-12'>
                        <Card>
                            <Card.Body>
                                <div className='row align-items-center'>
                                    <div className='col-12 col-md-auto'>
                                        <div className='d-flex gap-2'>
                                            <Button
                                                onClick={() => setShowGenDebt(true)}
                                                variant='warning'
                                                className='d-flex align-items-center gap-2'
                                            >
                                                Generar deuda
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-12'>
                        <Card>
                            <Card.Body>
                                No ahi cultivos ingresados
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    )
}

const GenerateDebt = ({ show, setShow, areaFarm }) => {

    const { _id: farmId, junta: { _id: juntaId } } = areaFarm
    const { control, register, handleSubmit, reset, watch } = useForm({
        defaultValues: {
            desc: '',
            active: true,
            farm: farmId,
            inputIrrig: null,
            yearRate: null,
        },
        mode: 'onChange'
    })
    const [genDebt, { isLoading }] = useGenerateDebtMutation()

    const handleSave = (data) => {
        genDebt({
            ...data
        }).unwrap().then(() => {
            reset({
                desc: '',
                active: true,
                farm: farmId,
                inputIrrig: null,
                yearRate: null,
            })
        })
    }

    return (
        <Modal
            show={show}
            onHide={() => setShow(!show)}
            size='lg'
            backdrop='static'
            fullscreen='sm-down'
        >
            <Modal.Header closeButton closeVariant='white'>
                <Modal.Title>
                    Generar deuda
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form id='form-collect-bill-create-debt' onSubmit={handleSubmit(handleSave)}>
                    <Liner>Información</Liner>
                    <div className='row'>
                        <div className='col-12'>
                            <Form.Group className='mb-3' controlId='newDesc'>
                                <Form.Label>Descripción</Form.Label>
                                <Form.Control
                                    {...register('desc', { required: true, minLength: 6 })}
                                    type='text'
                                    autoComplete='off'
                                />
                            </Form.Group>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-12'>
                            <Form.Group className='mb-3' controlId='newInputIrrig'>
                                <Form.Label>Toma de riego</Form.Label>
                                <Controller
                                    name='inputIrrig'
                                    control={control}
                                    rules={{ required: true }}
                                    render={
                                        ({ field }) =>
                                            <AsyncSelect
                                                {...field}
                                                inputId='newInputIrrig'
                                                classNamePrefix='rc-select'
                                                isSearchable={false}
                                                isClearable
                                                defaultOptions
                                                loadOptions={async () =>
                                                    await searchInputIrrigByFarm(farmId)
                                                }
                                                menuPlacement={'auto'}
                                                placeholder={`Buscar...`}
                                                loadingMessage={({ inputValue }) => `Buscando '${inputValue}'`}
                                                noOptionsMessage={({ inputValue }) => `Sin resultados con ...${inputValue}`}
                                                getOptionValue={e => e._id}
                                                getOptionLabel={e => <OptionInputIrrig inputIrrig={e} />}
                                            />
                                    }
                                />
                            </Form.Group>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-12'>
                            <Form.Group className='mb-3' controlId='newYearRate'>
                                <Form.Label>Año de tarifa</Form.Label>
                                <Controller
                                    name='yearRate'
                                    control={control}
                                    rules={{ required: true }}
                                    render={
                                        ({ field }) =>
                                            <AsyncSelect
                                                {...field}
                                                inputId='newYearRate'
                                                classNamePrefix='rc-select'
                                                isClearable
                                                defaultOptions
                                                loadOptions={async (e) =>
                                                    await searchYearRateByJunta(juntaId, e)
                                                }
                                                menuPlacement={'auto'}
                                                placeholder={`Buscar...`}
                                                loadingMessage={({ inputValue }) => `Buscando '${inputValue}'`}
                                                noOptionsMessage={({ inputValue }) => `Sin resultados con ...${inputValue}`}
                                                getOptionValue={e => e._id}
                                                getOptionLabel={e => <OptionYearRate yearRate={e} />}
                                            />
                                    }
                                />
                            </Form.Group>
                        </div>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    onClick={() => setShow(false)}
                    type='button'
                    variant='secondary'
                    disabled={isLoading}
                >
                    Cerrar
                </Button>
                <Button
                    type='submit'
                    form='form-collect-bill-create-debt'
                    variant='primary'
                    disabled={isLoading}
                >
                    Grabar nuevo
                </Button>
            </Modal.Footer>
        </Modal>
    )
}