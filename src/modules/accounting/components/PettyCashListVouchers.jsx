import React, { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Button } from 'react-bootstrap'
import { IoAddSharp, IoEyeSharp, IoTrashSharp } from 'react-icons/io5'
import { VoucherCreateInPettyCash } from '.'
import { startDeleteIdVoucher, startModalResource, startUpdateImageIdVoucher, useGetListVoucherByPettyCashQuery, useGetPettyCashByIdQuery } from '../../../store/actions'
import { DataTable, Image, InputSearch, TagDate, TagTimeAgo } from '../../../components'

export const PettyCashListVouchers = () => {

    const { pettycashid } = useParams()
    const navigate = useNavigate()
    const [search, setSearch] = useState('')
    const dispatch = useDispatch()
    const { data = null } = useGetPettyCashByIdQuery(pettycashid)
    const { data: vouchersIn = [], isLoading, isFetching } = useGetListVoucherByPettyCashQuery({ pettycash: pettycashid, search: '' })

    let amountTotal = 0
    let outTotal = 0
    vouchersIn.forEach(voucher => {
        if (voucher.typeIncomeExpenses === 2) {
            amountTotal += voucher.amountReceipt
        } else {
            outTotal += voucher.amountReceipt
        }
    })

    const handleLightbox = (images, index) => {
        navigate(`?w=viewer`, { state: { files: images, index } })
    }

    const handleImageVoucher = (id, voucher) => {
        if (voucher.images.length < 6) {
            const limit = 6 - voucher.images.length

            dispatch(startModalResource({
                tags: ['comprobante', `${voucher.serie}-${voucher.numReceipt}`],
                groupTypes: 'images',
                limit,
                maxSize: 20,
                setFiles: (data) => dispatch(startUpdateImageIdVoucher(id, data))
            }))
        }
    }

    const handleDeleteVoucher = (voucher) => {
        dispatch(startDeleteIdVoucher(voucher))
    }

    return (
        <React.Fragment>
            <div className='container-flex-stack'>
                <div className='d-flex flex-row-reverse justify-content-between align-items-center flex-wrap gap-2'>
                    {/* <LinkBack className='btn btn-primary' relative to={`/app/acct/voucher/create`} state={{ pettycashId: pettycashid }}>Nuevo comprobante</LinkBack> */}
                    <VoucherCreateInPettyCash pettycash={pettycashid} />
                    <div>
                        {`${vouchersIn.length} Comprobantes - ${amountTotal.toFixed(2)} / ${(Number(data.remainingAmount) + Number(data.oldBalance) + Number(outTotal)).toFixed(2)}`}
                    </div>
                </div>
                <InputSearch
                    value={search}
                    onChange={(e) => setSearch(e)}
                    loading={isFetching}
                />
            </div>
            <DataTable
                loading={isLoading}
                renderEmpty={() => <strong className='mx-3 fs-5'>No ahi comprobantes asociadas a esta caja chica</strong>}
                rows={
                    vouchersIn.filter(v =>
                        v.serie.toLowerCase().includes(search.toLowerCase()) ||
                        v.numReceipt.toLowerCase().includes(search.toLowerCase()) ||
                        v.nameSocialReason.toLowerCase().includes(search.toLowerCase()) ||
                        v.idSocialReason.toLowerCase().includes(search.toLowerCase()) ||
                        v.concept.toLowerCase().includes(search.toLowerCase()) ||
                        v.amountReceipt.toFixed(2).includes(search.toLowerCase())
                    )
                }
                columns={
                    [
                        {
                            label: 'TIPO',
                            width: '80px',
                            renderCell: (item) =>
                                item.typeReceipt
                        },
                        {
                            label: 'FECHA COMP.',
                            width: '150px',
                            renderCell: (item) =>
                                <TagDate date={item.voucherDay} />
                        },
                        {
                            label: 'CANCELADO',
                            width: '150px',
                            renderCell: (item) =>
                                <TagDate date={item.cancelDay} />
                        },
                        {
                            label: 'COMPROBANTE',
                            width: '200px',
                            renderCell: (item) =>
                                `${item.serie}-${item.numReceipt}`
                        },
                        {
                            label: 'MONTO',
                            width: '100px',
                            renderCell: (item) =>
                                <span className='d-block text-end'>{item.amountReceipt.toFixed(2)}</span>
                        },
                        {
                            label: 'RAZÓN SOCIAL',
                            width: '300px',
                            renderCell: (item) =>
                                <span title={item.nameSocialReason}>{item.nameSocialReason}</span>
                        },
                        {
                            label: 'IMAGENES',
                            width: '200px',
                            renderCell: (item) => {
                                return (
                                    <div className='d-flex p-2 gap-2'>
                                        {
                                            item.images.map(({ cloud, metadata }, index) =>
                                                <Image
                                                    onClick={() => handleLightbox(item.images, index)}
                                                    key={metadata.id}
                                                    className='rounded shadow-sm border border-light'
                                                    width={30}
                                                    height={30}
                                                    img={metadata.url}
                                                    cloud={cloud}
                                                    resSize={30}
                                                />
                                            )
                                        }
                                        {
                                            item.images.length < 6
                                            &&
                                            <Button
                                                onClick={() => handleImageVoucher(item._id, item)}
                                                variant='neutral-primary-icon'
                                                style={{ padding: '0.5rem' }}
                                            >
                                                <IoAddSharp size={16} />
                                            </Button>
                                        }
                                    </div>
                                )
                            }
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
                            width: '120px',
                            pinRight: true,
                            renderCell: (item) =>
                                <div className='d-flex gap-2 p-2'>
                                    <Link
                                        to={`/app/acct/voucher/${item._id}`}
                                        className='btn btn-neutral-icon'
                                        style={{ padding: '0.5rem' }}
                                    >
                                        <IoEyeSharp size={16} />
                                    </Link>
                                    <Button
                                        onClick={() => handleDeleteVoucher(item)}
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
        </React.Fragment>
    )
}