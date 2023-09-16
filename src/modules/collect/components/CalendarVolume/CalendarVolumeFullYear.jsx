import React, { memo, useState, useEffect } from 'react'
import { CalendarContext } from './context'
import { CalendarBody, CropSelector, TableFarmCropCollect } from './components'
import { LoadingPage } from '@/components'
import { useGetInputIrrigationByIdQuery, useGetValueRateByYrAndIrrQuery, useGetYearRateByIdQuery } from '@/store/actions'

export const CalendarVolumeFullYear = memo(function Calendar({
    campaign = null,
    inputIrrigation = null
}) {

    const { data: campaignDetail = null, isFetching: isLoadingCmp } = useGetYearRateByIdQuery(campaign)

    const { data: inputIrrigDetail = null, isFetching: isLoadingIrr } = useGetInputIrrigationByIdQuery(inputIrrig)

    const { data: valueRateDetail = null, isFetching: isLoadingVal } = useGetValueRateByYrAndIrrQuery({ yearrate: campaign, inputirrig: inputIrrig })

    const [context, setContext] = useState({
        campaign: campaignDetail,
        campaignId: campaign,
        inputIrrigation: inputIrrigDetail,
        inputIrrigationId: inputIrrigation,
        valueRate: valueRateDetail,
        farmCrop: null,
        events: []
    })

    useEffect(() => {
        setContext(v => ({ ...v, campaign: campaignDetail, inputIrrigation: inputIrrigDetail, valueRate: valueRateDetail }))
    }, [campaignDetail, inputIrrigDetail, valueRateDetail])

    return (
        <>
            {
                isLoadingCmp && isLoadingIrr && isLoadingVal
                    ?
                    <LoadingPage />
                    :
                    <CalendarContext.Provider
                        value={[context, setContext]}
                    >
                        <TableFarmCropCollect />
                        <CalendarBody />
                    </CalendarContext.Provider>
            }
        </>
    )
})

