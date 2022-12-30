import { createSlice } from '@reduxjs/toolkit'
export const sectionSlice = createSlice({
    name: 'section',
    initialState: {
        isSaving: false,
        isSavingNew: false,
        active: null,
        activeNew: null,
    },
    reducers: {
        addNewSection: (state) => {
            state.activeNew = null
            state.isSavingNew = true
        },
        setActiveNewSection: (state, { payload }) => {
            state.activeNew = payload
        },
        editActiveNewSection: (state, { payload }) => {
            state.activeNew = { ...state.activeNew, ...payload }
        },
        setActiveSection: (state, { payload }) => {
            state.active = payload
        },
        editActiveSection: (state, { payload }) => {
            state.active = { ...state.active, ...payload }
        },
        setSavingSection: (state, { payload }) => {
            state.isSaving = payload
        },
        setSavingNewSection: (state, { payload }) => {
            state.isSavingNew = payload
        },
    }
});

export const {
    addNewSection,
    editActiveNewSection,
    editActiveSection,
    setActiveNewSection,
    setActiveSection,
    setSavingSection,
    setSavingNewSection,
} = sectionSlice.actions