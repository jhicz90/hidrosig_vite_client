import { createSlice } from '@reduxjs/toolkit'
export const blockSlice = createSlice({
    name: 'block',
    initialState: {
        isSaving: false,
        isSavingNew: false,
        active: null,
        activeNew: null,
    },
    reducers: {
        addNewBlock: (state) => {
            state.activeNew = null
            state.isSavingNew = true
        },
        setActiveNewBlock: (state, action) => {
            state.activeNew = action.payload
        },
        editActiveNewBlock: (state, action) => {
            state.activeNew = { ...state.activeNew, ...action.payload }
        },
        setActiveBlock: (state, action) => {
            state.active = action.payload
        },
        editActiveBlock: (state, action) => {
            state.active = { ...state.active, ...action.payload }
        },
        setSavingBlock: (state, action) => {
            state.isSaving = action.payload
        },
        setSavingNewBlock: (state, action) => {
            state.isSavingNew = action.payload
        },
    }
});

export const {
    addNewBlock,
    editActiveNewBlock,
    editActiveBlock,
    setActiveNewBlock,
    setActiveBlock,
    setSavingBlock,
    setSavingNewBlock,
} = blockSlice.actions