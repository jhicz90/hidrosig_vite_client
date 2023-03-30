import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Button, ButtonGroup, Card } from 'react-bootstrap'
import { FaPen, FaPlus, FaTrash } from 'react-icons/fa'
import { pettycashApi, startDeleteIdVoucher, startModalResource, startUpdateImageIdVoucher, useGetListVoucherByPettyCashQuery } from '../../../store/actions'
import { DataTable, Image, InputSearch, LinkBack, TimeAgo } from '../../../components'

export const PettyCashListVouchers = () => {

    const { pettycashid } = useParams()
    const navigate = useNavigate()
    const [search, setSearch] = useState('')
    const { data = null } = useSelector(pettycashApi.endpoints.getPettyCashById.select(pettycashid))
    const { data: vouchersIn = [], isLoading } = useGetListVoucherByPettyCashQuery({ pettycash: data?._id, search: '' }, { refetchOnMountOrArgChange: true, skip: !data })

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
        if (voucher.images.length < 4) {
            const limit = 4 - voucher.images.length

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
        <>
            <Card>
                <div className='d-flex align-items-center'>
                    <InputSearch value={search} onChange={(e) => setSearch(e)} loading={isLoading} />
                    <LinkBack className='btn btn-neutral text-primary' to={`?w=voucher_create&ptt=${data._id}`}>Nuevo comprobante</LinkBack>
                </div>
                <p className='px-3 py-2'>
                    {`${vouchersIn.length} Comprobantes - ${amountTotal.toFixed(2)} / ${(Number(data.remainingAmount) + Number(data.oldBalance) + Number(outTotal)).toFixed(2)}`}
                </p>
                <DataTable
                    renderEmpty={() => <strong className='mx-3 fs-5'>No ahi comprobantes asociadas a esta caja chica</strong>}
                    rows={
                        vouchersIn.filter(v =>
                            v.serie.toLowerCase().includes(search.toLowerCase()) ||
                            v.numReceipt.toLowerCase().includes(search.toLowerCase()) ||
                            v.nameSocialReason.toLowerCase().includes(search.toLowerCase()) ||
                            v.idSocialReason.toLowerCase().includes(search.toLowerCase()) ||
                            v.concept.toLowerCase().includes(search.toLowerCase())
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
                                label: 'CANCELADO',
                                width: '150px',
                                renderCell: (item) =>
                                    <TimeAgo timestamp={item.cancelDay} />
                            },
                            {
                                label: 'COMPROBANTE',
                                width: '160px',
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
                                                item.images.length < 4
                                                &&
                                                <button
                                                    onClick={() => handleImageVoucher(data._id, item)}
                                                    className='btn btn-sm btn-neutral shadow-sm'
                                                    style={{
                                                        padding: 0,
                                                        width: '30px',
                                                        height: '30px',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center'
                                                    }}
                                                >
                                                    <FaPlus />
                                                </button>
                                            }
                                        </div>
                                    )
                                }
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
                                width: '120px',
                                pinRight: true,
                                renderCell: (item) =>
                                    <ButtonGroup size='sm'>
                                        <LinkBack
                                            className='btn btn-neutral-icon'
                                            to={`?w=voucher_edit&id=${item._id}`}
                                        >
                                            <FaPen />
                                        </LinkBack>
                                        <Button
                                            onClick={() => handleDeleteVoucher(item)}
                                            variant='danger'
                                        >
                                            <FaTrash />
                                        </Button>
                                    </ButtonGroup>
                            }
                        ]
                    }
                />
                <Card.Footer className='p-3 text-center'>
                    Ir a COMPROBANTES
                </Card.Footer>
            </Card>
        </>
    )
}