import { createSlice } from '@reduxjs/toolkit'
export const structureSlice = createSlice({
    name: 'structure',
    initialState: {
        isSaving: false,
        isSavingNew: false,
        active: null,
        activeNew: null,
    },
    reducers: {
        addNewStructure: (state) => {
            state.activeNew = null
            state.isSavingNew = true
        },
        setActiveNewStructure: (state, action) => {
            state.activeNew = action.payload
        },
        editActiveNewStructure: (state, action) => {
            state.activeNew = { ...state.activeNew, ...action.payload }
        },
        setActiveStructure: (state, action) => {
            state.active = action.payload
        },
        editActiveStructure: (state, action) => {
            state.active = { ...state.active, ...action.payload }
        },
        setSavingStructure: (state, action) => {
            state.isSaving = action.payload
        },
        setSavingNewStructure: (state, action) => {
            state.isSavingNew = action.payload
        },
    }
});

export const {
    addNewStructure,
    editActiveNewStructure,
    editActiveStructure,
    setActiveNewStructure,
    setActiveStructure,
    setSavingStructure,
    setSavingNewStructure,
} = structureSlice.actions