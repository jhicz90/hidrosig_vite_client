import { createSlice } from '@reduxjs/toolkit'
export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        checkToken: true,
        checkLogin: false,
        uid: null,
        displayName: null,
        photoURL: null,
        lvlAccess: 0,
        modules: [],
        token: null
    },
    reducers: {
        login: (state, { payload }) => {
            state.checkToken = false
            state.checkLogin = false
            state.uid = payload.uid
            state.displayName = payload.names
            state.photoURL = payload.image
            state.lvlAccess = payload.access
            state.modules = payload.modules
        },
        logout: (state) => {
            state.checkToken = false
            state.checkLogin = false
            state.uid = null
            state.displayName = null
            state.photoURL = null
            state.lvlAccess = 0
            state.modules = []
            state.token = null
        },
        setToken: (state, { payload }) => {
            state.checkToken = false
            state.token = payload
        },
        startCheckingLogin: (state) => {
            state.checkLogin = true
        },
        startCheckingCredentials: (state) => {
            state.checkToken = true
        }
    }
});

export const {
    login,
    logout,
    setToken,
    startCheckingCredentials,
    startCheckingLogin,
} = authSlice.actions