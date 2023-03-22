import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ButtonGroup, Card } from 'react-bootstrap'
import { FaPen } from 'react-icons/fa'
import { DataTable, InputSearch, LinkBack, TimeAgo } from '../../../components'
import { committeeApi, useGetListBlockByAmbitQuery } from '../../../store/actions'

export const CommitteeAmbitBlock = () => {

    const { commid } = useParams()
    const [search, setSearch] = useState('')
    const { data = null } = useSelector(committeeApi.endpoints.getCommById.select(commid))
    const { data: blocksIn = [], isLoading } = useGetListBlockByAmbitQuery({ comm: data?._id, junta: data?.junta._id, search }, { refetchOnMountOrArgChange: true, skip: !data })

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
                                <ButtonGroup>
                                    <LinkBack
                                        className='btn btn-neutral'
                                        to={`?w=block_edit&id=${item._id}`}
                                    >
                                        <FaPen />
                                    </LinkBack>
                                </ButtonGroup>
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
