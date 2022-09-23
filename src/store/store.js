import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth'
import { usersysSlice } from './usersys'
import { occupationSlice } from './occupation'
import { storeApi } from './storeApi'

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        usersys: usersysSlice.reducer,
        occupation: occupationSlice.reducer,
        [storeApi.reducerPath]: storeApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(storeApi.middleware)
})