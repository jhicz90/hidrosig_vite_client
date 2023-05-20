import { createSlice } from '@reduxjs/toolkit'
export const collectSlice = createSlice({
    name: 'collect',
    initialState: {
        search: '',
        typeSearch: 'usr',// usr || prp
        tabActive: 'search',
        listSearched: [],
        listSearchedFav: []// [{ id: '641370225b9141556de5b861', title: 'José Hans', typeSearch:'usr', navOption:'', prpId: null, campId: null}]
    },
    reducers: {
        setSearch: (state, { payload }) => {
            state.search = payload
        },
        setTypeSearch: (state, { payload }) => {
            state.typeSearch = payload
        },
        setListSearched: (state, { payload }) => {
            state.listSearched = payload
        },
        setListSearchedFav: (state, { payload }) => {
            state.listSearchedFav = payload
        },
        addToSearched: (state, { payload }) => {
            state.listSearched = [...payload, ...state.listSearched].filter((v, i, a) => a.findIndex(v2 => (v2.id === v.id)) === i)
        },
        addSearched: (state, { payload }) => {
            state.listSearched = state.listSearched.find(ls => ls.id === payload.id) ? [...state.listSearched] : [...state.listSearched, payload]
        },
        deleteSearchedById: (state, { payload }) => {
            state.listSearched = state.listSearched.filter(ls => ls.id !== payload)
        },
        clearSearched: (state) => {
            state.listSearched = []
        },
        setActiveTab: (state, { payload }) => {
            state.tabActive = payload
        },
        setActivePrpIdInUsrNav: (state, { payload }) => {
            const { id, prpId } = payload

            state.listSearched = state.listSearched.map(ls => {
                if (ls.id === id) {
                    return {
                        ...ls,
                        navOption: 'debt',
                        campId: null,
                        prpId,
                    }
                }
            })
        },
        setActiveCmpIdInUsrNav: (state, { payload }) => {
            const { id, campId } = payload

            state.listSearched = state.listSearched.map(ls => {
                if (ls.id === id) {
                    return {
                        ...ls,
                        campId
                    }
                }
            })
        },
        setOptionOfIdNav: (state, { payload }) => {
            const { id, navOption } = payload

            state.listSearched = state.listSearched.map(ls => {
                if (ls.id === id) {
                    return {
                        ...ls,
                        navOption
                    }
                }
            })
        },
    }
});

export const {
    addSearched,
    addToSearched,
    clearSearched,
    deleteSearchedById,
    setActiveCmpIdInUsrNav,
    setActivePrpIdInUsrNav,
    setActiveTab,
    setListSearched,
    setListSearchedFav,
    setOptionOfIdNav,
    setSearch,
    setTypeSearch,
} = collectSlice.actions