import { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { ButtonGroup } from 'react-bootstrap'
import { FaPen } from 'react-icons/fa'
import { InputSearch, TableGrid, TimeAgo, TypeWaterSource } from '../../../components'
import { useGetWaterSourcesQuery } from '../../../store/actions'

export const WaterSourceList = () => {

    const location = useLocation()
    const [search, setSearch] = useState('')
    const { data: list = [], isFetching } = useGetWaterSourcesQuery(search)

    return (
        <>
            <InputSearch className='my-3 px-3' value={search} onChange={(e) => setSearch(e)} loading={isFetching} />
            <TableGrid
                rows={list}
                columns={
                    [
                        {
                            label: 'FUENTE DE AGUA',
                            resize: true,
                            renderCell: (item) => (
                                <div className='d-flex align-items-center px-2 py-1'>
                                    <div className='flex-shrink-0 me-3'>
                                        <TypeWaterSource type={item.type} />
                                    </div>
                                    <div className='d-flex flex-column'>
                                        <span className='d-block fw-bolder mb-0'>{item.name}</span>
                                    </div>
                                </div>
                            )
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
                            label: 'ACCIÓN',
                            pinRight: true,
                            renderCell: (item) =>
                                <ButtonGroup>
                                    <Link
                                        className='btn btn-neutral'
                                        to={`/app/schm/irrig/watersource/edit/${item._id}`}
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
