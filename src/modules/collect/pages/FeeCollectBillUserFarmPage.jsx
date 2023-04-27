import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Accordion, Button, Card, Collapse, Dropdown, Form, ListGroup } from 'react-bootstrap'
import Scrollbars from 'rc-scrollbars'
import { AiFillNotification } from 'react-icons/ai'
import { FaCoins } from 'react-icons/fa'
import { IoEllipsisVertical, IoEyeSharp } from 'react-icons/io5'
import { DataTable, ScrollbarsShadow, TagStatus, TagTimeAgo } from '../../../components'
import { useGetListFarmByUserFarmQuery } from '../../../store/actions'

export const FeeCollectBillUserFarmPage = () => {

    const { userid } = useParams()
    const { data: farmsIn = [] } = useGetListFarmByUserFarmQuery({ userfarm: userid, search: '' })
    const [showFarms, setShowFarms] = useState(true)

    return (
        <>
            <div className='container-fluid'>
                <div className='row my-3'>
                    <div className='col-12'>
                        <div className='row align-items-center justify-content-between g-3'>
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
                                    <Button
                                        onClick={() => setShowFarms(!showFarms)}
                                        variant='neutral'
                                    >
                                        Lista de predios
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
            </div>
            <Collapse in={showFarms}>
                <div
                    className='row g-0 justify-content-center mb-3'
                    style={{ borderTop: '2px solid blue', borderBottom: '2px solid blue' }}
                >
                    <div className='col'>
                        <DataTable
                            height='200px'
                            rows={farmsIn}
                            columns={
                                [
                                    {
                                        label: 'PREDIO',
                                        minWidth: '250px',
                                        renderCell: (item) => (
                                            <div className='d-flex flex-column'>
                                                <p
                                                    className='d-block text-primary fw-bolder mb-0'
                                                >
                                                    {item.name}
                                                </p>
                                                <span>{item.code}</span>
                                            </div>
                                        )
                                    },
                                    {
                                        label: 'ESTADO',
                                        renderCell: (item) =>
                                            <TagStatus status={item.active} />
                                    },
                                    {
                                        label: 'CREADO',
                                        renderCell: (item) =>
                                            <TagTimeAgo timestamp={item.createdAt} />
                                    },
                                    {
                                        label: 'ACTUALIZADO',
                                        renderCell: (item) =>
                                            <TagTimeAgo timestamp={item.updatedAt} timeago={true} />
                                    },
                                    {
                                        label: 'ACCIÓN',
                                        width: '200px',
                                        pinRight: true,
                                        renderCell: (item) =>
                                            <div className='d-flex gap-2 p-2'>
                                                <Button
                                                    // onClick={() =>
                                                    //     dispatch(addSearched({
                                                    //         id: item._id,
                                                    //         title: `${item.type > 1 ? `${item.socialReason}` : `${item.names} ${item.lastName} ${item.motherLastName}`}`, typeSearch: 'usr'
                                                    //     }))
                                                    // }
                                                    onClick={() => setShowFarms(false)}
                                                    variant='neutral-icon'
                                                    style={{ padding: '0.5rem' }}
                                                >
                                                    <IoEyeSharp size={16} />
                                                </Button>
                                            </div>
                                    }
                                ]
                            }
                        />
                    </div>
                </div>
            </Collapse>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-12 col-md-4 col-lg-3'>
                        <div className='row'>
                            <div className='col'>
                                <Card style={{ overflow: 'hidden' }}>
                                    <Card.Body>
                                        <Form.Control
                                            type='text'
                                        />
                                    </Card.Body>
                                    <Accordion flush style={{ borderRadius: '9px' }}>
                                        <Accordion.Item eventKey='convenios'>
                                            <Accordion.Header>
                                                CONVENIOS
                                            </Accordion.Header>
                                            <Accordion.Body className='p-0'>
                                                <ListGroup variant='flush'>
                                                    <ListGroup.Item variant='success' action>CONVENIO #2023A2RU - CANCELADO</ListGroup.Item>
                                                    <ListGroup.Item variant='danger' action>CONVENIO #2021P123 - PENDIENTE</ListGroup.Item>
                                                </ListGroup>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey='2023'>
                                            <Accordion.Header>
                                                ACTUAL - 2023
                                            </Accordion.Header>
                                            <Accordion.Body className='p-0'>
                                                <ListGroup variant='flush'>
                                                    <ListGroup.Item variant='warning' action>Campaña GRANDE II</ListGroup.Item>
                                                </ListGroup>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <ScrollbarsShadow autoHide style={{ height: 200 }}>
                                            <Accordion.Item eventKey='2022'>
                                                <Accordion.Header>
                                                    2022 - SALDO: S/. 200.10
                                                </Accordion.Header>
                                                <Accordion.Body className='p-0'>
                                                    <ListGroup variant='flush'>
                                                        <ListGroup.Item variant='danger' action>Campaña CHICA I</ListGroup.Item>
                                                        <ListGroup.Item variant='danger' action>Campaña GRANDE II</ListGroup.Item>
                                                    </ListGroup>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey='2021'>
                                                <Accordion.Header>
                                                    2021 - CANCELADO
                                                </Accordion.Header>
                                                <Accordion.Body className='p-0'>
                                                    <ListGroup variant='flush' style={{ borderRadius: '9px' }}>
                                                        <ListGroup.Item>Campaña CHICA I</ListGroup.Item>
                                                        <ListGroup.Item>Campaña GRANDE II</ListGroup.Item>
                                                    </ListGroup>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey='2020'>
                                                <Accordion.Header>
                                                    2020
                                                </Accordion.Header>
                                                <Accordion.Body className='p-0'>
                                                    <ListGroup variant='flush' style={{ borderRadius: '9px' }}>
                                                        <ListGroup.Item>Campaña CHICA I</ListGroup.Item>
                                                        <ListGroup.Item>Campaña GRANDE II</ListGroup.Item>
                                                    </ListGroup>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey='2019'>
                                                <Accordion.Header>
                                                    2019
                                                </Accordion.Header>
                                                <Accordion.Body className='p-0'>
                                                    <ListGroup variant='flush' style={{ borderRadius: '9px' }}>
                                                        <ListGroup.Item>Campaña CHICA I</ListGroup.Item>
                                                        <ListGroup.Item>Campaña GRANDE II</ListGroup.Item>
                                                    </ListGroup>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey='2018'>
                                                <Accordion.Header>
                                                    2018
                                                </Accordion.Header>
                                                <Accordion.Body className='p-0'>
                                                    <ListGroup variant='flush' style={{ borderRadius: '9px' }}>
                                                        <ListGroup.Item>Campaña CHICA I</ListGroup.Item>
                                                        <ListGroup.Item>Campaña GRANDE II</ListGroup.Item>
                                                    </ListGroup>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey='2017'>
                                                <Accordion.Header>
                                                    2017
                                                </Accordion.Header>
                                                <Accordion.Body className='p-0'>
                                                    <ListGroup variant='flush' style={{ borderRadius: '9px' }}>
                                                        <ListGroup.Item>Campaña CHICA I</ListGroup.Item>
                                                        <ListGroup.Item>Campaña GRANDE II</ListGroup.Item>
                                                    </ListGroup>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey='2016'>
                                                <Accordion.Header>
                                                    2016
                                                </Accordion.Header>
                                                <Accordion.Body className='p-0'>
                                                    <ListGroup variant='flush' style={{ borderRadius: '9px' }}>
                                                        <ListGroup.Item>Campaña CHICA I</ListGroup.Item>
                                                        <ListGroup.Item>Campaña GRANDE II</ListGroup.Item>
                                                    </ListGroup>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey='2015'>
                                                <Accordion.Header>
                                                    2015
                                                </Accordion.Header>
                                                <Accordion.Body className='p-0'>
                                                    <ListGroup variant='flush' style={{ borderRadius: '9px' }}>
                                                        <ListGroup.Item>Campaña CHICA I</ListGroup.Item>
                                                        <ListGroup.Item>Campaña GRANDE II</ListGroup.Item>
                                                    </ListGroup>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey='2014'>
                                                <Accordion.Header>
                                                    2014
                                                </Accordion.Header>
                                                <Accordion.Body className='p-0'>
                                                    <ListGroup variant='flush' style={{ borderRadius: '9px' }}>
                                                        <ListGroup.Item>Campaña CHICA I</ListGroup.Item>
                                                        <ListGroup.Item>Campaña GRANDE II</ListGroup.Item>
                                                    </ListGroup>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey='2013'>
                                                <Accordion.Header>
                                                    2013
                                                </Accordion.Header>
                                                <Accordion.Body className='p-0'>
                                                    <ListGroup variant='flush' style={{ borderRadius: '9px' }}>
                                                        <ListGroup.Item>Campaña CHICA I</ListGroup.Item>
                                                        <ListGroup.Item>Campaña GRANDE II</ListGroup.Item>
                                                    </ListGroup>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey='2012'>
                                                <Accordion.Header>
                                                    2012
                                                </Accordion.Header>
                                                <Accordion.Body className='p-0'>
                                                    <ListGroup variant='flush' style={{ borderRadius: '9px' }}>
                                                        <ListGroup.Item>Campaña CHICA I</ListGroup.Item>
                                                        <ListGroup.Item>Campaña GRANDE II</ListGroup.Item>
                                                    </ListGroup>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey='2011'>
                                                <Accordion.Header>
                                                    2011
                                                </Accordion.Header>
                                                <Accordion.Body className='p-0'>
                                                    <ListGroup variant='flush' style={{ borderRadius: '9px' }}>
                                                        <ListGroup.Item>Campaña CHICA I</ListGroup.Item>
                                                        <ListGroup.Item>Campaña GRANDE II</ListGroup.Item>
                                                    </ListGroup>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey='2010'>
                                                <Accordion.Header>
                                                    2010
                                                </Accordion.Header>
                                                <Accordion.Body className='p-0'>
                                                    <ListGroup variant='flush' style={{ borderRadius: '9px' }}>
                                                        <ListGroup.Item>Campaña CHICA I</ListGroup.Item>
                                                        <ListGroup.Item>Campaña GRANDE II</ListGroup.Item>
                                                    </ListGroup>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey='2009' style={{ borderBottomLeftRadius: '9px', borderBottomRightRadius: '9px' }}>
                                                <Accordion.Header>
                                                    2009
                                                </Accordion.Header>
                                                <Accordion.Body className='p-0'>
                                                    <ListGroup variant='flush' style={{ borderRadius: '9px' }}>
                                                        <ListGroup.Item>Campaña CHICA I</ListGroup.Item>
                                                        <ListGroup.Item
                                                            style={{ borderBottomLeftRadius: '9px', borderBottomRightRadius: '9px' }}
                                                        >
                                                            Campaña GRANDE II
                                                        </ListGroup.Item>
                                                    </ListGroup>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </ScrollbarsShadow>
                                    </Accordion>
                                </Card>
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-md-8 col-lg-9'>
                        <div className='row'>
                            <div className='col'>
                                <Card>
                                    <Card.Body>
                                        Tarifas
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}