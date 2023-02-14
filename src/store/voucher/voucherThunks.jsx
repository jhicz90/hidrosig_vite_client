import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { fetchByToken, normalizeText } from '../../helpers'
import { storeApi } from '../storeApi'
import { addNewVoucher, setActiveNewVoucher, setActiveVoucher, setSavingVoucher, setSavingNewVoucher } from './voucherSlice'

const SwalReact = withReactContent(Swal)

export const startAddNewVoucher = () => {
    return async (dispatch) => {

        dispatch(addNewVoucher())

        const resp = await fetchByToken({
            endpoint: `voucher/create/new`
        })

        dispatch(setSavingNewVoucher(false))

        if (resp.ok) {
            dispatch(setActiveNewVoucher(resp.voucher))
        }
    }
}

export const startSaveNewVoucher = () => {
    return async (dispatch, getState) => {

        dispatch(setSavingNewVoucher(true))

        const { activeNew } = getState().voucher

        const newVoucher = {
            ...activeNew
        }

        const resp = await fetchByToken({
            endpoint: `voucher/create/new`,
            data: newVoucher,
            method: 'POST'
        })

        dispatch(setSavingNewVoucher(false))

        if (resp.ok) {
            dispatch(storeApi.util.invalidateTags(['Acct - Vchr']))
            dispatch(setActiveNewVoucher(null))
        }
    }
}

export const startGetVoucher = (id) => {
    return async (dispatch) => {

        dispatch(setSavingVoucher(true))

        const resp = await fetchByToken({
            endpoint: `voucher/edit/${id}`
        })

        dispatch(setSavingVoucher(false))

        if (resp.ok) {
            dispatch(setActiveVoucher(resp.voucher))
        }
    }
}

export const startUpdateVoucher = () => {
    return async (dispatch, getState) => {

        dispatch(setSavingVoucher(true))

        const { active } = getState().voucher
        const { _id } = active

        const updateVoucher = {
            ...active,
            socialReason: active.socialReason !== null ? active.socialReason._id : null,
        }

        const resp = await fetchByToken({
            endpoint: `voucher/edit/${_id}`,
            data: updateVoucher,
            method: 'PUT'
        })

        dispatch(setSavingVoucher(false))

        if (resp.ok) {
            dispatch(storeApi.util.invalidateTags(['Acct - Vchr']))
            dispatch(setActiveVoucher(resp.voucher))
        }
    }
}

export const startUpdateInformationVoucher = ({ voucherDay, cancelDay, typeReceipt, serie, numReceipt, socialReason, idSocialReason, nameSocialReason, concept, typeIncomeExpenses, amountReceipt }) => {
    return async (dispatch, getState) => {

        dispatch(setSavingVoucher(true))

        const { active } = getState().voucher
        const { _id } = active

        const updateVoucher = {
            voucherDay,
            cancelDay,
            typeReceipt,
            serie,
            numReceipt,
            socialReason,
            idSocialReason,
            nameSocialReason,
            concept,
            typeIncomeExpenses,
            amountReceipt,
        }

        const resp = await fetchByToken({
            endpoint: `voucher/edit/${_id}`,
            data: updateVoucher,
            method: 'PUT'
        })

        dispatch(setSavingVoucher(false))

        if (resp.ok) {
            dispatch(storeApi.util.invalidateTags(['Acct - Vchr']))
            dispatch(setActiveVoucher(resp.voucher))
        }
    }
}

export const startUpdateImageVoucher = (images) => {
    return async (dispatch, getState) => {

        dispatch(setSavingVoucher(true))

        const { active } = getState().voucher
        const { _id } = active

        const resp = await fetchByToken({
            endpoint: `voucher/image/${_id}`,
            data: { images },
            method: 'PUT'
        })

        dispatch(setSavingVoucher(false))

        if (resp.ok) {
            dispatch(storeApi.util.invalidateTags(['Acct - Vchr']))
            dispatch(setActiveVoucher(resp.voucher))
        }
    }
}

export const startUpdateImageIdVoucher = (id, images) => {
    return async (dispatch) => {

        const resp = await fetchByToken({
            endpoint: `voucher/image/${id}`,
            data: { images },
            method: 'PUT'
        })

        if (resp.ok) {
            dispatch(storeApi.util.invalidateTags(['Acct - Vchr']))
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
            dispatch(storeApi.util.invalidateTags(['Acct - Vchr']))
        }
    }
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
                    dispatch(storeApi.util.invalidateTags(['Acct - Vchr']))
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

                dispatch(setSavingVoucher(true))

                const resp = await fetchByToken({
                    endpoint: `voucher/delete/${_id}`,
                    method: 'DELETE'
                })

                dispatch(setSavingVoucher(false))

                if (resp.ok) {
                    dispatch(storeApi.util.invalidateTags(['Acct - Vchr']))
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