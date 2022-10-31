import { Button, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { startDeletePettycash } from '../../../store/actions'

export const PettyCashModuleDelete = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { isSaving } = useSelector(state => state.pettycash)

    const handleDelete = () => {
        dispatch(startDeletePettycash({ navigate }))
    }

    return (
        <Card border='danger'>
            <Card.Body>
                <p className='card-text'>
                    Al eliminar la caja chica no podrá acceder a este registro. Recordar que la eliminación se puede cancelar por el administrador.
                </p>
                <div className='d-flex justify-content-end gap-2'>
                    <Button
                        onClick={handleDelete}
                        disabled={isSaving}
                        variant='danger'
                    >
                        Eliminar
                    </Button>
                </div>
            </Card.Body>
        </Card>
    )
}