import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card } from 'react-bootstrap'
import { IoEyeSharp, IoTrashSharp } from 'react-icons/io5'
import { DataTable, InputSearch, LinkBack, TagStatus, TagTimeAgo } from '../../../components'
import { startDeleteIdFarm, structureApi, useGetListFarmByStructureQuery } from '../../../store/actions'

export const StructureListFarm = () => {

    const dispatch = useDispatch()
    const { strid } = useParams()
    const [search, setSearch] = useState('')
    const { data = null } = useSelector(structureApi.endpoints.getStructureById.select(strid))
    const { data: farmsIn = [], isLoading } = useGetListFarmByStructureQuery({ structure: data?._id, search: '' }, { skip: !data })

    return (
        <Card className='overflow-hidden'>
            <div className='row p-3'>
                <div className='col'>
                    <InputSearch className='m-0' value={search} onChange={(e) => setSearch(e)} loading={isLoading} />
                </div>
                {/* <div className='col-auto'>
                    <LinkBack
                        className='btn btn-primary'
                        to={`/app/schm/irrig/sct/create`}
                        state={{ structure: data._id || '' }}
                    >
                        Agregar predio
                    </LinkBack>
                </div> */}
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
        </Card>
    )
}
