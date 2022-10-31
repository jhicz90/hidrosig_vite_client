import { createSlice } from '@reduxjs/toolkit'
export const appSlice = createSlice({
    name: 'app',
    initialState: {
        sidebar: true,
        toolbar: {
            show: false,
            title: '',
            actions: null
        },
        cmkbar: {
            show: false,
            search: '',
        },
    },
    reducers: {
        setSidebar: (state, { payload }) => {
            state.sidebar = payload
        },
        setToolbar: (state, { payload }) => {
            state.toolbar = payload
        },
        setToolbarActions: (state, { payload }) => {
            state.toolbar.actions = payload
        },
        clearToolbarActions: (state) => {
            state.toolbar.actions = null
        },
        setCmkbar: (state, { payload }) => {
            state.cmkbar = payload
        },
        setCmkbarShow: (state, { payload }) => {
            state.cmkbar.show = payload
        },
        setCmkbarSearch: (state, { payload }) => {
            state.cmkbar.search = payload
        },
    }
});

export const {
    setSidebar,
    setToolbar,
    setToolbarActions,
    clearToolbarActions,
    setCmkbar,
    setCmkbarShow,
    setCmkbarSearch,
} = appSlice.actions