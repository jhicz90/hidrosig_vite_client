import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import { DataTable, LinkBack, LoadingPage } from '../../../components'
import { useGetListFarmByUserFarmQuery } from '../../../store/actions'

export const FarmCollectList = () => {

    const { usrid } = useParams()
    const { data: listFarms = [], isLoading } = useGetListFarmByUserFarmQuery({ userfarm: usrid })

    return (
        <div className='row rows-cols-1 gy-3 gx-0'>
            <Card>
                {
                    isLoading
                        ?
                        <LoadingPage />
                        :
                        <DataTable
                            maxHeightHeaderRow='60px'
                            maxHeightRowCell='30px'
                            rows={listFarms}
                            columns={
                                [
                                    {
                                        label: 'CÓDIGO',
                                        width: '180px',
                                        renderCell: (item) =>
                                            item.code
                                    },
                                    {
                                        label: 'NOMBRE PREDIO',
                                        width: '300px',
                                        renderCell: (item) =>
                                            item.name
                                    },
                                    {
                                        label: 'UNIDAD CATASTRAL',
                                        width: '120px',
                                        renderCell: (item) =>
                                            item.cadUnit
                                    },
                                    {
                                        label: 'AREA TOTAL',
                                        width: '120px',
                                        isNumber: true,
                                        renderCell: (item) =>
                                            item.areaTotal.toFixed(5)
                                    },
                                    {
                                        label: 'AREA BAJO RIEGO',
                                        width: '120px',
                                        isNumber: true,
                                        renderCell: (item) =>
                                            item.areaUse.toFixed(5)
                                    },
                                    {
                                        label: 'SALDO ACTUAL',
                                        width: '120px',
                                        isNumber: true,
                                        renderCell: (item) =>
                                            Number(100).toFixed(2)
                                    },
                                    {
                                        label: 'SALDO ATRASADO',
                                        width: '120px',
                                        isNumber: true,
                                        renderCell: (item) =>
                                            Number(200).toFixed(2)
                                    },
                                    {
                                        label: 'SALDO CONVENIO',
                                        width: '120px',
                                        isNumber: true,
                                        renderCell: (item) =>
                                            Number(0).toFixed(2)
                                    },
                                    {
                                        label: 'SALDO TOTAL',
                                        minWidth: '120px',
                                        isNumber: true,
                                        renderCell: (item) =>
                                            Number(300).toFixed(2)
                                    },
                                    {
                                        label: 'OPCIONES',
                                        width: '200px',
                                        pinRight: true,
                                        renderCell: (item) =>
                                            <div className='d-flex gap-2 p-2'>
                                                <Link
                                                    to={`${item._id}`}
                                                    className='text-decoration-none'
                                                >
                                                    Revisar
                                                </Link>
                                                {/* <LinkBack
                                                    className='text-decoration-none'
                                                    relative
                                                    to={`${item._id}`}
                                                >
                                                    Revisar
                                                </LinkBack> */}
                                            </div>
                                    }
                                ]
                            }
                        />
                }
            </Card>
        </div>
    )
}
