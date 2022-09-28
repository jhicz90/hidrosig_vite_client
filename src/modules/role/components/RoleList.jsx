import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Col, Form, Row } from 'react-bootstrap'
import { FaPen } from 'react-icons/fa'
import { BsSearch } from 'react-icons/bs'
import { TagStatus, Avatar, InputTextDebounce, TableGrid, TimeAgo } from '../../../components'
import { useGetRolesQuery } from '../../../store'

export const RoleList = () => {

    const [search, setSearch] = useState('')
    const { data: list = [], isLoading } = useGetRolesQuery(search)

    return (
        <>
            <Form.Group as={Row} className='my-3 px-3 gx-2' controlId='search'>
                <Form.Label column xs={'auto'} >
                    <BsSearch size={24} />
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
                            label: 'ROL DE USUARIO',
                            resize: true,
                            renderCell: (item) => item.name
                        },
                        {
                            label: 'USUARIOS',
                            renderCell: (item) =>
                                <span>{item.usersWithRole.length}</span>
                        },
                        {
                            label: 'ESTADO',
                            renderCell: (item) =>
                                <TagStatus status={item.status} />
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
                                        to={`/app/sys/role/${item._id}`}
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