import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Card, Col, Form, Row } from 'react-bootstrap'
import { BsSearch } from 'react-icons/bs'
import { useGetUsrSysByOccupQuery } from '../../../store/actions'
import { Avatar, InputSearch, TableGrid, TagStatus } from '../../../components'

export const OccupationModuleToUsers = () => {

    const [search, setSearch] = useState('')
    const { active: { _id: occupId } } = useSelector(state => state.occupation)
    const { data: usersSysIn = [], isFetching } = useGetUsrSysByOccupQuery({ id: occupId, search }, { refetchOnMountOrArgChange: true })

    return (
        <Card>
            <Card.Body className='p-0'>
                <InputSearch className='my-3 px-3' value={search} onChange={(e) => setSearch(e)} loading={isFetching} />
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
                                                img={item.image?.fileName}
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
