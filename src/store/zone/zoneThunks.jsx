import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { fetchByToken, normalizeText } from '../../helpers'
import { storeApi } from '../storeApi'
import { addNewZone, setActiveNewZone, setActiveZone, setSavingZone, setSavingNewZone } from './zoneSlice'

const SwalReact = withReactContent(Swal)

export const startAddNewZone = () => {
    return async (dispatch) => {

        dispatch(addNewZone())

        const resp = await fetchByToken({
            endpoint: `zone/create/new`
        })

        dispatch(setSavingNewZone(false))

        if (resp.ok) {
            dispatch(setActiveNewZone(resp.zone))
        }
    }
}

export const startSaveNewZone = () => {
    return async (dispatch, getState) => {

        dispatch(setSavingNewZone(true))

        const { activeNew } = getState().zone

        const newZone = {
            ...activeNew,
            junta: activeNew.junta !== null ? activeNew.junta._id : null,
        }

        const resp = await fetchByToken({
            endpoint: `zone/create/new`,
            data: newZone,
            method: 'POST'
        })

        dispatch(setSavingNewZone(false))

        if (resp.ok) {
            dispatch(storeApi.util.invalidateTags(['Trrt']))
            dispatch(setActiveNewZone(null))
        }
    }
}

export const startGetZone = (id) => {
    return async (dispatch) => {

        dispatch(setSavingZone(true))

        const resp = await fetchByToken({
            endpoint: `zone/edit/${id}`
        })

        dispatch(setSavingZone(false))

        if (resp.ok) {
            dispatch(setActiveZone(resp.zone))
        }
    }
}

export const startUpdateZone = () => {
    return async (dispatch, getState) => {

        dispatch(setSavingZone(true))

        const { active } = getState().zone
        const { _id } = active

        const updateZone = {
            ...active
        }

        const resp = await fetchByToken({
            endpoint: `zone/edit/${_id}`,
            data: updateZone,
            method: 'PUT'
        })

        dispatch(setSavingZone(false))

        if (resp.ok) {
            dispatch(setActiveZone(resp.zone))
        }
    }
}

export const startDeleteZone = ({ navigate = null }) => {
    return async (dispatch, getState) => {
        const { active } = getState().zone
        const { _id, name } = active

        const wordConfirm = normalizeText(name, { lowerCase: true, removeSpaces: true })

        SwalReact.fire({
            title:
                <>
                    <div className='text-uppercase'>Eliminar zona</div>
                    <div className="fs-5 fw-bold text-info mt-1">{name}</div>
                </>,
            html:
                <>
                    <div className='fs-5 mb-2'>¿Estás seguro de eliminar esta zona?</div>
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

                dispatch(setSavingZone(true))

                const resp = await fetchByToken({
                    endpoint: `zone/delete/${_id}`,
                    method: 'DELETE'
                })

                dispatch(setSavingZone(false))

                if (resp.ok) {
                    navigate('/app/ambit/trrty')
                    dispatch(setActiveZone(null))
                }
            }
        })
    }
}

export const searchZone = async (search) => {
    const resp = await fetchByToken({
        endpoint: 'zone/search',
        params: { search }
    })

    if (resp.ok) {
        return resp.docs
    } else {
        return []
    }
}

export const searchZoneByJunta = async (junta, search) => {
    const resp = await fetchByToken({
        endpoint: 'zone/searchbyjunta',
        params: { search, junta }
    })

    if (resp.ok) {
        return resp.docs
    } else {
        return []
    }
}