import React from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Alert } from 'react-bootstrap'
import { AddSunatImageInVoucher } from '.'
import { GridGallery } from '../../../components'
import { startModalResource, startUpdateImageIdVoucher, useGetVoucherByIdQuery } from '../../../store/actions'
import { useVoucherStore } from '../../../hooks'

export const VoucherImages = () => {

    const { voucherid } = useParams()
    const dispatch = useDispatch()
    const { questionDeleteResourceVoucher } = useVoucherStore()
    const { data = null } = useGetVoucherByIdQuery(voucherid)

    const handleAddImage = (voucher) => {

        const images = voucher?.images?.length || 0
        const limit = 4 - images

        if (images < 4) {
            dispatch(startModalResource({
                tags: ['comprobante', `${voucher.serie}-${voucher.numReceipt}`],
                groupTypes: 'images',
                limit,
                maxSize: 10,
                setFiles: (data) => dispatch(startUpdateImageIdVoucher(voucher._id, data))
            }))
        }
    }

    return (
        <React.Fragment>
            <div className='container-flex-stack'>
                <AddSunatImageInVoucher voucher={voucherid} />
                <Alert variant='info'>
                    Ingrese las imagenes del comprobante.
                </Alert>
                <GridGallery
                    actionAdd={() => handleAddImage(data)}
                    actionDelete={(resource) => questionDeleteResourceVoucher(data, resource)}
                    elements={data.images.map(i => ({ ...i, link: '/' }))}
                />
            </div>
        </React.Fragment>
    )
}