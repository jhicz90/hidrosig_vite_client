import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { fetchByToken, normalizeText } from '../../helpers'
import { storeApi } from '../storeApi'
import { addNewPettycash, setActiveNewPettycash, setActivePettycash, setSavingPettycash, setSavingNewPettycash } from './pettycashSlice'

const SwalReact = withReactContent(Swal)

export const startAddNewPettycash = () => {
    return async (dispatch) => {

        dispatch(addNewPettycash())

        const resp = await fetchByToken({
            endpoint: `pettycash/create/new`
        })

        dispatch(setSavingNewPettycash(false))

        if (resp.ok) {
            dispatch(setActiveNewPettycash(resp.pettycash))
        }
    }
}

export const startSaveNewPettycash = () => {
    return async (dispatch, getState) => {

        dispatch(setSavingNewPettycash(true))

        const { activeNew } = getState().pettycash

        const newPettycash = {
            ...activeNew
        }

        const resp = await fetchByToken({
            endpoint: `pettycash/create/new`,
            data: newPettycash,
            method: 'POST'
        })

        dispatch(setSavingNewPettycash(false))

        if (resp.ok) {
            dispatch(storeApi.util.invalidateTags(['Acct']))
            dispatch(setActiveNewPettycash(null))
        }
    }
}

export const startGetPettycash = (id) => {
    return async (dispatch) => {

        dispatch(setSavingPettycash(true))

        const resp = await fetchByToken({
            endpoint: `pettycash/edit/${id}`
        })

        dispatch(setSavingPettycash(false))

        if (resp.ok) {
            dispatch(setActivePettycash(resp.pettycash))
        }
    }
}

export const startUpdatePettycash = () => {
    return async (dispatch, getState) => {

        dispatch(setSavingPettycash(true))

        const { active } = getState().pettycash
        const { _id } = active

        const updatePettycash = {
            ...active
        }

        const resp = await fetchByToken({
            endpoint: `pettycash/edit/${_id}`,
            data: updatePettycash,
            method: 'PUT'
        })

        dispatch(setSavingPettycash(false))

        if (resp.ok) {
            dispatch(storeApi.util.invalidateTags(['Acct']))
            dispatch(setActivePettycash(resp.pettycash))
        }
    }
}

export const startUpdateInformationPettycash = ({ code, year, name, desc, receipt, check, remainingAmount, oldBalance, startDeclaration }) => {
    return async (dispatch, getState) => {

        dispatch(setSavingPettycash(true))

        const { active } = getState().pettycash
        const { _id } = active

        const resp = await fetchByToken({
            endpoint: `pettycash/edit/${_id}`,
            data: { code, year, name, desc, receipt, check, remainingAmount, oldBalance, startDeclaration },
            method: 'PUT'
        })

        dispatch(setSavingPettycash(false))

        if (resp.ok) {
            dispatch(storeApi.util.invalidateTags(['Acct']))
            dispatch(setActivePettycash(resp.pettycash))
        }
    }
}

export const startDeletePettycash = ({ navigate = null }) => {
    return async (dispatch, getState) => {
        const { active } = getState().pettycash
        const { _id, name } = active

        const wordConfirm = normalizeText(name, { lowerCase: true, removeSpaces: true })

        SwalReact.fire({
            title:
                <>
                    <div className='text-uppercase'>Eliminar caja chica</div>
                    <div className="fs-5 fw-bold text-info mt-1">{name}</div>
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

                dispatch(setSavingPettycash(true))

                const resp = await fetchByToken({
                    endpoint: `pettycash/delete/${_id}`,
                    method: 'DELETE'
                })

                dispatch(setSavingPettycash(false))

                if (resp.ok) {
                    dispatch(storeApi.util.invalidateTags(['Acct']))
                    navigate('/app/acct/petty_cash')
                    dispatch(setActivePettycash(null))
                }
            }
        })
    }
}

export const startExportActivePettyCash = () => {
    return async (dispatch, getState) => {
        const { active } = getState().pettycash
        const { _id } = active

        await fetchByToken({
            endpoint: `pettycash/export/${_id}`
        })
    }
}