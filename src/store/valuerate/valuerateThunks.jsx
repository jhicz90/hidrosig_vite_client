import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { fetchByToken } from '../../helpers'
import { storeApi } from '../storeApi'

const SwalReact = withReactContent(Swal)

export const valuerateApi = storeApi.injectEndpoints({
    endpoints: (builder) => ({
        // VALUERATE
        newValueRate: builder.query({
            query: () => ({
                url: `valuerate/create/new`,
            }),
            transformResponse: (response, meta, arg) => response.valuerate
        }),
        addValueRate: builder.mutation({
            query: (newValueRate) => ({
                url: `valuerate/create/new`,
                method: 'post',
                data: newValueRate
            }),
            invalidatesTags: ['VlRt']
        }),
        addValueRates: builder.mutation({
            query: (newValueRates) => ({
                url: `valuerate/edits`,
                method: 'post',
                data: newValueRates
            }),
            invalidatesTags: ['VlRt']
        }),
        getListValueRate: builder.query({
            query: (search) => ({
                url: `valuerate/list`,
                params: {
                    search
                }
            }),
            transformResponse: (response, meta, arg) => response.docs,
            providesTags: ['VlRt']
        }),
        getListValueRateByJunta: builder.query({
            query: ({ junta, search }) => ({
                url: `valuerate/search_by_junta/${junta}`,
                params: {
                    search
                }
            }),
            transformResponse: (response, meta, arg) => response.docs,
            providesTags: ['VlRt']
        }),
        getListValueRateByYearRate: builder.query({
            query: ({ yearrate, search }) => ({
                url: `valuerate/search_by_yearrate/${yearrate}`,
                params: {
                    search
                }
            }),
            transformResponse: (response, meta, arg) => response.docs,
            providesTags: ['VlRt']
        }),
        getValueRateById: builder.query({
            query: (id) => ({
                url: `valuerate/edit/${id}`
            }),
            transformResponse: (response, meta, arg) => response.valuerate,
            providesTags: ['VlRt']
        }),
        getValueRateByJuntaAndComm: builder.query({
            query: ({ yearrate, junta, comm }) => ({
                url: `valuerate/edit/yrjuco/yr/${yearrate}/junta/${junta}/comm/${comm}`,
                alert: false
            }),
            transformResponse: (response, meta, arg) => response.valuerates,
            providesTags: ['VlRt']
        }),
        getValueRateByYrAndIrr: builder.query({
            query: ({ yearrate, inputIrrigation }) => ({
                url: `valuerate/edit/yrir/yr/${yearrate}/irr/${inputIrrigation}`,
                alert: false
            }),
            transformResponse: (response, meta, arg) => response.valuerate,
            providesTags: ['VlRt']
        }),
        updateValueRateById: builder.mutation({
            query: ({ id, valuerate }) => ({
                url: `valuerate/edit/${id}`,
                method: 'put',
                data: valuerate
            }),
            invalidatesTags: ['VlRt']
        }),
        deleteValueRateById: builder.mutation({
            query: (id) => ({
                url: `valuerate/delete/${id}`,
                method: 'delete'
            }),
            invalidatesTags: ['VlRt']
        })
        // VALUERATE
    })
})

export const {
    useAddValueRateMutation,
    useAddValueRatesMutation,
    useDeleteValueRateByIdMutation,
    useGetListValueRateByJuntaQuery,
    useGetListValueRateByYearRateQuery,
    useGetListValueRateQuery,
    useGetValueRateByIdQuery,
    useGetValueRateByJuntaAndCommQuery,
    useLazyGetValueRateByJuntaAndCommQuery,
    useNewValueRateQuery,
    useUpdateValueRateByIdMutation,
    useGetValueRateByYrAndIrrQuery,
} = valuerateApi

export const searchValueRateByJuntaAndComm = async (junta, comm) => {
    const resp = await fetchByToken({
        endpoint: `valuerate/search_by_junta_comm/${junta}/${comm}`,
    })

    if (resp.ok) {
        return resp.docs
    } else {
        return []
    }
}