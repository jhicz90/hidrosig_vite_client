import { createSlice } from '@reduxjs/toolkit'
export const farmSlice = createSlice({
    name: 'userfarm',
    initialState: {
        isSaving: false,
        isSavingNew: false,
        active: null,
        activeNew: null,
    },
    reducers: {
        addNewFarm: (state) => {
            state.activeNew = null
            state.isSavingNew = true
        },
        setActiveNewFarm: (state, { payload }) => {
            state.activeNew = payload
        },
        editActiveNewFarm: (state, { payload }) => {
            state.activeNew = { ...state.activeNew, ...payload }
        },
        setActiveFarm: (state, { payload }) => {
            state.active = payload
        },
        editActiveFarm: (state, { payload }) => {
            state.active = { ...state.active, ...payload }
        },
        setSavingFarm: (state, { payload }) => {
            state.isSaving = payload
        },
        setSavingNewFarm: (state, { payload }) => {
            state.isSavingNew = payload
        },
    }
});

export const {
    addNewFarm,
    editActiveNewFarm,
    editActiveFarm,
    setActiveNewFarm,
    setActiveFarm,
    setSavingNewFarm,
    setSavingFarm,
} = farmSlice.actions