import { createSlice } from '@reduxjs/toolkit'
export const committeeSlice = createSlice({
    name: 'committee',
    initialState: {
        isSaving: false,
        isSavingNew: false,
        active: null,
        activeNew: null,
    },
    reducers: {
        addNewCommittee: (state) => {
            state.activeNew = null
            state.isSavingNew = true
        },
        setActiveNewCommittee: (state, action) => {
            state.activeNew = action.payload
        },
        editActiveNewCommittee: (state, action) => {
            state.activeNew = { ...state.activeNew, ...action.payload }
        },
        setActiveCommittee: (state, action) => {
            state.active = action.payload
        },
        editActiveCommittee: (state, action) => {
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
    addNewCommittee,
    editActiveNewCommittee,
    editActiveCommittee,
    setActiveNewCommittee,
    setActiveCommittee,
    setSaving,
    setSavingNew,
} = committeeSlice.actions