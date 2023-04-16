import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Card } from 'react-bootstrap'
import { IoEyeSharp } from 'react-icons/io5'
import { DataTable, InputSearch, LinkBack, TagTimeAgo } from '../../../components'
import { committeeApi, useGetListBlockByAmbitQuery } from '../../../store/actions'

export const CommitteeAmbitBlock = () => {

    const { commid } = useParams()
    const [search, setSearch] = useState('')
    const { data = null } = useSelector(committeeApi.endpoints.getCommById.select(commid))
    const { data: blocksIn = [], isLoading } = useGetListBlockByAmbitQuery({ comm: data?._id, junta: data?.junta._id, search }, { skip: !data })

    return (
        <Card>
            <InputSearch value={search} onChange={(e) => setSearch(e)} loading={isLoading} />
            <DataTable
                rows={blocksIn}
                columns={
                    [
                        {
                            label: 'BLOQUE DE RIEGO',
                            renderCell: (item) => (
                                item.name
                            )
                        },
                        {
                            label: 'RESOLUCION',
                            renderCell: (item) =>
                                item.resolution?.name || 'Sin resolución'
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
                            pinRight: true,
                            renderCell: (item) =>
                                <div className='d-flex gap-2 p-2'>
                                    <LinkBack
                                        to={`/app/ambit/trrty/block/${item._id}`}
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
                Ir a BLOQUES DE RIEGO
            </Card.Footer>
        </Card>
    )
}
