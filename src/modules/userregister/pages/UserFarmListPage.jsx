import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { IoEyeSharp } from 'react-icons/io5'
import { typeUserFarm } from '../../../helpers'
import { Avatar, InputSearch, DataTable, TagStatus, TagTimeAgo } from '../../../components'
import { useGetListUserFarmQuery } from '../../../store/actions'

export const UserFarmListPage = () => {

    const [search, setSearch] = useState('')
    const { data: list = [], isFetching } = useGetListUserFarmQuery(search)

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
                // className='border border-2 border-light-subtle'
                rows={list}
                columns={
                    [
                        {
                            label: 'USUARIO',
                            minWidth: '300px',
                            renderCell: (item) => (
                                <div className='d-flex align-items-center px-2 py-1'>
                                    <div className='flex-shrink-0 me-3'>
                                        <Avatar
                                            img={item.image?.metadata.url}
                                            cloud={item.image?.cloud}
                                            noImgTxt={item.type > 1 ? item.socialReason : item.names}
                                            noImg={4004}
                                            circle={true}
                                            width={40}
                                            height={40}
                                        />
                                    </div>
                                    <div className='d-flex flex-column'>
                                        <p
                                            className='d-block text-primary fw-bolder mb-0'
                                        >
                                            {item.type > 1 ? `${item.socialReason}` : `${item.names} ${item.lastName} ${item.motherLastName}`}
                                        </p>
                                        <span>{typeUserFarm(item.type)}</span>
                                    </div>
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
                                        to={`/app/user_reg/user_farm/users/${item._id}`}
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
