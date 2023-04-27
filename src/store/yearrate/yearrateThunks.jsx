import { fetchByToken } from '../../helpers'
import { storeApi } from '../storeApi'

export const yearrateApi = storeApi.injectEndpoints({
    endpoints: (builder) => ({
        // YEARRATE
        newYearRate: builder.query({
            query: () => ({
                url: `yearrate/create/new`,
            }),
            transformResponse: (response, meta, arg) => response.yearrate
        }),
        addYearRate: builder.mutation({
            query: (newYearRate) => ({
                url: `yearrate/create/new`,
                method: 'post',
                data: newYearRate
            }),
            invalidatesTags: ['YrRt']
        }),
        getListYearRate: builder.query({
            query: (search) => ({
                url: `yearrate/list`,
                params: {
                    search
                }
            }),
            transformResponse: (response, meta, arg) => response.docs,
            providesTags: ['YrRt']
        }),
        getListYearRateByJunta: builder.query({
            query: ({ junta, search }) => ({
                url: `yearrate/search_by_junta/${junta}`,
                params: {
                    search
                }
            }),
            transformResponse: (response, meta, arg) => response.docs,
            providesTags: ['YrRt']
        }),
        getYearRateById: builder.query({
            query: (id) => ({
                url: `yearrate/edit/${id}`
            }),
            transformResponse: (response, meta, arg) => response.yearrate,
            providesTags: ['YrRt']
        }),
        updateYearRateById: builder.mutation({
            query: ({ id, yearrate }) => ({
                url: `yearrate/edit/${id}`,
                method: 'put',
                data: yearrate
            }),
            invalidatesTags: ['YrRt']
        }),
        updateOpClYearRateById: builder.mutation({
            query: ({ id, openclose }) => ({
                url: `yearrate/${openclose}/${id}`,
                method: 'put'
            }),
            invalidatesTags: ['YrRt']
        }),
        deleteYearRateById: builder.mutation({
            query: (id) => ({
                url: `yearrate/delete/${id}`,
                method: 'delete'
            }),
            invalidatesTags: ['YrRt']
        })
        // YEARRATE
    })
})

export const {
    useAddYearRateMutation,
    useDeleteYearRateByIdMutation,
    useGetListYearRateByJuntaQuery,
    useGetListYearRateQuery,
    useGetYearRateByIdQuery,
    useNewYearRateQuery,
    useUpdateOpClYearRateByIdMutation,
    useUpdateYearRateByIdMutation,
} = yearrateApi

export const updateOpenedById = (id) => {
    return async (dispatch) => {

        const resp = await fetchByToken({
            endpoint: `yearrate/opened/${id}`,
            method: 'PUT'
        })

        if (resp.ok) {
            dispatch(storeApi.util.invalidateTags(['YrRt']))
        }
    }
}

export const updateClosedById = (id) => {
    return async (dispatch) => {

        const resp = await fetchByToken({
            endpoint: `yearrate/closed/${id}`,
            method: 'PUT'
        })

        if (resp.ok) {
            dispatch(storeApi.util.invalidateTags(['YrRt']))
        }
    }
}