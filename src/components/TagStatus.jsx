import { Badge } from 'react-bootstrap'
import { FaCheck, FaMinusCircle } from 'react-icons/fa'
import moment from 'moment'

export const TagStatus = ({ status }) => {
    return (
        <>
            {
                status
                    ?
                    <span className='badge bg-success rounded-pill px-2 py-1'><FaCheck className='me-1' />Activo</span>
                    :
                    <span className='badge bg-warning rounded-pill px-2 py-1 text-dark'><FaMinusCircle className='me-1' />Desactivado</span>
            }
        </>
    )
}

export const TagNewReg = ({ time = new Date() }) => {
    return (
        <>
            {
                !moment(time).isBefore(new Date(), 'day')
                &&
                <Badge bg='success'>Nuevo</Badge>
            }
        </>
    )
}