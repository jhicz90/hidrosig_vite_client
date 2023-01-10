import React from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { startReportSigaCollectEfficiency, startReportSigaIrrigationScheduling, startReportSigaUserRegistry } from '../../../store/actions'

export const ReportAction = () => {

    const dispatch = useDispatch()
    const { report } = useSelector(state => state.siga)

    const handleReport = () => {
        if (report === 'Eficiencia de cobranza') {
            dispatch(startReportSigaCollectEfficiency())
        } else if (report === 'Programación de riego') {
            dispatch(startReportSigaIrrigationScheduling())
        } else if (report === 'Padrón de usuarios para volumen') {
            dispatch(startReportSigaUserRegistry())
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
