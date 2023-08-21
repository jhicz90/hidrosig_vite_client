import React from 'react'
import { Button } from 'react-bootstrap'
import { useVoucherStore } from '../../../hooks'

export const DeleteVoucher = ({ voucher = null }) => {

    const { questionDeleteVoucher } = useVoucherStore()

    const handleDelete = () => {
        questionDeleteVoucher(voucher)
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
