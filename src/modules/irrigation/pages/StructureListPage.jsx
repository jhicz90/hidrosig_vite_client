import { useState } from 'react'
import { ButtonGroup } from 'react-bootstrap'
import { FaPen } from 'react-icons/fa'
import { InputSearch, LinkBack, DataTable, TagTimeAgo } from '../../../components'
import { useGetListStructureQuery } from '../../../store/actions'

export const StructureListPage = () => {

    const [search, setSearch] = useState('')
    const { data: list = [], isFetching } = useGetListStructureQuery(search)

    return (
        <>
            <InputSearch value={search} onChange={(e) => setSearch(e)} loading={isFetching} />
            <DataTable
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
                                <ButtonGroup>
                                    <LinkBack
                                        className='btn btn-neutral'
                                        to={`/app/schm/irrig/str/${item._id}`}
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
