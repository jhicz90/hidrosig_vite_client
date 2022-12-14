import { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { ButtonGroup } from 'react-bootstrap'
import { FaPen } from 'react-icons/fa'
import { InputSearch, TableGrid, TimeAgo } from '../../../components'
import { useGetBlocksQuery } from '../../../store/actions'

export const BlockList = () => {

    const location = useLocation()
    const [search, setSearch] = useState('')
    const { data: list = [], isFetching } = useGetBlocksQuery(search)

    return (
        <>
            <InputSearch className='my-3 px-3' value={search} onChange={(e) => setSearch(e)} loading={isFetching} />
            <TableGrid
                rows={list}
                columns={
                    [
                        {
                            label: 'BLOQUE DE RIEGO',
                            resize: true,
                            renderCell: (item) => (
                                item.name
                            )
                        },
                        {
                            label: 'CODIGO',
                            renderCell: (item) => (
                                item.code
                            )
                        },
                        {
                            label: 'RESOLUCION',
                            renderCell: (item) =>
                                item.resolution?.name || 'Sin resolución'
                        },
                        {
                            label: 'JUNTA',
                            renderCell: (item) => (
                                item.junta?.name || 'Sin junta de usuarios'
                            )
                        },
                        {
                            label: 'COMISION',
                            renderCell: (item) => (
                                item.committee?.name || 'Sin comision de usuarios'
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
                            label: 'ACCIÓN',
                            pinRight: true,
                            renderCell: (item) =>
                                <ButtonGroup>
                                    <Link
                                        className='btn btn-neutral'
                                        to={`./edit/${item._id}`}
                                        state={{ from: location }}
                                    >
                                        <FaPen />
                                    </Link>
                                </ButtonGroup>
                        }
                    ]
                }
            />
            <Outlet />
        </>
    )
}
