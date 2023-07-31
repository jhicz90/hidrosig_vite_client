import { fetchByToken, fetchNoToken } from '../../helpers'
import { storeApi } from '../storeApi'
import { startCheckingLogin, login, logout, startCheckingCredentials } from './'

export const authApi = storeApi.injectEndpoints({
    endpoints: (builder) => ({
        // AUTH
        authLogin: builder.query({
            query: (data) => ({
                url: `auth/login`,
                body: data,
                method: 'POST',
                credentials: 'include'
            }),
            onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
                try {
                    await queryFulfilled
                    await dispatch(storeApi.endpoints.getMe.initiate(null))
                } catch (error) { }
            },
        }),
        authLogout: builder.query({
            query: () => ({
                url: `auth/logout`,
                method: 'DELETE',
                credentials: 'include'
            }),
            onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
                try {
                    await queryFulfilled
                    dispatch(logout())
                } catch (error) { }
            },
        }),
        authRefresh: builder.query({
            query: () => ({
                url: `auth/refresh`,
                credentials: 'include',
                alert: false,
            })
        }),
        // AUTH
    })
})

export const {
    useAuthLoginQuery,
    useAuthRefreshQuery,
    useLazyAuthLoginQuery,
    useLazyAuthLogoutQuery,
} = authApi

export const checkingAuthentication = ({ userpass, password, remenber }) => {
    return async (dispatch) => {

        dispatch(startCheckingLogin())

        const resp = await fetchNoToken({
            endpoint: 'auth/login',
            data: { userpass, password, remenber },
            method: 'POST'
        })

        if (!resp.ok) return dispatch(logout())

        const { uid, names, image, access, modules, options, token } = resp

        setTimeout(() => {
            localStorage.setItem('token', `Bearer ${token}`)
            dispatch(login({ uid, names, image, access, modules, options, token }))
        }, 3000)
    }
}

export const checkingToken = () => {
    return async (dispatch) => {

        dispatch(startCheckingCredentials())

        const resp = await fetchByToken({
            endpoint: 'auth/refresh',
            alert: false
        })

        if (!resp.ok) return dispatch(logout())

        const { uid, names, image, access, modules, options, token } = resp

        setTimeout(() => {
            localStorage.setItem('token', `Bearer ${token}`)
            dispatch(login({ uid, names, image, access, modules, options, token }))
        }, 3000)
    }
}

export const logoutAuth = () => {
    return async (dispatch) => {

        // dispatch(startCheckingCredentials())
        dispatch(logout())

        const resp = await fetchByToken({
            endpoint: 'auth/logout',
            method: 'DELETE',
            alert: false,
        })

        if (resp.ok) {
            console.log('Se respondio')
            // localStorage.removeItem('token')
        }
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
