import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { Button, ButtonGroup, Card, ListGroup } from 'react-bootstrap'
import { FaPen, FaPlus, FaTrash } from 'react-icons/fa'
import { startDeleteIdVoucher, startModalResource, startUpdateImageIdVoucher, useGetVouchersByPettyCashQuery } from '../../../store/actions'
import { Image, ImageLightbox, InputSearch, SettingAction, SettingBlock, TableGrid, TimeAgo } from '../../../components'
import { CreateVoucher } from './CreateVoucher'
import { imageGet } from '../../../helpers'

export const PettyCashModuleVouchers = () => {
    return (
        <Card>
            <ListGroup variant='flush'>
                <PettyCashVoucher />
            </ListGroup>
        </Card>
    )
}

const PettyCashVoucher = () => {

    const [filterSearch, setFilterSearch] = useState('')
    const dispatch = useDispatch()
    const location = useLocation()
    const { active } = useSelector(state => state.pettycash)
    const { data: vouchersIn = [], isLoading } = useGetVouchersByPettyCashQuery({ pettycash: active._id, search: '' }, { refetchOnMountOrArgChange: true })

    const [openLightbox, setOpenLightbox] = useState(false)
    const [imagesLightbox, setImagesLightbox] = useState([])
    const [indexImageLightbox, setIndexImageLightbox] = useState(0)

    let amountTotal = 0
    vouchersIn.forEach(voucher => {
        amountTotal += voucher.amountReceipt
    })

    const handleLightbox = (images, index) => {
        setImagesLightbox(images)
        setIndexImageLightbox(index)
        setOpenLightbox(true)
    }

    // const handleImageVoucher = (file, voucher) => {
    //     dispatch(startUploadResources({
    //         files: [file],
    //         tags: ['comprobante', 'caja chica', `${voucher.serie}-${voucher.numReceipt}`],
    //         multiple: false,
    //         setArchive: (data) => dispatch(startUpdateImageIdVoucher(voucher._id, data))
    //     }))
    // }

    const handleImageVoucher = (voucher) => {
        dispatch(startModalResource({
            tags: ['comprobante', `${voucher.serie}-${voucher.numReceipt}`],
            groupTypes: 'images',
            limit: 1,
            maxSize: 5,
            setFiles: (data) => dispatch(startUpdateImageIdVoucher(voucher._id, data))
        }))
    }

    const handleDeleteVoucher = (voucher) => {
        dispatch(startDeleteIdVoucher(voucher))
    }

    return (
        <>
            <SettingBlock
                title='Comprobantes'
                loading={isLoading}
                action={
                    <SettingAction>
                        <CreateVoucher pettycash={active} />
                    </SettingAction>
                }
                list={
                    <>
                        <InputSearch className='my-3 px-3' value={filterSearch} onChange={(e) => setFilterSearch(e)} />
                        <TableGrid
                            style={{ borderRadius: '0 0 9px 9px' }}
                            renderEmpty={() => <strong className='mx-3 fs-5'>No ahi comprobantes asociadas a esta caja chica</strong>}
                            rows={
                                vouchersIn.filter(v =>
                                    v.serie.toLowerCase().includes(filterSearch.toLowerCase()) ||
                                    v.numReceipt.toLowerCase().includes(filterSearch.toLowerCase()) ||
                                    v.nameSocialReason.toLowerCase().includes(filterSearch.toLowerCase()) ||
                                    v.idSocialReason.toLowerCase().includes(filterSearch.toLowerCase()) ||
                                    v.concept.toLowerCase().includes(filterSearch.toLowerCase())
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
                                        label: 'RAZ??N SOCIAL',
                                        width: '300px',
                                        renderCell: (item) =>
                                            <span title={item.nameSocialReason}>{item.nameSocialReason}</span>
                                    },
                                    {
                                        label: 'IMAGENES',
                                        width: '200px',
                                        renderCell: (item) => {
                                            const imageData = item.images.map(({ cloud, metadata }) => ({
                                                src: imageGet(metadata.url, { cloud, size: 1000 }),
                                                loading: 'lazy',
                                                alt: metadata.id
                                            }))

                                            return (
                                                <div className='d-flex p-2 gap-2'>
                                                    {
                                                        item.images.map(({ cloud, metadata }, index) =>
                                                            <Image
                                                                onClick={() => handleLightbox(imageData, index)}
                                                                key={metadata.id}
                                                                className='rounded shadow-sm border border-light'
                                                                width={30}
                                                                height={30}
                                                                img={metadata.url}
                                                                cloud={cloud}
                                                                resSize={100}
                                                            />
                                                        )
                                                    }
                                                    {
                                                        item.images.length < 4
                                                        &&
                                                        <button
                                                            onClick={() => handleImageVoucher(item)}
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
                                                        // <>
                                                        //     <input
                                                        //         className='d-none'
                                                        //         id={`input-upload-${item._id}`}
                                                        //         type='file'
                                                        //         multiple={false}
                                                        //         accept='image/jpeg, image/png'
                                                        //         onChange={(e) => handleImageVoucher(e.target.files[0], item)}
                                                        //     />
                                                        //     <label
                                                        //         htmlFor={`input-upload-${item._id}`}
                                                        //         className='btn btn-sm btn-neutral shadow-sm'
                                                        //         variant='neutral'
                                                        //         size='sm'
                                                        //         style={{
                                                        //             padding: 0,
                                                        //             width: '30px',
                                                        //             height: '30px',
                                                        //             display: 'flex',
                                                        //             justifyContent: 'center',
                                                        //             alignItems: 'center'
                                                        //         }}
                                                        //     >
                                                        //         <FaPlus />
                                                        //     </label>
                                                        // </>
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
                                        label: 'ACCI??N',
                                        width: '120px',
                                        pinRight: true,
                                        renderCell: (item) =>
                                            <ButtonGroup size='sm'>
                                                <Link
                                                    className='btn btn-neutral-icon'
                                                    to={`/app/acct/petty_cash/${active._id}/edit/voucher/${item._id}`}
                                                    state={{ from: location }}
                                                >
                                                    <FaPen />
                                                </Link>
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
                    </>
                }
            >
                {vouchersIn.length} - {`${amountTotal.toFixed(2)} / ${(Number(active.remainingAmount) + Number(active.oldBalance)).toFixed(2)}`}
            </SettingBlock>
            <ImageLightbox
                galleryTitle={'Comprobantes'}
                currentImageIndex={indexImageLightbox}
                setCurrentIndex={setIndexImageLightbox}
                isOpen={openLightbox}
                onClose={() => {
                    setOpenLightbox(false)
                    setImagesLightbox([])
                }}
                images={imagesLightbox}
            />
        </>
    )
}
