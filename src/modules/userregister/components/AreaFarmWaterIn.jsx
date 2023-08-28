import React from 'react'
import { useParams } from 'react-router-dom'
import { InputIrrigationCards, InputIrrigationCreateInAreaFarm } from '.'

export const AreaFarmWaterIn = () => {

    const { prpid } = useParams()

    return (
        <React.Fragment>
            <div className='row'>
                <div className='col-12'>
                    <div className='d-flex flex-row-reverse justify-content-between align-items-center flex-wrap gap-2'>
                    <InputIrrigationCreateInAreaFarm farm={prpid} />
                    </div>
                </div>
            </div>
            <InputIrrigationCards farm={prpid}/>
        </React.Fragment>
    )
}