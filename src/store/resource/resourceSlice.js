import { createSlice } from '@reduxjs/toolkit'
export const resourceSlice = createSlice({
    name: 'resource',
    initialState: {
        modalResource: false,
        modalFilesSelected: [],
        modalInit: 9, // 1:Archivos de sistema, 3:Archivos subidos, 5:Archivos por subir
        modalTags: [],
        modalAccept: 'images',
        modalMultiple: false,
        modalLimit: 2,
        modalTitle: 'Seleccione o suba archivos',
        modalSetArchive: null
    },
    reducers: {
        setModalResource: (state, { payload }) => {
            state.modalResource = payload
        },
        setModalFilesSelected: (state, { payload }) => {
            state.modalFilesSelected = payload
        },
        addModalFilesSelected: (state, { payload }) => {
            state.modalFilesSelected = [...state.modalFilesSelected, payload]
        },
        setModalInit: (state, { payload }) => {
            state.modalInit = payload
        },
        setModalTags: (state, { payload }) => {
            state.modalTags = payload
        },
        setModalAccept: (state, { payload }) => {
            state.modalAccept = payload
        },
        setModalMultiple: (state, { payload }) => {
            state.modalMultiple = payload
        },
        setModalLimit: (state, { payload }) => {
            state.modalLimit = payload
        },
        setModalTitle: (state, { payload }) => {
            state.modalTitle = payload
        },
        setModalSetArchive: (state, { payload }) => {
            state.modalSetArchive = payload
        },
        resetModalResource: (state) => {
            state.modalResource = false
            state.modalFilesSelected = []
            state.modalInit = 9
            state.modalTags = []
            state.modalAccept = 'images'
            state.modalMultiple = false
            state.modalTitle = 'Seleccione o suba archivos'
            state.modalSetArchive = null
        }
    }
})

export const {
    addModalFilesSelected,
    resetModalResource,
    setModalAccept,
    setModalFilesSelected,
    setModalInit,
    setModalLimit,
    setModalMultiple,
    setModalResource,
    setModalSetArchive,
    setModalTags,
    setModalTitle,
} = resourceSlice.actions