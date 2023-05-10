import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { fetchByToken } from '../../helpers'
import { storeApi } from '../storeApi'

const SwalReact = withReactContent(Swal)

export const irrigationsystemApi = storeApi.injectEndpoints({
    endpoints: (builder) => ({
        // IRRIGATION SYSTEM
        newIrrigSystem: builder.query({
            query: () => ({
                url: `irrigation_system/create/new`,
            }),
            transformResponse: (response, meta, arg) => response.irrigationSystem
        }),
        addIrrigSystem: builder.mutation({
            query: (newIrrigSys) => ({
                url: `irrigation_system/create/new`,
                method: 'post',
                data: newIrrigSys
            }),
            invalidatesTags: ['IrrSys']
        }),
        getListIrrigSystem: builder.query({
            query: (search) => ({
                url: `irrigation_system/list`,
                params: {
                    search
                }
            }),
            transformResponse: (response, meta, arg) => response.docs,
            providesTags: ['IrrSys']
        }),
        getListIrrigSystemByJunta: builder.query({
            query: ({ junta, search }) => ({
                url: `irrigation_system/search_by_junta/${junta}`,
                params: {
                    search
                }
            }),
            transformResponse: (response, meta, arg) => response.docs,
            providesTags: ['IrrSys']
        }),
        getIrrigSystemById: builder.query({
            query: (id) => ({
                url: `irrigation_system/edit/${id}`
            }),
            transformResponse: (response, meta, arg) => response.irrigationSystem,
            providesTags: ['IrrSys']
        }),
        updateIrrigSystemById: builder.mutation({
            query: ({ id, irrigSys }) => ({
                url: `irrigation_system/edit/${id}`,
                method: 'put',
                data: irrigSys
            }),
            invalidatesTags: ['IrrSys']
        }),
        deleteIrrigSystemById: builder.mutation({
            query: (id) => ({
                url: `irrigation_system/delete/${id}`,
                method: 'delete'
            }),
            invalidatesTags: ['IrrSys']
        }),
        // IRRIGATION SYSTEM
    })
})

export const {
    useAddIrrigSystemMutation,
    useDeleteIrrigSystemByIdMutation,
    useGetIrrigSystemByIdQuery,
    useGetListIrrigSystemByJuntaQuery,
    useGetListIrrigSystemQuery,
    useLazyGetListIrrigSystemByJuntaQuery,
    useNewIrrigSystemQuery,
    useUpdateIrrigSystemByIdMutation,
} = irrigationsystemApi

export const searchIrrigationSystem = async (search) => {
    const resp = await fetchByToken({
        endpoint: 'irrigation_system/search',
        params: { search }
    })

    if (resp.ok) {
        return resp.docs
    } else {
        return []
    }
}

export const searchIrrigationSystemByJunta = async (junta, search) => {
    const resp = await fetchByToken({
        endpoint: `irrigation_system/search_by_junta/${junta}`,
        params: { search }
    })

    if (resp.ok) {
        return resp.docs
    } else {
        return []
    }
}