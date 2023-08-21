import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { normalizeText } from '../helpers'
import { useDeleteResourceVoucherMutation, useDeleteVoucherByIdMutation } from '../store/voucher'

const SwalReact = withReactContent(Swal)

export const useVoucherStore = () => {

    const dispatch = useDispatch()
    const [deleteVoucher] = useDeleteVoucherByIdMutation()
    const [deleteResource] = useDeleteResourceVoucherMutation()
    // const { search, typeSearch, activeTab, manageTypePay, managePaymentCenter } = useSelector(state => state.collect)

    const questionDeleteVoucher = (voucher) => {

        const { _id, serie, numReceipt } = voucher

        const wordConfirm = normalizeText(`${serie}-${numReceipt}`, { lowerCase: true, removeSpaces: true })

        SwalReact.fire({
            title:
                <>
                    <div className='text-uppercase'>Eliminar comprobante</div>
                    <div className="fs-5 fw-bold text-info mt-1">{`${serie}-${numReceipt}`}</div>
                </>,
            html:
                <>
                    <div className='fs-5 mb-2'>¿Estás seguro de eliminar este comprobante?</div>
                    <div className='fs-5'>Si es asi, escriba <strong>{wordConfirm}</strong> para confirmar</div>
                </>,
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar',
            allowOutsideClick: false,
            icon: 'question',
            customClass: {
                confirmButton: `btn btn-danger`,
                cancelButton: `btn btn-neutral`
            },
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            inputValidator: (value) => {
                if (!value || value !== wordConfirm) {
                    return 'Necesitas escribir la palabra correcta'
                }
            },
            buttonsStyling: false,
            reverseButtons: true,
            preConfirm: (typed) => {
                if (typed === wordConfirm) {
                    return true
                } else {
                    return false
                }
            }
        }).then(({ value }) => {
            if (value) {
                deleteVoucher(_id)
            }
        })
    }

    const questionDeleteResourceVoucher = (voucher, resource) => {

        const { _id: voucherId, serie, numReceipt } = voucher
        const { _id: resourceId, fileName, format } = resource

        SwalReact.fire({
            title: 'Eliminar recurso',
            html:
                <>
                    <div className='fs-5 mb-2'>¿Estás seguro de eliminar el recurso <div className='d-inline text-warning'>{`${fileName}.${format}`}</div> del comprobante <div className='d-inline text-primary'>{`${serie}-${numReceipt}`}</div>?</div>
                </>,
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar',
            allowOutsideClick: false,
            icon: 'warning',
            customClass: {
                confirmButton: `btn btn-danger`,
                cancelButton: `btn btn-neutral`
            },
            input: 'checkbox',
            inputValue: 1,
            inputPlaceholder: 'Eliminar recurso permanentemente',
            buttonsStyling: false,
            reverseButtons: true,
        }).then((resp) => {
            if (resp.isConfirmed) {
                deleteResource({ id: voucherId, resourceId, deleteFile: !!resp.value })
            }
        })
    }

    return {
        //* PROPIEDADES

        //* METODOS
        questionDeleteVoucher,
        questionDeleteResourceVoucher
    }
}
