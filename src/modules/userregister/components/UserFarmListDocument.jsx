import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { IoEyeSharp } from 'react-icons/io5'
import { DataTable, InputSearch, LinkBack, TagTimeAgo } from '../../../components'
import { useGetListDocumentByUserFarmQuery } from '../../../store/actions'
import { docTypes } from '../../../types'

export const UserFarmListDocument = () => {

    const { userid } = useParams()
    const [search, setSearch] = useState('')
    const { data: docsIn = [], isLoading, isFetching } = useGetListDocumentByUserFarmQuery({ userfarm: userid, search })

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
                        loading={isLoading}
                        rows={docsIn}
                        columns={
                            [
                                {
                                    label: 'NOMBRE',
                                    renderCell: (item) =>
                                        <div className='d-flex flex-column'>
                                            <p
                                                className='d-block text-primary fw-bolder mb-0'
                                            >
                                                {item.name}
                                            </p>
                                            <span>{docTypes.find(d => d.type === item.type).name}</span>
                                        </div>
                                },
                                {
                                    label: 'FIRMANTE',
                                    renderCell: (item) =>
                                        item.signer
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
                                    width: '100px',
                                    pinRight: true,
                                    renderCell: (item) =>
                                        <div className='d-flex gap-2 p-2'>
                                            <LinkBack
                                                to={`?w=document_edit&id=${item._id}`}
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
