import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Col, Form, Row } from 'react-bootstrap'
import { FaPen } from 'react-icons/fa'
import { chckProp } from '../../../helpers'
import { Active, Avatar, InputTextDebounce, TableGrid, TimeAgo } from '../../../components'
import { startListUserSys } from '../../../store/usersys'

export const UserSysList = () => {

    const dispatch = useDispatch()
    const { list } = useSelector(state => state.usersys)
    const [search, setSearch] = useState('')

    useEffect(() => {
        dispatch(startListUserSys(search))
    }, [search, dispatch])

    return (
        <>
            <Form.Group as={Row} className='my-3 px-3' controlId='search'>
                <Form.Label column xs={12} md={'auto'} >
                    Buscar:
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
                            label: 'USUARIO',
                            resize: true,
                            renderCell: (item) => (
                                <div className='d-flex align-items-center px-2'>
                                    <div className='flex-shrink-0 me-3'>
                                        <Avatar
                                            img={chckProp(item, 'image') ? item.image.fileNameThumbnail : ''}
                                            noImgTxt={item.names}
                                            circle={true}
                                            width={40}
                                            height={40}
                                        />
                                    </div>
                                    <div className='d-flex flex-column'>
                                        <span className='d-block fw-bolder mb-0'>{item.names} {item.surnames}</span>
                                        <span className='d-block text-body'>{item.email}</span>
                                    </div>
                                </div>
                            )
                        },
                        {
                            label: 'OCUPACIÓN',
                            renderCell: (item) => (
                                <span>{item.occupation.name}</span>
                            )
                        },
                        {
                            label: 'ESTADO',
                            renderCell: (item) =>
                                <Active active={item.active} />
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
                                        to={`/app/sys/user_sys/${item._id}`}
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