import React, { memo, useState, useEffect } from 'react'
import { CalendarContext } from './context'
import { LoadingPage } from '../../../../components'
import { CalendarBody, CropSelector, TableFarmCropCollect } from './components'
import { useGetInputIrrigByIdQuery, useGetValueRateByYrAndIrrQuery, useGetYearRateByIdQuery } from '../../../../store/actions'

export const CalendarVolumeFullYear = memo(function Calendar({
    campaign = null,
    inputIrrig = null
}) {

    const { data: campaignDetail = null, isFetching: isLoadingCmp } = useGetYearRateByIdQuery(campaign)

    const { data: inputIrrigDetail = null, isFetching: isLoadingIrr } = useGetInputIrrigByIdQuery(inputIrrig)

    const { data: valueRateDetail = null, isFetching: isLoadingVal } = useGetValueRateByYrAndIrrQuery({ yearrate: campaign, inputirrig: inputIrrig })

    const [context, setContext] = useState({
        campaign: campaignDetail,
        campaignId: campaign,
        inputIrrig: inputIrrigDetail,
        inputIrrigId: inputIrrig,
        valueRate: valueRateDetail,
        farmCrop: null,
        events: []
    })

    useEffect(() => {
        setContext(v => ({ ...v, campaign: campaignDetail, inputIrrig: inputIrrigDetail, valueRate: valueRateDetail }))
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

