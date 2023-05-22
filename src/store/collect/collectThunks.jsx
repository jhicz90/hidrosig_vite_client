import { fetchByToken } from '../../helpers'
import { onAddToSearched, onSetListSearchedFav } from './collectSlice'
import { storeApi } from '../storeApi'

export const collectApi = storeApi.injectEndpoints({
    endpoints: (builder) => ({
        // COLLECT
        generateDebt: builder.mutation({
            query: (newBlock) => ({
                url: `collect/gendebt`,
                method: 'post',
                data: newBlock
            }),
            invalidatesTags: ['Cllc']
        }),
        addFarmCropInCollectByYearRate: builder.mutation({
            query: ({ campaign, farmCrop }) => ({
                url: `collect/add/farm_crop/${campaign}`,
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
    useGenerateDebtMutation,
    useGetListCollectByFarmQuery,
    useGetListCollectByPrpQuery,
    useGetListCollectByUsrQuery,
    useGetListCropByCampaignAndInputIrrigQuery,
    useGetListYearDebtByFarmQuery,
    useUpdateFarmCropInCollectMutation,
    useDeleteFarmCropInCollectMutation,
    useAddFarmCropInCollectByYearRateMutation,
} = collectApi

export const onAddFav = (payload) => {
    return async (dispatch, getState) => {
        if (!localStorage.getItem('favSearched')) {
            localStorage.setItem('favSearched', JSON.stringify([]))
        }

        const newFav = getState().collect.listSearched.find(ls => ls.id === payload)

        if (!!newFav) {
            const favSearched = [...JSON.parse(localStorage.getItem('favSearched') || '[]'), newFav]
            localStorage.setItem('favSearched', JSON.stringify(favSearched))
            dispatch(onSetListSearchedFav(favSearched))
        }
    }
}

export const onDeleteFavSaved = (payload) => {
    return async (dispatch) => {
        if (!localStorage.getItem('favSearched')) {
            localStorage.setItem('favSearched', JSON.stringify([]))
        }

        const favSearched = [...JSON.parse(localStorage.getItem('favSearched')).filter(fav => fav.id !== payload)]
        localStorage.setItem('favSearched', JSON.stringify(favSearched))
        dispatch(onSetListSearchedFav(favSearched))
    }
}

export const verifySearchedFavById = (payload) => {
    if (!localStorage.getItem('favSearched')) {
        localStorage.setItem('favSearched', JSON.stringify([]))
    }

    if (JSON.parse(localStorage.getItem('favSearched')).find(fav => fav.id === payload)) {
        return true
    } else {
        return false
    }
}

export const onSetFavSaved = () => {
    return async (dispatch) => {
        if (!localStorage.getItem('favSearched')) {
            localStorage.setItem('favSearched', JSON.stringify([]))
        }

        dispatch(onAddToSearched(JSON.parse(localStorage.getItem('favSearched')) || []))
        dispatch(onSetListSearchedFav(JSON.parse(localStorage.getItem('favSearched')) || []))
    }
}

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