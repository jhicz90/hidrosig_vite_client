import React from 'react'
import { Card } from 'react-bootstrap'
import { ChannelNetworkTreeSiga, ReportAction, ReportListComms, ReportListRates, ReportListType, ReportOptions } from '../components'

export const SigaReportPage = () => {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col">
                    <div className='pb-5'>
                        <h2 className='mb-3 fw-light'>Tipo de reporte</h2>
                        <Card>
                            <Card.Body>
                                <div className='row'>
                                    <div className='col-12 col-lg-6'>
                                        <ReportListType />
                                        <ReportListComms />
                                        <ReportListRates />
                                    </div>
                                    <div className='col-12 col-lg-6'>
                                        <ChannelNetworkTreeSiga />
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                    <ReportOptions />
                </div>
            </div>
            <div className='d-flex justify-content-end gap-2'>
                <ReportAction />
            </div>
        </div>
    )
}
