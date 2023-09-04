import { createSlice } from '@reduxjs/toolkit'
export const irrigationnetworkSlice = createSlice({
    name: 'irrigationnetwork',
    initialState: {
        activeAmbit: '',
        activeNode: {
            id: '',
            name: '',
            depth: '',
            data: null,
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
            }
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
    }
});

export const {
    clearActiveNodeIrrigationNetwork,
    setActiveAmbitIrrigationNetwork,
    setActiveNodeDataIrrigationNetwork,
    setActiveNodeIrrigationNetwork,
    setNetIrrigChkIrrigationNetwork,
    setNetIrrigData,
    setNetIrrigDataBase,
    setNetIrrigDataFull,
    setNetIrrigExpIrrigationNetwork,
} = irrigationnetworkSlice.actions