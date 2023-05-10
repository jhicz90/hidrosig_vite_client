import { storeApi } from '../storeApi'
import { setListSearched, setListSearchedFav } from './collectSlice'

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
        updateCollectAddFarmCrop: builder.mutation({
            query: (collect) => ({
                url: `collect/add/farm_crop`,
                method: 'put',
                data: collect
            }),
            invalidatesTags: ['Cllc']
        }),
        getListDebtByFarm: builder.query({
            query: (farm) => ({
                url: `collect/list/debt/${farm}`
            }),
            transformResponse: (response, meta, arg) => response.docs,
            providesTags: ['Cllc']
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
    useGetListCollectByPrpQuery,
    useGetListCollectByUsrQuery,
    useGetListDebtByFarmQuery,
    useUpdateCollectAddFarmCropMutation,
} = collectApi

export const addSearchedFav = (payload) => {
    return async (dispatch) => {
        if (!localStorage.getItem('favSearched')) {
            localStorage.setItem('favSearched', JSON.stringify([]))
        }

        const favSearched = [...JSON.parse(localStorage.getItem('favSearched') || '[]'), payload]
        localStorage.setItem('favSearched', JSON.stringify(favSearched))
        dispatch(setListSearchedFav(favSearched))
    }
}

export const deleteSearchedFav = (payload) => {
    return async (dispatch) => {
        if (!localStorage.getItem('favSearched')) {
            localStorage.setItem('favSearched', JSON.stringify([]))
        }

        const favSearched = [...JSON.parse(localStorage.getItem('favSearched')).filter(fav => fav.id !== payload)]
        localStorage.setItem('favSearched', JSON.stringify(favSearched))
        dispatch(setListSearchedFav(favSearched))
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

export const addingFavSaved = () => {
    return async (dispatch) => {
        if (!localStorage.getItem('favSearched')) {
            localStorage.setItem('favSearched', JSON.stringify([]))
        }

        dispatch(setListSearched(JSON.parse(localStorage.getItem('favSearched')) || []))
        dispatch(setListSearchedFav(JSON.parse(localStorage.getItem('favSearched')) || []))
    }
}