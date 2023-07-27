import React, { useContext, useEffect, useState } from 'react'
import { ManageCollectCampaignContext } from '../context'

export const ControlPayAmount = () => {

    const [{ inputIrrigId, campaignId, amountToPay }, setContext] = useContext(ManageCollectCampaignContext)

    return (
        <h3>MONTO A PAGAR {amountToPay.toFixed(2)}</h3>
    )
}
