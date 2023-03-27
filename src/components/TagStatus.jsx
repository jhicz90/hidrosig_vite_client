import { Badge } from 'react-bootstrap'
import { FaCheck, FaMinusCircle } from 'react-icons/fa'
import moment from 'moment'

export const TagStatus = ({ status }) => {
    return (
        <>
            {
                status
                    ?
                    <Badge bg='success' pill className='d-inline-flex px-2 py-1'><FaCheck className='me-1' />Activo</Badge>
                    :
                    <Badge bg='warning' pill text='dark' className='d-inline-flex px-2 py-1'><FaMinusCircle className='me-1' />Desactivado</Badge>
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
                <Badge bg='success' style={{ width: 'min-content'}}>Nuevo</Badge>
            }
        </>
    )
}