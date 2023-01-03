import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'

import { storeApi } from './'

import { appSlice } from './app'
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
import { structureSlice } from './structure'
import { sectionSlice } from './section'
import { irrigationnetworkSlice } from './irrigationnetwork'
import { resourceSlice } from './resource'
import { pettycashSlice } from './pettycash'
import { voucherSlice } from './voucher'
import { documentSlice } from './document'
import { geoobjectSlice } from './geoobject'

export const store = configureStore({
    reducer: {
        app: appSlice.reducer,
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
        geoobject: geoobjectSlice.reducer,
        watersource: watersourceSlice.reducer,
        structure: structureSlice.reducer,
        section: sectionSlice.reducer,
        irrigationnetwork: irrigationnetworkSlice.reducer,
        resource: resourceSlice.reducer,
        pettycash: pettycashSlice.reducer,
        voucher: voucherSlice.reducer,
        document: documentSlice.reducer,
        [storeApi.reducerPath]: storeApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }).concat(storeApi.middleware)
})

setupListeners(store.dispatch)