import { createSlice } from '@reduxjs/toolkit'
export const usersysSlice = createSlice({
    name: 'usersys',
    initialState: {
        isSaving: false,
        isSavingNew: false,
        active: null,
        activeNew: null,
        list: [],
    },
    reducers: {
        addNewUserSys: (state) => {
            state.activeNew = null
            state.isSavingNew = true
        },
        setActiveNewUserSys: (state, action) => {
            state.activeNew = action.payload
        },
        editActiveNewUserSys: (state, action) => {
            state.activeNew = { ...state.activeNew, ...action.payload }
        },
        setActiveUserSys: (state, action) => {
            state.active = action.payload
        },
        editActiveUserSys: (state, action) => {
            state.active = { ...state.active, ...action.payload }
        },
        setSaving: (state, action) => {
            state.isSaving = action.payload
        },
        setSavingNew: (state, action) => {
            state.isSavingNew = action.payload
        },
        setListUserSys: (state, action) => {
            state.list = [...action.payload]
        },
    }
});

export const {
    addNewUserSys,
    editActiveNewUserSys,
    editActiveUserSys,
    setActiveNewUserSys,
    setActiveUserSys,
    setListUserSys,
    setSaving,
    setSavingNew,
} = usersysSlice.actions