import { createSlice } from '@reduxjs/toolkit'
export const userfarmSlice = createSlice({
    name: 'userfarm',
    initialState: {
        isSaving: false,
        isSavingNew: false,
        active: null,
        activeNew: null,
    },
    reducers: {
        addNewUserFarm: (state) => {
            state.activeNew = null
            state.isSavingNew = true
        },
        setActiveNewUserFarm: (state, { payload }) => {
            state.activeNew = payload
        },
        editActiveNewUserFarm: (state, { payload }) => {
            state.activeNew = { ...state.activeNew, ...payload }
        },
        setActiveUserFarm: (state, { payload }) => {
            state.active = payload
        },
        editActiveUserFarm: (state, { payload }) => {
            state.active = { ...state.active, ...payload }
        },
        setSavingUserFarm: (state, { payload }) => {
            state.isSaving = payload
        },
        setSavingNewUserFarm: (state, { payload }) => {
            state.isSavingNew = payload
        },
    }
});

export const {
    addNewUserFarm,
    editActiveNewUserFarm,
    editActiveUserFarm,
    setActiveNewUserFarm,
    setActiveUserFarm,
    setSavingNewUserFarm,
    setSavingUserFarm,
} = userfarmSlice.actions