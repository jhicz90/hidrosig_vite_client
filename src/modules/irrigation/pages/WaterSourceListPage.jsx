import React, { useState } from 'react'
import { IoEyeSharp } from 'react-icons/io5'
import { DataTable, InputSearch, LinkBack, TagTimeAgo, TypeWaterSource } from '../../../components'
import { useGetListWaterSourceQuery } from '../../../store/actions'

export const WaterSourceListPage = () => {

    const [search, setSearch] = useState('')
    const { data: list = [], isFetching } = useGetListWaterSourceQuery(search)

    return (
        <React.Fragment>
            <div className='container-flex-stack'>
                <InputSearch
                    value={search}
                    onChange={(e) => setSearch(e)}
                    loading={isFetching}
                />
            </div>
            <DataTable
                rows={list}
                columns={
                    [
                        {
                            label: 'FUENTE DE AGUA',
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
        </React.Fragment>
    )
}
