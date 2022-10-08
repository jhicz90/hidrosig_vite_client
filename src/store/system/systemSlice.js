import { createSlice } from '@reduxjs/toolkit'
export const systemSlice = createSlice({
    name: 'system',
    initialState: {
        isSaving: false,
        isGeneratingBackup: false,
        settings: null,
    },
    reducers: {
        setSettings: (state, action) => {
            state.settings = action.payload
        },
        setSaving: (state, action) => {
            state.isSaving = action.payload
        },
        setGeneratingBackup: (state, action) => {
            state.isGeneratingBackup = action.payload
        },
    }
});

export const {
    setGeneratingBackup,
    setSaving,
    setSettings,
} = systemSlice.actions