import { storeApi } from '../storeApi'

export const collectApi = storeApi.injectEndpoints({
    endpoints: (builder) => ({
        // COLLECT
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
    useGetListCollectByUsrQuery,
    useGetListCollectByPrpQuery,
} = collectApi

export const addSearchedFav = (payload) => {
    if (!localStorage.getItem('favSearched')) {
        localStorage.setItem('favSearched', JSON.stringify([]))
    }

    localStorage.setItem('favSearched', JSON.stringify([...JSON.parse(localStorage.getItem('favSearched') || []), payload]))
}

export const deleteSearchedFav = (payload) => {
    if (!localStorage.getItem('favSearched')) {
        localStorage.setItem('favSearched', JSON.stringify([]))
    }

    localStorage.setItem('favSearched', JSON.stringify([...JSON.parse(localStorage.getItem('favSearched')).filter(fav => fav.id !== payload)]))
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