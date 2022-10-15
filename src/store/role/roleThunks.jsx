import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { fetchByToken, normalizeText } from '../../helpers'
import { addNewRole, setActiveNewRole, setActiveRole, setSavingRole, setSavingNewRole } from './roleSlice'

const SwalReact = withReactContent(Swal)

export const startAddNewRole = () => {
    return async (dispatch) => {

        dispatch(addNewRole())

        const resp = await fetchByToken({
            endpoint: `role/create/new`
        })

        dispatch(setSavingNewRole(false))

        if (resp.ok) {
            dispatch(setActiveNewRole(resp.role))
        }
    }
}

export const startSaveNewRole = () => {
    return async (dispatch, getState) => {

        dispatch(setSavingNewRole(true))

        const { activeNew } = getState().role

        const newRole = {
            ...activeNew
        }

        const resp = await fetchByToken({
            endpoint: `role/create/new`,
            data: newRole,
            method: 'POST'
        })

        dispatch(setSavingNewRole(false))

        if (resp.ok) {
            dispatch(setActiveNewRole(null))
        }
    }
}

export const startGetRole = (id) => {
    return async (dispatch) => {

        dispatch(setSavingRole(true))

        const resp = await fetchByToken({
            endpoint: `role/edit/${id}`
        })

        dispatch(setSavingRole(false))

        if (resp.ok) {
            dispatch(setActiveRole(resp.role))
        }
    }
}

export const startUpdateRole = () => {
    return async (dispatch, getState) => {

        dispatch(setSavingRole(true))

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

        dispatch(setSavingRole(false))

        if (resp.ok) {
            dispatch(setActiveRole(resp.role))
        }
    }
}

export const startUpdateModulesRole = (modules) => {
    return async (dispatch, getState) => {
        const { active } = getState().role
        const { _id, name } = active

        SwalReact.fire({
            title:
                <>
                    <div className='text-uppercase'>Módulos de acceso</div>
                    <div className="fs-5 fw-bold text-info mt-1">{name}</div>
                </>,
            html:
                <>
                    <div className='fs-5 mb-2'>¿Estás seguro de cambiar los módulos de acceso?</div>
                    <div className='fs-5'>Si es asi, escriba su contraseña para confirmar</div>
                </>,
            showCancelButton: true,
            confirmButtonText: 'Cambiar',
            cancelButtonText: 'Cancelar',
            allowOutsideClick: false,
            icon: 'question',
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-neutral'
            },
            input: 'password',
            inputAttributes: {
                autocapitalize: 'off'
            },
            buttonsStyling: false,
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {

                dispatch(setSavingRole(true))

                const passwordConfirm = result.value || ''

                const resp = await fetchByToken({
                    endpoint: `role/change_modules/${_id}`,
                    data: { passwordConfirm, modules },
                    method: 'PUT'
                })

                dispatch(setSavingRole(false))

                if (resp.ok) {
                    dispatch(setActiveRole(resp.role))
                }
            }
        })
    }
}

export const startUpdatePermissionsRole = (permissions) => {
    return async (dispatch, getState) => {
        const { active } = getState().role
        const { _id, name } = active

        SwalReact.fire({
            title:
                <>
                    <div className='text-uppercase'>Permisos</div>
                    <div className="fs-5 fw-bold text-info mt-1">{name}</div>
                </>,
            html:
                <>
                    <div className='fs-5 mb-2'>¿Estás seguro de cambiar los permisos de consultas a la base de datos?</div>
                    <div className='fs-5'>Si es asi, escriba su contraseña para confirmar</div>
                </>,
            showCancelButton: true,
            confirmButtonText: 'Cambiar',
            cancelButtonText: 'Cancelar',
            allowOutsideClick: false,
            icon: 'question',
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-neutral'
            },
            input: 'password',
            inputAttributes: {
                autocapitalize: 'off'
            },
            buttonsStyling: false,
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {

                dispatch(setSavingRole(true))

                const passwordConfirm = result.value || ''

                const resp = await fetchByToken({
                    endpoint: `role/change_permissions/${_id}`,
                    data: { passwordConfirm, permissions },
                    method: 'PUT'
                })

                dispatch(setSavingRole(false))

                if (resp.ok) {
                    dispatch(setActiveRole(resp.role))
                }
            }
        })
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

                dispatch(setSavingRole(true))

                const resp = await fetchByToken({
                    endpoint: `role/status/${_id}`,
                    data: { status },
                    method: 'PUT'
                })

                dispatch(setSavingRole(false))

                if (resp.ok) {
                    dispatch(setActiveRole(resp.role))
                }
            }
        })
    }
}

export const startUpdateInformationRole = ({ name, desc }) => {
    return async (dispatch, getState) => {

        dispatch(setSavingRole(true))

        const { active } = getState().role
        const { _id } = active

        const resp = await fetchByToken({
            endpoint: `role/info/${_id}`,
            data: { name, desc },
            method: 'PUT'
        })

        dispatch(setSavingRole(false))

        if (resp.ok) {
            dispatch(setActiveRole(resp.role))
        }
    }
}

export const startUpdateLevelRole = ({ levelRole, junta, committee }) => {
    return async (dispatch, getState) => {

        dispatch(setSavingRole(true))

        const { active } = getState().role
        const { _id } = active

        const resp = await fetchByToken({
            endpoint: `role/change_type/${_id}`,
            data: { levelRole, junta, committee },
            method: 'PUT'
        })

        dispatch(setSavingRole(false))

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

                dispatch(setSavingRole(true))

                const resp = await fetchByToken({
                    endpoint: `role/delete/${_id}`,
                    method: 'DELETE'
                })

                dispatch(setSavingRole(false))

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