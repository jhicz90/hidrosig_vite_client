import React, { memo, useState, useEffect } from 'react'
import { ManageCollectCampaignContext } from './context'
import { useGetInputIrrigByIdQuery, useGetYearRateByIdQuery } from '../../../../store/actions'
import { LoadingPage } from '../../../../components'
import { ManageCollectContent } from './components'

export const ManageCollectCampaign = memo(function ManageCollectCampaign({
    campaign = null,
    inputIrrig = null
}) {

    const { data: campaignDetail = null, isFetching: isLoadingCmp } = useGetYearRateByIdQuery(campaign)

    const { data: inputIrrigDetail = null, isFetching: isLoadingIrr } = useGetInputIrrigByIdQuery(inputIrrig)

    const [context, setContext] = useState({
        campaign: campaignDetail,
        campaignId: campaign,
        inputIrrig: inputIrrigDetail,
        inputIrrigId: inputIrrig,
        farmCropNewShow: false,
        farmCropEditShow: false,
        farmCropEditData: null
    })

    useEffect(() => {
        setContext(v => ({ ...v, campaign: campaignDetail, inputIrrig: inputIrrigDetail }))
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
                    </ManageCollectCampaignContext.Provider>
            }
        </React.Fragment>
    )
})