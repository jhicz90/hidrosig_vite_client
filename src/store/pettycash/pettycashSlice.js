import { createSlice } from '@reduxjs/toolkit'
export const pettycashSlice = createSlice({
    name: 'pettycash',
    initialState: {
        isSaving: false,
        isSavingNew: false,
        active: null,
        activeNew: null,
    },
    reducers: {
        addNewPettycash: (state) => {
            state.activeNew = null
            state.isSavingNew = true
        },
        setActiveNewPettycash: (state, action) => {
            state.activeNew = action.payload
        },
        editActiveNewPettycash: (state, action) => {
            state.activeNew = { ...state.activeNew, ...action.payload }
        },
        setActivePettycash: (state, action) => {
            state.active = action.payload
        },
        editActivePettycash: (state, action) => {
            state.active = { ...state.active, ...action.payload }
        },
        setSavingPettycash: (state, action) => {
            state.isSaving = action.payload
        },
        setSavingNewPettycash: (state, action) => {
            state.isSavingNew = action.payload
        },
    }
});

export const {
    addNewPettycash,
    editActiveNewPettycash,
    editActivePettycash,
    setActiveNewPettycash,
    setActivePettycash,
    setSavingPettycash,
    setSavingNewPettycash,
} = pettycashSlice.actions