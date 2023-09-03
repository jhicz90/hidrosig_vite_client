import { createSlice } from '@reduxjs/toolkit'
export const channelSlice = createSlice({
    name: 'channel',
    initialState: {
        isSaving: false,
        isSavingNew: false,
        active: null,
        activeNew: null,
    },
    reducers: {
        addNewChannel: (state) => {
            state.activeNew = null
            state.isSavingNew = true
        },
        setActiveNewChannel: (state, { payload }) => {
            state.activeNew = payload
        },
        editActiveNewChannel: (state, { payload }) => {
            state.activeNew = { ...state.activeNew, ...payload }
        },
        setActiveChannel: (state, { payload }) => {
            state.active = payload
        },
        editActiveChannel: (state, { payload }) => {
            state.active = { ...state.active, ...payload }
        },
        setSavingChannel: (state, { payload }) => {
            state.isSaving = payload
        },
        setSavingNewChannel: (state, { payload }) => {
            state.isSavingNew = payload
        },
    }
});

export const {
    addNewChannel,
    editActiveChannel,
    editActiveNewChannel,
    setActiveChannel,
    setActiveNewChannel,
    setSavingChannel,
    setSavingNewChannel,
} = channelSlice.actions