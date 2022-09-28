import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { fetchByToken, normalizeText } from '../../helpers'
import { addNewRole, setActiveNewRole, setActiveRole, setSaving, setSavingNew } from './roleSlice'

const SwalReact = withReactContent(Swal)

export const startAddNewRole = () => {
    return async (dispatch) => {

        dispatch(addNewRole())

        const resp = await fetchByToken({
            endpoint: `role/create/new`
        })

        dispatch(setSavingNew(false))

        if (resp.ok) {
            dispatch(setActiveNewRole(resp.role))
        }
    }
}

export const startSaveNewRole = () => {
    return async (dispatch, getState) => {

        dispatch(setSavingNew(true))

        const { activeNew } = getState().role

        const newRole = {
            ...activeNew
        }

        const resp = await fetchByToken({
            endpoint: `role/create/new`,
            data: newRole,
            method: 'POST'
        })

        dispatch(setSavingNew(false))

        if (resp.ok) {
            dispatch(setActiveNewRole(null))
        }
    }
}

export const startGetRole = (id) => {
    return async (dispatch) => {

        dispatch(setSaving(true))

        const resp = await fetchByToken({
            endpoint: `role/edit/${id}`
        })

        dispatch(setSaving(false))

        if (resp.ok) {
            dispatch(setActiveRole(resp.role))
        }
    }
}

export const startUpdateRole = () => {
    return async (dispatch, getState) => {

        dispatch(setSaving(true))

        const { active } = getState().role
        const { _id } = active

        const updateRole = {
            ...active
        }

        const resp = await fetchByToken({
            endpoint: `role/edit/${_id}`,
            data: updateRole,
            method: 'PUT'
        })

        dispatch(setSaving(false))

        if (resp.ok) {
            dispatch(setActiveRole(resp.role))
        }
    }
}

export const startUpdateStatusRole = (status) => {
    return async (dispatch, getState) => {
        const { active } = getState().role
        const { _id, name, status: statusRole } = active

        SwalReact.fire({
            title:
                <>
                    <div className='text-uppercase'>Estado</div>
                    <div className="fs-5 fw-bold text-info mt-1">{name}</div>
                </>,
            html:
                <>
                    <div className='fs-5 mb-2'>¿Estás seguro de modificar el estado?</div>
                    <div className='alert alert-warning'>Recordar que al hacer el cambio las sesiones de los usuarios asociados a este rol se reiniciaran.</div>
                </>,
            showCancelButton: true,
            confirmButtonText: statusRole ? 'Desactivar' : 'Activar',
            cancelButtonText: 'Cancelar',
            allowOutsideClick: false,
            icon: 'question',
            customClass: {
                confirmButton: statusRole ? 'btn btn-warning' : 'btn btn-success',
                cancelButton: 'btn btn-neutral'
            },
            buttonsStyling: false,
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {

                dispatch(setSaving(true))

                const resp = await fetchByToken({
                    endpoint: `role/status/${_id}`,
                    data: { status },
                    method: 'PUT'
                })

                dispatch(setSaving(false))

                if (resp.ok) {
                    dispatch(setActiveRole(resp.role))
                }
            }
        })
    }
}

export const startUpdateInformationRole = ({ name, desc }) => {
    return async (dispatch, getState) => {

        dispatch(setSaving(true))

        const { active } = getState().role
        const { _id } = active

        const resp = await fetchByToken({
            endpoint: `role/info/${_id}`,
            data: { name, desc },
            method: 'PUT'
        })

        dispatch(setSaving(false))

        if (resp.ok) {
            dispatch(setActiveRole(resp.role))
        }
    }
}

export const startUpdateLevelRole = ({ levelRole, junta, committee }) => {
    return async (dispatch, getState) => {

        dispatch(setSaving(true))

        const { active } = getState().role
        const { _id } = active

        const resp = await fetchByToken({
            endpoint: `role/change_type/${_id}`,
            data: { levelRole, junta, committee },
            method: 'PUT'
        })

        dispatch(setSaving(false))

        if (resp.ok) {
            dispatch(setActiveRole(resp.role))
        }
    }
}

export const startDeleteRole = ({ navigate = null }) => {
    return async (dispatch, getState) => {
        const { active } = getState().role
        const { _id, name } = active

        const wordConfirm = normalizeText(name, { lowerCase: true, removeSpaces: true })

        SwalReact.fire({
            title:
                <>
                    <div className='text-uppercase'>Eliminar rol de usuario</div>
                    <div className="fs-5 fw-bold text-info mt-1">{name}</div>
                </>,
            html:
                <>
                    <div className='fs-5 mb-2'>¿Estás seguro de eliminar este rol de usuario?</div>
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
                    endpoint: `role/delete/${_id}`,
                    method: 'DELETE'
                })

                dispatch(setSaving(false))

                if (resp.ok) {
                    navigate('/app/sys/role')
                    dispatch(setActiveRole(null))
                }
            }
        })
    }
}

export const searchRole = async (search) => {
    const resp = await fetchByToken({
        endpoint: 'role/list',
        params: { search }
    })

    if (resp.ok) {
        return resp.docs
    } else {
        return []
    }
}