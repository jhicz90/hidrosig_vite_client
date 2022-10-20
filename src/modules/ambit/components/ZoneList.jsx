import { useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { FaPen } from 'react-icons/fa'
import { FcSearch } from 'react-icons/fc'
import { Link } from 'react-router-dom'
import { InputTextDebounce, TableGrid, TimeAgo } from '../../../components'
import { useGetZonesQuery } from '../../../store/actions'

export const ZoneList = () => {

    const [search, setSearch] = useState('')
    const { data: list = [], isLoading } = useGetZonesQuery(search)

    return (
        <>
            <Form.Group as={Row} className='my-3 px-3 gx-2' controlId='search'>
                <Form.Label column xs={'auto'} >
                    <FcSearch size={24} />
                </Form.Label>
                <Col>
                    <InputTextDebounce value={search} onChange={(e) => setSearch(e)} />
                </Col>
            </Form.Group>
            <TableGrid
                rows={list}
                columns={
                    [
                        {
                            label: 'ZONA',
                            resize: true,
                            renderCell: (item) => (
                                item.name
                            )
                        },
                        {
                            label: 'JUNTA',
                            renderCell: (item) => (
                                <span>{item.junta?.name || 'Sin junta de usuarios'}</span>
                            )
                        },
                        {
                            label: 'ORDEN',
                            renderCell: (item) =>
                                item.order
                        },
                        {
                            label: 'CREADO',
                            renderCell: (item) =>
                                <TimeAgo timestamp={item.createdAt} />
                        },
                        {
                            label: 'ACTUALIZADO',
                            renderCell: (item) =>
                                <TimeAgo timestamp={item.updatedAt} timeago={true} />
                        },
                        {
                            label: 'ACCIÓN',
                            pinRight: true,
                            renderCell: (item) =>
                                <div className='btn-group'>
                                    <Link
                                        className='btn btn-neutral'
                                        to={`/app/ambit/trrty/zone/${item._id}`}
                                    >
                                        <FaPen />
                                    </Link>
                                </div>
                        }
                    ]
                }
            />
        </>
    )
}
