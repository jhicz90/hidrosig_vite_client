import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Card, ListGroup } from 'react-bootstrap'
import { FaPen } from 'react-icons/fa'
import { useGetVouchersByPettyCashQuery } from '../../../store/actions'
import { Image, ImageLightbox, SettingAction, SettingBlock, TableGrid, TimeAgo } from '../../../components'
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

    const { active } = useSelector(state => state.pettycash)
    const { data: vouchersIn = [], isLoading } = useGetVouchersByPettyCashQuery({ pettycash: active._id, search: '' }, { refetchOnMountOrArgChange: true })

    const [openLightbox, setOpenLightbox] = useState(false)
    const [imagesLightbox, setImagesLightbox] = useState([])
    const [indexImageLightbox, setIndexImageLightbox] = useState(0)

    const handleLightbox = (images, index) => {
        setImagesLightbox(images)
        setIndexImageLightbox(index)
        setOpenLightbox(true)
    }

    return (
        <>
            <SettingBlock
                title='Comprobantes'
                loading={isLoading}
                action={
                    <SettingAction>
                        <button className='btn btn-neutral'>Nuevo comprobante</button>
                    </SettingAction>
                }
                list={
                    <TableGrid
                        renderEmpty={() => <strong className='mx-3 fs-5'>No ahi comprobantes asociadas a esta caja chica</strong>}
                        rows={vouchersIn}
                        columns={
                            [
                                {
                                    label: 'TIPO',
                                    width: '80px',
                                    renderCell: (item) =>
                                        item.typeReceipt
                                },
                                {
                                    label: 'SERIE',
                                    width: '80px',
                                    renderCell: (item) =>
                                        item.serie
                                },
                                {
                                    label: 'N° COMPROBANTE',
                                    renderCell: (item) =>
                                        item.numReceipt
                                },
                                {
                                    label: 'COMPROBANTES',
                                    renderCell: (item) => {
                                        const imageData = item.images.map(({ fileName }) => ({
                                            src: imageGet(fileName, { size: 1000 }),
                                            loading: 'lazy'
                                        }))

                                        return (
                                            <div className='d-flex p-2 gap-2'>
                                                {
                                                    item.images.map((img, index) =>
                                                        <Image
                                                            onClick={() => handleLightbox(imageData, index)}
                                                            key={img.fileName}
                                                            className='rounded shadow-sm border border-light'
                                                            width={30}
                                                            height={30}
                                                            img={img.fileName}
                                                            resSize={100}
                                                        />
                                                    )
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
                                    width: '100px',
                                    pinRight: true,
                                    renderCell: (item) =>
                                        <div className='btn-group'>
                                            <Link
                                                className='btn btn-neutral'
                                                to={`/app/acct//${item._id}`}
                                            >
                                                <FaPen />
                                            </Link>
                                        </div>
                                }
                            ]
                        }
                    />
                }
            >
                {vouchersIn.length}
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
