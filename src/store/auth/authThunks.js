import { fetchByToken, fetchNoToken } from '../../helpers'
import { storeApi } from '../storeApi'
import { startCheckingLogin, login, logout, startCheckingCredentials } from './'

export const authApi = storeApi.injectEndpoints({
    endpoints: (builder) => ({
        // AUTH
        authRefresh: builder.query({
            query: () => ({
                url: `auth/refresh`,
                params: {
                    alertFetch: false
                }
            }),
            onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
                try {
                    dispatch(startCheckingCredentials())

                    const { data } = await queryFulfilled

                    if (!data.ok) return dispatch(logout())

                    const { uid, names, image, access, modules, options, token } = data

                    localStorage.setItem('token', `Bearer ${token}`)

                    dispatch(login({ uid, names, image, access, modules, options, token }))
                } catch (error) {
                    dispatch(logout())
                }
            },
        }),
        // AUTH
    })
})

export const {
    useAuthRefreshQuery
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

        localStorage.setItem('token', `Bearer ${token}`)

        dispatch(login({ uid, names, image, access, modules, options, token }))
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

        localStorage.setItem('token', `Bearer ${token}`)

        dispatch(login({ uid, names, image, access, modules, options, token }))
    }
}

export const logoutAuth = () => {
    return async (dispatch) => {

        dispatch(startCheckingCredentials())

        const resp = await fetchByToken({
            endpoint: 'auth/logout',
            method: 'delete',
            alert: false,
        })

        if (resp.ok) {
            localStorage.removeItem('token')
            dispatch(logout())
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
