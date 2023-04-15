import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Alert, Button, Card } from 'react-bootstrap'
import { GridGallery } from '../../../components'
import { startModalResource, startUpdateImageIdVoucher, voucherApi } from '../../../store/actions'
import { MdAddPhotoAlternate } from 'react-icons/md'

export const VoucherImages = () => {
    
    const { voucherid } = useParams()
    const dispatch = useDispatch()
    const { data = null } = useSelector(voucherApi.endpoints.getVoucherById.select(voucherid))

    const handleAddImage = (voucher) => {

        const images = voucher?.images?.length || 0
        const limit = 4 - images

        if (images < 4) {
            dispatch(startModalResource({
                tags: ['comprobante', `${voucher.serie}-${voucher.numReceipt}`],
                groupTypes: 'images',
                limit,
                maxSize: 10,
                setFiles: (data) => dispatch(startUpdateImageIdVoucher(voucher._id, data))
            }))
        }
    }

    return (
        <Card>
            <Card.Body>
                <Alert variant='info'>
                    Ingrese las imagenes del comprobante.
                </Alert>
                <GridGallery
                    actionElement={
                        <Button
                            onClick={() => handleAddImage(data)}
                            variant='neutral'
                            className='align-items-center justify-content-center'
                        >
                            <MdAddPhotoAlternate size={40} />
                        </Button>
                    }
                    elements={data.images.map(i => ({ ...i, link: '/' }))} />
            </Card.Body>
        </Card>
    )
}