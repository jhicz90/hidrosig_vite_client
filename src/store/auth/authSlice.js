import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    uid: null,
    displayName: null,
    photoURL: null,
    lvlAccess: 0,
    modules: [],
    token: null,
    checkLogin: true,
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
            state.checkLogin = false
        },
        logout: () => ({ ...initialState, checkLogin: false }),
        onSetToken: (state, { payload }) => {
            state.token = payload
        },
        onSetCheckLogin: (state, { payload }) => {
            state.checkLogin = payload
        }
    }
});

export const {
    login,
    logout,
    onSetToken,
    onSetCheckLogin,
} = authSlice.actions