import { useState } from 'react'
import { IoEyeSharp } from 'react-icons/io5'
import { DataTable, InputSearch, LinkBack, TagTimeAgo } from '../../../components'
import { useGetListBlockQuery } from '../../../store/actions'

export const BlockListPage = () => {

    const [search, setSearch] = useState('')
    const { data: list = [], isFetching } = useGetListBlockQuery(search)

    return (
        <>
            <InputSearch value={search} onChange={(e) => setSearch(e)} loading={isFetching} />
            <DataTable
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
