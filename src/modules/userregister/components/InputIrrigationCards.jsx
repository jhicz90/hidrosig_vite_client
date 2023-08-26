import React from 'react'
import { Button, ButtonGroup, Card, Col, Row } from 'react-bootstrap'
import moment from 'moment'
import { MapLocation } from '../../../components'
import { typeIrrigation } from '../../../helpers'

export const InputIrrigationCards = ({ inputIrrigationIn = [] }) => {
    return (
        <div className='row row-cols-1 row-cols-md-2 g-1 my-2'>
            {
                inputIrrigationIn.map(inputIrr =>
                    <Col key={inputIrr._id} md={6}>
                        <Card>
                            <Row className='g-0'>
                                <Col xl={4}>
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
                                                height: '400px'
                                            }}
                                        />
                                    }
                                </Col>
                                <Col className='d-flex flex-column justify-content-between' xl={8}>
                                    <Card.Body>
                                        <Card.Title>{inputIrr.code}</Card.Title>
                                        <div className='row mt-0 gy-2 gx-0'>
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
                                                {inputIrr.structure.structureRoute}
                                            </div>
                                            <div className='col-4 col-xl-4 fw-bold'>
                                                ORDEN DE RIEGO
                                            </div>
                                            <div className='col-8 col-xl-8'>
                                                {inputIrr.order}
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
    )
}
