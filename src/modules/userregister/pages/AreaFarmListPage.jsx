import { useState } from 'react'
import { FaPen } from 'react-icons/fa'
import { InputSearch, LinkBack, DataTable, TagStatus, TagTimeAgo } from '../../../components'
import { useGetListFarmQuery } from '../../../store/actions'

export const AreaFarmListPage = () => {

    const [search, setSearch] = useState('')
    const { data: list = [], isFetching } = useGetListFarmQuery(search)

    return (
        <>
            <InputSearch value={search} onChange={(e) => setSearch(e)} loading={isFetching} />
            <DataTable
                rows={list}
                columns={
                    [
                        {
                            label: 'PREDIO',
                            minWidth: '250px',
                            renderCell: (item) => (
                                <div className='d-flex flex-column'>
                                    <p
                                        className='d-block text-primary fw-bolder mb-0'
                                    >
                                        {item.name}
                                    </p>
                                    <span>{item.code}</span>
                                </div>
                            )
                        },
                        {
                            label: 'ESTADO',
                            renderCell: (item) =>
                                <TagStatus status={item.active} />
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
                                <div className='btn-group'>
                                    <LinkBack
                                        className='btn btn-neutral'
                                        to={`/app/user_reg/user_farm/prps/${item._id}`}
                                    >
                                        <FaPen />
                                    </LinkBack>
                                </div>
                        }
                    ]
                }
            />
        </>
    )
}
