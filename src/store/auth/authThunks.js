import { fetchByToken, fetchNoToken } from '../../helpers'
import { storeApi } from '../storeApi'
import { logout } from './'

export const authApi = storeApi.injectEndpoints({
    endpoints: (builder) => ({
        // AUTH
        authLogin: builder.query({
            query: (data) => ({
                url: `auth/login`,
                method: 'POST',
                data,
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
                alert: false
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