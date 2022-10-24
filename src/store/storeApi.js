import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import axios from 'axios'
import { msgFetchAlert } from '../helpers'

const baseURL = import.meta.env.VITE_APP_API_URL

const axiosBaseQuery = ({ baseUrl } = { baseUrl: '' }) =>
    async ({ url, method, data, params }) => {
        try {
            const result = await axios({
                url: baseUrl + '/' + url,
                method,
                data,
                params,
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': localStorage.getItem('token') || ''
                }
            })

            if (result.data.hasOwnProperty('msg')) {
                msgFetchAlert(result.data)
            }

            return { data: result.data }
        } catch (axiosError) {
            let err = axiosError
            console.log(err)
            if (err.response?.data.hasOwnProperty('msg')) {
                msgFetchAlert(err.response?.data)
            }

            return {
                error: {
                    status: err.response?.status,
                    data: err.response?.data || err.message,
                },
            }
        }
    }


export const storeApi = createApi({
    reducerPath: 'storeApi',
    keepUnusedDataFor: 60,
    refetchOnFocus: true,
    refetchOnReconnect: true,
    tagTypes: ['UsrSys', 'Occup', 'Role', 'Perm', 'Modl', 'Orgz', 'Trrt', 'Acct'],
    baseQuery: axiosBaseQuery({
        baseUrl: baseURL
    }),
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
        getUsrSysByOccup: builder.query({
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
        getJuntas: builder.query({
            query: (search) => ({
                url: `junta/list`,
                params: {
                    search
                }
            }),
            transformResponse: (response, meta, arg) => response.docs,
            providesTags: ['Orgz']
        }),
        addNewJunta: builder.mutation({
            query: (newJunta) => ({
                url: `junta/create/new`,
                method: 'post',
                data: newJunta
            }),
            invalidatesTags: ['Orgz']
        }),
        getComms: builder.query({
            query: (search) => ({
                url: `committee/list`,
                params: {
                    search
                }
            }),
            transformResponse: (response, meta, arg) => response.docs,
            providesTags: ['Orgz']
        }),
        getCommsByJunta: builder.query({
            query: ({ junta, search }) => ({
                url: `committee/search_by_junta/${junta}`,
                params: {
                    search
                }
            }),
            transformResponse: (response, meta, arg) => response.docs,
            providesTags: ['Orgz']
        }),
        addNewComm: builder.mutation({
            query: (newCommittee) => ({
                url: `committee/create/new`,
                method: 'post',
                data: newCommittee
            }),
            invalidatesTags: ['Orgz']
        }),
        getZones: builder.query({
            query: (search) => ({
                url: `zone/list`,
                params: {
                    search
                }
            }),
            transformResponse: (response, meta, arg) => response.docs,
            providesTags: ['Orgz']
        }),
        getZonesByJunta: builder.query({
            query: ({ junta, search }) => ({
                url: `zone/search_by_junta/${junta}`,
                params: {
                    search
                }
            }),
            transformResponse: (response, meta, arg) => response.docs,
            providesTags: ['Orgz', 'Trrt']
        }),
        getBlocks: builder.query({
            query: (search) => ({
                url: `block/list`,
                params: {
                    search
                }
            }),
            transformResponse: (response, meta, arg) => response.docs,
            providesTags: ['Trrt']
        }),
        getWaterSources: builder.query({
            query: (search) => ({
                url: `watersource/list`,
                params: {
                    search
                }
            }),
            transformResponse: (response, meta, arg) => response.docs,
            providesTags: ['Orgz']
        }),
        getWaterSourcesByJunta: builder.query({
            query: ({ junta, search }) => ({
                url: `watersource/search_by_junta/${junta}`,
                params: {
                    search
                }
            }),
            transformResponse: (response, meta, arg) => response.docs,
            providesTags: ['Orgz', 'Trrt']
        }),
        getBrowser: builder.query({
            query: (folder) => ({
                url: `resource/browser/${folder}`,
            }),
            transformResponse: (response, meta, arg) => response.browser,
        }),
        getPettyCashs: builder.query({
            query: (search) => ({
                url: `pettycash/list`,
                params: {
                    search
                }
            }),
            transformResponse: (response, meta, arg) => response.docs,
            providesTags: ['Acct']
        }),
        getPettyCashsByUsrSys: builder.query({
            query: ({ usersys, search }) => ({
                url: `pettycash/search_by_usersys/${usersys}`,
                params: {
                    search
                }
            }),
            transformResponse: (response, meta, arg) => response.docs,
            providesTags: ['Acct']
        }),
        getVouchers: builder.query({
            query: (search) => ({
                url: `voucher/list`,
                params: {
                    search
                }
            }),
            transformResponse: (response, meta, arg) => response.docs,
            providesTags: ['Acct']
        }),
        getVouchersByPettyCash: builder.query({
            query: ({ pettycash, search }) => ({
                url: `voucher/search_by_pettycash/${pettycash}`,
                params: {
                    search
                }
            }),
            transformResponse: (response, meta, arg) => response.docs,
            providesTags: ['Acct']
        }),
    }),
})

export const {
    useAddNewCommMutation,
    useAddNewJuntaMutation,
    useAddNewModuleMutation,
    useAddNewPermMutation,
    useGetBlocksQuery,
    useGetBrowserQuery,
    useGetCommsByJuntaQuery,
    useGetCommsQuery,
    useGetJuntasQuery,
    useGetModulesGroupQuery,
    useGetModulesQuery,
    useGetOccupsQuery,
    useGetPermsGroupQuery,
    useGetPermsQuery,
    useGetPettyCashsByUsrSysQuery,
    useGetPettyCashsQuery,
    useGetRolesQuery,
    useGetUsrsSysQuery,
    useGetUsrSysByOccupQuery,
    useGetVouchersByPettyCashQuery,
    useGetVouchersQuery,
    useGetWaterSourcesByJuntaQuery,
    useGetWaterSourcesQuery,
    useGetZonesByJuntaQuery,
    useGetZonesQuery,
} = storeApi