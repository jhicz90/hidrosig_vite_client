import { createSlice } from '@reduxjs/toolkit'
export const collectSlice = createSlice({
    name: 'collect',
    initialState: {
        search: '',
        typeSearch: 'usr',// usr || prp
        activeTab: 0,
        listSearched: [],
        listSearchedFav: []// [{ id: '641370225b9141556de5b861', title: 'José Hans', typeSearch:'usr', navOption:'', prpId: null, campId: null}]
    },
    reducers: {
        onSetSearch: (state, { payload }) => {
            state.search = payload
        },
        onSetTypeSearch: (state, { payload }) => {
            state.typeSearch = payload
        },
        onSetListSearched: (state, { payload }) => {
            state.listSearched = payload
        },
        onSetListSearchedFav: (state, { payload }) => {
            state.listSearchedFav = payload
        },
        onAddToSearched: (state, { payload }) => {
            state.listSearched = [...payload, ...state.listSearched].filter((v, i, a) => a.findIndex(v2 => (v2.id === v.id)) === i)
        },
        onAddSearched: (state, { payload }) => {
            state.listSearched = state.listSearched.find(ls => ls.id === payload.id) ? [...state.listSearched] : [...state.listSearched, payload]
            state.activeTab = state.listSearched.findIndex(ls => ls.id === payload.id) + 1 || 0
        },
        onDeleteSearchedById: (state, { payload }) => {
            state.listSearched = state.listSearched.filter(ls => ls.id !== payload)
        },
        onClearListSearched: (state) => {
            state.listSearched = []
        },
        onSetActiveTab: (state, { payload }) => {
            state.activeTab = payload
        },
        onSetActivePrpIdInUsrNav: (state, { payload }) => {
            const { id, prpActive } = payload

            state.listSearched = state.listSearched.map(ls => {
                if (ls.id === id) {
                    if (ls.prpActive === prpActive) {
                        return {
                            ...ls,
                            navOption: 'debt',
                            prpActive,
                        }
                    } else {
                        return {
                            ...ls,
                            navOption: 'debt',
                            prpActive,
                            campActive: {},
                        }
                    }
                } else {
                    return ls
                }
            })
        },
        onSetCmpActiveNav: (state, { payload }) => {
            const { id, campActive } = payload

            state.listSearched = state.listSearched.map(ls => {
                if (ls.id === id) {
                    return {
                        ...ls,
                        campActive,
                    }
                }else {
                    return ls
                }
            })
        },
        onSetOptionActiveNav: (state, { payload }) => {
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
    onAddSearched,
    onAddToSearched,
    onClearListSearched,
    onDeleteSearchedById,
    onSetActiveTab,
    onSetListSearched,
    onSetListSearchedFav,
    onSetSearch,
    onSetTypeSearch,
    onSetCmpActiveNav,
    onSetActivePrpIdInUsrNav,
    onSetOptionActiveNav,
} = collectSlice.actions