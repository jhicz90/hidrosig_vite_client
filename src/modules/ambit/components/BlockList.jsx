import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, ButtonGroup } from 'react-bootstrap'
import { FaPen } from 'react-icons/fa'
import { EditBlock } from './EditBlock'
import { InputSearch, TableGrid, TimeAgo } from '../../../components'
import { startGetBlock, useGetBlocksQuery } from '../../../store/actions'

export const BlockList = () => {

    const dispatch = useDispatch()
    const { isSaving } = useSelector(state => state.block)
    const [search, setSearch] = useState('')
    const { data: list = [], isFetching } = useGetBlocksQuery(search)

    return (
        <>
            <EditBlock />
            <InputSearch className='my-3 px-3' value={search} onChange={(e) => setSearch(e)} loading={isFetching} />
            <TableGrid
                rows={list}
                columns={
                    [
                        {
                            label: 'BLOQUE DE RIEGO',
                            resize: true,
                            renderCell: (item) => (
                                item.name
                            )
                        },
                        {
                            label: 'CODIGO',
                            renderCell: (item) => (
                                item.code
                            )
                        },
                        {
                            label: 'RESOLUCION',
                            renderCell: (item) =>
                                item.resolution?.name || 'Sin resolución'
                        },
                        {
                            label: 'JUNTA',
                            renderCell: (item) => (
                                item.junta?.name || 'Sin junta de usuarios'
                            )
                        },
                        {
                            label: 'COMISION',
                            renderCell: (item) => (
                                item.committee?.name || 'Sin comision de usuarios'
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
                            pinRight: true,
                            renderCell: (item) =>
                                <ButtonGroup>
                                    <Button
                                        disabled={isSaving}
                                        onClick={() => dispatch(startGetBlock(item._id))}
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
