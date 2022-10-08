import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'

import { storeApi } from './storeApi'

import { authSlice } from './auth'
import { occupationSlice } from './occupation'
import { roleSlice } from './role'
import { sigaSlice } from './siga'
import { systemSlice } from './system'
import { usersysSlice } from './usersys'

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        occupation: occupationSlice.reducer,
        role: roleSlice.reducer,
        siga: sigaSlice.reducer,
        system: systemSlice.reducer,
        usersys: usersysSlice.reducer,
        [storeApi.reducerPath]: storeApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }).concat(storeApi.middleware)
})

setupListeners(store.dispatch)