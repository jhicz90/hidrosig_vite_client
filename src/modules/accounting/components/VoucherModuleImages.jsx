import { useState } from 'react'
import { Card, ListGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Image, ImageLightbox, SettingAction, SettingBlock } from '../../../components'
import { imageGet } from '../../../helpers'
import { startUpdateImageVoucher, startUploadResources } from '../../../store/actions'

export const VoucherModuleImages = () => {
    return (
        <Card>
            <ListGroup variant='flush'>
                <VoucherImages />
            </ListGroup>
        </Card>
    )
}

const VoucherImages = () => {

    const dispatch = useDispatch()
    const { active } = useSelector(state => state.voucher)

    const [openLightbox, setOpenLightbox] = useState(false)
    const [imagesLightbox, setImagesLightbox] = useState([])
    const [indexImageLightbox, setIndexImageLightbox] = useState(0)

    const imageData = active.images.map(({ metadata }) => ({
        src: imageGet(metadata.url, { size: 1000 }),
        loading: 'lazy',
        alt: metadata.id
    }))

    const handleLightbox = (images, index) => {
        setImagesLightbox(images)
        setIndexImageLightbox(index)
        setOpenLightbox(true)
    }

    const handleImageVoucher = (file, voucher) => {
        dispatch(startUploadResources({
            files: [file],
            tags: ['comprobante', 'caja chica', `${voucher.serie}-${voucher.numReceipt}`],
            multiple: false,
            setArchive: (data) => dispatch(startUpdateImageVoucher(data))
        }))
    }

    return (
        <>
            <SettingBlock
                title='Imagenes del comprobante'
                action={
                    <SettingAction>
                        <input
                            className='d-none'
                            id={`input-upload-${active._id}`}
                            type='file'
                            multiple={false}
                            accept='image/jpeg, image/png'
                            onChange={(e) => handleImageVoucher(e.target.files[0], active)}
                        />
                        <label
                            htmlFor={`input-upload-${active._id}`}
                            className='btn btn-neutral text-primary text-decoration-none'
                        >
                            Agregar imagen
                        </label>
                    </SettingAction>
                }
                list={
                    active.images.length > 0
                    &&
                    <div
                        className='p-3'
                        style={{
                            borderBottomLeftRadius: 'inherit',
                            borderBottomRightRadius: 'inherit',
                            backgroundColor: '#6c757d'
                        }}
                    >
                        <div className='d-flex gap-2'>
                            {
                                active.images.map(({ metadata }, index) =>
                                    <div
                                        key={metadata.id}
                                        onClick={() => handleLightbox(imageData, index)}
                                        className='rounded shadow-sm border border-light'
                                        style={{
                                            width: '200px',
                                            height: '200px',
                                            background: `url(${imageGet(metadata.url, { size: 200 })})`,
                                            backgroundRepeat: 'no-repeat',
                                            backgroundPosition: 'center',
                                            backgroundSize: 'cover'
                                        }}
                                    >
                                    </div>
                                    // <Image
                                    //     onClick={() => handleLightbox(imageData, index)}
                                    //     key={img.fileName}
                                    //     className='rounded shadow-sm border border-light'
                                    //     width={200}
                                    //     height={200}
                                    //     img={img.fileName}
                                    //     resSize={200}
                                    // />
                                )
                            }
                        </div>
                    </div>
                }
            >
                {active.images.length}
            </SettingBlock>
            <ImageLightbox
                galleryTitle={`Comprobante ${active.serie}-${active.numReceipt}`}
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