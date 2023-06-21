import { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import AsyncSelect from 'react-select/async'
import { Liner, OptionDocument, OptionInputIrrig, OptionYearRate } from '../../../components'
import { searchDocument, searchInputIrrigByFarm, searchYearRateByJunta, useGenerateDebtMutation, useGetFarmByIdQuery } from '../../../store/actions'

export const GenerateFeeAccount = ({ prpId = '' }) => {

    const [show, setShow] = useState(false)
    const { data = null } = useGetFarmByIdQuery(prpId)
    const { control, register, handleSubmit, reset, watch } = useForm({
        defaultValues: {
            desc: '',
            active: true,
            farm: prpId,
            inputIrrig: null,
            yearRate: null,
            document: null,
        },
        mode: 'onChange'
    })
    const [genDebt, { isLoading }] = useGenerateDebtMutation()

    const handleSave = (data) => {
        console.log(data)
        genDebt({
            ...data,
            inputIrrig: data.inputIrrig._id,
            yearRate: data.yearRate._id,
            document: !!data.document ? data.document._id : null
        }).unwrap().then(() => {
            reset({
                desc: '',
                active: true,
                farm: prpId,
                inputIrrig: null,
                yearRate: null,
                document: null,
            })
        })
    }

    return (
        <>
            <Button
                onClick={() => setShow(true)}
                variant='info'
                className='d-flex justify-content-center gap-2'
            >
                Generar cuenta
            </Button>
            <Modal
                show={show}
                onHide={() => setShow(!show)}
                size='lg'
                backdrop='static'
                fullscreen='sm-down'
            >
                <Modal.Header closeButton closeVariant='white'>
                    <Modal.Title>
                        Generar cuenta
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
                                                        await searchInputIrrigByFarm(prpId)
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
                                                        await searchYearRateByJunta(data?.junta._id, e)
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
                        <Liner>Documento</Liner>
                        <div className='row'>
                            <div className='col-12'>
                                <Form.Group className='mb-3' controlId='pResolution'>
                                    <Form.Label>Documento (Puede anexar un documeto como un informe)</Form.Label>
                                    <Controller
                                        name='document'
                                        control={control}
                                        render={
                                            ({ field }) =>
                                                <AsyncSelect
                                                    {...field}
                                                    inputId='pResolution'
                                                    classNamePrefix='rc-select'
                                                    isClearable
                                                    defaultOptions
                                                    loadOptions={searchDocument}
                                                    menuPlacement={'auto'}
                                                    placeholder={`Buscar...`}
                                                    loadingMessage={({ inputValue }) => `Buscando '${inputValue}'`}
                                                    noOptionsMessage={({ inputValue }) => `Sin resultados con ...${inputValue}`}
                                                    getOptionValue={e => e._id}
                                                    getOptionLabel={e => <OptionDocument docm={e} />}
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
        </>
    )
}
