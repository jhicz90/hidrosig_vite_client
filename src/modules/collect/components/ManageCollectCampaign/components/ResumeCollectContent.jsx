import React, { useContext } from 'react'
import { Button } from 'react-bootstrap'
import { FaHistory, FaMoneyBillWave } from 'react-icons/fa'
import { FaMoneyBillTrendUp } from 'react-icons/fa6'
import { TbMoneybag } from 'react-icons/tb'
import { ManageCollectCampaignContext } from '../context'
import { LoadingPage } from '../../../../../components'
import { useGetPayResumeByCampaignAndInputIrrigQuery } from '../../../../../store/actions'
import { CardHeaderStyled } from '../../../../../style'
import { PayCollectModal } from '.'

export const ResumeCollectContent = () => {

    const [{ campaignId, inputIrrigId }, setContext] = useContext(ManageCollectCampaignContext)

    const { data = null, isFetching, isSuccess } = useGetPayResumeByCampaignAndInputIrrigQuery({ campaign: campaignId, inputIrrig: inputIrrigId })

    if (isFetching) {
        return <LoadingPage />
    }

    return (
        <React.Fragment>
            <PayCollectModal />
            <CardHeaderStyled>
                <div className='card-header-wrapper'>
                    <div className='card-header-tittle'>
                        <h3>Pago de tarifa de agua</h3>
                    </div>
                    <div className='card-header-actions'>
                        <Button
                            onClick={() => setContext(v => ({ ...v, payCollectRateShow: true, amountToPay: 0 }))}
                            variant='success'
                            size='sm'
                            className='d-flex align-items-center gap-2'
                        >
                            <FaMoneyBillWave />
                            Pagar tarifa
                        </Button>
                        <Button
                            variant='primary'
                            size='sm'
                            className='d-flex align-items-center gap-2'
                        >
                            <TbMoneybag />
                            Pago adelantado
                        </Button>
                        <Button
                            variant='primary'
                            size='sm'
                            className='d-flex align-items-center gap-2'
                        >
                            <FaMoneyBillTrendUp />
                            Procesar debito
                        </Button>
                        <Button
                            variant='neutral'
                            size='sm'
                            className='d-flex align-items-center gap-2'
                        >
                            <FaHistory />
                            Historial de pagos
                        </Button>
                        <Button
                            variant='neutral'
                            size='sm'
                            className='d-flex align-items-center gap-2'
                        >
                            <FaHistory />
                            Debitos descontados
                        </Button>
                    </div>
                </div>
            </CardHeaderStyled>
            <div className='row'>
                <div className='col-12'>
                    <div className='d-grid p-3' style={{ overflowX: 'auto', gap: '8px', gridTemplateColumns: '120px 120px 120px 120px 120px' }}>
                        <div style={{ verticalAlign: 'middle', textAlign: 'center', backgroundColor: 'darkgray', color: 'white' }}>Volumen (m<sup>3</sup>)</div>
                        <div style={{ verticalAlign: 'middle', textAlign: 'center', backgroundColor: 'darkgray', color: 'white' }}>Deuda (S/.)</div>
                        <div style={{ verticalAlign: 'middle', textAlign: 'center', backgroundColor: 'darkgray', color: 'white' }}>Interes (S/.)</div>
                        <div style={{ verticalAlign: 'middle', textAlign: 'center', backgroundColor: 'darkgray', color: 'white' }}>Pagado (S/.)</div>
                        <div style={{ verticalAlign: 'middle', textAlign: 'center', backgroundColor: 'darkgray', color: 'white' }}>Saldo (S/.)</div>
                        <div style={{ verticalAlign: 'middle', textAlign: 'center', backgroundColor: 'darkgray', color: 'white' }}>{data.volume.toFixed(2) || 0}</div>
                        <div style={{ verticalAlign: 'middle', textAlign: 'center', backgroundColor: 'darkgray', color: 'white' }}>{data.debt.toFixed(2) || 0}</div>
                        <div style={{ verticalAlign: 'middle', textAlign: 'center', backgroundColor: 'darkgray', color: 'white' }}>{data.interest.toFixed(2) || 0}</div>
                        <div style={{ verticalAlign: 'middle', textAlign: 'center', backgroundColor: 'darkgray', color: 'white' }}>{data.payed.toFixed(2) || 0}</div>
                        <div style={{ verticalAlign: 'middle', textAlign: 'center', backgroundColor: 'darkgray', color: 'white' }}>{data.newDebt.toFixed(2) || 0}</div>
                    </div>
                </div>
            </div>
            {/* AQUI IRA EL COMPONENTE QUE PERMITIRA PAGAR */}
        </React.Fragment>
    )
}
