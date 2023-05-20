import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card } from 'react-bootstrap'
import { IoMap } from 'react-icons/io5'
import { farmApi, setOptionOfIdNav } from '../../../store/actions'

export const AreaFarmDataInfo = ({ tabId = '', prpId = '' }) => {

    const dispatch = useDispatch()
    const { data = null } = useSelector(farmApi.endpoints.getFarmById.select(prpId))

    return (
        <Card>
            <Card.Header>
                <div className='row'>
                    <div className='col'>
                        <h5 className='mb-2 text-primary fw-bold'>{data?.name}</h5>
                    </div>
                    <div className='col-auto'>
                        <h6 className='text-uppercase fw-bold'>PREDIO <IoMap size={20} /></h6>
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <div className='d-inline-flex gap-2 flex-wrap'>
                            <Button
                                onClick={() => dispatch(setOptionOfIdNav({ id: tabId, navOption: 'debt' }))}
                                variant='primary'
                                size='sm'
                                className='d-flex align-items-center gap-2'
                            >
                                Pago tarifa
                            </Button>
                            <Button
                                onClick={() => dispatch(setOptionOfIdNav({ id: tabId, navOption: 'crop' }))}
                                variant='success'
                                size='sm'
                                className='d-flex align-items-center gap-2'
                            >
                                Cultivos
                            </Button>
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
                    </div>
                </div>
            </Card.Header>
            <Card.Body>
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
            </Card.Body>
        </Card>
    )
}
