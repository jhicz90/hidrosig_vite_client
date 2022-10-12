import { Button, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { startDeleteRole } from '../../../store'

export const RoleModuleDelete = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { isSaving } = useSelector(state => state.role)

    const handleDelete = () => {
        dispatch(startDeleteRole({ navigate }))
    }

    return (
        <Card border='danger'>
            <Card.Body>
                <p className='card-text'>
                    Al eliminar el rol de usuario no podrá acceder a este registro.
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