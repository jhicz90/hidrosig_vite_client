import { createSlice } from '@reduxjs/toolkit'
export const collectSlice = createSlice({
    name: 'collect',
    initialState: {
        manageTypePay: true, // TRUE: PAGO DIRECTO || FALSE: PAGO SIMULADO
        managePaymentCenter: false, // TRUE: CAJA ABIERTA || FALSE: CAJA CERRADA
        search: '',
        typeSearch: 'usr',// usr || prp
        listSearched: [],
        listSearchedFav: []// [{ id: '641370225b9141556de5b861', title: 'José Hans', typeSearch:'usr', navOption:'', prpId: null, campId: null}]
    },
    reducers: {
        onSetManageTypePay: (state, { payload }) => {
            state.manageTypePay = payload
        },
        onSetManagePaymentCenter: (state, { payload }) => {
            state.managePaymentCenter = payload
        },
        onSetSearch: (state, { payload }) => {
            state.search = payload
        },
        onSetTypeSearch: (state, { payload }) => {
            state.typeSearch = payload
        },
    }
});

export const {
    onSetSearch,
    onSetTypeSearch,
    onSetManageTypePay,
    onSetManagePaymentCenter,
} = collectSlice.actions