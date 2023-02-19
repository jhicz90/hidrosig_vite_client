import { useState } from 'react'
import { ButtonGroup } from 'react-bootstrap'
import { FaPen } from 'react-icons/fa'
import { InputSearch, LinkBack, TableGrid, TimeAgo } from '../../../components'
import { docTypes } from '../../../types'
import { useGetDocumentsQuery } from '../../../store/actions'

export const DocumentBrowser = () => {

    const [search, setSearch] = useState('')
    const { data: list = [], isFetching } = useGetDocumentsQuery(search)

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
                                item.name
                        },
                        {
                            label: 'TIPO',
                            renderCell: (item) =>
                                docTypes.find(d => d.type === item.type).name
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
                                <TimeAgo timestamp={item.createdAt} />
                        },
                        {
                            label: 'ACTUALIZADO',
                            renderCell: (item) =>
                                <TimeAgo timestamp={item.updatedAt} timeago={true} />
                        },
                        {
                            label: 'ACCIÓN',
                            width: '100px',
                            pinRight: true,
                            renderCell: (item) =>
                                <ButtonGroup>
                                    <LinkBack
                                        className='btn btn-neutral'
                                        to={`?w=document&id=${item._id}`}
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
