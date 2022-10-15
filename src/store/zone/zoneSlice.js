import { createSlice } from '@reduxjs/toolkit'
export const zoneSlice = createSlice({
    name: 'zone',
    initialState: {
        isSaving: false,
        isSavingNew: false,
        active: null,
        activeNew: null,
    },
    reducers: {
        addNewZone: (state) => {
            state.activeNew = null
            state.isSavingNew = true
        },
        setActiveNewZone: (state, action) => {
            state.activeNew = action.payload
        },
        editActiveNewZone: (state, action) => {
            state.activeNew = { ...state.activeNew, ...action.payload }
        },
        setActiveZone: (state, action) => {
            state.active = action.payload
        },
        editActiveZone: (state, action) => {
            state.active = { ...state.active, ...action.payload }
        },
        setSavingZone: (state, action) => {
            state.isSaving = action.payload
        },
        setSavingNewZone: (state, action) => {
            state.isSavingNew = action.payload
        },
    }
});

export const {
    addNewZone,
    editActiveNewZone,
    editActiveZone,
    setActiveNewZone,
    setActiveZone,
    setSavingZone,
    setSavingNewZone,
} = zoneSlice.actions