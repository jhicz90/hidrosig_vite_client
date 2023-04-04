import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Alert, Button, Card } from 'react-bootstrap'
import { MdAddPhotoAlternate } from 'react-icons/md'
import { GridGallery } from '../../../components'
import { startModalResource, startUpdateImageIdFarm, structureApi } from '../../../store/actions'

export const StructureImages = () => {

    const { strid } = useParams()
    const dispatch = useDispatch()
    const { data = null } = useSelector(structureApi.endpoints.getStructureById.select(strid))

    const handleAddImage = (structure) => {
        dispatch(startModalResource({
            tags: ['estructura', structure.name],
            groupTypes: 'images',
            limit: 6,
            maxSize: 10,
            setFiles: (data) => dispatch(startUpdateImageIdFarm(structure._id, data))
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
                        >
                            <MdAddPhotoAlternate size={40} />
                        </Button>
                    }
                    elements={data.images} />
            </Card.Body>
        </Card>
    )
}
