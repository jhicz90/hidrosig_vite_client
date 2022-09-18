import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { fetchByToken, normalizeText } from '../../helpers'
import { addNewUserSys, setActiveNewUserSys, setActiveUserSys, setListUserSys, setSaving, setSavingNew } from './usersysSlice'

const SwalReact = withReactContent(Swal)

export const startListUserSys = (search = '') => {
    return async (dispatch) => {

        const resp = await fetchByToken({
            endpoint: 'usersys/list',
            params: { search }
        })

        if (resp.ok) {
            dispatch(setListUserSys(resp.docs))
        } else {
            dispatch(setListUserSys([]))
        }
    }
}

export const startAddNewUserSys = () => {
    return async (dispatch) => {

        dispatch(addNewUserSys())

        const resp = await fetchByToken({
            endpoint: `usersys/create/new`
        })

        dispatch(setSavingNew(false))

        if (resp.ok) {
            dispatch(setActiveNewUserSys(resp.usersys))
        }
    }
}

export const startSaveNewUserSys = () => {
    return async (dispatch, getState) => {

        dispatch(setSavingNew(true))

        const { activeNew } = getState().usersys

        const newUsersys = {
            ...activeNew,
            occupation: activeNew.occupation !== null ? activeNew.occupation._id : null,
            permission: activeNew.permission !== null ? activeNew.permission._id : null
        }

        const resp = await fetchByToken({
            endpoint: `usersys/create/new`,
            data: newUsersys,
            method: 'POST'
        })

        dispatch(setActiveNewUserSys(null))
        dispatch(setSavingNew(false))

        if (resp.ok) {
            dispatch(startListUserSys())
        }
    }
}

export const startGetUserSys = (id) => {
    return async (dispatch) => {

        dispatch(setSaving(true))

        const resp = await fetchByToken({
            endpoint: `usersys/edit/${id}`
        })

        dispatch(setSaving(false))

        if (resp.ok) {
            dispatch(setActiveUserSys(resp.usersys))
        }
    }
}

export const startUpdateActiveUserSys = () => {
    return async (dispatch, getState) => {

        dispatch(setSaving(true))

        const { active } = getState().usersys
        const { _id } = active

        const updateUserSys = {
            ...active,
            occupation: active.occupation !== null ? active.occupation._id : null,
            permission: active.permission !== null ? active.permission._id : null
        }

        const resp = await fetchByToken({
            endpoint: `usersys/edit/${_id}`,
            data: updateUserSys,
            method: 'PUT'
        })

        dispatch(setSaving(false))

        if (resp.ok) {
            dispatch(loadActiveUserSys(resp.usersys))
            dispatch(startListUserSys())
        }
    }
}

export const startUpdateActiveUserSysImage = ({ image }) => {
    return async (dispatch, getState) => {
        const { active } = getState().usersys
        const { _id } = active

        const resp = await fetchByToken({
            endpoint: `usersys/image/${_id}`,
            data: { image },
            method: 'PUT'
        })

        if (resp.ok) {
            dispatch(loadActiveUserSys(resp.usersys))
            dispatch(startListUserSys())
        }
    }
}

export const startUpdateActiveUserSysCover = ({ coverImage }) => {
    return async (dispatch, getState) => {
        const { active } = getState().usersys
        const { _id } = active

        const resp = await fetchByToken({
            endpoint: `usersys/cover/${_id}`,
            data: { coverImage },
            method: 'PUT'
        })

        if (resp.ok) {
            dispatch(loadActiveUserSys(resp.usersys))
            dispatch(startListUserSys())
        }
    }
}


export const startUpdateStatusUserSys = ({ state }) => {
    return async (dispatch, getState) => {
        const { active } = getState().usersys
        const { _id, names, surnames, active: stateUsersys } = active

        SwalReact.fire({
            title:
                <>
                    <div className='text-uppercase'>Estado</div>
                    <div className="fs-5 fw-bold text-info mt-1">{names} {surnames}</div>
                </>,
            html:
                <>
                    <div className='fs-5 mb-2'>¿Estás seguro de modificar el estado?</div>
                    <div className='alert alert-warning'>Recordar que al hacer el cambio las sesiones de este usuario se reiniciaran.</div>
                </>,
            showCancelButton: true,
            confirmButtonText: stateUsersys ? 'Desactivar' : 'Activar',
            cancelButtonText: 'Cancelar',
            allowOutsideClick: false,
            icon: 'question',
            customClass: {
                confirmButton: stateUsersys ? 'btn btn-warning' : 'btn btn-success',
                cancelButton: 'btn btn-neutral'
            },
            buttonsStyling: false,
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {

                dispatch(setSaving(true))

                const resp = await fetchByToken({
                    endpoint: `usersys/active/${_id}`,
                    data: { active: state },
                    method: 'PUT'
                })

                dispatch(setSaving(false))

                if (resp.ok) {
                    dispatch(setActiveUserSys(resp.usersys))
                    dispatch(startListUserSys())
                }
            }
        })
    }
}

