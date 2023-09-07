import React, { useState } from 'react'
import { IoEyeSharp } from 'react-icons/io5'
import { InputSearch, LinkBack, DataTable, TagTimeAgo } from '../../../components'
import { useGetListChannelQuery } from '../../../store/actions'

export const ChannelListPage = () => {

    const [search, setSearch] = useState('')
    const { data: list = [], isFetching } = useGetListChannelQuery(search)

    return (
        <React.Fragment>
            <div className='row'>
                <div className='col-12'>
                    <InputSearch
                        value={search}
                        onChange={(e) => setSearch(e)}
                        loading={isFetching}
                        className='my-2'
                    />
                </div>
            </div>
            <div className='row'>
                <div className='col-12'>
                    <DataTable
                        className='border border-2 border-light-subtle'
                        rows={list}
                        columns={
                            [
                                {
                                    label: 'ESTRUCTURA',
                                    minWidth: '300px',
                                    renderCell: (item) => (
                                        <div className='d-flex align-items-center px-2 py-1'>
                                            <div className='d-flex flex-column'>
                                                <p
                                                    className='d-block text-primary fw-bolder mb-0'
                                                >
                                                    {item.name}
                                                </p>
                                                <span>{item.progressive}</span>
                                            </div>
                                        </div>
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
                                                to={`/app/schm/irrig/chn/${item._id}`}
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
                </div>
            </div>
        </React.Fragment>
    )
}
