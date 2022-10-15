import { createSlice } from '@reduxjs/toolkit'
export const watersourceSlice = createSlice({
    name: 'watersource',
    initialState: {
        isSaving: false,
        isSavingNew: false,
        active: null,
        activeNew: null,
    },
    reducers: {
        addNewWaterSource: (state) => {
            state.activeNew = null
            state.isSavingNew = true
        },
        setActiveNewWaterSource: (state, action) => {
            state.activeNew = action.payload
        },
        editActiveNewWaterSource: (state, action) => {
            state.activeNew = { ...state.activeNew, ...action.payload }
        },
        setActiveWaterSource: (state, action) => {
            state.active = action.payload
        },
        editActiveWaterSource: (state, action) => {
            state.active = { ...state.active, ...action.payload }
        },
        setSavingWaterSource: (state, action) => {
            state.isSaving = action.payload
        },
        setSavingNewWaterSource: (state, action) => {
            state.isSavingNew = action.payload
        },
    }
});

export const {
    addNewWaterSource,
    editActiveNewWaterSource,
    editActiveWaterSource,
    setActiveNewWaterSource,
    setActiveWaterSource,
    setSavingWaterSource,
    setSavingNewWaterSource,
} = watersourceSlice.actions