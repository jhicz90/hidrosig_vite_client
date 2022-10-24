import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

export const PettyCashModuleBanner = () => {

    const { active } = useSelector(state => state.pettycash)
    const [data, setData] = useState(active)

    useEffect(() => {
        setData(active)
    }, [active])

    return (
        <div className='text-center'>
            <div className='fs-5 mb-0'>{data.name}</div>
            <span className='text-secondary fw-semibold'>Caja chica</span>
        </div>
    )
}
