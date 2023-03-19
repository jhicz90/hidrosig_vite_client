import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ButtonGroup, Card } from 'react-bootstrap'
import { FaPen } from 'react-icons/fa'
import { DataTable, InputSearch, LinkBack, TagStatus, TimeAgo } from '../../../components'
import { useGetListFarmByUserFarmQuery, userfarmApi } from '../../../store/actions'

export const UserFarmListAreaFarm = () => {

    const { userid } = useParams()
    const [search, setSearch] = useState('')
    const { data = null } = useSelector(userfarmApi.endpoints.getUserFarmById.select(userid))
    const { data: farmsIn = [], isLoading } = useGetListFarmByUserFarmQuery({ userfarm: data?._id, search }, { refetchOnMountOrArgChange: true, skip: !data })

    return (
        <Card>
            <InputSearch value={search} onChange={(e) => setSearch(e)} loading={isLoading} />
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
                                <ButtonGroup>
                                    <LinkBack
                                        className='btn btn-neutral'
                                        to={`/app/user_reg/area_farm/prps/${item._id}`}
                                    >
                                        <FaPen />
                                    </LinkBack>
                                </ButtonGroup>
                        }
                    ]
                }
            />
            <Card.Footer className='p-3 text-center'>
                Ir a PREDIOS
            </Card.Footer>
        </Card>
    )
}
