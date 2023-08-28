import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { IoEyeSharp } from 'react-icons/io5'
import { DataTable, InputSearch } from '../../../components'
import { useGetListInputIrrigByFarmQuery } from '../../../store/actions'
import { InputIrrigationCards, InputIrrigationCreateInAreaFarm } from '.'

export const AreaFarmWaterIn = () => {

    const { prpid } = useParams()
    const { data: inputIrrigationIn = [] } = useGetListInputIrrigByFarmQuery(prpid)

    return (
        <React.Fragment>
            <div className='row'>
                <div className='col-12'>
                    <div className='d-flex flex-row-reverse justify-content-between align-items-center flex-wrap gap-2'>
                    <InputIrrigationCreateInAreaFarm farm={prpid} />
                    </div>
                </div>
            </div>
            <InputIrrigationCards inputIrrigationIn={inputIrrigationIn}/>
        </React.Fragment>
    )
}