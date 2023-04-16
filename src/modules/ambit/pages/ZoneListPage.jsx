import { useState } from 'react'
import { IoEyeSharp } from 'react-icons/io5'
import { DataTable, InputSearch, LinkBack, TagTimeAgo } from '../../../components'
import { useGetListZoneQuery } from '../../../store/actions'

export const ZoneListPage = () => {

    const [search, setSearch] = useState('')
    const { data: list = [], isFetching } = useGetListZoneQuery(search)

    return (
        <>
            <InputSearch value={search} onChange={(e) => setSearch(e)} loading={isFetching} />
            <DataTable
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
                                        to={`${item._id}`}
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
        </>
    )
}
