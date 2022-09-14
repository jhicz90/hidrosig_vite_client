import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth'
import { usersysSlice } from './usersys/usersysSlice'

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        usersys: usersysSlice.reducer
    },
})