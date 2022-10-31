import { createSlice } from '@reduxjs/toolkit'
export const voucherSlice = createSlice({
    name: 'voucher',
    initialState: {
        isSaving: false,
        isSavingNew: false,
        active: null,
        activeNew: null,
    },
    reducers: {
        addNewVoucher: (state) => {
            state.activeNew = null
            state.isSavingNew = true
        },
        setActiveNewVoucher: (state, action) => {
            state.activeNew = action.payload
        },
        editActiveNewVoucher: (state, action) => {
            state.activeNew = { ...state.activeNew, ...action.payload }
        },
        setActiveVoucher: (state, action) => {
            state.active = action.payload
        },
        editActiveVoucher: (state, action) => {
            state.active = { ...state.active, ...action.payload }
        },
        setSavingVoucher: (state, action) => {
            state.isSaving = action.payload
        },
        setSavingNewVoucher: (state, action) => {
            state.isSavingNew = action.payload
        },
    }
});

export const {
    addNewVoucher,
    editActiveNewVoucher,
    editActiveVoucher,
    setActiveNewVoucher,
    setActiveVoucher,
    setSavingVoucher,
    setSavingNewVoucher,
} = voucherSlice.actions