import React from 'react'
import { useParams } from 'react-router-dom'
import { InputIrrigationCards, InputIrrigationCreateInAreaFarm } from '.'

export const AreaFarmWaterIn = () => {

    const { prpid } = useParams()

    return (
        <React.Fragment>
            <div className='container-flex-stack'>
                <div className='d-flex flex-row-reverse justify-content-between align-items-center flex-wrap gap-2'>
                    <InputIrrigationCreateInAreaFarm farm={prpid} />
                </div>
                <InputIrrigationCards farm={prpid} />
            </div>
        </React.Fragment>
    )
}