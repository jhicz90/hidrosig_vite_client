import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Card } from 'react-bootstrap'
import { IoEyeSharp } from 'react-icons/io5'
import { Avatar, DataTable, InputSearch, LinkBack, TagStatus } from '../../../components'
import { juntaApi, useGetListCommByJuntaQuery } from '../../../store/actions'

export const JuntaAmbitCommittee = () => {

    const { juntaid } = useParams()
    const [search, setSearch] = useState('')
    const { data = null } = useSelector(juntaApi.endpoints.getJuntaById.select(juntaid))
    const { data: committeesIn = [], isLoading } = useGetListCommByJuntaQuery({ junta: data?._id, search }, { skip: !data })

    return (
        <Card style={{ backgroundColor: 'aliceblue' }}>
            <InputSearch value={search} onChange={(e) => setSearch(e)} loading={isLoading} />
            <DataTable
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
                                            img={item.image?.metadata?.url}
                                            cloud={item.image?.cloud}
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
                                <div className='d-flex gap-2 p-2'>
                                    <LinkBack
                                        to={`/app/ambit/orgz/comm/${item._id}`}
                                        className='btn btn-neutral-icon'
                                        style={{ padding: '0.5rem' }}
                                    >
                                        <IoEyeSharp size={16} />
                                    </LinkBack>
                                </div>
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