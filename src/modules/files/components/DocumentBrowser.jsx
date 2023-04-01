import { useState } from 'react'
import { ButtonGroup } from 'react-bootstrap'
import { FaPen } from 'react-icons/fa'
import { InputSearch, LinkBack, TableGrid, TagTimeAgo } from '../../../components'
import { docTypes } from '../../../types'
import { useGetListDocumentQuery } from '../../../store/actions'

export const DocumentBrowser = () => {

    const [search, setSearch] = useState('')
    const { data: list = [], isFetching } = useGetListDocumentQuery(search)

    return (
        <>
            <InputSearch className='my-3 px-3' value={search} onChange={(e) => setSearch(e)} loading={isFetching} />
            <TableGrid
                rows={list}
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
                            width: '100px',
                            pinRight: true,
                            renderCell: (item) =>
                                <ButtonGroup>
                                    <LinkBack
                                        className='btn btn-neutral'
                                        to={`?w=document_edit&id=${item._id}`}
                                    >
                                        <FaPen />
                                    </LinkBack>
                                </ButtonGroup>
                        }
                    ]
                }
            />
        </>
    )
}
