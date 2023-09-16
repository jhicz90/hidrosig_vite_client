import React, { useContext, useEffect, useState } from 'react'
import { ManageCollectCampaignContext } from '../context'
import { FcApproval } from 'react-icons/fc'
import moment from 'moment'
import { DataTable } from '../../../../../components'
import { useGetPayResumeMonthByCampaignAndInputIrrigQuery } from '../../../../../store/actions'

export const ControlListMonthPay = () => {

    const [{ inputIrrigationId, campaignId }, setContext] = useContext(ManageCollectCampaignContext)
    const [selected, setSelected] = useState([])

    const { data: monthsPayIn = [] } = useGetPayResumeMonthByCampaignAndInputIrrigQuery({ campaign: campaignId, inputIrrigation: inputIrrigationId })
    
    useEffect(() => {
        if (selected.length > 0) {
            const amount = monthsPayIn.filter(item => selected.some(s => item._id === s)).reduce(
                (accumulator, currentValue) => accumulator + currentValue.debtTotal,
                0
            )
            setContext(v => ({ ...v, amountToPay: amount }))
        }

        return () => {
            setContext(v => ({ ...v, amountToPay: 0 }))
        }
    }, [selected])

    return (
        <DataTable
            selected={true}
            selectedChange={(data) => setSelected(data)}
            disabledSelect={(item) => item.debtTotal > 0}
            rows={monthsPayIn}
            minHeightRowCell={'30px'}
            maxHeightRowCell={'20px'}
            maxHeightHeaderRow={'60px'}
            iconDisabledSelect={<FcApproval size={20} />}
            className='border border-2 border-light-subtle'
            columns={
                [
                    {
                        label: 'MES',
                        width: '120px',
                        renderCell: (item) => (
                            <div>{moment().month(item.month - 1).format('MMMM').toUpperCase()}</div>
                        )
                    },
                    {
                        label: 'SALDO TOTAL',
                        width: '80px',
                        isNumber: true,
                        renderCell: (item) =>
                            <div style={{ textAlign: 'right' }}>{Number(item.debtTotal + item.debtInterest).toFixed(2)}</div>
                    },
                    {
                        label: 'DEUDA GENERADA',
                        width: '120px',
                        isNumber: true,
                        renderCell: (item) =>
                            <div style={{ textAlign: 'right' }}>{item.debtInitial.toFixed(2)}</div>
                    },
                    {
                        label: 'SALDO',
                        width: '120px',
                        isNumber: true,
                        renderCell: (item) =>
                            <div style={{ textAlign: 'right' }}>{item.debtTotal.toFixed(2)}</div>
                    },
                    {
                        label: 'FECHA DE VENC.',
                        width: '100px',
                        renderCell: (item) =>
                            <div>{moment().format('DD/MM/YYYY')}</div>
                    },
                    {
                        label: 'DIAS VENC.',
                        width: '100px',
                        isNumber: true,
                        renderCell: (item) =>
                            <div style={{ textAlign: 'right' }}>{item.debtDays}</div>
                    },
                    {
                        label: 'INTERES',
                        width: '100px',
                        isNumber: true,
                        renderCell: (item) =>
                            <div style={{ textAlign: 'right' }}>{item.debtInterest.toFixed(2)}</div>
                    },
                    // {
                    //     label: 'ACCIÓN',
                    //     pinRight: true,
                    //     renderCell: (item) =>
                    //         <div className='d-flex gap-2 p-2'>
                    //             <LinkBack
                    //                 to={`/app/ambit/orgz/yr/${item._id}`}
                    //                 className='btn btn-neutral-icon'
                    //                 style={{ padding: '0.5rem' }}
                    //             >
                    //                 <IoEyeSharp size={16} />
                    //             </LinkBack>
                    //         </div>
                    // }
                ]
            }
        />
    )
}
