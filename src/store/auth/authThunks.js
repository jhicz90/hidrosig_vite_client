import { fetchByToken, fetchNoToken } from '../../helpers'
import { startCheckingLogin, login, logout } from './'

export const checkingAuthentication = ({ userpass, password, remenber }) => {
    return async (dispatch) => {

        dispatch(startCheckingLogin())

        const resp = await fetchNoToken({
            endpoint: 'usersys/login',
            data: { userpass, password, remenber },
            method: 'POST'
        })

        if (!resp.ok) return dispatch(logout())

        const { uid, names, image, access, modules, iat, exp, token } = resp

        localStorage.setItem('token', token)

        dispatch(login({ uid, names, image, access, modules, iat, exp, token }))
    }
}

export const checkingToken = () => {
    return async (dispatch) => {

        const resp = await fetchByToken({
            endpoint: 'usersys/renew',
            alert: false
        })

        if (!resp.ok) return dispatch(logout())

        const { uid, names, image, access, modules, iat, exp, token } = resp

        localStorage.setItem('token', token)

        dispatch(login({ uid, names, image, access, modules, iat, exp, token }))
    }
}

export const logoutAuth = () => {
    return async (dispatch) => {
        localStorage.removeItem('token')
        dispatch(logout())
    }
}

// export const startChecking = () => {
//     return async (dispatch) => {
//         dispatch(initChecking())
//         await dispatch(checkInitAdmin())
//         await dispatch(checkToken())
//         dispatch(finishChecking())
//     }
// }