export const startUpdateInformationUserSys = ({ names, surnames, birthday, docid, occupation, gender }) => {
    return async (dispatch, getState) => {

        dispatch(setSaving(true))

        const { active } = getState().usersys
        const { _id } = active

        const resp = await fetchByToken({
            endpoint: `usersys/profile/${_id}`,
            data: { names, surnames, birthday, docid, occupation, gender },
            method: 'PUT'
        })

        dispatch(setSaving(false))

        if (resp.ok) {
            dispatch(setActiveUserSys(resp.usersys))
            dispatch(startListUserSys())
        }
    }
}

export const startUpdateEmailUserSys = ({ newEmail: email }) => {
    return async (dispatch, getState) => {
        const { active } = getState().usersys
        const { _id, names, surnames } = active

        SwalReact.fire({
            title:
                <>
                    <div className='text-uppercase'>Correo electronico</div>
                    <div className="fs-5 fw-bold text-info mt-1">{names} {surnames}</div>
                </>,
            html:
                <>
                    <div className='fs-5 mb-2'>¿Estás seguro de cambiar el correo con: {email}?</div>
                    <div className='fs-5'>Si es asi, escriba su contraseña para confirmar</div>
                </>,
            showCancelButton: true,
            confirmButtonText: 'Cambiar correo',
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

                dispatch(setSaving(true))

                const passwordConfirm = result.value || ''

                const resp = await fetchByToken({
                    endpoint: `usersys/changeemail/${_id}`,
                    data: { passwordConfirm, email },
                    method: 'PUT'
                })

                dispatch(setSaving(false))

                if (resp.ok) {
                    dispatch(setActiveUserSys(resp.usersys))
                    dispatch(startListUserSys())
                }
            }
        })
    }
}

export const startUpdatePasswordUserSys = ({ newPassword, newPasswordConfirm }) => {
    return async (dispatch, getState) => {
        const { active } = getState().usersys
        const { _id, names, surnames } = active

        SwalReact.fire({
            title:
                <>
                    <div className='text-uppercase'>Contraseña</div>
                    <div className="fs-5 fw-bold text-info mt-1">{names} {surnames}</div>
                </>,
            html:
                <>
                    <div className='fs-5 mb-2'>¿Estás seguro de cambiar la contraseña?</div>
                    <div className='fs-5'>Si es asi, escriba la actual contraseña para confirmar</div>
                </>,
            showCancelButton: true,
            confirmButtonText: 'Cambiar contraseña',
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

                dispatch(setSaving(true))

                const password = result.value || ''

                const resp = await fetchByToken({
                    endpoint: `usersys/changepassw/${_id}`,
                    data: { password, newPassword, newPasswordConfirm },
                    method: 'PUT'
                })

                dispatch(setSaving(false))

                if (resp.ok) {
                    dispatch(setActiveUserSys(resp.usersys))
                    dispatch(startListUserSys())
                }
            }
        })
    }
}

export const startUpdatePermissionUserSys = ({ permission }) => {
    return async (dispatch, getState) => {
        const { active } = getState().usersys
        const { _id, names, surnames } = active

        SwalReact.fire({
            title:
                <>
                    <div className='text-uppercase'>Permiso</div>
                    <div className="fs-5 fw-bold text-info mt-1">{names} {surnames}</div>
                </>,
            html:
                <>
                    <div className='fs-5 mb-2'>¿Estás seguro de cambiar el permiso?</div>
                    <div className='fs-5'>Si es asi, escriba su contraseña para confirmar</div>
                </>,
            showCancelButton: true,
            confirmButtonText: 'Cambiar permiso',
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

                dispatch(setSaving(true))

                const passwordConfirm = result.value || ''

                const resp = await fetchByToken({
                    endpoint: `usersys/changeperm/${_id}`,
                    data: { passwordConfirm, permission },
                    method: 'PUT'
                })

                dispatch(setSaving(false))

                if (resp.ok) {
                    dispatch(setActiveUserSys(resp.usersys))
                    dispatch(startListUserSys())
                }
            }
        })
    }
}

// export const startGenerateNewPasswordUserSys = () => {
//     return async (dispatch, getState) => {
//         const { active } = getState().usersys
//         const { _id } = active

//         const resp = await fetchByToken({
//             endpoint: `usersys/generatenewpassw/${_id}`,
//             data: { passwordConfirm },
//             method: 'PUT'
//         })

//         if (resp.ok) {
//             Swal.fire({
//                 title: resp.newpassw,
//                 text: 'La nueva contraseña fue generada, se envio una copia al correo de esta cuenta, o podria copiarla.',
//                 confirmButtonText: 'Aceptar',
//                 allowOutsideClick: false,
//                 icon: 'success'
//             })
//             dispatch(loadActiveUserSys(resp.usersys))
//             dispatch(startListUserSys())
//         }
//     }
// }

// export const startUpdateActiveUserSysCloseSessionRemote = ({ session }) => {
//     return async (dispatch, getState) => {
//         const { active } = getState().usersys
//         const { _id } = active

