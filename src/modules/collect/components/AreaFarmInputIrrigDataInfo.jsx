import React from 'react'
import { Card } from 'react-bootstrap'
import { IoWater } from 'react-icons/io5'
import { LoadingPage } from '../../../components'
import { useCollectStore } from '../../../hooks'
import { useGetFarmByIdQuery } from '../../../store/actions'

export const AreaFarmInputIrrigDataInfo = ({ tabId = '' }) => {

    const { getPrpActiveByTabId, getCmpActiveByTabId } = useCollectStore()
    const prpActive = getPrpActiveByTabId(tabId)
    const cmpActive = getCmpActiveByTabId(tabId)
    const cmp = cmpActive.split('-')
    const { data = null, isLoading } = useGetFarmByIdQuery(prpActive)

    if (isLoading) {
        return <LoadingPage />
    }

    return (
        <Card style={{ overflow: 'hidden' }}>
            <Card.Header>
                <div className='row justify-content-end'>
                    <div className='col-auto'>
                        <h6 className='text-uppercase fw-bold m-0'>TOMA DE RIEGO <IoWater size={20} /></h6>
                    </div>
                </div>
            </Card.Header>
            {
                data?.inputIrrig.filter(ip => ip._id === cmp[1]).map((inputIrr, index) =>
                    <div key={`inputirrig_${inputIrr._id}`} className='container-fluid py-2'>
                        <div className='row'>
                            <div className='col-12 col-md-4'>
                                <div className='row'>
                                    <div className='col-sm-4 col-5'>
                                        <div className='fw-semi-bold mb-1'>Código de toma</div>
                                    </div>
                                    <div className='col-7'>
                                        <div className='mb-1'><b>{inputIrr?.code}</b></div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-12 col-md-4'>
                                <div className='row'>
                                    <div className='col-sm-4 col-5'>
                                        <div className='fw-semi-bold mb-1'>Sistema de riego</div>
                                    </div>
                                    <div className='col-7'>
                                        <div className='mb-1'>{inputIrr?.irrigSystem.name}</div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-12 col-md-4'>
                                <div className='row'>
                                    <div className='col-sm-4 col-5'>
                                        <div className='fw-semi-bold mb-1'>Area de uso</div>
                                    </div>
                                    <div className='col-7'>
                                        <div className='mb-1'>{inputIrr?.areaUseInput.toFixed(5)}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-12'>
                                <div className='row'>
                                    <div className='col-sm-4 col-5'>
                                        <div className='fw-semi-bold mb-1'>Estructura de riego</div>
                                    </div>
                                    <div className='col-auto'>
                                        <div className='mb-1'>{inputIrr?.fullNetStructure}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </Card>
    )
}
