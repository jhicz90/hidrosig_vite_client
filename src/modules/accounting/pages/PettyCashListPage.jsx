import { useState } from 'react'
import { useSelector } from 'react-redux'
import { IoEyeSharp } from 'react-icons/io5'
import { DataTable, InputSearch, LinkBack, TagTimeAgo } from '../../../components'
import { useGetListPettyCashQuery } from '../../../store/actions'

export const PettyCashListPage = () => {

    const [search, setSearch] = useState('')
    const { lvlAccess } = useSelector(state => state.auth)
    const { data: list = [], isFetching } = useGetListPettyCashQuery(search)

    return (
        <>
            <div className='container-fluid'>
                <div className='row my-3'>
                    <div className='col-12'>
                        <div className='row align-items-center justify-content-between g-3'>
                            <div className='col-12 col-md-auto'>
                                <h4 className='mb-0'>LISTA CAJA CHICA</h4>
                            </div>
                            <div className='col-12 col-md-auto'>
                                <div className='d-flex gap-2'>
                                    <LinkBack className='btn btn-neutral text-primary' relative to={`create`}>Nueva caja chica</LinkBack>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row g-0 justify-content-center'>
                <div className='col'>
                    <InputSearch value={search} onChange={(e) => setSearch(e)} loading={isFetching} />
                    <DataTable
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
                                lvlAccess <= 2 && {
                                    label: 'ORGANIZACIÓN',
                                    renderCell: (item) =>
                                        item.organization.name
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
                                    width: '100px',
                                    pinRight: true,
                                    renderCell: (item) =>
                                        <div className='d-flex gap-2 p-2'>
                                            <LinkBack
                                                to={`/app/acct/petty_cash/${item._id}`}
                                                className='btn btn-neutral-icon'
                                                style={{ padding: '0.5rem' }}
                                            >
                                                <IoEyeSharp size={16} />
                                            </LinkBack>
                                        </div>
                                }
                            ]
                        }
                    />
                </div>
            </div>
        </>
    )
}
