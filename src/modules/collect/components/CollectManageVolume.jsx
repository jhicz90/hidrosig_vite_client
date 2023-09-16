import React from 'react'
import { useSearchParams } from 'react-router-dom'
import validator from 'validator'
import { CalendarVolumeFullYear } from '..'

export const CollectManageVolume = () => {

    const [searchParams, setSearchParams] = useSearchParams()
    const { cmp, irr } = Object.fromEntries([...searchParams])
    const valid = validator.isMongoId(cmp || '') && validator.isMongoId(irr || '')

    return (
        <CalendarVolumeFullYear
            campaign={cmp}
            inputIrrig={irr}
        />
    )
}