import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'

import { storeApi } from './storeApi'

import { authSlice } from './auth'
import { usersysSlice } from './usersys'
import { occupationSlice } from './occupation'
import { roleSlice } from './role'
import { sigaSlice } from './siga'

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        usersys: usersysSlice.reducer,
        occupation: occupationSlice.reducer,
        role: roleSlice.reducer,
        siga: sigaSlice.reducer,
        [storeApi.reducerPath]: storeApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(storeApi.middleware)
})

setupListeners(store.dispatch)