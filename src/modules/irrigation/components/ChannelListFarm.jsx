import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'react-bootstrap'
import { IoEyeSharp, IoTrashSharp } from 'react-icons/io5'
import { DataTable, InputSearch, LinkBack, TagStatus, TagTimeAgo } from '../../../components'
import { channelApi, startDeleteIdFarm, useGetChannelByIdQuery, useGetListFarmByChannelQuery } from '../../../store/actions'

export const ChannelListFarm = () => {

    const dispatch = useDispatch()
    const { chnid } = useParams()
    const [search, setSearch] = useState('')
    const { data = null } = useSelector(channelApi.endpoints.getChannelById.select(chnid))
    const { data: farmsIn = [], isFetching } = useGetListFarmByChannelQuery({ channel: data?._id, search: '' }, { skip: !data })

    return (
        <React.Fragment>
            <div className='container-flex-stack'>
                <div className='d-flex flex-row-reverse justify-content-between align-items-center flex-wrap gap-2'>
                    <Button>
                        Agregar predios
                    </Button>
                </div>
                <InputSearch
                    value={search}
                    onChange={(e) => setSearch(e)}
                    loading={isFetching}
                />
            </div>
            <DataTable
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
                                    <LinkBack
                                        to={`/app/user_reg/user_farm/prps/${item._id}`}
                                        className='btn btn-neutral-icon'
                                        style={{ padding: '0.5rem' }}
                                    >
                                        <IoEyeSharp size={16} />
                                    </LinkBack>
                                    <Button
                                        onClick={() => dispatch(startDeleteIdFarm(item))}
                                        variant='neutral-danger-icon'
                                        style={{ padding: '0.5rem' }}
                                    >
                                        <IoTrashSharp size={16} />
                                    </Button>
                                </div>
                        }
                    ]
                }
            />
        </React.Fragment>
    )
}
