import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'

import { storeApi } from './'

import { authSlice } from './auth'
import { occupationSlice } from './occupation'
import { roleSlice } from './role'
import { sigaSlice } from './siga'
import { systemSlice } from './system'
import { usersysSlice } from './usersys'
import { juntaSlice } from './junta'
import { committeeSlice } from './committee'
import { zoneSlice } from './zone'
import { blockSlice } from './block'
import { watersourceSlice } from './watersource'
import { irrigationnetworkSlice } from './irrigationnetwork'
import { resourceSlice } from './resource'

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        occupation: occupationSlice.reducer,
        role: roleSlice.reducer,
        siga: sigaSlice.reducer,
        system: systemSlice.reducer,
        usersys: usersysSlice.reducer,
        junta: juntaSlice.reducer,
        committee: committeeSlice.reducer,
        zone: zoneSlice.reducer,
        block: blockSlice.reducer,
        watersource: watersourceSlice.reducer,
        irrigationnetwork: irrigationnetworkSlice.reducer,
        resource: resourceSlice.reducer,
        [storeApi.reducerPath]: storeApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }).concat(storeApi.middleware)
})

setupListeners(store.dispatch)