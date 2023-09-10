import React from 'react'
import { Button, ButtonGroup, Card, Col, Row } from 'react-bootstrap'
import moment from 'moment'
import { LoadingPage, MapLocation } from '../../../components'
import { typeIrrigation } from '../../../helpers'
import { useGetListInputIrrigByFarmQuery } from '../../../store/actions'

export const InputIrrigationCards = ({ farm = null }) => {

    const { data: inputIrrigationIn = [], isLoading } = useGetListInputIrrigByFarmQuery(farm)

    return (
        <React.Fragment>
            {
                isLoading
                    ?
                    <LoadingPage />
                    :
                    <React.Fragment>
                        {
                            inputIrrigationIn.length > 0
                                ?
                                <div className='row row-cols-1 g-1'>
                                    {
                                        inputIrrigationIn.map(inputIrr =>
                                            <Col key={inputIrr._id}>
                                                <Card>
                                                    <Row className='g-0'>
                                                        <Col md={4}>
                                                            {
                                                                !!inputIrr
                                                                &&
                                                                <MapLocation
                                                                    className='rounded-start'
                                                                    geometry={[
                                                                        { ...inputIrr?.waterPointFeature },
                                                                        { ...inputIrr?.farm.feature }
                                                                    ]}
                                                                    style={{
                                                                        height: '300px'
                                                                    }}
                                                                />
                                                            }
                                                        </Col>
                                                        <Col md={8} className='d-flex flex-column justify-content-between'>
                                                            <Card.Body>
                                                                <Card.Title>{inputIrr.code}</Card.Title>
                                                                <div className='row mt-0 gy-2 gx-0' style={{ fontSize: '12px' }}>
                                                                    <div className='col-4 col-xl-4 fw-bold'>
                                                                        AREA EN USO
                                                                    </div>
                                                                    <div className='col-8 col-xl-8'>
                                                                        {inputIrr.areaUseInput.toFixed(2)} HAS
                                                                    </div>
                                                                    <div className='col-4 col-xl-4 fw-bold'>
                                                                        SISTEMA DE RIEGO
                                                                    </div>
                                                                    <div className='col-8 col-xl-8'>
                                                                        {inputIrr.irrigationSystem.name} {`(${inputIrr.flowUse.toFixed(2)} m3/seg)`}
                                                                    </div>
                                                                    <div className='col-4 col-xl-4 fw-bold'>
                                                                        TIPO DE RIEGO
                                                                    </div>
                                                                    <div className='col-8 col-xl-8'>
                                                                        {typeIrrigation(inputIrr.regulation)}
                                                                    </div>
                                                                    <div className='col-4 col-xl-4 fw-bold'>
                                                                        CANAL DE RIEGO
                                                                    </div>
                                                                    <div className='col-8 col-xl-8'>
                                                                        {inputIrr.section.channel?.channelRoute}
                                                                    </div>
                                                                    <div className='col-4 col-xl-4 fw-bold'>
                                                                        TRAMO
                                                                    </div>
                                                                    <div className='col-8 col-xl-8'>
                                                                        {inputIrr.section.name}
                                                                    </div>
                                                                    <div className='col-4 col-xl-4 fw-bold'>
                                                                        ORDEN DE RIEGO
                                                                    </div>
                                                                    <div className='col-8 col-xl-8'>
                                                                        {inputIrr.order}
                                                                    </div>
                                                                    <div className='col-4 col-xl-4 fw-bold'>
                                                                        DESCRIPCIÓN
                                                                    </div>
                                                                    <div className='col-8 col-xl-8'>
                                                                        {inputIrr.desc}
                                                                    </div>
                                                                </div>
                                                                <Card.Text>
                                                                    <small className='text-body-secondary'>{ }</small>
                                                                </Card.Text>
                                                            </Card.Body>
                                                            <Card.Footer>
                                                                <div className='d-flex justify-content-between align-items-center'>
                                                                    <ButtonGroup>
                                                                        <Button
                                                                            variant='neutral'
                                                                            size='sm'
                                                                        >
                                                                            Editar
                                                                        </Button>
                                                                        <Button
                                                                            variant='danger'
                                                                            size='sm'
                                                                        >
                                                                            Eliminar
                                                                        </Button>
                                                                    </ButtonGroup>
                                                                    <small className='text-body-secondary'>{`Actualizado el ${moment(inputIrr.updatedAt).format('DD MMMM, YYYY')}`}</small>
                                                                </div>
                                                            </Card.Footer>
                                                        </Col>
                                                    </Row>
                                                </Card>
                                            </Col>
                                        )
                                    }
                                </div>
                                :
                                <div className='row'>
                                    <div className='col-12'>
                                        <div className='card' style={{ minHeight: '200px' }}>
                                            <div className='card-body'>
                                                <h3 className='position-absolute top-50 start-50 translate-middle text-center'>
                                                    No ahi tomas de riego en este predio
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        }
                    </React.Fragment>
            }
        </React.Fragment >
    )
}
