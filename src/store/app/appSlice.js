import { createSlice } from '@reduxjs/toolkit'
export const appSlice = createSlice({
    name: 'app',
    initialState: {
        sidebar: true,
        toolbar: true,
        toolbarActions: null,
        cmkbar: false,
    },
    reducers: {
        setSidebar: (state, { payload }) => {
            state.sidebar = payload
        },
        setToolbar: (state, { payload }) => {
            state.toolbar = payload
        },
        setToolbarActions: (state, { payload }) => {
            state.toolbarActions = payload
        },
        clearToolbarActions: (state) => {
            state.toolbarActions = null
        },
        setCmkbar: (state, { payload }) => {
            state.cmkbar = payload
        },
    }
});

export const {
    setSidebar,
    setToolbar,
    setToolbarActions,
    clearToolbarActions,
    setCmkbar,
} = appSlice.actions