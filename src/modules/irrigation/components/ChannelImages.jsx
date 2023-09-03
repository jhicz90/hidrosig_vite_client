import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Alert, Button, Card } from 'react-bootstrap'
import { MdAddPhotoAlternate } from 'react-icons/md'
import { GridGallery } from '../../../components'
import { startModalResource, startUpdateImageIdFarm, useGetChannelByIdQuery } from '../../../store/actions'

export const ChannelImages = () => {

    const { strid } = useParams()
    const dispatch = useDispatch()
    const { data = null } = useGetChannelByIdQuery(strid)

    const handleAddImage = (channel) => {
        dispatch(startModalResource({
            tags: ['estructura', channel.name],
            groupTypes: 'images',
            limit: 6,
            maxSize: 10,
            setFiles: (data) => dispatch(startUpdateImageIdFarm(channel._id, data))
        }))
    }

    return (
        <Card>
            <Card.Body>
                <Alert variant='info'>
                    Ingrese imagenes de caracter informativo de como es la estructura.
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
                    elements={data.images} />
            </Card.Body>
        </Card>
    )
}
