import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { fetchByToken, normalizeText } from '../../helpers'
import { addNewWaterSource, setActiveNewWaterSource, setActiveWaterSource, setSavingWaterSource, setSavingNewWaterSource } from './watersourceSlice'

const SwalReact = withReactContent(Swal)

export const startAddNewWaterSource = () => {
    return async (dispatch) => {

        dispatch(addNewWaterSource())

        const resp = await fetchByToken({
            endpoint: `watersource/create/new`
        })

        dispatch(setSavingNewWaterSource(false))

        if (resp.ok) {
            dispatch(setActiveNewWaterSource(resp.watersource))
        }
    }
}

export const startSaveNewWaterSource = () => {
    return async (dispatch, getState) => {

        dispatch(setSavingNewWaterSource(true))

        const { activeNew } = getState().watersource

        const newWaterSource = {
            ...activeNew,
            junta: activeNew.junta !== null ? activeNew.junta._id : null,
        }

        const resp = await fetchByToken({
            endpoint: `watersource/create/new`,
            data: newWaterSource,
            method: 'POST'
        })

        dispatch(setSavingNewWaterSource(false))

        if (resp.ok) {
            dispatch(setActiveNewWaterSource(null))
        }
    }
}

export const startGetWaterSource = (id) => {
    return async (dispatch) => {

        dispatch(setSavingWaterSource(true))

        const resp = await fetchByToken({
            endpoint: `watersource/edit/${id}`
        })

        dispatch(setSavingWaterSource(false))

        if (resp.ok) {
            dispatch(setActiveWaterSource(resp.watersource))
        }
    }
}

export const startUpdateWaterSource = () => {
    return async (dispatch, getState) => {

        dispatch(setSavingWaterSource(true))

        const { active } = getState().watersource
        const { _id } = active

        const updateWaterSource = {
            ...active
        }

        const resp = await fetchByToken({
            endpoint: `watersource/edit/${_id}`,
            data: updateWaterSource,
            method: 'PUT'
        })

        dispatch(setSavingWaterSource(false))

        if (resp.ok) {
            dispatch(setActiveWaterSource(resp.watersource))
        }
    }
}

export const startDeleteWaterSource = ({ navigate = null }) => {
    return async (dispatch, getState) => {
        const { active } = getState().watersource
        const { _id, name } = active

        const wordConfirm = normalizeText(name, { lowerCase: true, removeSpaces: true })

        SwalReact.fire({
            title:
                <>
                    <div className='text-uppercase'>Eliminar fuente de agua</div>
                    <div className="fs-5 fw-bold text-info mt-1">{name}</div>
                </>,
            html:
                <>
                    <div className='fs-5 mb-2'>¿Estás seguro de eliminar esta fuente de agua?</div>
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

                dispatch(setSavingWaterSource(true))

                const resp = await fetchByToken({
                    endpoint: `watersource/delete/${_id}`,
                    method: 'DELETE'
                })

                dispatch(setSavingWaterSource(false))

                if (resp.ok) {
                    navigate('/app/ambit/trrty')
                    dispatch(setActiveWaterSource(null))
                }
            }
        })
    }
}

export const searchWaterSource = async (search) => {
    const resp = await fetchByToken({
        endpoint: 'watersource/search',
        params: { search }
    })

    if (resp.ok) {
        return resp.docs
    } else {
        return []
    }
}

export const searchWaterSourceByJunta = async (junta, search) => {
    const resp = await fetchByToken({
        endpoint: 'watersource/searchbyjunta',
        params: { search, junta }
    })

    if (resp.ok) {
        return resp.docs
    } else {
        return []
    }
}