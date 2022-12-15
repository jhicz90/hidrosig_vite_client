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
        setActiveNewStructure: (state, { payload }) => {
            state.activeNew = payload
        },
        editActiveNewStructure: (state, { payload }) => {
            state.activeNew = { ...state.activeNew, ...payload }
        },
        setActiveStructure: (state, { payload }) => {
            state.active = payload
        },
        editActiveStructure: (state, { payload }) => {
            state.active = { ...state.active, ...payload }
        },
        setSavingStructure: (state, { payload }) => {
            state.isSaving = payload
        },
        setSavingNewStructure: (state, { payload }) => {
            state.isSavingNew = payload
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