import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'react-bootstrap'
import { IoEyeSharp, IoTrashSharp } from 'react-icons/io5'
import { DataTable, InputSearch, LinkBack, TagTimeAgo } from '../../../components'
import { channelApi, startDeleteIdSection, useGetListSectionByChannelQuery } from '../../../store/actions'
import { AddSectionInChannel } from '.'

export const ChannelListSection = () => {

    const dispatch = useDispatch()
    const { chnid } = useParams()
    const [search, setSearch] = useState('')
    const { data = null } = useSelector(channelApi.endpoints.getChannelById.select(chnid))
    const { data: sectionsIn = [], isFetching } = useGetListSectionByChannelQuery({ channel: data?._id, search: '' }, { skip: !data })

    return (
        <React.Fragment>
            <div className='container-flex-stack'>
                <div className='d-flex flex-row-reverse justify-content-between align-items-center flex-wrap gap-2'>
                    <AddSectionInChannel channel={chnid} />
                </div>
                <InputSearch
                    value={search}
                    onChange={(e) => setSearch(e)}
                    loading={isFetching}
                />
            </div>
            <DataTable
                rows={sectionsIn}
                columns={
                    [
                        {
                            label: 'TRAMO',
                            minWidth: '250px',
                            renderCell: (item) => (
                                item.name
                            )
                        },
                        {
                            label: 'PROGRESIVA',
                            minWidth: '250px',
                            renderCell: (item) =>
                                <p className='text-sm text-muted my-0'>{`${item.progressiveStart} - ${item.progressiveEnd}`}</p>
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
                                        to={`/app/schm/irrig/sct/${item._id}`}
                                        className='btn btn-neutral-icon'
                                        style={{ padding: '0.5rem' }}
                                    >
                                        <IoEyeSharp size={16} />
                                    </Link>
                                    <Button
                                        onClick={() => dispatch(startDeleteIdSection(item))}
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
