import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { IoEyeSharp } from 'react-icons/io5'
import { DataTable, InputSearch, TagStatus, TagTimeAgo } from '@/components'
import { useGetListFarmByUserFarmQuery } from '@/store/actions'

export const UserFarmListAreaFarm = () => {

    const { userid } = useParams()
    const [search, setSearch] = useState('')
    const { data: farmsIn = [], isLoading, isFetching } = useGetListFarmByUserFarmQuery({ userfarm: userid, search })

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
                loading={isLoading}
                rows={farmsIn}
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
                                <div className='d-flex gap-2 p-2'>
                                    <Link
                                        to={`/app/user_reg/user_farm/prps/${item._id}`}
                                        className='btn btn-neutral-icon'
                                        style={{ padding: '0.5rem' }}
                                    >
                                        <IoEyeSharp size={16} />
                                    </Link>
                                </div>
                        }
                    ]
                }
            />
        </React.Fragment>
    )
}
