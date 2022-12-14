import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Col, Form, Row } from 'react-bootstrap'
import { FaPen } from 'react-icons/fa'
import { FcSearch } from 'react-icons/fc'
import { useGetCommsQuery } from '../../../store/actions'
import { TagStatus, Avatar, InputSearch, TableGrid, TimeAgo } from '../../../components'

export const CommitteeList = () => {

    const [search, setSearch] = useState('')
    const { data: list = [], isFetching } = useGetCommsQuery(search)

    return (
        <>
            <InputSearch className='my-3 px-3' value={search} onChange={(e) => setSearch(e)} loading={isFetching} />
            <TableGrid
                rows={list}
                columns={
                    [
                        {
                            label: 'COMISION',
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
                            label: 'ESTADO',
                            renderCell: (item) =>
                                <TagStatus status={item.status} />
                        },
                        {
                            label: 'JUNTA',
                            renderCell: (item) => (
                                item.junta?.name || 'Sin junta de usuarios'
                            )
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
                            label: 'ACCI??N',
                            pinRight: true,
                            renderCell: (item) =>
                                <div className='btn-group'>
                                    <Link
                                        className='btn btn-neutral'
                                        to={`/app/ambit/orgz/comm/${item._id}`}
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