//         const resp = await fetchByToken({
//             endpoint: `usersys/closesession/${session}`,
//             data: { uidAccount: _id },
//             method: 'PUT'
//         })

//         if (resp.ok) {
//             dispatch(loadActiveUserSys(resp.usersys))
//             dispatch(startListUserSys())
//         }
//     }
// }

// export const startUpdateActiveUserSysCloseAllSession = () => {
//     return async (dispatch, getState) => {
//         const { uid } = getState().auth
//         const { active } = getState().usersys
//         const { _id } = active

//         const resp = await fetchByToken({
//             endpoint: `usersys/closeallsession`,
//             data: { uidAccount: _id },
//             method: 'PUT'
//         })

//         if (resp.ok) {
//             dispatch(loadActiveUserSys(resp.usersys))
//             if (uid !== _id) dispatch(startListUserSys())
//         }
//     }
// }

export const startDeleteUserSys = ({ navigate = null }) => {
    return async (dispatch, getState) => {
        const { active } = getState().usersys
        const { _id, names, surnames } = active

        const wordConfirm = normalizeText(names, { lowerCase: true, removeSpaces: true })

        SwalReact.fire({
            title:
                <>
                    <div className='text-uppercase'>Eliminar cuenta de usuario</div>
                    <div className="fs-5 fw-bold text-info mt-1">{names} {surnames}</div>
                </>,
            html:
                <>
                    <div className='fs-5 mb-2'>¿Estás seguro de eliminar este usuario de sistema?</div>
                    <div className='fs-5'>Si es asi, escriba <strong>{wordConfirm}</strong> para confirmar</div>
                </>,
            showCancelButton: true,
            confirmButtonText: 'Eliminar cuenta',
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
                    endpoint: `usersys/delete/${_id}`,
                    method: 'DELETE'
                })

                dispatch(setSaving(false))

                if (resp.ok) {
                    navigate('/app/sys/user_sys')
                    dispatch(setActiveUserSys(null))
                    dispatch(startListUserSys())
                }
            }
        })
    }
}

// export const startEraseActiveUserSys = () => {
//     return async (dispatch, getState) => {
//         const { active } = getState().usersys
//         const { _id, names, surnames } = active

//         const wordConfirm = normalizeText(names, { lowerCase: true, removeSpaces: true })

//         SwalReact.fire({
//             title:
//                 <>
//                     <div className='text-uppercase'>Borrar permanentemente</div>
//                     <div className="fs-5 fw-bold text-info mt-1">{names} {surnames}</div>
//                 </>,
//             html:
//                 <>
//                     <div className='fs-5 mb-2'>¿Estás seguro de eliminar este usuario de sistema permanentemente?</div>
//                     <div className='fs-5'>Si es asi, escriba <strong>{wordConfirm}</strong> para confirmar</div>
//                 </>,
//             showCancelButton: true,
//             confirmButtonText: 'Borrar permanentemente',
//             cancelButtonText: 'Cancelar',
//             allowOutsideClick: false,
//             icon: 'warning',
//             customClass: {
//                 confirmButton: `btn btn-danger`,
//                 cancelButton: `btn btn-neutral`
//             },
//             input: 'text',
//             inputAttributes: {
//                 autocapitalize: 'off'
//             },
//             buttonsStyling: false,
//             reverseButtons: true,
//             preConfirm: (typed) => {
//                 if (typed === wordConfirm) {
//                     return true
//                 } else {
//                     return false
//                 }
//             }
//         }).then(async (result) => {
//             if (result.value) {
//                 const resp = await fetchByToken({
//                     endpoint: `usersys/erase/${_id}`,
//                     method: 'DELETE'
//                 })

//                 if (resp.ok) {
//                     dispatch(loadActiveUserSys({ err: 'Error' }))
//                     dispatch(startListUserSys())
//                 }
//             }
//         })
//     }
// }

// export const startUpdateActiveUserSysNewData = ({ uid }) => {
//     return async (dispatch, getState) => {
//         const { active } = getState().usersys
//         const { _id } = active

//         if (uid === _id) {
//             const resp = await fetchByToken({
//                 endpoint: `usersys/edit/${_id}`
//             })

//             if (resp.ok) {
//                 dispatch(loadActiveUserSys(resp.usersys))
//                 dispatch(startListUserSys())
//             }
//         }

//     }
// }

export const findUserSysByPermission = async ({ type, perm, search }) => {
    const resp = await fetchByToken({
        endpoint: 'usersys/searchbyperm',
        params: { type, perm, search },
        alert: false
    })

    if (resp.ok) {
        return resp.docs
    } else {
        return []
    }
}

export const findUserSysByOccupation = async ({ type, occup, search }) => {
    const resp = await fetchByToken({
        endpoint: 'usersys/searchbyoccup',
        params: { type, occup, search },
        alert: false
    })

    if (resp.ok) {
        return resp.docs
    } else {
        return []
    }
}