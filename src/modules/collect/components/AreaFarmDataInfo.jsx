import { Button, Card } from 'react-bootstrap'
import { IoMap, IoWater } from 'react-icons/io5'
import { useGetFarmByIdQuery } from '../../../store/actions'
import { useCollectStore } from '../../../hooks'
import { LoadingPage, ScrollbarsShadow } from '../../../components'

export const AreaFarmDataInfo = ({ tabId = '' }) => {

    const { getPrpActiveByTabId } = useCollectStore()
    const prpActive = getPrpActiveByTabId(tabId)
    const { data = null, isLoading } = useGetFarmByIdQuery(prpActive)

    if (isLoading) {
        return <LoadingPage />
    }

    return (
        <>
            <Card style={{ overflow: 'hidden' }}>
                <Card.Header>
                    <div className='row justify-content-end'>
                        <div className='col-auto'>
                            <h6 className='text-uppercase fw-bold m-0'>PREDIO <IoMap size={20} /></h6>
                        </div>
                    </div>
                </Card.Header>
                <ScrollbarsShadow autoHide style={{ height: 200 }}>
                    <div className='d-inline-flex p-2 gap-2 flex-wrap'>
                        <Button variant='neutral' size='sm'>Ver predio</Button>
                        {
                            data?.inputIrrig.length > 0 &&
                            <Button variant='neutral' size='sm'>Tomas de riego</Button>
                        }
                        {
                            !!data?.feature &&
                            <Button variant='neutral' size='sm'>Mapa</Button>
                        }
                        {
                            data?.images.length > 0 &&
                            <Button variant='neutral' size='sm'>Imagenes</Button>
                        }
                        {
                            data?.userfarms.length > 0 &&
                            <Button variant='neutral' size='sm'>Posesionarios</Button>
                        }
                    </div>
                    <div className='container-fluid py-2'>
                        <div className='row'>
                            <div className='col-sm-4 col-5'>
                                <div className='fw-semi-bold mb-1'>Nombre predio</div>
                            </div>
                            <div className='col'>
                                <div className='mb-1'><b>{data?.name}</b></div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-4 col-5'>
                                <div className='fw-semi-bold mb-1'>Código</div>
                            </div>
                            <div className='col'>
                                <div className='mb-1'><b>{data?.code}</b></div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-4 col-5'>
                                <div className='fw-semi-bold mb-1'>Unidad catastral</div>
                            </div>
                            <div className='col'>
                                <div className='mb-1'>{data?.cadUnit}</div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-4 col-5'>
                                <div className='fw-semi-bold mb-1'>Tomas de riego</div>
                            </div>
                            <div className='col'>
                                <div className='mb-1'>{data?.inputIrrig.length || 'Sin tomas de riego'}</div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-4 col-5'>
                                <div className='fw-semi-bold mb-1'>Bloque de riego</div>
                            </div>
                            <div className='col'>
                                <div className='mb-1'>{data?.block?.name}</div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-4 col-5'>
                                <div className='fw-semi-bold mb-1'>Lugar</div>
                            </div>
                            <div className='col'>
                                <div className='mb-1'>{data?.place || 'Sin lugar de referencia'}</div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-4 col-5'>
                                <div className='fw-semi-bold mb-1'>Área licencia</div>
                            </div>
                            <div className='col'>
                                <div className='mb-1'>{data?.areaLic.toFixed(5)}</div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-4 col-5'>
                                <div className='fw-semi-bold mb-1'>Área bajo riego</div>
                            </div>
                            <div className='col'>
                                <div className='mb-1'>{data?.areaUse.toFixed(5)}</div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-4 col-5'>
                                <div className='fw-semi-bold mb-1'>Área permiso</div>
                            </div>
                            <div className='col'>
                                <div className='mb-1'>{data?.areaPer.toFixed(5)}</div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-4 col-5'>
                                <div className='fw-semi-bold mb-1'>Área total</div>
                            </div>
                            <div className='col'>
                                <div className='mb-1'>{data?.areaTotal.toFixed(5)}</div>
                            </div>
                        </div>
                    </div>
                </ScrollbarsShadow>
            </Card>
            {/* {
                    data?.inputIrrig.length > 1
                    &&
                    <div className='col-12 col-md-5 col-xxl-6'>
                        <Card style={{ overflow: 'hidden' }}>
                            <Card.Header>
                                <div className='row justify-content-end'>
                                    <div className='col-auto'>
                                        <h6 className='text-uppercase fw-bold m-0'>TOMAS DE RIEGO <IoWater size={20} /></h6>
                                    </div>
                                </div>
                            </Card.Header>
                            <ScrollbarsShadow autoHide style={{ height: 120 }}>
                                {
                                    data?.inputIrrig.map((inputIrr, index) =>
                                        <div key={`inputirrig_${inputIrr._id}`} className='container-fluid py-2'>
                                            <div className='row'>
                                                <div className='col-sm-4 col-5'>
                                                    <div className='fw-semi-bold mb-1'>Código de toma de riego</div>
                                                </div>
                                                <div className='col'>
                                                    <div className='mb-1'><b>{inputIrr?.code}</b></div>
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className='col-sm-4 col-5'>
                                                    <div className='fw-semi-bold mb-1'>Estructura de riego</div>
                                                </div>
                                                <div className='col'>
                                                    <div className='mb-1'>{inputIrr?.structure.name}</div>
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className='col-sm-4 col-5'>
                                                    <div className='fw-semi-bold mb-1'>Area de uso</div>
                                                </div>
                                                <div className='col'>
                                                    <div className='mb-1'>{inputIrr?.areaUseInput.toFixed(5)}</div>
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className='col-sm-4 col-5'>
                                                    <div className='fw-semi-bold mb-1'>Sistema de riego</div>
                                                </div>
                                                <div className='col'>
                                                    <div className='mb-1'>{inputIrr?.irrigSystem.name}</div>
                                                </div>
                                            </div>
                                            {
                                                index % 2 === 0
                                                &&
                                                <hr className='m-0' />
                                            }
                                        </div>
                                    )
                                }
                            </ScrollbarsShadow>
                        </Card>
                    </div>
                } */}
        </>
    )
}