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
        netIrrigBase: [],
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
        setNetIrrigDataFull: (state, { payload }) => {
            state.netIrrig = payload
            state.netIrrigBase = payload
        },
        setNetIrrigData: (state, { payload }) => {
            state.netIrrig = payload
        },
        setNetIrrigDataBase: (state, { payload }) => {
            state.netIrrigBase = payload
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
    clearActiveNodeIrrigationNetwork,
    setActiveAmbitIrrigationNetwork,
    setActiveNodeDataIrrigationNetwork,
    setActiveNodeIrrigationNetwork,
    setActiveNodeLoadingIrrigationNetwork,
    setNetIrrigChkIrrigationNetwork,
    setNetIrrigData,
    setNetIrrigDataBase,
    setNetIrrigDataFull,
    setNetIrrigExpIrrigationNetwork,
    setSavingIrrigationNetwork,
    setSavingNewIrrigationNetwork,
} = irrigationnetworkSlice.actions