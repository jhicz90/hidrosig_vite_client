import React from 'react'
import { Button } from 'react-bootstrap'
import { useGetListCropByCampaignAndInputIrrigQuery } from '../../../store/actions'
import { DataTable, LoadingPage, TagDate } from '../../../components'

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
                                label: 'CULTIVO / VARIEDAD',
                                width: '200px',
                                renderCell: (item) =>
                                    <div className='d-flex flex-column'>
                                        <div>
                                            {`${item?.cropVariety.crop.name} - ${item?.cropVariety.name}`}
                                        </div>
                                        <div>
                                            {item?.irrigSystem?.name}
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
                                isNumber: true,
                                renderCell: (item) =>
                                    item.areaPlanted.toFixed(5)
                            },
                            {
                                label: 'COSTO',
                                width: '120px',
                                isNumber: true,
                                renderCell: (item) =>
                                    item.amount.toFixed(2)
                            },
                            {
                                label: 'VOLUMEN',
                                minWidth: '140px',
                                isNumber: true,
                                renderCell: (item) =>
                                    item.volume.toFixed(2)
                            },
                            {
                                label: 'OPCIONES',
                                width: '200px',
                                pinRight: true,
                                renderCell: (item) =>
                                    <div className='d-flex gap-2 p-2'>
                                        <Button>Volumen</Button>
                                    </div>
                            }
                        ]
                    }
                />
            }
        </>
    )
}
