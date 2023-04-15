import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Alert, Button, Card } from 'react-bootstrap'
import { MdAddPhotoAlternate } from 'react-icons/md'
import { GridGallery } from '../../../components'
import { farmApi, startModalResource, startUpdateImageIdFarm } from '../../../store/actions'

export const AreaFarmImages = () => {

    const { prpid } = useParams()
    const dispatch = useDispatch()
    const { data = null } = useSelector(farmApi.endpoints.getFarmById.select(prpid))

    const handleAddImage = (farm) => {
        dispatch(startModalResource({
            tags: ['predio', `${farm.code}`, `${farm.name}`],
            groupTypes: 'images',
            limit: 6,
            maxSize: 10,
            setFiles: (data) => dispatch(startUpdateImageIdFarm(farm._id, data))
        }))
    }

    return (
        <Card>
            <Card.Body>
                <Alert variant='info'>
                    Ingrese imagenes de caracter informativo de como es o como se encuentra el predio.
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
