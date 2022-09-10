import React, { useState } from 'react'
import { Button, ButtonGroup, Card, Nav, Tab, Table } from 'react-bootstrap'
import { Marker } from 'react-leaflet'
import { PopupModal } from './PopupModal'

export const PointObjectModal = ({ point }) => {

    const [coord, setCoord] = useState(point.geometry.coordinates.length === 2 ? point.geometry.coordinates : [-4.79, -80.56])

    return (
        <Marker position={coord}>
            <PopupModal classNameBody="p-0">
                <Card className="border-0">
                    <Tab.Container defaultActiveKey='props'>
                        <Card.Header className="card-header-with-nav" style={{ borderBottom: "1px solid rgba(0,0,0,0.175)" }}>
                            <Nav className="flex-row" variant='tabs' fill>
                                <Nav.Item>
                                    <Nav.Link style={{ cursor: 'pointer' }} eventKey='props'>Propiedades</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link style={{ cursor: 'pointer' }} eventKey='info'>Información</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Card.Header>
                        <Card.Body>
                            <Tab.Content>
                                <Tab.Pane eventKey='props'>
                                    <>
                                        <Table striped bordered>
                                            <tbody>
                                                <tr>
                                                    <td>1</td>
                                                    <td>Mark</td>
                                                    <td>Otto</td>
                                                    <td>@mdo</td>
                                                </tr>
                                                <tr>
                                                    <td>2</td>
                                                    <td>Jacob</td>
                                                    <td>Thornton</td>
                                                    <td>@fat</td>
                                                </tr>
                                                <tr>
                                                    <td>3</td>
                                                    <td colSpan={2}>Larry the Bird</td>
                                                    <td>@twitter</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </>
                                </Tab.Pane>
                                <Tab.Pane eventKey='info'>
                                    <>
                                        <Table striped bordered hover>
                                            <tbody>
                                                <tr>
                                                    <td>1</td>
                                                    <td>Mark</td>
                                                    <td>Otto</td>
                                                    <td>@mdo</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </>
                                </Tab.Pane>
                            </Tab.Content>
                        </Card.Body>
                    </Tab.Container>
                    <Card.Footer>
                        <div className="d-flex justify-content-between">
                            <Button size='sm' variant='danger'>Eliminar</Button>
                            <ButtonGroup size='sm'>
                                <button className="btn btn-neutral">Cancelar</button>
                                <Button variant='primary'>Guardar</Button>
                            </ButtonGroup>
                        </div>
                    </Card.Footer>
                </Card>
            </PopupModal>
        </Marker>
    )
}
