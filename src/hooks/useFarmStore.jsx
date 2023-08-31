import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { normalizeText } from '../helpers'
import { useDeleteResourceFarmMutation } from '../store/farm'

const SwalReact = withReactContent(Swal)

export const useFarmStore = () => {

    const dispatch = useDispatch()
    const [deleteResource] = useDeleteResourceFarmMutation()
    // const { search, typeSearch, activeTab, manageTypePay, managePaymentCenter } = useSelector(state => state.collect)

    // const questionDeletePettycash = (pettycash) => {

    //     const { _id, name, code } = pettycash

    //     const wordConfirm = normalizeText(code, { lowerCase: true, removeSpaces: true })

    //     SwalReact.fire({
    //         title:
    //             <>
    //                 <div className='text-uppercase'>Eliminar caja chica</div>
    //                 <div className="fs-5 fw-bold text-info mt-1">{name.toUpperCase()}</div>
    //             </>,
    //         html:
    //             <>
    //                 <div className='fs-5 mb-2'>¿Estás seguro de eliminar esta caja chica?</div>
    //                 <div className='fs-5'>Si es asi, escriba <strong>{wordConfirm}</strong> para confirmar</div>
    //             </>,
    //         showCancelButton: true,
    //         confirmButtonText: 'Eliminar',
    //         cancelButtonText: 'Cancelar',
    //         allowOutsideClick: false,
    //         icon: 'error',
    //         customClass: {
    //             confirmButton: `btn btn-danger`,
    //             cancelButton: `btn btn-neutral`
    //         },
    //         input: 'text',
    //         inputAttributes: {
    //             autocapitalize: 'off'
    //         },
    //         inputValidator: (value) => {
    //             if (!value || value !== wordConfirm) {
    //                 return 'Necesitas escribir la palabra correcta'
    //             }
    //         },
    //         buttonsStyling: false,
    //         reverseButtons: true,
    //         preConfirm: (typed) => {
    //             if (typed === wordConfirm) {
    //                 return true
    //             } else {
    //                 return false
    //             }
    //         }
    //     }).then(({ value }) => {
    //         if (value) {
    //             deletePettyCash(_id)
    //         }
    //     })
    // }

    const questionDeleteResourceFarm = (farm, resource) => {

        const { _id: farmId, name } = farm
        const { _id: resourceId, fileName, format } = resource

        SwalReact.fire({
            title: 'Eliminar recurso',
            html:
                <>
                    <div className='fs-5 mb-2'>¿Estás seguro de eliminar el recurso <div className='d-inline text-warning'>{`${fileName}.${format}`}</div> del predio <div className='d-inline text-primary'>{name}</div>?</div>
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
                deleteResource({ id: farmId, resourceId, deleteFile: !!resp.value })
            }
        })
    }

    return {
        //* PROPIEDADES

        //* METODOS
        questionDeleteResourceFarm,
    }
}