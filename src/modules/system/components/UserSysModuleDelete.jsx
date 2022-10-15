import { Button, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { startDeleteUserSys } from '../../../store/actions'

export const UserSysModuleDelete = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { isSavingNew } = useSelector(state => state.usersys)

    const handleDelete = () => {
        dispatch(startDeleteUserSys({ navigate }))
    }

    return (
        <Card border='danger'>
            <Card.Body>
                <p className='card-text'>
                    Cuando elimina su cuenta, pierde el acceso a los servicios de la cuenta y eliminamos permanentemente sus datos personales. Puedes cancelar la eliminación durante 14 días.
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