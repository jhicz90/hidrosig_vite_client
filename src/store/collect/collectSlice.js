import { createSlice } from '@reduxjs/toolkit'
export const collectSlice = createSlice({
    name: 'collect',
    initialState: {
        search: '',
        typeSearch: 'usr',// usr || prp
        listSearched: []// [{ id: '641370225b9141556de5b861', title: 'José Hans', typeSearch:'usr'}]
    },
    reducers: {
        setSearch: (state, { payload }) => {
            state.search = payload
        },
        setTypeSearch: (state, { payload }) => {
            state.typeSearch = payload
        },
        addSearched: (state, { payload }) => {
            state.listSearched = state.listSearched.find(ls => ls.id === payload.id) ? [...state.listSearched] : [...state.listSearched, payload]
        },
        deleteSearchedById: (state, { payload }) => {
            state.listSearched = state.listSearched.filter(ls => ls.id !== payload)
        },
        clearSearched: (state) => {
            state.listSearched = []
        }
    }
});

export const {
    addSearched,
    clearSearched,
    deleteSearchedById,
    setSearch,
    setTypeSearch,
} = collectSlice.actions