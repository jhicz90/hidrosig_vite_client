import { createSlice } from '@reduxjs/toolkit'
export const irrigationnetworkSlice = createSlice({
    name: 'irrigationnetwork',
    initialState: {
        isSaving: false,
        isSavingNew: false,
        activeAmbit: '',
        activeNode: {
            id: '',
            name: '',
            depth: '',
            data: null,
            loading: false,
        },
        netIrrig: [],
        netIrrigExp: [],
        netIrrigChk: [],
    },
    reducers: {
        setActiveAmbitIrrigationNetwork: (state, { payload }) => {
            state.activeAmbit = payload
        },
        setActiveNodeIrrigationNetwork: (state, { payload }) => {
            state.activeNode = payload
        },
        setActiveNodeDataIrrigationNetwork: (state, { payload }) => {
            state.activeNode.data = payload
        },
        clearActiveNodeIrrigationNetwork: (state) => {
            state.activeNode = {
                id: '',
                name: '',
                depth: '',
                data: null,
                loading: false,
            }
        },
        setActiveNodeLoadingIrrigationNetwork: (state, { payload }) => {
            state.activeNode.loading = payload
        },
        setNetIrrigIrrigationNetwork: (state, { payload }) => {
            state.netIrrig = payload
        },
        setNetIrrigExpIrrigationNetwork: (state, { payload }) => {
            state.netIrrigExp = payload
        },
        setNetIrrigChkIrrigationNetwork: (state, { payload }) => {
            state.netIrrigChk = payload
        },
        setSavingIrrigationNetwork: (state, { payload }) => {
            state.isSaving = payload
        },
        setSavingNewIrrigationNetwork: (state, { payload }) => {
            state.isSavingNew = payload
        },
    }
});

export const {
    setActiveAmbitIrrigationNetwork,
    setActiveNodeIrrigationNetwork,
    setNetIrrigIrrigationNetwork,
    setNetIrrigExpIrrigationNetwork,
    setNetIrrigChkIrrigationNetwork,
    setSavingIrrigationNetwork,
    setSavingNewIrrigationNetwork,
    clearActiveNodeIrrigationNetwork,
    setActiveNodeDataIrrigationNetwork,
    setActiveNodeLoadingIrrigationNetwork,
} = irrigationnetworkSlice.actions