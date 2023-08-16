import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { HiPlus } from 'react-icons/hi2'
import { IoEyeSharp } from 'react-icons/io5'
import { MdOutlineFormatListNumbered } from 'react-icons/md'
import { DataTable, InputSearch, LinkBack, TagTimeAgo } from '../../../components'
import { useGetListPettyCashQuery } from '../../../store/actions'
import { BsPlus, BsPlusLg } from 'react-icons/bs'
import { FaPlus } from 'react-icons/fa'

export const PettyCashListPage = () => {

    const [search, setSearch] = useState('')
    const { lvlAccess } = useSelector(state => state.auth)
    const { data: list = [], isFetching } = useGetListPettyCashQuery(search)

    return (
        <>
            <div className='container'>
                <div className='d-lg-flex align-items-lg-center justify-content-lg-between my-3'>
                    <div className='min-w-400 flex-1'>
                        <h4 className='mb-0 text-uppercase'>LISTA CAJA CHICA</h4>
                        <div className='mt-1 mt-sm-0 d-flex flex-column flex-sm-row gap-0 gap-sm-4'>
                            <div className='mt-2 d-flex align-items-center gap-1 text-muted'>
                                <MdOutlineFormatListNumbered size={20} />
                                {list.length}
                            </div>
                        </div>
                    </div>
                    <div className='mt-3 ms-lg-5 mt-lg-0 d-flex gap-2 flex-wrap'>
                        <Link
                            to={`create`}
                            className='btn btn-sm btn-primary d-flex align-items-center gap-2'
                        >
                            <FaPlus />
                            Nueva caja chica
                        </Link>
                        {/* <LinkBack className='btn btn-neutral text-primary' relative to={`create`}>Nueva caja chica</LinkBack> */}
                    </div>
                </div>
            </div>
            <div className='container'>
                <div className='row'>
                    <div className='col-12'>
                        <InputSearch value={search} onChange={(e) => setSearch(e)} loading={isFetching} />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-12'>
                        <DataTable
                            className='border border-2 border-light-subtle'
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
            </div>
        </>
    )
}
