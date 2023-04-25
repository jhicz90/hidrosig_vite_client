import React from 'react'
import { Button, Card, Dropdown } from 'react-bootstrap'
import { AiFillNotification } from 'react-icons/ai'
import { FaCoins } from 'react-icons/fa'
import { IoEllipsisVertical } from 'react-icons/io5'

export const FeeCollectBillUserFarmPage = () => {
    return (
        <div className='container-fluid'>
            <div className='row my-3'>
                <div className='col-12'>
                    <div className='row align-items-center justify-content-between g-3'>
                        <div className='col-12 col-md-auto'>
                            <h4 className='mb-0'>COBRANZA DE TARIFA</h4>
                        </div>
                        <div className='col-12 col-md-auto'>
                            <div className='d-flex gap-2'>
                                <Button variant='primary' className='d-flex align-items-center gap-2'>
                                    <AiFillNotification size={24} />
                                    Generar notificación
                                </Button>
                                <Button
                                    variant='warning'
                                    className='d-flex align-items-center gap-2'
                                >
                                    <FaCoins size={24} />
                                    Generar deuda
                                </Button>
                                <Dropdown className='dropdown-noarrow'>
                                    <Dropdown.Toggle variant='neutral' className='d-flex align-items-center'>
                                        <IoEllipsisVertical size={24} />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item>Reportes</Dropdown.Item>
                                        <Dropdown.Item>Imprimir</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                    <Card>
                        <Card.Body>
                            Busqueda
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div >
    )
}