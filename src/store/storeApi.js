import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseURL = import.meta.env.VITE_APP_API_URL

export const storeApi = createApi({
    reducerPath: 'storeApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${baseURL}`,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token

            if (token) {
                headers.set('Authorization', token)
            }

            return headers
        }
    }),
    endpoints: (builder) => ({
        getUsrs: builder.query({
            query: (search) => ({
                url: `usersys/list`,
                params: {
                    search
                }
            }),
            transformResponse: (response, meta, arg) => response.docs,
        }),
        getOccups: builder.query({
            query: (search) => ({
                url: `occupation/list`,
                params: {
                    search
                }
            }),
            transformResponse: (response, meta, arg) => response.docs,
        }),
        getUsrSysForOccup: builder.query({
            query: ({ id, search }) => ({
                url: `occupation/list_usersys_in/${id}`,
                params: {
                    search
                }
            }),
            transformResponse: (response, meta, arg) => response.docs,
            // query: ({ id, search }) => ({ url: `list_usersys_in`, body: { id, search } })
        }),
        getRoles: builder.query({
            query: (search) => ({
                url: `role/list`,
                params: {
                    search
                }
            }),
            transformResponse: (response, meta, arg) => response.docs,
        }),
    }),
})

export const {
    useGetUsrsQuery,
    useGetOccupsQuery,
    useGetUsrSysForOccupQuery,
    useGetRolesQuery,
} = storeApi