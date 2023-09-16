import React, { memo, useState, useEffect } from 'react'
import { ManageCollectCampaignContext } from './context'
import { ManageCollectContent, ResumeCollectContent } from './components'
import { useGetInputIrrigationByIdQuery, useGetYearRateByIdQuery } from '@/store/actions'
import { LoadingPage } from '@/components'

export const ManageCollectCampaign = memo(function ManageCollectCampaign({
    campaign = null,
    inputIrrigation = null
}) {

    const { data: campaignDetail = null, isFetching: isLoadingCmp } = useGetYearRateByIdQuery(campaign)

    const { data: inputIrrigDetail = null, isFetching: isLoadingIrr } = useGetInputIrrigationByIdQuery(inputIrrigation)

    const [context, setContext] = useState({
        campaign: campaignDetail,
        campaignId: campaign,
        inputIrrigation: inputIrrigDetail,
        inputIrrigationId: inputIrrigation,
        payCollectRateShow: false,
        amountToPay: 0,
        farmCropNewShow: false,
        farmCropEditShow: false,
        farmCropEditData: null
    })

    useEffect(() => {
        setContext(v => ({ ...v, campaign: campaignDetail, inputIrrigation: inputIrrigDetail }))
    }, [campaignDetail, inputIrrigDetail])

    return (
        <React.Fragment>
            {
                isLoadingCmp && isLoadingIrr
                    ?
                    <LoadingPage />
                    :
                    <ManageCollectCampaignContext.Provider
                        value={[context, setContext]}
                    >
                        <ManageCollectContent />
                        <ResumeCollectContent />
                    </ManageCollectCampaignContext.Provider>
            }
        </React.Fragment>
    )
})