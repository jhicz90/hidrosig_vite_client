import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card } from 'react-bootstrap'
import ReactDatePicker from 'react-datepicker'
import { setReportEndDate, setReportStartDate } from '../../../store/siga'

export const ReportOptions = () => {

    const dispatch = useDispatch()
    const { report, reportDateStart, reportDateEnd } = useSelector(state => state.siga)
    const [endDateEff, setEndDateEff] = useState(reportDateEnd)
    const [dateRange, setDateRange] = useState([reportDateStart, reportDateEnd])
    const [startDate, endDate] = dateRange

    const reportDateEndChange = (date) => {
        setEndDateEff(date)
        dispatch(setReportEndDate(date))
    }

    const reportDateRangeChange = (dates) => {
        setDateRange(dates)
        dispatch(setReportStartDate(dates[0]))
        dispatch(setReportEndDate(dates[1]))
    }

    return (
        <div className='pb-5'>
            <h2 className='mb-3 fw-light'>Opciones de reporte</h2>
            <Card>
                <Card.Body>
                    {
                        report === '' &&
                        <div className='row'>
                            <div className='col-12'>
                                Por favor, seleccione un tipo de reporte
                            </div>
                        </div>
                    }
                    {
                        report === 'Eficiencia de cobranza' &&
                        <div className='row'>
                            <div className='col-12 col-lg-6'>
                                <div className='mb-3'>
                                    <label htmlFor='reportDateEnd' className='form-label'>Fecha de reporte</label>
                                    <ReactDatePicker
                                        id='reportDateEnd'
                                        dateFormat={'dd/MM/yyyy'}
                                        onChange={reportDateEndChange}
                                        showWeekNumbers
                                        className='form-control'
                                        autoComplete='off'
                                    />
                                    <div className='form-text'>
                                        La fecha que indique se obtendra la información de pagos y deudas.
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    {
                        report === 'Programación de riego' &&
                        <div className='row'>
                            <div className='col-12 col-lg-6'>
                                <div className='mb-3'>
                                    <label htmlFor='reportDateRange' className='form-label'>Programación</label>
                                    <div className='input-group'>
                                        <ReactDatePicker
                                            id='reportDateRange'
                                            selectsRange
                                            dateFormat={'dd/MM/yyyy'}
                                            onChange={reportDateRangeChange}
                                            showWeekNumbers
                                            className='form-control'
                                            autoComplete='off'
                                        />
                                    </div>
                                    <div className='form-text'>
                                        La fecha que indique se obtendra la información de pagos y deudas.
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </Card.Body>
            </Card>
        </div>
    )
}
