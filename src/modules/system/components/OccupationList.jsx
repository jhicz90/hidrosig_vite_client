import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Col, Form, Row } from 'react-bootstrap'
import { FaPen } from 'react-icons/fa'
import { BsSearch } from 'react-icons/bs'
import { useGetOccupsQuery } from '../../../store/actions'
import { TagStatus, Avatar, InputTextDebounce, TableGrid, TimeAgo } from '../../../components'

export const OccupationList = () => {

    const [search, setSearch] = useState('')
    const { data: list = [], isLoading } = useGetOccupsQuery(search)
    console.log(list)
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
                            label: 'OCUPACIÓN',
                            resize: true,
                            renderCell: (item) => (
                                <div className='d-flex align-items-center px-2 py-1'>
                                    <div className='flex-shrink-0 me-3'>
                                        <Avatar
                                            img={item.image?.fileName}
                                            noImgTxt={item.name}
                                            circle={true}
                                            width={40}
                                            height={40}
                                        />
                                    </div>
                                    <div className='d-flex flex-column'>
                                        <span className='d-block fw-bolder mb-0'>{item.name}</span>
                                    </div>
                                </div>
                            )
                        },
                        {
                            label: 'USUARIOS',
                            renderCell: (item) =>
                                <span>{item.usersWithOccupation.length}</span>
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
                                        to={`/app/sys/occup/${item._id}`}
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