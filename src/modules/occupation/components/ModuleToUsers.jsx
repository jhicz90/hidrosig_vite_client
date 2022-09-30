import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Card, Col, Form, Row } from 'react-bootstrap'
import { BsSearch } from 'react-icons/bs'
import { Avatar, InputTextDebounce, TableGrid, TagStatus } from '../../../components'
import { useGetUsrSysForOccupQuery } from '../../../store'

export const OccupationModuleToUsers = () => {

    const [search, setSearch] = useState('')
    const { active: { _id: occupId } } = useSelector(state => state.occupation)
    const { data: usersSysIn = [], isLoading } = useGetUsrSysForOccupQuery({ id: occupId, search }, { refetchOnMountOrArgChange: true })

    return (
        <Card>
            <Card.Body className='p-0'>
                <Form.Group as={Row} className='my-3 px-3 gx-2' controlId='searchUserSys'>
                    <Form.Label column xs={'auto'} >
                        <BsSearch size={24} />
                    </Form.Label>
                    <Col>
                        <InputTextDebounce value={search} onChange={(e) => setSearch(e)} />
                    </Col>
                </Form.Group>
                <TableGrid
                    rows={usersSysIn}
                    columns={
                        [
                            {
                                label: 'USUARIO',
                                resize: true,
                                renderCell: (item) => (
                                    <div className='d-flex align-items-center px-2 py-1'>
                                        <div className='flex-shrink-0 me-3'>
                                            <Avatar
                                                img={item.image}
                                                noImgTxt={item.names}
                                                circle={true}
                                                width={40}
                                                height={40}
                                            />
                                        </div>
                                        <div className='d-flex flex-column'>
                                            <span className='d-block fw-bolder mb-0'>{item.names} {item.surnames}</span>
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
                                    <TagStatus status={item.status} />
                            }
                        ]
                    }
                />
            </Card.Body>
        </Card>
    )
}
