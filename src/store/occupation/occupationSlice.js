import { createSlice } from '@reduxjs/toolkit'
export const occupationSlice = createSlice({
    name: 'occupation',
    initialState: {
        isSaving: false,
        isSavingNew: false,
        active: null,
        activeNew: null,
    },
    reducers: {
        addNewOccupation: (state) => {
            state.activeNew = null
            state.isSavingNew = true
        },
        setActiveNewOccupation: (state, action) => {
            state.activeNew = action.payload
        },
        editActiveNewOccupation: (state, action) => {
            state.activeNew = { ...state.activeNew, ...action.payload }
        },
        setActiveOccupation: (state, action) => {
            state.active = action.payload
        },
        editActiveOccupation: (state, action) => {
            state.active = { ...state.active, ...action.payload }
        },
        setSaving: (state, action) => {
            state.isSaving = action.payload
        },
        setSavingNew: (state, action) => {
            state.isSavingNew = action.payload
        },
    }
});

export const {
    addNewOccupation,
    editActiveNewOccupation,
    editActiveOccupation,
    setActiveNewOccupation,
    setActiveOccupation,
    setSaving,
    setSavingNew,
} = occupationSlice.actions