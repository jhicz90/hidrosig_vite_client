import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    uid: null,
    displayName: null,
    photoURL: null,
    lvlAccess: 0,
    modules: [],
    token: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, { payload }) => {
            state.uid = payload.uid
            state.displayName = payload.names
            state.photoURL = payload.image
            state.lvlAccess = payload.access
            state.modules = payload.modules
        },
        logout: () => initialState,
        onSetToken: (state, { payload }) => {
            state.checkToken = false
            state.token = payload
        },
    }
});

export const {
    login,
    logout,
    onSetToken,
} = authSlice.actions