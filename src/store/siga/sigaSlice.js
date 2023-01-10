import { createSlice } from '@reduxjs/toolkit'
export const sigaSlice = createSlice({
    name: 'siga',
    initialState: {
        report: '',
        reportCommittee: '',
        reportRate: '',
        reportDateStart: null,
        reportDateEnd: null,
        reportList: ['Eficiencia de cobranza', 'Reporte de deudas', 'Programación de riego', 'Padrón de usuarios para volumen'],
        listCommittee: [],
        listRate: [],
        searchIrrig: '',
        netIrrig: [],
        netIrrigExp: [],
        netIrrigChk: []
    },
    reducers: {
        setReportStartDate: (state, action) => {
            state.reportDateStart = action.payload
        },
        setReportEndDate: (state, action) => {
            state.reportDateEnd = action.payload
        },
        setReport: (state, action) => {
            state.report = action.payload
        },
        setCommittee: (state, action) => {
            state.reportCommittee = action.payload
        },
        setRate: (state, action) => {
            state.reportRate = action.payload
        },
        setListCommittee: (state, action) => {
            state.listCommittee = action.payload
        },
        setListRate: (state, action) => {
            state.listRate = action.payload
        },
        setSearchIrrig: (state, action) => {
            state.searchIrrig = action.payload
        },
        setNetIrrig: (state, action) => {
            state.netIrrig = action.payload
        },
        setNetIrrigExp: (state, action) => {
            state.netIrrigExp = action.payload
        },
        setNetIrrigChk: (state, action) => {
            state.netIrrigChk = action.payload
        }
    }
});

export const {
    setCommittee,
    setListCommittee,
    setListRate,
    setNetIrrig,
    setNetIrrigChk,
    setNetIrrigExp,
    setRate,
    setReport,
    setReportEndDate,
    setReportStartDate,
    setSearchIrrig,
} = sigaSlice.actions