import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { normalizeText } from '../helpers'
import { startExportExcelPettyCashById, startExportPdfPettyCashById, useDeletePettyCashByIdMutation, useDeleteResourcePettyCashMutation, useUpdateClosedPettyCashByIdMutation } from '../store/pettycash'

const SwalReact = withReactContent(Swal)

export const usePettyCashStore = () => {

    const dispatch = useDispatch()
    const [deletePettyCash] = useDeletePettyCashByIdMutation()
    const [deleteResource] = useDeleteResourcePettyCashMutation()
    const [closedPettyCash] = useUpdateClosedPettyCashByIdMutation()
    // const { search, typeSearch, activeTab, manageTypePay, managePaymentCenter } = useSelector(state => state.collect)

    const questionClosedPettycash = (pettycash) => {

        const { _id, name, closed } = pettycash

        SwalReact.fire({
            title:
                <>
                    <div className='text-uppercase'>{!!closed ? 'Abrir' : 'Cerrar'} caja chica</div>
                    <div className="fs-5 fw-bold text-info mt-1">{name.toUpperCase()}</div>
                </>,
            html:
                <>
                    <div className='fs-5 mb-2'>¿Estás seguro de {!!closed ? 'abrir' : 'cerrar'} esta caja chica?</div>
                    <div className='fs-5'>Si es asi, escriba la contraseña del creador para confirmar</div>
                </>,
            showCancelButton: true,
            confirmButtonText: !!closed ? 'Abrir' : 'Cerrar',
            cancelButtonText: 'Cancelar',
            allowOutsideClick: false,
            icon: !!closed ? 'success' : 'error',
            customClass: {
                confirmButton: !!closed ? `btn btn-success` : `btn btn-secondary`,
                cancelButton: `btn btn-neutral`
            },
            input: 'password',
            inputAttributes: {
                autocapitalize: 'off'
            },
            buttonsStyling: false,
            reverseButtons: true,
        }).then(({ isConfirmed, value }) => {
            if (isConfirmed) {
                closedPettyCash({ id: _id, closed: !closed, passwordConfirm: value })
            }
        })
    }

    const questionDeletePettycash = (pettycash) => {

        const { _id, name, code } = pettycash

        const wordConfirm = normalizeText(code, { lowerCase: true, removeSpaces: true })

        SwalReact.fire({
            title:
                <>
                    <div className='text-uppercase'>Eliminar caja chica</div>
                    <div className="fs-5 fw-bold text-info mt-1">{name.toUpperCase()}</div>
                </>,
            html:
                <>
                    <div className='fs-5 mb-2'>¿Estás seguro de eliminar esta caja chica?</div>
                    <div className='fs-5'>Si es asi, escriba <strong>{wordConfirm}</strong> para confirmar</div>
                </>,
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar',
            allowOutsideClick: false,
            icon: 'error',
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
                deletePettyCash(_id)
            }
        })
    }

    const questionDeleteResourcePettyCash = (pettycash, resource) => {

        const { _id: pettycashId, name } = pettycash
        const { _id: resourceId, fileName, format } = resource

        SwalReact.fire({
            title: 'Eliminar recurso',
            html:
                <>
                    <div className='fs-5 mb-2'>¿Estás seguro de eliminar el recurso <div className='d-inline text-warning'>{`${fileName}.${format}`}</div> de la caja chica <div className='d-inline text-primary'>{name}</div>?</div>
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
                deleteResource({ id: pettycashId, resourceId, deleteFile: !!resp.value })
            }
        })
    }

    const exportExcel = (id) => {
        dispatch(startExportExcelPettyCashById(id))
    }

    const exportPDF = (id) => {
        dispatch(startExportPdfPettyCashById(id))
    }

    return {
        //* PROPIEDADES

        //* METODOS
        exportExcel,
        exportPDF,
        questionDeletePettycash,
        questionDeleteResourcePettyCash,
        questionClosedPettycash
    }
}
