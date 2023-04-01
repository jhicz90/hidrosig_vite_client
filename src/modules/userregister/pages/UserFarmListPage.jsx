import { useState } from 'react'
import { ButtonGroup } from 'react-bootstrap'
import { FaPen } from 'react-icons/fa'
import { Avatar, InputSearch, LinkBack, DataTable, TagStatus, TagTimeAgo } from '../../../components'
import { typeUserFarm } from '../../../helpers'
import { useGetListUserFarmQuery } from '../../../store/actions'

export const UserFarmListPage = () => {

    const [search, setSearch] = useState('')
    const { data: list = [], isFetching } = useGetListUserFarmQuery(search)

    return (
        <>
            <InputSearch value={search} onChange={(e) => setSearch(e)} loading={isFetching} />
            <DataTable
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
                                <ButtonGroup>
                                    <LinkBack
                                        className='btn btn-neutral'
                                        to={`/app/user_reg/user_farm/users/${item._id}`}
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
