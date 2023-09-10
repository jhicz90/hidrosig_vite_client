import React from 'react'
import { Button } from 'react-bootstrap'
import { useAddSunatImageByIdVoucherMutation } from '@/store/actions'

export const AddSunatImageInVoucher = ({ voucher }) => {

    const [addSunatImage, { isLoading: isVerifyingSunat }] = useAddSunatImageByIdVoucherMutation()

    const handleAddSunatImage = () => {
        addSunatImage(voucher)
    }

    return (
        <Button
            disabled={isVerifyingSunat}
            onClick={handleAddSunatImage}
            variant='primary'
        >
            Agregar CPE SUNAT
        </Button>
    )
}
