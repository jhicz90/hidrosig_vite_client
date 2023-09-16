import React, { useContext, useEffect } from 'react'
import { ManageCollectCampaignContext } from '../context'
import { Button, Form, Offcanvas } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import AsyncSelect from 'react-select/async'
import moment from 'moment'
import { DatePicker, Liner, OptionCropVariety } from '@/components'
import { searchCropVarietyByJunta, searchIrrigationSystemByJunta, useAddFarmCropInCollectByYearRateMutation } from '@/store/actions'
import { OffCanvasFooterStyled } from '@/style'

export const FarmCropCreate = () => {

    const [{ farmCropNew, inputIrrigationId, inputIrrigation, campaignId }, setContext] = useContext(ManageCollectCampaignContext)
    const { control, register, handleSubmit, reset, setValue, watch } = useForm({
        defaultValues: {
            inputIrrig: inputIrrigationId,
            irrigSystem: inputIrrigation?.irrigationSystem || null,
            cropVariety: null,
            areaPlanted: 0,
            seedTime: new Date(),
            harvestTime: new Date(),
            obs: ''
        }
    })
    const [addFarmCrop] = useAddFarmCropInCollectByYearRateMutation()
    
    const handleSave = (farmCrop) => {
        addFarmCrop({
            yearRate: campaignId,
            farmCrop: {
                ...farmCrop,
                farm: inputIrrigation?.farm._id
            }
        }).unwrap().then(() =>
            reset({
                inputIrrig: inputIrrigationId,
                irrigSystem: inputIrrigation?.irrigationSystem || null,
                cropVariety: null,
                areaPlanted: 0,
                seedTime: new Date(),
                harvestTime: new Date(),
                obs: ''
            })
        )
    }

    useEffect(() => {
        reset({
            inputIrrig: inputIrrigationId,
            irrigSystem: inputIrrigation?.irrigationSystem || null,
            cropVariety: null,
            areaPlanted: 0,
            seedTime: new Date(),
            harvestTime: new Date(),
            obs: ''
        })
    }, [reset, farmCropNew])

    return (
        <React.Fragment>
            <Offcanvas
                show={farmCropNew}
                onHide={() => setContext(v => ({ ...v, farmCropNew: false }))}
                placement='end'
            >
                <Offcanvas.Header closeButton closeVariant='white'>
                    <div className='d-flex flex-column'>
                        <Offcanvas.Title>Cultivo #NUEVO</Offcanvas.Title>
                    </div>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <form id='form-collect-farm-crop-create' onSubmit={handleSubmit(handleSave)}>
                        <Liner>Información</Liner>
                        <div className='row'>
                            <div className='col-12'>
                                <Form.Group className='mb-3'>
                                    <Form.Label>Tipo de riego</Form.Label>
                                    <Controller
                                        name={`irrigSystem`}
                                        control={control}
                                        rules={{ required: true }}
                                        render={
                                            ({ field }) =>
                                                <AsyncSelect
                                                    {...field}
                                                    isDisabled={inputIrrigation?.regulation === 2}
                                                    classNamePrefix='rc-select'
                                                    hideSelectedOptions
                                                    isClearable
                                                    defaultOptions
                                                    loadOptions={async (e) => await searchIrrigationSystemByJunta(inputIrrigation?.farm.junta, e)}
                                                    menuPlacement={'auto'}
                                                    placeholder={`Buscar...`}
                                                    loadingMessage={({ inputValue }) => `Buscando '${inputValue}'`}
                                                    noOptionsMessage={({ inputValue }) => `Sin resultados con ...${inputValue}`}
                                                    getOptionValue={e => e._id}
                                                    getOptionLabel={e => e.name}
                                                />
                                        }
                                    />
                                </Form.Group>
                            </div>
                            <div className='col-12'>
                                <Form.Group className='mb-3'>
                                    <Form.Label>Cultivo / variedad</Form.Label>
                                    <Controller
                                        name={`cropVariety`}
                                        control={control}
                                        rules={{ required: true }}
                                        render={
                                            ({ field }) =>
                                                <AsyncSelect
                                                    {...field}
                                                    classNamePrefix='rc-select'
                                                    hideSelectedOptions
                                                    isClearable
                                                    defaultOptions
                                                    loadOptions={async (e) => await searchCropVarietyByJunta(inputIrrigation?.farm.junta, e)}
                                                    menuPlacement={'auto'}
                                                    placeholder={`Busque y seleccione cultivo...`}
                                                    loadingMessage={({ inputValue }) => `Buscando '${inputValue}'`}
                                                    noOptionsMessage={({ inputValue }) => `Sin resultados con ...${inputValue}`}
                                                    getOptionValue={e => e._id}
                                                    getOptionLabel={e => <OptionCropVariety crop={e} />}
                                                />
                                        }
                                    />
                                </Form.Group>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-4'>
                                <Form.Group className='mb-3'>
                                    <Form.Label>Area de cultivo</Form.Label>
                                    <Form.Control
                                        {...register(`areaPlanted`, {
                                            required: true,
                                            valueAsNumber: true,
                                        })}
                                        type='number'
                                        min={0.00001}
                                        step={0.00001}
                                        autoComplete='off'
                                    />
                                </Form.Group>
                            </div>
                            <div className='col-4'>
                                <Form.Group className='mb-3'>
                                    <Form.Label>Fecha de siembra</Form.Label>
                                    <Controller
                                        control={control}
                                        name={`seedTime`}
                                        rules={{
                                            required: true,
                                            onChange: () => {
                                                setValue(
                                                    `harvestTime`,
                                                    moment(watch(`seedTime`)).add(watch(`cropVariety`)?.period || 0)
                                                )
                                            }
                                        }}
                                        render={({
                                            field: { onChange, value },
                                        }) => (
                                            <DatePicker
                                                value={value}
                                                onChange={onChange}
                                            />
                                        )}
                                    />
                                </Form.Group>
                            </div>
                            <div className='col-4'>
                                <Form.Group className='mb-3'>
                                    <Form.Label>Fecha de cosecha</Form.Label>
                                    <Controller
                                        control={control}
                                        name={`harvestTime`}
                                        rules={{ required: true }}
                                        render={({
                                            field: { onChange, value },
                                        }) => (
                                            <DatePicker
                                                value={moment(value).add(watch(`cropVariety`)?.period || 0, 'M')}
                                                onChange={onChange}
                                            />
                                        )}
                                    />
                                </Form.Group>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-12'>
                                <Form.Group className='mb-3'>
                                    <Form.Label>Observación</Form.Label>
                                    <Form.Control
                                        {...register(`obs`)}
                                        type='text'
                                        as='textarea'
                                        rows={4}
                                        autoComplete='off'
                                    />
                                </Form.Group>
                            </div>
                        </div>
                    </form>
                </Offcanvas.Body>
                <OffCanvasFooterStyled>
                    <Button
                        onClick={() => setContext(v => ({ ...v, farmCropNew: false }))}
                        type='button'
                        variant='neutral'
                    >
                        Cancelar
                    </Button>
                    <Button
                        type='submit'
                        form={`form-collect-farm-crop-create`}
                        variant='primary'
                    >
                        Guardar
                    </Button>
                </OffCanvasFooterStyled>
            </Offcanvas>
        </React.Fragment>
    )
}
