import React, { useContext } from 'react'
import { CalendarContext } from '../context'
import { Badge, Button } from 'react-bootstrap'
import { DataTable, LoadingPage, TagDate } from '../../../../../components'
import { useGetListCropByCampaignAndInputIrrigQuery } from '../../../../../store/actions'

export const TableFarmCropCollect = () => {

    const [{ farmCrop, campaignId, inputIrrigationId }, setContext] = useContext(CalendarContext)

    const { data: listFarmCrops = [], isFetching, isSuccess } = useGetListCropByCampaignAndInputIrrigQuery({ campaign: campaignId, inputIrrigation: inputIrrigationId })

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
                                label: 'COSTO (S/.)',
                                width: '120px',
                                isNumber: true,
                                renderCell: (item) =>
                                    item.amount.toFixed(2)
                            },
                            {
                                label: 'VOLUMEN (m3)',
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
                                    <React.Fragment>
                                        {
                                            item._id === farmCrop?._id
                                                ?
                                                <Badge bg='primary'>Seleccionado</Badge>
                                                :
                                                <Button
                                                    onClick={() => setContext(v => ({ ...v, farmCrop: item }))}
                                                    variant='link'
                                                    size='sm'
                                                    className='text-decoration-none'
                                                >
                                                    Seleccionar
                                                </Button>

                                        }
                                    </React.Fragment>
                            }
                        ]
                    }
                />
            }
        </>
    )
}
