import { Button, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { startDeleteVoucher } from '../../../store/actions'

export const VoucherModuleDelete = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { isSaving } = useSelector(state => state.voucher)

    const handleDelete = () => {
        dispatch(startDeleteVoucher({ navigate }))
    }

    return (
        <Card border='danger'>
            <Card.Body>
                <p className='card-text'>
                    Al eliminar este comprobante no podrá acceder a este registro. Recordar que la eliminación se puede cancelar por el administrador.
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