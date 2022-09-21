import { Button, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { startDeleteOccupation } from '../../../store/occupation'

export const OccupationModuleDelete = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { isSavingNew } = useSelector(state => state.occupation)

    const handleDelete = () => {
        dispatch(startDeleteOccupation({ navigate }))
    }

    return (
        <Card border='danger'>
            <Card.Body>
                <p className='card-text'>
                    Al eliminar la ocupación no podrá acceder a este registro.
                </p>
                <div className='d-flex justify-content-end gap-2'>
                    <Button
                        onClick={handleDelete}
                        disabled={isSavingNew}
                        variant='danger'
                    >
                        Eliminar
                    </Button>
                </div>
            </Card.Body>
        </Card>
    )
}