import { createSlice } from '@reduxjs/toolkit'
export const roleSlice = createSlice({
    name: 'role',
    initialState: {
        isSaving: false,
        isSavingNew: false,
        active: null,
        activeNew: null,
    },
    reducers: {
        addNewRole: (state) => {
            state.activeNew = null
            state.isSavingNew = true
        },
        setActiveNewRole: (state, action) => {
            state.activeNew = action.payload
        },
        editActiveNewRole: (state, action) => {
            state.activeNew = { ...state.activeNew, ...action.payload }
        },
        setActiveRole: (state, action) => {
            state.active = action.payload
        },
        editActiveRole: (state, action) => {
            state.active = { ...state.active, ...action.payload }
        },
        setSavingRole: (state, action) => {
            state.isSaving = action.payload
        },
        setSavingNewRole: (state, action) => {
            state.isSavingNew = action.payload
        },
    }
});

export const {
    addNewRole,
    editActiveNewRole,
    editActiveRole,
    setActiveNewRole,
    setActiveRole,
    setSavingRole,
    setSavingNewRole,
} = roleSlice.actions