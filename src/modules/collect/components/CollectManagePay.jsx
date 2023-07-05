import React from 'react'
import { useGetPayResumeByCampaignAndInputIrrigQuery } from '../../../store/actions'

export const CollectManagePay = ({ campaignId = '', inputIrrig = '' }) => {

    const { data } = useGetPayResumeByCampaignAndInputIrrigQuery({ campaign: campaignId, inputIrrig })

    console.log(data)

    return (
        <div className='d-grid' style={{ overflowX: 'auto', gap: '8px', gridTemplateColumns: '120px 120px 120px 120px 120px' }}>
            <div style={{ verticalAlign: 'middle', textAlign: 'center', backgroundColor: 'darkgray', color: 'white' }}>Volumen (m<sup>3</sup>)</div>
            <div style={{ verticalAlign: 'middle', textAlign: 'center', backgroundColor: 'darkgray', color: 'white' }}>Deuda (S/.)</div>
            <div style={{ verticalAlign: 'middle', textAlign: 'center', backgroundColor: 'darkgray', color: 'white' }}>Interes (S/.)</div>
            <div style={{ verticalAlign: 'middle', textAlign: 'center', backgroundColor: 'darkgray', color: 'white' }}>Pagado (S/.)</div>
            <div style={{ verticalAlign: 'middle', textAlign: 'center', backgroundColor: 'darkgray', color: 'white' }}>Saldo (S/.)</div>
        </div>
    )
}
