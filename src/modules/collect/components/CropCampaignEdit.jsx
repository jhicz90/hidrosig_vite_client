import React from 'react'
import { useGetListCropByCampaignQuery } from '../../../store/actions'
import { DataTable, TagDate } from '../../../components'
import { Button, ButtonGroup } from 'react-bootstrap'

export const CropCampaignEdit = ({ campaignId = '' }) => {

    const { data: listFarmCrops = [] } = useGetListCropByCampaignQuery(campaignId)

    return (
        <DataTable
            rows={listFarmCrops}
            columns={
                [
                    {
                        label: 'CÓDIGO TOMA',
                        width: '160px',
                        renderCell: (item) =>
                            item.inputIrrig.code
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
                        renderCell: (item) =>
                            item.areaPlanted.toFixed(5)
                    },
                    {
                        label: 'COSTO',
                        width: '120px',
                        renderCell: (item) =>
                            item.amount.toFixed(2)
                    },
                    {
                        label: 'VOLUMEN',
                        minWidth: '120px',
                        renderCell: (item) =>
                            item.consumption.toFixed(2)
                    },
                    // {
                    //     label: 'ACCIÓN',
                    //     width: '200px',
                    //     pinRight: true,
                    //     renderCell: (item) =>
                    //         <ButtonGroup>
                    //             <Button
                    //                 type='button'
                    //                 variant='primary'
                    //             >
                    //                 Cancel
                    //             </Button>
                    //             <Button
                    //                 type='button'
                    //                 variant='success'
                    //             >
                    //                 Guardar
                    //             </Button>
                    //         </ButtonGroup>
                    // }
                ]
            }
        />
    )
}
