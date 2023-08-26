import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { IoEyeSharp } from 'react-icons/io5'
import { DataTable, InputSearch } from '../../../components'
import { useGetListInputIrrigByFarmQuery } from '../../../store/actions'
import { InputIrrigationCards } from '.'

export const AreaFarmWaterIn = () => {

    const { prpid } = useParams()
    const { data: inputIrrigationIn = [] } = useGetListInputIrrigByFarmQuery(prpid)

    return (
        <React.Fragment>
            <div className='row'>
                <div className='col-12'>
                    <div className='d-flex flex-row-reverse justify-content-between align-items-center flex-wrap gap-2'>
                        <Link
                            className='btn btn-primary'
                            to={`/app/user_reg/user_farm/wt/create`}
                        >
                            Agregar toma de agua
                        </Link>
                    </div>
                </div>
            </div>
            <InputIrrigationCards inputIrrigationIn={inputIrrigationIn}/>
            {/* <div className='row'>
                <div className='col-12'>
                    <DataTable
                        className='border border-2 border-light-subtle'
                        loading={isLoading}
                        renderEmpty={() => <strong className='mx-3 fs-5'>No ahi tomas de riego</strong>}
                        rows={inputIrrigationIn}
                        columns={
                            [
                                {
                                    label: 'ORDEN',
                                    minWidth: '50px',
                                    renderCell: (item) => (
                                        item.order
                                    )
                                },
                                {
                                    label: 'AREA DE RIEGO',
                                    minWidth: '50px',
                                    renderCell: (item) => (
                                        item.areaUseInput
                                    )
                                },
                                {
                                    label: 'SISTEMA DE RIEGO',
                                    minWidth: '50px',
                                    renderCell: (item) => (
                                        item.irrigationSystem.name
                                    )
                                },
                                {
                                    label: 'VOLUMEN',
                                    minWidth: '50px',
                                    renderCell: (item) => (
                                        <strong>{Number(item.regulation)}</strong>
                                    )
                                },
                                {
                                    label: 'ACCIÓN',
                                    pinRight: true,
                                    renderCell: (item) =>
                                        <div className='d-flex gap-2 p-2'>
                                            <Link
                                                to={``}
                                                className='btn btn-neutral-icon'
                                                style={{ padding: '0.5rem' }}
                                            >
                                                <IoEyeSharp size={16} />
                                            </Link>
                                        </div>
                                }
                            ]
                        }
                    />
                </div>
            </div> */}
        </React.Fragment>
    )
}