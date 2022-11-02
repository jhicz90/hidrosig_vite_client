import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, ButtonGroup } from 'react-bootstrap'
import { FaPen } from 'react-icons/fa'
import { EditZone } from './EditZone'
import { InputSearch, TableGrid, TimeAgo } from '../../../components'
import { startGetZone, useGetZonesQuery } from '../../../store/actions'

export const ZoneList = () => {

    const dispatch = useDispatch()
    const { isSaving } = useSelector(state => state.zone)
    const [search, setSearch] = useState('')
    const { data: list = [], isFetching } = useGetZonesQuery(search)

    return (
        <>
            <EditZone />
            <InputSearch className='my-3 px-3' value={search} onChange={(e) => setSearch(e)} loading={isFetching} />
            <TableGrid
                rows={list}
                columns={
                    [
                        {
                            label: 'ZONA',
                            resize: true,
                            renderCell: (item) => (
                                item.name
                            )
                        },
                        {
                            label: 'JUNTA',
                            renderCell: (item) => (
                                <span>{item.junta?.name || 'Sin junta de usuarios'}</span>
                            )
                        },
                        {
                            label: 'ORDEN',
                            renderCell: (item) =>
                                item.order
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
                                    <Button
                                        disabled={isSaving}
                                        onClick={() => dispatch(startGetZone(item._id))}
                                        variant='neutral'
                                    >
                                        <FaPen />
                                    </Button>
                                </ButtonGroup>
                        }
                    ]
                }
            />
        </>
    )
}
