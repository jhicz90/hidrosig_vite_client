import React, { useContext, useEffect } from 'react'
import { ManageCollectCampaignContext } from '../context'
import { Button, Form, Offcanvas } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import AsyncSelect from 'react-select/async'
import moment from 'moment'
import { DatePicker, Liner, LoadingPage, OptionCropVariety } from '../../../../../components'
import { OffCanvasFooterStyled } from '../../../../../style'
import { searchCropVarietyByJunta, searchIrrigationSystemByJunta, useDeleteFarmCropInCollectMutation, useUpdateFarmCropInCollectMutation } from '../../../../../store/actions'

export const FarmCropEdit = () => {

    const [{ farmCropEditShow, farmCropEditData, inputIrrig }, setContext] = useContext(ManageCollectCampaignContext)
    const { control, register, handleSubmit, reset, setValue, watch } = useForm()
    const [updateFarmCrop] = useUpdateFarmCropInCollectMutation()
    const [deleteFarmCrop, { isLoading: isDeleting }] = useDeleteFarmCropInCollectMutation()

    const handleUpdate = (farmCrop) => {
        updateFarmCrop({ collect: farmCropEditData.collectId, farmCrop })
    }

    useEffect(() => {
        reset({
            ...farmCropEditData
        })
    }, [reset, farmCropEditData])

    return (
        <Offcanvas
            show={farmCropEditShow}
            onHide={() => setContext(v => ({ ...v, farmCropEditShow: false, farmCropEditData: null }))}
            placement='end'
            style={{ maxWidth: '28rem' }}
        >
            <Offcanvas.Header closeButton closeVariant='white'>
                <div className='d-flex flex-column'>
                    <Offcanvas.Title>Cultivo #{String(farmCropEditData?._id).toUpperCase().slice(-5)}</Offcanvas.Title>
                    <div className='mt-2 pe-2'>
                        Vea o edite el cultivo asignado, recordar que si sea el caso el tipo de riego este desabilitado, significa que la toma de riego tiene un riego regulado.
                    </div>
                </div>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {
                    isDeleting
                        ?
                        <LoadingPage />
                        :
                        <form id={`form-collect-crop-edit-${farmCropEditData?._id}`} onSubmit={handleSubmit(handleUpdate)}>
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
                                                        isDisabled={inputIrrig?.inputIrrig.regulation === 2}
                                                        classNamePrefix='rc-select'
                                                        hideSelectedOptions
                                                        isClearable
                                                        defaultOptions
                                                        loadOptions={async (e) => await searchIrrigationSystemByJunta(inputIrrig?.junta, e)}
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
                                                        loadOptions={async (e) => await searchCropVarietyByJunta(inputIrrig?.junta, e)}
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
                                                valueAsNumber: true
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
                }
                <Liner>Estado</Liner>
                <p>Si desea eliminar el cultivo, debera tener los permisos suficientes, asi como no tener volumen o pagos enlazados ah dicho cultivo.</p>
                <Button
                    onClick={() => {
                        deleteFarmCrop({ collect: farmCropEditData.collectId, farmCrop: farmCropEditData._id })
                    }}
                    type='button'
                    variant='danger'
                >
                    Eliminar cultivo
                </Button>
            </Offcanvas.Body>
            <OffCanvasFooterStyled>
                <Button
                    onClick={() => setContext(v => ({ ...v, farmCropEditShow: false, farmCropEditData: null }))}
                    type='button'
                    variant='neutral'
                >
                    Cancelar
                </Button>
                <Button
                    type='submit'
                    form={`form-collect-crop-edit-${farmCropEditData?._id}`}
                    variant='primary'
                >
                    Guardar
                </Button>
            </OffCanvasFooterStyled>
        </Offcanvas>
    )
}
