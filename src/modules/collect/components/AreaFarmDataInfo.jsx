import React from 'react'
import { Col, Form, ListGroup, Row } from 'react-bootstrap'

export const AreaFarmDataInfo = ({ areaFarm = {} }) => {
    return (
        <>
            <div className='row mb-1'>
                <div className='col'>
                    <strong style={{ fontSize: '1.5rem' }}>{areaFarm?.name}</strong>
                </div>
            </div>
            <div className='row mb-1'>
                <div className='col-12 col-md-6 col-lg-3'>
                    <Form.Group as={Row}>
                        <Form.Label column sm={4}>Código</Form.Label>
                        <Col sm={8}>
                            <Form.Control
                                value={areaFarm?.code}
                                type='text'
                                size='sm'
                                readOnly
                                autoComplete='off'
                            />
                        </Col>
                    </Form.Group>
                </div>
                <div className='col-12 col-md-6 col-lg-3'>
                    <Form.Group as={Row}>
                        <Form.Label column sm={4}>Unidad catastral</Form.Label>
                        <Col sm={8}>
                            <Form.Control
                                value={areaFarm?.cadUnit}
                                type='text'
                                size='sm'
                                readOnly
                                autoComplete='off'
                            />
                        </Col>
                    </Form.Group>
                </div>
                <div className='col-12 col-md-6 col-lg-3'>
                    <Form.Group as={Row}>
                        <Form.Label column sm={4}>Bloque de riego</Form.Label>
                        <Col sm={8}>
                            <Form.Control
                                value={areaFarm?.block?.name}
                                type='text'
                                size='sm'
                                readOnly
                                autoComplete='off'
                            />
                        </Col>
                    </Form.Group>
                </div>
                <div className='col-12 col-md-6 col-lg-3'>
                    <Form.Group as={Row}>
                        <Form.Label column sm={4}>Lugar</Form.Label>
                        <Col sm={8}>
                            <Form.Control
                                value={areaFarm?.place}
                                type='text'
                                size='sm'
                                readOnly
                                autoComplete='off'
                            />
                        </Col>
                    </Form.Group>
                </div>
                <div className='col-12 col-md-6 col-lg-3'>
                    <Form.Group as={Row}>
                        <Form.Label column sm={4}>Área licencia</Form.Label>
                        <Col sm={8}>
                            <Form.Control
                                value={areaFarm?.areaLic}
                                type='number'
                                size='sm'
                                readOnly
                                autoComplete='off'
                            />
                        </Col>
                    </Form.Group>
                </div>
                <div className='col-12 col-md-6 col-lg-3'>
                    <Form.Group as={Row}>
                        <Form.Label column sm={4}>Área bajo riego</Form.Label>
                        <Col sm={8}>
                            <Form.Control
                                value={areaFarm?.areaUse}
                                type='number'
                                size='sm'
                                readOnly
                                autoComplete='off'
                            />
                        </Col>
                    </Form.Group>
                </div>
                <div className='col-12 col-md-6 col-lg-3'>
                    <Form.Group as={Row}>
                        <Form.Label column sm={4}>Área permiso</Form.Label>
                        <Col sm={8}>
                            <Form.Control
                                value={areaFarm?.areaPer}
                                type='number'
                                size='sm'
                                readOnly
                                autoComplete='off'
                            />
                        </Col>
                    </Form.Group>
                </div>
                <div className='col-12 col-md-6 col-lg-3'>
                    <Form.Group as={Row}>
                        <Form.Label column sm={4}>Área total</Form.Label>
                        <Col sm={8}>
                            <Form.Control
                                value={areaFarm?.areaTotal}
                                type='number'
                                size='sm'
                                readOnly
                                autoComplete='off'
                            />
                        </Col>
                    </Form.Group>
                </div>
            </div>
            <div className='row mb-1'>
                <div className='col-12'>
                    <ListGroup>
                        {
                            areaFarm?.inputIrrig.map((inputIrr, index) =>
                                <ListGroup.Item key={inputIrr._id}>
                                    <Form.Group as={Row}>
                                        <Form.Label column sm={4}>{index + 1}) TOMA DE RIEGO <strong>#{inputIrr.code}</strong> - {inputIrr.irrigSystem.name}</Form.Label>
                                        <Col sm={8}>
                                            <Form.Control
                                                value={inputIrr.structure.name}
                                                type='text'
                                                size='sm'
                                                readOnly
                                                plaintext
                                                autoComplete='off'
                                            />
                                        </Col>
                                    </Form.Group>
                                </ListGroup.Item>
                            )
                        }
                    </ListGroup>
                </div>
            </div >
        </>
    )
}
