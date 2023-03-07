import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { ButtonGroup, Card } from 'react-bootstrap'
import { IoMdEye } from 'react-icons/io'
import { juntaApi, useGetListCommByJuntaQuery } from '../../../store/actions'
import { Avatar, InputSearch, LinkBack, TableGrid, TagStatus } from '../../../components'

export const JuntaAmbitCommittee = () => {

    const { juntaid } = useParams()
    const [search, setSearch] = useState('')
    const { data = null } = useSelector(juntaApi.endpoints.getJuntaById.select(juntaid))
    const { data: committeesIn = [], isLoading } = useGetListCommByJuntaQuery({ junta: data?._id, search }, { refetchOnMountOrArgChange: true, skip: !data })

    return (
        <Card>
            <InputSearch className='my-3 px-3' value={search} onChange={(e) => setSearch(e)} loading={isLoading} />
            <TableGrid
                rows={committeesIn}
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
                            label: 'ACCIÓN',
                            pinRight: true,
                            renderCell: (item) =>
                                <ButtonGroup>
                                    <LinkBack
                                        className='btn btn-neutral'
                                        to={`/app/ambit/orgz/comm/${item._id}`}
                                    >
                                        <IoMdEye />
                                    </LinkBack>
                                </ButtonGroup>
                        }
                    ]
                }
            />
            <Card.Footer className='p-3 text-center'>
                Ir a COMISIONES
            </Card.Footer>
        </Card>
    )
}