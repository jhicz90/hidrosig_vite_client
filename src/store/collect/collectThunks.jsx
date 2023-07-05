import { fetchByToken } from '../../helpers'
import { storeApi } from '../storeApi'

export const collectApi = storeApi.injectEndpoints({
    endpoints: (builder) => ({
        // COLLECT
        generateDebt: builder.mutation({
            query: (newCollect) => ({
                url: `collect/gendebt`,
                method: 'post',
                data: newCollect
            }),
            invalidatesTags: ['Cllc']
        }),
        addFarmCropInCollectByYearRate: builder.mutation({
            query: ({ yearRate, farmCrop }) => ({
                url: `collect/add/farm_crop/${yearRate}`,
                method: 'post',
                data: farmCrop
            }),
            invalidatesTags: ['Cllc']
        }),
        updateFarmCropInCollect: builder.mutation({
            query: ({ collect, farmCrop }) => ({
                url: `collect/update/farm_crop/${collect}`,
                method: 'put',
                data: farmCrop
            }),
            invalidatesTags: ['Cllc']
        }),
        deleteFarmCropInCollect: builder.mutation({
            query: ({ collect, farmCrop }) => ({
                url: `collect/delete/farm_crop/${collect}/${farmCrop}`,
                method: 'delete',
            }),
            invalidatesTags: ['Cllc']
        }),
        getListYearDebtByFarm: builder.query({
            query: (farm) => ({
                url: `collect/list/yeardebt/${farm}`
            }),
            transformResponse: (response, meta, arg) => response.docs,
            providesTags: ['Cllc']
        }),
        getPayResumeByCampaignAndInputIrrig: builder.query({
            query: ({ campaign, inputIrrig }) => ({
                url: `collect/list/yeardebt/resume/${campaign}/${inputIrrig}`
            }),
            transformResponse: (response, meta, arg) => response.docs,
            providesTags: ['Cllc']
        }),
        getListCollectByFarm: builder.query({
            query: ({ farm, search = '' }) => ({
                url: `collect/search_by_farm/${farm}`,
                params: {
                    search
                }
            }),
            transformResponse: (response, meta, arg) => response.docs,
            providesTags: ['Orgz', 'Trrt']
        }),
        getListCropByCampaignAndInputIrrig: builder.query({
            query: ({ campaign, inputIrrig }) => ({
                url: `collect/list/crop/${campaign}/${inputIrrig}`
            }),
            transformResponse: (response, meta, arg) => response.docs,
            providesTags: ['Crp', 'Cllc']
        }),
        getListCollectByUsr: builder.query({
            query: (search) => ({
                url: `collect/usr/search`,
                params: {
                    search
                }
            }),
            transformResponse: (response, meta, arg) => response.docs,
            providesTags: ['Cllc', 'UsrFrm']
        }),
        getListCollectByPrp: builder.query({
            query: (search) => ({
                url: `collect/prp/search`,
                params: {
                    search
                }
            }),
            transformResponse: (response, meta, arg) => response.docs,
            providesTags: ['Cllc', 'Frm']
        }),
        // COLLECT
    })
})

export const {
    useAddFarmCropInCollectByYearRateMutation,
    useDeleteFarmCropInCollectMutation,
    useGenerateDebtMutation,
    useGetListCollectByFarmQuery,
    useGetListCollectByPrpQuery,
    useGetListCollectByUsrQuery,
    useGetListCropByCampaignAndInputIrrigQuery,
    useGetListYearDebtByFarmQuery,
    useGetPayResumeByCampaignAndInputIrrigQuery,
    useUpdateFarmCropInCollectMutation,
} = collectApi

export const searchCollectByFarm = async (farm, search = '') => {
    const resp = await fetchByToken({
        endpoint: `collect/search_by_farm/${farm}`,
        params: { search }
    })

    if (resp.ok) {
        return resp.docs
    } else {
        return []
    }
}