import React, { useContext, useEffect, useState } from 'react'
import { ManageCollectCampaignContext } from '../context'
import { Button, Modal } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { Liner } from '../../../../../components'
import { ControlListMonthPay, ControlPayAmount, ControlTypePayCollect } from '.'

export const PayCollectModal = () => {

    const [{ payCollectRateShow, inputIrrigId, inputIrrig, campaignId }, setContext] = useContext(ManageCollectCampaignContext)
    const { control, register, handleSubmit, reset, setValue, watch } = useForm({
        defaultValues: {}
    })
    // const [addFarmCrop] = useAddFarmCropInCollectByYearRateMutation()

    const handleSave = (farmCrop) => {
        // addFarmCrop({
        //     yearRate: campaignId,
        //     farmCrop: {
        //         ...farmCrop,
        //         farm: inputIrrig?._id
        //     }
        // }).unwrap().then(() =>
        //     reset({
        //         inputIrrig: inputIrrigId,
        //         irrigSystem: inputIrrig?.inputIrrig.irrigSystem || null,
        //         cropVariety: null,
        //         areaPlanted: 0,
        //         seedTime: new Date(),
        //         harvestTime: new Date(),
        //         obs: ''
        //     })
        // )
    }

    useEffect(() => {
        // reset({
        //     inputIrrig: inputIrrigId,
        //     irrigSystem: inputIrrig?.inputIrrig.irrigSystem || null,
        //     cropVariety: null,
        //     areaPlanted: 0,
        //     seedTime: new Date(),
        //     harvestTime: new Date(),
        //     obs: ''
        // })
    }, [reset, payCollectRateShow])

    return (
        <React.Fragment>
            <Modal
                show={payCollectRateShow}
                onHide={() => setContext(v => ({ ...v, payCollectRateShow: false }))}
                size='xl'
                fullscreen='xl-down'
                backdrop='static'
            >
                <Modal.Header closeButton closeVariant='white'>
                    <div className='d-flex flex-row align-items-center'>
                        <Modal.Title>Pago de tarifa #NUEVO</Modal.Title>
                        <div style={{ marginLeft: '20px' }}>
                            <ControlTypePayCollect />
                        </div>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <form id={`form-collect-pay-rate`} onSubmit={handleSubmit(handleSave)}>
                        <Liner>Meses - Consumo</Liner>
                        <ControlListMonthPay />
                        <ControlPayAmount />
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        onClick={() => setContext(v => ({ ...v, payCollectRateShow: false }))}
                        type='button'
                        variant='neutral'
                    >
                        Cancelar
                    </Button>
                    <Button
                        type='submit'
                        form={`form-collect-pay-rate`}
                        variant='primary'
                    >
                        Guardar
                    </Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    )
}
