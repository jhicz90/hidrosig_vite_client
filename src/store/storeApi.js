import axios from 'axios'
import { Mutex } from 'async-mutex'
import { createApi } from '@reduxjs/toolkit/query/react'
import { msgFetchAlert } from '../helpers'
import { login, logout } from './auth'

const baseURL = import.meta.env.VITE_APP_API_URL

// Create a new mutex
const mutex = new Mutex()

// const baseQuery = fetchBaseQuery({
//     baseUrl: `${baseURL}/`,
// })

const axiosFetch = async ({ url, method, data, params, credentials = true, alert = true }) => {
    try {
        const result = await axios({
            withCredentials: credentials,
            url: baseURL + '/' + url,
            method,
            data,
            params,
            headers: {
                'Content-type': 'application/json',
                'Authorization': localStorage.getItem('token') || ''
            }
        })

        if (result.data.hasOwnProperty('msg')) {
            alert && msgFetchAlert(result.data)
        }

        return { data: result.data }
    } catch (axiosError) {
        let err = axiosError
        console.log(err)
        if (err.response?.data.hasOwnProperty('msg')) {
            alert && msgFetchAlert(err.response?.data)
        }

        return {
            error: {
                status: err.response?.status || 500,
                data: err.response?.data || err.message,
            },
        }
    }
}

const customBaseQuery = async ({ url, method = 'GET', data, params, credentials = true, alert = true }, api, extraOptions) => {

    await mutex.waitForUnlock()

    // let result = await baseQuery(args, api, extraOptions)
    let result = await axiosFetch({ url, method, data, params, credentials, alert })

    if (!!result.error && result.error.status === 401) {
        if (!mutex.isLocked()) {

            const release = await mutex.acquire()

            try {
                // const refreshResult = await baseQuery(
                //     { credentials: 'include', url: 'auth/refresh' },
                //     api,
                //     extraOptions
                // )

                const refreshResult = await axiosFetch({
                    url: 'auth/refresh',
                    alert: false
                })

                if (refreshResult.data?.ok) {
                    // Retry the initial query
                    // result = await baseQuery(args, api, extraOptions)
                    result = await axiosFetch({ url, method, data, params, credentials, alert })
                } else {
                    api.dispatch(logout())
                    // api.dispatch(storeApi.util.invalidateTags(['Auth']))
                    // window.location.href = '/login'
                }
            } finally {
                // release must be called once the mutex should be released again.
                release()
            }
        } else {
            // wait until the mutex is available without locking it
            await mutex.waitForUnlock()
            // result = await baseQuery(args, api, extraOptions)
            result = await axiosFetch({ url, method, data, params, credentials, alert })
        }
    }

    return result
}

