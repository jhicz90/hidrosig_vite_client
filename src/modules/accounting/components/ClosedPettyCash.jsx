import React from 'react'
import { Button } from 'react-bootstrap'
import { FaLock, FaLockOpen } from 'react-icons/fa'
import { usePettyCashStore } from '../../../hooks'

export const ClosedPettyCash = ({ pettycash = null }) => {

    const { closed } = pettycash
    const { questionClosedPettycash } = usePettyCashStore()

    const handleClosed = () => {
        questionClosedPettycash(pettycash)
    }

    return (
        <Button
            onClick={handleClosed}
            variant={!!closed ? 'success' : 'secondary'}
            size='sm'
            className='d-flex align-items-center gap-2'
        >
            {
                !!pettycash.closed
                    ?
                    <React.Fragment>
                        <FaLockOpen />
                        Abrir caja
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <FaLock />
                        Cerrar caja
                    </React.Fragment>
            }
        </Button>
    )
}
