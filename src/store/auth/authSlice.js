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
        options: {},
        tokenIat: null,
        tokenExp: null,
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
            state.options = payload.options
            state.tokenIat = payload.iat
            state.tokenExp = payload.exp
            state.token = payload.token
        },
        logout: (state) => {
            state.checkToken = false
            state.checkLogin = false
            state.uid = null
            state.displayName = null
            state.photoURL = null
            state.lvlAccess = 0
            state.modules = []
            state.options = {}
            state.tokenIat = null
            state.tokenExp = null
            state.token = null
        },
        startCheckingLogin: (state) => {
            state.checkLogin = true
        },
        startCheckingCredentials: (state) => {
            state.checkToken = true
        }
    }
});

export const { login, logout, startCheckingLogin, startCheckingCredentials } = authSlice.actions