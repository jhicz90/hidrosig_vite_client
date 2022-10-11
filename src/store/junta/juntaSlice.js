import { createSlice } from '@reduxjs/toolkit'
export const juntaSlice = createSlice({
    name: 'junta',
    initialState: {
        isSaving: false,
        isSavingNew: false,
        active: null,
        activeNew: null,
    },
    reducers: {
        addNewJunta: (state) => {
            state.activeNew = null
            state.isSavingNew = true
        },
        setActiveNewJunta: (state, action) => {
            state.activeNew = action.payload
        },
        editActiveNewJunta: (state, action) => {
            state.activeNew = { ...state.activeNew, ...action.payload }
        },
        setActiveJunta: (state, action) => {
            state.active = action.payload
        },
        editActiveJunta: (state, action) => {
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
    addNewJunta,
    editActiveNewJunta,
    editActiveJunta,
    setActiveNewJunta,
    setActiveJunta,
    setSaving,
    setSavingNew,
} = juntaSlice.actions