import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseURL = import.meta.env.VITE_APP_API_URL

export const storeApi = createApi({
    reducerPath: 'storeApi',
    keepUnusedDataFor: 60,
    refetchOnFocus: true,
    refetchOnReconnect: true,
    tagTypes: ['UsrSys', 'Occup', 'Role', 'Perm', 'Modl'],
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
        getUsrsSys: builder.query({
            query: (search) => ({
                url: `usersys/list`,
                params: {
                    search
                }
            }),
            transformResponse: (response, meta, arg) => response.docs,
            providesTags: ['UsrSys']
        }),
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
        getUsrSysForOccup: builder.query({
            query: ({ id, search }) => ({
                url: `occupation/list_usersys_in/${id}`,
                params: {
                    search
                }
            }),
            transformResponse: (response, meta, arg) => response.docs,
            providesTags: ['UsrSys', 'Occup']
        }),
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
        addNewPerm: builder.mutation({
            query: (newPermission) => ({
                url: `permission/create/new`,
                method: 'post',
                body: newPermission
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
        addNewModule: builder.mutation({
            query: (newModule) => ({
                url: `module/create/new`,
                method: 'post',
                body: newModule
            }),
            invalidatesTags: ['Modl']
        }),
    }),
})

export const {
    useGetOccupsQuery,
    useGetPermsQuery,
    useAddNewPermMutation,
    useGetModulesQuery,
    useAddNewModuleMutation,
    useGetRolesQuery,
    useGetUsrsSysQuery,
    useGetUsrSysForOccupQuery,
} = storeApi