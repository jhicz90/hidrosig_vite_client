import React from 'react'
import { Button } from 'react-bootstrap'
import { usePettyCashStore } from '../../../hooks'

export const DeletePettyCash = ({ pettycash = null }) => {

    const { questionDeletePettycash } = usePettyCashStore()

    const handleDelete = () => {
        questionDeletePettycash(pettycash)
    }

    return (
        <Button
            onClick={handleDelete}
            variant='danger'
            size='sm'
            className='d-flex align-items-center gap-2'
        >
            Eliminar
        </Button>
    )
}
