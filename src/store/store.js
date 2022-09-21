import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth'
import { usersysSlice } from './usersys'
import { occupationSlice } from './occupation'

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        usersys: usersysSlice.reducer,
        occupation: occupationSlice.reducer,
    },
})