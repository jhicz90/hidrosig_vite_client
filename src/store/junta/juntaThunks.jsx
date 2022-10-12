import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { storeApi } from '../storeApi'
import { addNewJunta, setActiveNewJunta, setActiveJunta, setSaving, setSavingNew } from './juntaSlice'
import { fetchByToken, normalizeText } from '../../helpers'

const SwalReact = withReactContent(Swal)

export const startAddNewJunta = () => {
    return async (dispatch) => {

        dispatch(addNewJunta())

        const resp = await fetchByToken({
            endpoint: `junta/create/new`
        })

        dispatch(setSavingNew(false))

        if (resp.ok) {
            dispatch(setActiveNewJunta(resp.junta))
        }
    }
}

export const startSaveNewJunta = () => {
    return async (dispatch, getState) => {

        dispatch(setSavingNew(true))

        const { activeNew } = getState().junta

        const newJunta = {
            ...activeNew
        }

        const resp = await fetchByToken({
            endpoint: `junta/create/new`,
            data: newJunta,
            method: 'POST'
        })

        dispatch(setSavingNew(false))

        if (resp.ok) {
            dispatch(storeApi.util.invalidateTags(['Orgz']))
            dispatch(setActiveNewJunta(null))
        }
    }
}

export const startGetJunta = (id) => {
    return async (dispatch) => {

        dispatch(setSaving(true))

        const resp = await fetchByToken({
            endpoint: `junta/edit/${id}`
        })

        dispatch(setSaving(false))

        if (resp.ok) {
            dispatch(setActiveJunta(resp.junta))
        }
    }
}

export const startUpdateJunta = () => {
    return async (dispatch, getState) => {

        dispatch(setSaving(true))

        const { active } = getState().junta
        const { _id } = active

        const updateJunta = {
            ...active
        }

        const resp = await fetchByToken({
            endpoint: `junta/edit/${_id}`,
            data: updateJunta,
            method: 'PUT'
        })

        dispatch(setSaving(false))

        if (resp.ok) {
            dispatch(setActiveJunta(resp.junta))
        }
    }
}

export const startUpdateImageJunta = ({ image }) => {
    return async (dispatch, getState) => {
        const { active } = getState().junta
        const { _id } = active

        const resp = await fetchByToken({
            endpoint: `junta/image/${_id}`,
            data: { image },
            method: 'PUT'
        })

        if (resp.ok) {
            dispatch(setActiveJunta(resp.Junta))
        }
    }
}

export const startUpdateStatusJunta = (status) => {
    return async (dispatch, getState) => {
        const { active } = getState().junta
        const { _id, name, status: statusJunta } = active

        SwalReact.fire({
            title:
                <>
                    <div className='text-uppercase'>Estado</div>
                    <div className="fs-5 fw-bold text-info mt-1">{name}</div>
                </>,
            html:
                <>
                    <div className='fs-5 mb-2'>¿Estás seguro de modificar el estado?</div>
                    <div className='alert alert-warning'>Recordar que al hacer el cambio las sesiones de los usuarios asociados a esta junta de usuarios se actualizaran.</div>
                </>,
            showCancelButton: true,
            confirmButtonText: statusJunta ? 'Desactivar' : 'Activar',
            cancelButtonText: 'Cancelar',
            allowOutsideClick: false,
            icon: 'question',
            customClass: {
                confirmButton: statusJunta ? 'btn btn-warning' : 'btn btn-success',
                cancelButton: 'btn btn-neutral'
            },
            buttonsStyling: false,
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {

                dispatch(setSaving(true))

                const resp = await fetchByToken({
                    endpoint: `junta/status/${_id}`,
                    data: { status },
                    method: 'PUT'
                })

                dispatch(setSaving(false))

                if (resp.ok) {
                    dispatch(setActiveJunta(resp.Junta))
                }
            }
        })
    }
}

export const startUpdateInformationJunta = ({ name, nameAbrev, nameLarge, nameLargeAbrev, desc, docid, email }) => {
    return async (dispatch, getState) => {

        dispatch(setSaving(true))

        const { active } = getState().junta
        const { _id } = active

        const resp = await fetchByToken({
            endpoint: `junta/info/${_id}`,
            data: { name, nameAbrev, nameLarge, nameLargeAbrev, desc, docid, email },
            method: 'PUT'
        })

        dispatch(setSaving(false))

        if (resp.ok) {
            dispatch(setActiveJunta(resp.junta))
        }
    }
}

export const startDeleteJunta = ({ navigate = null }) => {
    return async (dispatch, getState) => {
        const { active } = getState().junta
        const { _id, name } = active

        const wordConfirm = normalizeText(name, { lowerCase: true, removeSpaces: true })

        SwalReact.fire({
            title:
                <>
                    <div className='text-uppercase'>Eliminar ocupación</div>
                    <div className="fs-5 fw-bold text-info mt-1">{name}</div>
                </>,
            html:
                <>
                    <div className='fs-5 mb-2'>¿Estás seguro de eliminar esta ocupación?</div>
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

                dispatch(setSaving(true))

                const resp = await fetchByToken({
                    endpoint: `junta/delete/${_id}`,
                    method: 'DELETE'
                })

                dispatch(setSaving(false))

                if (resp.ok) {
                    navigate('/app/sys/occup')
                    dispatch(setActiveJunta(null))
                }
            }
        })
    }
}

export const searchJunta = async (search) => {
    const resp = await fetchByToken({
        endpoint: 'junta/search',
        params: { search }
    })

    if (resp.ok) {
        return resp.docs
    } else {
        return []
    }
}