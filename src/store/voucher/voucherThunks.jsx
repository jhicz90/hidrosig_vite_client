import { toast } from 'react-hot-toast'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { fetchByToken, normalizeText } from '../../helpers'
import { storeApi } from '../storeApi'
import { setActiveVoucher, setSavingVoucher } from './voucherSlice'

const SwalReact = withReactContent(Swal)

export const voucherApi = storeApi.injectEndpoints({
    endpoints: (builder) => ({
        // VOUCHER
        newVoucher: builder.query({
            query: (pettycashId) => ({
                url: `voucher/create/new`,
                params: {
                    pettycashId
                }
            }),
            transformResponse: (response, meta, arg) => response.voucher
        }),
        addVoucher: builder.mutation({
            query: (newVoucher) => ({
                url: `voucher/create/new`,
                method: 'post',
                data: newVoucher
            }),
            invalidatesTags: ['Vchr']
        }),
        getVoucherById: builder.query({
            query: (id) => ({
                url: `voucher/edit/${id}`,
            }),
            transformResponse: (response, meta, arg) => response.voucher,
            providesTags: ['Vchr']
            // providesTags: (result, error, arg) => [{ type: 'Vchr', id: result._id }]
        }),
        getListVoucher: builder.query({
            query: (search) => ({
                url: `voucher/list`,
                params: {
                    search
                }
            }),
            transformResponse: (response, meta, arg) => response.docs,
            providesTags: ['Vchr']
        }),
        getListVoucherByPettyCash: builder.query({
            query: ({ pettycash, search }) => ({
                url: `voucher/search_by_pettycash/${pettycash}`,
                params: {
                    search
                }
            }),
            transformResponse: (response, meta, arg) => response.docs,
            providesTags: ['Ptty', 'Vchr']
            // providesTags: (result, error, arg) =>
            //     result
            //         ? [...result.map(({ _id }) => ({ type: 'Vchr', id: _id })), 'Ptty']
            //         : ['Ptty', 'Vchr']
        }),
        updateVoucherById: builder.mutation({
            query: ({ id, voucher }) => ({
                url: `voucher/edit/${id}`,
                method: 'put',
                data: voucher
            }),
            invalidatesTags: ['Vchr']
            // invalidatesTags: (result, error, { id }) => [{ type: 'Vchr', id }]
        }),
        deleteVoucherById: builder.mutation({
            query: (id) => ({
                url: `voucher/delete/${id}`,
                method: 'delete'
            }),
            invalidatesTags: ['Vchr']
        }),
        // VOUCHER
    })
})

export const {
    useAddSunatImageByIdMutation,
    useAddVoucherMutation,
    useDeleteVoucherByIdMutation,
    useGetListVoucherByPettyCashQuery,
    useGetListVoucherQuery,
    useGetVoucherByIdQuery,
    useLazyNewVoucherQuery,
    useNewVoucherQuery,
    useUpdateVoucherByIdMutation,
} = voucherApi

export const startUpdateImageIdVoucher = (id, images) => {
    return async (dispatch) => {

        const resp = await fetchByToken({
            endpoint: `voucher/image/${id}`,
            data: { images },
            method: 'PUT'
        })

        if (resp.ok) {
            dispatch(storeApi.util.invalidateTags(['Vchr', 'Ptty']))
        }
    }
}

export const startDeleteImageVoucher = (id, imageId) => {
    return async (dispatch) => {

        const resp = await fetchByToken({
            endpoint: `voucher/image/${id}`,
            data: { images: [imageId] },
            method: 'DELETE'
        })

        if (resp.ok) {
            dispatch(storeApi.util.invalidateTags(['Vchr', 'Ptty']))
        }
    }
}

export const startAddSunatImageIdVoucher = (id) => {
    return async (dispatch) => {

        const toastLoading = toast.loading('Consultando en SUNAT... por favor espere')

        const resp = await fetchByToken({
            endpoint: `voucher/sunat/${id}`,
            method: 'PUT'
        })

        toast.dismiss(toastLoading)

        if (resp.ok) {
            dispatch(storeApi.util.invalidateTags(['Vchr', 'Ptty']))
        }
    }
}

export const questionDeleteVoucher = async (voucher) => {

    const { serie, numReceipt } = voucher
    const wordConfirm = normalizeText(`${serie}-${numReceipt}`, { lowerCase: true, removeSpaces: true })

    return SwalReact.fire({
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
            confirmButton: `btn btn-warning`,
            cancelButton: `btn btn-neutral`
        },
        input: 'text',
        inputAttributes: {
            autocapitalize: 'off'
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
        return value
    })
}

export const startDeleteVoucher = () => {
    return async (dispatch, getState) => {
        const { active } = getState().voucher
        const { _id, serie, numReceipt } = active

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
            buttonsStyling: false,
            reverseButtons: true,
            preConfirm: (typed) => {
                if (typed === wordConfirm) {
                    return true
                } else {
                    return false
                }
            }
        }).then(async (result) => {
            if (result.value) {

                dispatch(setSavingVoucher(true))

                const resp = await fetchByToken({
                    endpoint: `voucher/delete/${_id}`,
                    method: 'DELETE'
                })

                dispatch(setSavingVoucher(false))

                if (resp.ok) {
                    dispatch(storeApi.util.invalidateTags(['Vchr']))
                    dispatch(setActiveVoucher(null))
                }
            }
        })
    }
}

export const startDeleteIdVoucher = (voucher) => {
    return async (dispatch) => {
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
                confirmButton: `btn btn-warning`,
                cancelButton: `btn btn-neutral`
            },
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
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
        }).then(async (result) => {
            if (result.value) {

                const resp = await fetchByToken({
                    endpoint: `voucher/delete/${_id}`,
                    method: 'DELETE'
                })

                if (resp.ok) {
                    dispatch(storeApi.util.invalidateTags(['Acct', 'Vchr']))
                }
            }
        })
    }
}

export const searchSocialReason = async (search) => {
    const resp = await fetchByToken({
        endpoint: 'socialreason/list',
        params: { search }
    })

    if (resp.ok) {
        return resp.docs
    } else {
        return []
    }
}