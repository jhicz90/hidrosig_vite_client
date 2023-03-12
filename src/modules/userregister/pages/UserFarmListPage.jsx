import { useState } from 'react'
import { FaPen } from 'react-icons/fa'
import { Avatar, InputSearch, LinkBack, TableGrid, TagNewReg, TagStatus, TimeAgo } from '../../../components'
import { typeUserFarm } from '../../../helpers'
import { useGetListUserFarmQuery } from '../../../store/actions'

export const UserFarmListPage = () => {

    const [search, setSearch] = useState('')
    const { data: list = [], isFetching } = useGetListUserFarmQuery(search)

    return (
        <>
            <InputSearch value={search} onChange={(e) => setSearch(e)} loading={isFetching} />
            <TableGrid
                rows={list}
                columns={
                    [
                        {
                            label: 'USUARIO',
                            resize: true,
                            renderCell: (item) => (
                                <div className='d-flex align-items-center px-2 py-1'>
                                    <div className='flex-shrink-0 me-3'>
                                        <Avatar
                                            img={item.image?.metadata.url}
                                            cloud={item.image?.cloud}
                                            noImgTxt={item.name}
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
                                        <span>{typeUserFarm(item.type)} <TagNewReg time={item.createdAt}/></span>
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
                                <TimeAgo timestamp={item.createdAt} />
                        },
                        {
                            label: 'ACTUALIZADO',
                            renderCell: (item) =>
                                <TimeAgo timestamp={item.updatedAt} timeago={true} />
                        },
                        {
                            label: 'ACCIÓN',
                            pinRight: true,
                            renderCell: (item) =>
                                <div className='btn-group'>
                                    <LinkBack
                                        className='btn btn-neutral'
                                        to={`/app/ambit/orgz/junta/${item._id}`}
                                    >
                                        <FaPen />
                                    </LinkBack>
                                </div>
                        }
                    ]
                }
            />
        </>
    )
}
