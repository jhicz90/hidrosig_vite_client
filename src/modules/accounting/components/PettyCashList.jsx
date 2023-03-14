import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaPen } from 'react-icons/fa'
import { useGetListPettyCashQuery } from '../../../store/actions'
import { InputSearch, TableGrid, TimeAgo } from '../../../components'

export const PettyCashList = () => {

    const [search, setSearch] = useState('')
    const { data: list = [], isFetching } = useGetListPettyCashQuery(search)

    return (
        <>
            <InputSearch value={search} onChange={(e) => setSearch(e)} loading={isFetching} />
            <TableGrid
                rows={list}
                columns={
                    [
                        {
                            label: 'CÓDIGO',
                            renderCell: (item) =>
                                item.code
                        },
                        {
                            label: 'CAJA CHICA',
                            renderCell: (item) =>
                                item.name
                        },
                        {
                            label: 'COMPROBANTE',
                            renderCell: (item) =>
                                item.receipt
                        },
                        {
                            label: 'CHEQUE',
                            renderCell: (item) =>
                                item.check
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
                                <div className='btn-group'>
                                    <Link
                                        className='btn btn-neutral'
                                        to={`/app/acct/petty_cash/${item._id}`}
                                    >
                                        <FaPen />
                                    </Link>
                                </div>
                        }
                    ]
                }
            />
        </>
    )
}
