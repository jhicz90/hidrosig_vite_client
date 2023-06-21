import { fetchByToken } from '../../helpers'
import { storeApi } from '../storeApi'

export const consumptionApi = storeApi.injectEndpoints({
    endpoints: (builder) => ({
        // CONSUMPTION
        getListVolByCmpAndIrrAndFrp: builder.query({
            query: ({ campaign, inputIrrig, farmCrop }) => ({
                url: `consumption_management/list/byday/${campaign}/${inputIrrig}/${farmCrop}`
            }),
            transformResponse: (response, meta, arg) => response.docs,
            providesTags: ['Crp', 'Cllc']
        }),
        updateVolByConsumption: builder.mutation({
            query: ({ consumption, volume }) => ({
                url: `consumption_management/edit/volume/${consumption}`,
                method: 'put',
                data: volume
            }),
            invalidatesTags: ['Crp', 'Frm', 'Cllc']
        }),
        addVolByConsumption: builder.mutation({
            query: ({ collect, volume }) => ({
                url: `consumption_management/edit/volume/${collect}`,
                method: 'post',
                data: volume
            }),
            invalidatesTags: ['Crp', 'Frm', 'Cllc']
        }),
        // CONSUMPTION
    })
})

export const {
    useAddVolByConsumptionMutation,
    useGetListVolByCmpAndIrrAndFrpQuery,
    useLazyGetListVolByCmpAndIrrAndFrpQuery,
    useUpdateVolByConsumptionMutation,
} = consumptionApi