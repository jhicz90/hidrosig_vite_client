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
    tagTypes: ['UsrSys', 'Occup', 'Role', 'Perm', 'Modl', 'Orgz', 'Trrt', 'Acct', 'Files'],
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
        // USUARIOS DE SISTEMA
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
        getUsrSysById: builder.query({
            query: (id) => ({
                url: `usersys/edit/${id}`
            }),
            transformResponse: (response, meta, arg) => response.usersys,
            providesTags: ['UsrSys']
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
        // JUNTA
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
        getJuntaById: builder.query({
            query: (id) => ({
                url: `junta/edit/${id}`
            }),
            transformResponse: (response, meta, arg) => response.junta,
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
        // JUNTA
        // COMMITTEE
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
        getCommById: builder.query({
            query: (id) => ({
                url: `committee/edit/${id}`
            }),
            transformResponse: (response, meta, arg) => response.committee,
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
        // COMMITTEE
        getZones: builder.query({
            query: (search) => ({
                url: `zone/list`,
                params: {
                    search
                }
            }),
            transformResponse: (response, meta, arg) => response.docs,
            providesTags: ['Orgz', 'Trrt']
        }),
        getZoneById: builder.query({
            query: (id) => ({
                url: `zone/edit/${id}`,
            }),
            transformResponse: (response, meta, arg) => response.zone,
            providesTags: ['Orgz', 'Trrt']
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
            providesTags: ['Orgz', 'Trrt']
        }),
        getBlockById: builder.query({
            query: (id) => ({
                url: `block/edit/${id}`
            }),
            transformResponse: (response, meta, arg) => response.block,
            providesTags: ['Orgz', 'Trrt']
        }),
        getWaterSources: builder.query({
            query: (search) => ({
                url: `watersource/list`,
                params: {
                    search
                }
            }),
            transformResponse: (response, meta, arg) => response.docs,
            providesTags: ['Orgz', 'Trrt']
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
        // FILES
        getBrowser: builder.query({
            query: (folder) => ({
                url: `resource/browser/${folder}`,
            }),
            transformResponse: (response, meta, arg) => response.browser,
            providesTags: ['Files']
        }),
        getDocuments: builder.query({
            query: (search) => ({
                url: `document/list`,
                params: {
                    search
                }
            }),
            transformResponse: (response, meta, arg) => response.docs,
            providesTags: ['Files']
        }),
        getDocumentById: builder.query({
            query: (id) => ({
                url: `document/edit/${id}`,
            }),
            transformResponse: (response, meta, arg) => response.document,
            providesTags: ['Files']
        }),
        // addResource: builder.mutation({
        //     query: (files) => {

        //         const formData = new FormData()

        //         files.forEach(item => {
        //             formData.append('resources', item)
        //         })

        //         return {
        //             method: 'POST',
        //             data: formData,
        //             url: `resource/up`,
        //         }
        //     },
        //     transformResponse: (response, meta, arg) => response.document,
        //     providesTags: ['Files']
        // }),
        // FILES
        // PETTYCASH
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
        getPettyCashById: builder.query({
            query: (id) => ({
                url: `pettycash/edit/${id}`,
            }),
            transformResponse: (response, meta, arg) => response.pettycash,
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
        // PETTYCASH
        // VOUCHER
        getVoucherById: builder.query({
            query: (id) => ({
                url: `voucher/edit/${id}`,
            }),
            transformResponse: (response, meta, arg) => response.voucher,
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
        // VOUCHER
    }),
})

export const {
    useAddNewCommMutation,
    useAddNewJuntaMutation,
    useAddNewModuleMutation,
    useAddNewPermMutation,
    useGetBlockByIdQuery,
    useGetBlocksQuery,
    useGetBrowserQuery,
    useGetCommByIdQuery,
    useGetCommsByJuntaQuery,
    useGetCommsQuery,
    useGetDocumentByIdQuery,
    useGetDocumentsQuery,
    useGetJuntaByIdQuery,
    useGetJuntasQuery,
    useGetModulesGroupQuery,
    useGetModulesQuery,
    useGetOccupByIdQuery,
    useGetOccupsQuery,
    useGetPermsGroupQuery,
    useGetPermsQuery,
    useGetPettyCashByIdQuery,
    useGetPettyCashsByUsrSysQuery,
    useGetPettyCashsQuery,
    useGetRoleByIdQuery,
    useGetRolesQuery,
    useGetUsrsSysByOccupQuery,
    useGetUsrsSysQuery,
    useGetUsrSysByIdQuery,
    useGetVoucherByIdQuery,
    useGetVouchersByPettyCashQuery,
    useGetVouchersQuery,
    useGetWaterSourcesByJuntaQuery,
    useGetWaterSourcesQuery,
    useGetZoneByIdQuery,
    useGetZonesByJuntaQuery,
    useGetZonesQuery,
} = storeApi