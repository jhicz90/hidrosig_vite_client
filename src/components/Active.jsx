import { FaCheck, FaMinusCircle } from 'react-icons/fa'

export const Active = ({ active }) => {
    return (
        <>
            {
                active
                    ?
                    <span className='badge bg-success rounded-pill px-2 py-1'><FaCheck className='me-1' />Activo</span>
                    :
                    <span className='badge bg-warning rounded-pill px-2 py-1 text-dark'><FaMinusCircle className='me-1' />Desactivado</span>
            }
        </>
    )
}
