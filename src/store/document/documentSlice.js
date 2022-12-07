import { createSlice } from '@reduxjs/toolkit'
export const documentSlice = createSlice({
    name: 'document',
    initialState: {
        isSaving: false,
        isSavingNew: false,
        active: null,
        activeNew: null,
    },
    reducers: {
        addNewDocument: (state) => {
            state.activeNew = null
            state.isSavingNew = true
        },
        setActiveNewDocument: (state, { payload }) => {
            state.activeNew = payload
        },
        editActiveNewDocument: (state, { payload }) => {
            state.activeNew = { ...state.activeNew, ...payload }
        },
        setActiveDocument: (state, { payload }) => {
            state.active = payload
        },
        editActiveDocument: (state, { payload }) => {
            state.active = { ...state.active, ...payload }
        },
        setSavingDocument: (state, { payload }) => {
            state.isSaving = payload
        },
        setSavingNewDocument: (state, { payload }) => {
            state.isSavingNew = payload
        },
    }
});

export const {
    addNewDocument,
    setActiveNewDocument,
    editActiveNewDocument,
    setActiveDocument,
    editActiveDocument,
    setSavingDocument,
    setSavingNewDocument,
} = documentSlice.actions