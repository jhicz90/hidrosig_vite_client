import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, ButtonGroup, Card } from 'react-bootstrap'
import { FaPen } from 'react-icons/fa'
import { IoMdTrash } from 'react-icons/io'
import { DataTable, InputSearch, LinkBack, TagTimeAgo } from '../../../components'
import { startDeleteIdSection, structureApi, useGetListSectionByStructureQuery } from '../../../store/actions'

export const StructureListSection = () => {

    const dispatch = useDispatch()
    const { strid } = useParams()
    const [search, setSearch] = useState('')
    const { data = null } = useSelector(structureApi.endpoints.getStructureById.select(strid))
    const { data: sectionsIn = [], isLoading } = useGetListSectionByStructureQuery({ structure: data?._id, search: '' }, { skip: !data })

    return (
        <Card className='overflow-hidden'>
            <div className='row p-3'>
                <div className='col'>
                    <InputSearch className='m-0' value={search} onChange={(e) => setSearch(e)} loading={isLoading} />
                </div>
                <div className='col-auto'>
                    <LinkBack
                        className='btn btn-primary'
                        to={`?w=section_create`}
                        state={{ structureId: data._id || '' }}
                    >
                        Agregar tramo
                    </LinkBack>
                </div>
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
                                <ButtonGroup>
                                    <LinkBack
                                        className='btn btn-neutral'
                                        to={`/app/schm/irrig/sct/${item._id}`}
                                    >
                                        <FaPen />
                                    </LinkBack>
                                    <Button
                                        onClick={() => dispatch(startDeleteIdSection(item))}
                                        variant='neutral-icon'
                                        className='text-danger'
                                    >
                                        <IoMdTrash size={20} />
                                    </Button>
                                </ButtonGroup>
                        }
                    ]
                }
            />
        </Card>
    )
}