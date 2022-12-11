import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ButtonGroup } from 'react-bootstrap'
import { FaPen } from 'react-icons/fa'
import { InputSearch, TableGrid, TimeAgo } from '../../../components'
import { useGetZonesQuery } from '../../../store/actions'

export const ZoneList = () => {

    const [search, setSearch] = useState('')
    const { data: list = [], isFetching } = useGetZonesQuery(search)

    return (
        <>
            <InputSearch className='my-3 px-3' value={search} onChange={(e) => setSearch(e)} loading={isFetching} />
            <TableGrid
                rows={list}
                columns={
                    [
                        {
                            label: 'ZONA',
                            resize: true,
                            renderCell: (item) => (
                                item.name
                            )
                        },
                        {
                            label: 'JUNTA',
                            renderCell: (item) => (
                                <span>{item.junta?.name || 'Sin junta de usuarios'}</span>
                            )
                        },
                        {
                            label: 'ORDEN',
                            renderCell: (item) =>
                                item.order
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
                                    <Link
                                        className='btn btn-neutral'
                                        to={`/app/ambit/trrty/edit/zone/${item._id}`}
                                    >
                                        <FaPen />
                                    </Link>
                                </ButtonGroup>
                        }
                    ]
                }
            />
        </>
    )
}
