import React from 'react'
import { useGetListCropByCampaignAndInputIrrigQuery } from '../../../store/actions'
import { DataTable, LoadingPage, OptionInputIrrig, TagDate } from '../../../components'

export const CropCampaignEdit = ({ campaignId = '', inputIrrig = '' }) => {

    const { data: listFarmCrops = [], isFetching, isSuccess } = useGetListCropByCampaignAndInputIrrigQuery({ campaign: campaignId, inputIrrig })

    if (isFetching) {
        return <LoadingPage />
    }

    return (
        <>
            {
                isSuccess
                &&
                <DataTable
                    height='200px'
                    rows={listFarmCrops}
                    columns={
                        [
                            {
                                label: 'CÓDIGO TOMA',
                                width: '400px',
                                renderCell: (item) =>
                                    <OptionInputIrrig inputIrrig={item.inputIrrig} a={false} />
                            },
                            {
                                label: 'CULTIVO / VARIEDAD',
                                width: '200px',
                                renderCell: (item) =>
                                    <div className='d-flex flex-column'>
                                        <div>
                                            {`${item.cropVariety.crop.name} - ${item.cropVariety.name}`}
                                        </div>
                                        <div>
                                            {item.irrigSystem.name}
                                        </div>
                                    </div>
                            },
                            {
                                label: 'FECHA SIEMBRA',
                                width: '160px',
                                renderCell: (item) =>
                                    <TagDate date={item.seedTime} />
                            },
                            {
                                label: 'AREA CULTIVO',
                                width: '160px',
                                subTotal: true,
                                renderCell: (item) =>
                                    item.areaPlanted.toFixed(5)
                            },
                            {
                                label: 'COSTO',
                                width: '120px',
                                subTotal: true,
                                renderCell: (item) =>
                                    item.amount.toFixed(2)
                            },
                            {
                                label: 'VOLUMEN',
                                minWidth: '120px',
                                renderCell: (item) =>
                                    item.consumption.toFixed(2)
                            },
                        ]
                    }
                />
            }
        </>
    )
}
