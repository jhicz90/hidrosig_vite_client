import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

export const VoucherModuleBanner = () => {

    const { active } = useSelector(state => state.voucher)
    const [data, setData] = useState(active)

    useEffect(() => {
        setData(active)
    }, [active])

    return (
        <div className='text-center'>
            <div className='fs-5 mb-0'>{`${data.serie}-${data.numReceipt}`}</div>
            <span className='text-secondary fw-semibold'>Comprobante</span>
        </div>
    )
}
