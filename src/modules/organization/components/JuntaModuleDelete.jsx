import { Button, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { startDeleteJunta } from '../../../store'

export const JuntaModuleDelete = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { isSavingNew } = useSelector(state => state.junta)

    const handleDelete = () => {
        dispatch(startDeleteJunta({ navigate }))
    }

    return (
        <Card border='danger'>
            <Card.Body>
                <p className='card-text'>
                    Cuando se elimine esta junta de usuarios, todas las cuentas de usuarios del sistema de nivel 2 y 3 asociadas a este registro se desabilitarán, además se bloqueara todo acceso que haya sido enlazada a este.
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