export const storeApi = createApi({
    reducerPath: 'storeApi',
    keepUnusedDataFor: 60,
    refetchOnMountOrArgChange: true,
    tagTypes: ['Auth', 'UsrSys', 'Occup', 'Role', 'Perm', 'Modl', 'Orgz', 'Trrt', 'Irrig', 'Ptty', 'Vchr', 'Files', 'UsrFrm', 'Frm', 'Geo', 'Cllc', 'YrRt', 'VlRt', 'Comp', 'IrrSys', 'Crp'],
    baseQuery: customBaseQuery,
    // baseQuery: axiosBaseQuery({
    //     baseUrl: baseURL
    // }),
    // baseQuery: fetchBaseQuery({
    //     baseUrl: `${baseURL}`,
    //     prepareHeaders: (headers, { getState }) => {
    //         const token = getState().auth.token

    //         if (token) {
    //             headers.set('Authorization', token)
    //         }

    //         return headers
    //     }
    // }),
    endpoints: (builder) => ({
        getMe: builder.query({
            query: () => ({
                url: `usersys/me`,
                alert: false
            }),
            onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
                try {
                    const { data } = await queryFulfilled

                    if (!data.ok) return dispatch(logout())

                    const { uid, names, image, access, modules } = data

                    dispatch(login({ uid, names, image, access, modules }))
                } catch (error) {
                    dispatch(logout())
                }
            }
        }),
        // USUARIOS DE SISTEMA
        getUsrsSysByOccup: builder.query({
            query: ({ id, search }) => ({
                url: `occupation/list_usersys_in/${id}`,
                params: {
                    search
                }
            }),
            transformResponse: (response, meta, arg) => response.docs,
            providesTags: ['UsrSys', 'Occup']
        }),
        // USUARIOS DE SISTEMA
        // OCUPACIONES
        getOccups: builder.query({
            query: (search) => ({
                url: `occupation/list`,
                params: {
                    search
                }
            }),
            transformResponse: (response, meta, arg) => response.docs,
            providesTags: ['Occup']
        }),
        getOccupById: builder.query({
            query: (id) => ({
                url: `occupation/edit/${id}`
            }),
            transformResponse: (response, meta, arg) => response.occupation,
            providesTags: ['Occup']
        }),
        // OCUPACIONES
        // ROLES
        getRoles: builder.query({
            query: (search) => ({
                url: `role/list`,
                params: {
                    search
                }
            }),
            transformResponse: (response, meta, arg) => response.docs,
            providesTags: ['Role']
        }),
        getRoleById: builder.query({
            query: (id) => ({
                url: `role/edit/${id}`
            }),
            transformResponse: (response, meta, arg) => response.role,
            providesTags: ['Role']
        }),
        getPerms: builder.query({
            query: (search) => ({
                url: `permission/list`,
                params: {
                    search
                }
            }),
            transformResponse: (response, meta, arg) => response.docs,
            providesTags: ['Perm']
        }),
        getPermsGroup: builder.query({
            query: (search) => ({
                url: `permission/list_group`,
                params: {
                    search
                }
            }),
            transformResponse: (response, meta, arg) => response.docs
        }),
        addNewPerm: builder.mutation({
            query: (newPermission) => ({
                url: `permission/create/new`,
                method: 'post',
                data: newPermission
            }),
            invalidatesTags: ['Perm']
        }),
        getModules: builder.query({
            query: (search) => ({
                url: `module/list`,
                params: {
                    search
                }
            }),
            transformResponse: (response, meta, arg) => response.docs,
            providesTags: ['Modl']
        }),
        getModulesGroup: builder.query({
            query: (search) => ({
                url: `module/list_group`,
                params: {
                    search
                }
            }),
            transformResponse: (response, meta, arg) => response.docs
        }),
        addNewModule: builder.mutation({
            query: (newModule) => ({
                url: `module/create/new`,
                method: 'post',
                data: newModule
            }),
            invalidatesTags: ['Modl']
        }),
        // ROLES
        // RED DE RIEGO
        addRugosity: builder.mutation({
            query: (rugosity) => ({
                url: `rugosity/create/new`,
                method: 'post',
                data: rugosity
            }),
            invalidatesTags: ['Irrig']
        }),
        getRugositys: builder.query({
            query: (search) => ({
                url: `rugosity/list`,
                params: {
                    search
                }
            }),
            transformResponse: (response, meta, arg) => response.docs,
            providesTags: ['Irrig']
        }),
        updateRugosity: builder.mutation({
            query: ({ id, rugosity }) => ({
                url: `rugosity/edit/${id}`,
                method: 'put',
                data: rugosity
            }),
            invalidatesTags: ['Irrig']
        }),
        deleteRugosity: builder.mutation({
            query: (id) => ({
                url: `rugosity/delete/${id}`,
                method: 'delete'
            }),
            invalidatesTags: ['Irrig']
        }),
        addOrderChannel: builder.mutation({
            query: (orderchannel) => ({
                url: `orderchannel/create/new`,
                method: 'post',
                data: orderchannel
            }),
            invalidatesTags: ['Irrig']
        }),
        getOrderChannels: builder.query({
            query: (search) => ({
                url: `orderchannel/list`,
                params: {
                    search
                }
            }),
            transformResponse: (response, meta, arg) => response.docs,
            providesTags: ['Irrig']
        }),
        updateOrderChannel: builder.mutation({
            query: ({ id, orderchannel }) => ({
                url: `orderchannel/edit/${id}`,
                method: 'put',
                data: orderchannel
            }),
            invalidatesTags: ['Irrig']
        }),
        deleteOrderChannel: builder.mutation({
            query: (id) => ({
                url: `orderchannel/delete/${id}`,
                method: 'delete'
            }),
            invalidatesTags: ['Irrig']
        }),
        // RED DE RIEGO
    }),
})

export const {
    useAddNewModuleMutation,
    useAddNewPermMutation,
    useAddOrderChannelMutation,
    useAddRugosityMutation,
    useDeleteOrderChannelMutation,
    useDeleteRugosityMutation,
    useGetMeQuery,
    useGetModulesGroupQuery,
    useGetModulesQuery,
    useGetOccupByIdQuery,
    useGetOccupsQuery,
    useGetOrderChannelsQuery,
    useGetPermsGroupQuery,
    useGetPermsQuery,
    useGetRoleByIdQuery,
    useGetRolesQuery,
    useGetRugositysQuery,
    useGetUsrsSysByOccupQuery,
    useLazyGetMeQuery,
    useUpdateOrderChannelMutation,
    useUpdateRugosityMutation,
} = storeApi