import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'

import { storeApi } from './'

import { appSlice } from './app'
import { authSlice } from './auth'
import { blockSlice } from './block'
import { collectSlice } from './collect'
import { committeeSlice } from './committee'
import { documentSlice } from './document'
import { geoobjectSlice } from './geoobject'
import { irrigationnetworkSlice } from './irrigationnetwork'
import { juntaSlice } from './junta'
import { occupationSlice } from './occupation'
import { pettycashSlice } from './pettycash'
import { resourceSlice } from './resource'
import { roleSlice } from './role'
import { sectionSlice } from './section'
import { sigaSlice } from './siga'
import { structureSlice } from './structure'
import { systemSlice } from './system'
import { usersysSlice } from './usersys'
import { voucherSlice } from './voucher'
import { watersourceSlice } from './watersource'
import { zoneSlice } from './zone'

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
        collect: collectSlice.reducer,
        [storeApi.reducerPath]: storeApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }).concat(storeApi.middleware)
})

setupListeners(store.dispatch)