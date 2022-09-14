import { createSlice } from '@reduxjs/toolkit'
export const usersysSlice = createSlice({
    name: 'usersys',
    initialState: {
        isSaving: false,
        active: null,
        list: [],
    },
    reducers: {
        addNewUserSys: (state) => {
            state.active = null
            state.isSaving = true
        },
        setActiveUserSys: (state, action) => {
            state.active = action.payload
        },
        editActiveUserSys: (state, action) => {
            state.active = { ...state.active, ...action.payload }
        },
        setListUserSys: (state, action) => {
            state.list = [...action.payload]
        },
        setSaving: (state, action) => {
            state.isSaving = action.payload
        },
    }
});

export const {
    addNewUserSys,
    editActiveUserSys,
    setActiveUserSys,
    setListUserSys,
    setSaving,
} = usersysSlice.actions