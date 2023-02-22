import { createSlice } from '@reduxjs/toolkit'
export const voucherSlice = createSlice({
    name: 'voucher',
    initialState: {
        isSaving: false,
        isSavingNew: false,
        active: null,
        modalNew: true,
        activeNew: null,
    },
    reducers: {
        addNewVoucher: (state) => {
            state.activeNew = null
            state.isSavingNew = true
            state.modalNew = true
        },
        setModalNewVoucher: (state, { payload }) => {
            state.modalNew = payload
        },
        setActiveNewVoucher: (state, { payload }) => {
            state.activeNew = payload
        },
        editActiveNewVoucher: (state, { payload }) => {
            state.activeNew = { ...state.activeNew, ...payload }
        },
        setActiveVoucher: (state, { payload }) => {
            state.active = payload
        },
        editActiveVoucher: (state, { payload }) => {
            state.active = { ...state.active, ...payload }
        },
        setSavingVoucher: (state, { payload }) => {
            state.isSaving = payload
        },
        setSavingNewVoucher: (state, { payload }) => {
            state.isSavingNew = payload
        },
    }
});

export const {
    addNewVoucher,
    editActiveNewVoucher,
    editActiveVoucher,
    setActiveNewVoucher,
    setActiveVoucher,
    setModalNewVoucher,
    setSavingNewVoucher,
    setSavingVoucher,
} = voucherSlice.actions