import React from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { startReportSigaCollectEfficiency, startReportSigaIrrigationScheduling } from '../../../store/siga'

export const ReportAction = () => {

    const dispatch = useDispatch()
    const { report } = useSelector(state => state.siga)

    const handleReport = () => {
        if (report === 'Eficiencia de cobranza') {
            dispatch(startReportSigaCollectEfficiency())
        } else if (report === 'Programación de riego') {
            dispatch(startReportSigaIrrigationScheduling())
        }
    }

    return (
        <Button
            disabled={report === ''}
            onClick={handleReport}
            variant='primary'
        >
            Visualizar reporte
        </Button>
    )
}
