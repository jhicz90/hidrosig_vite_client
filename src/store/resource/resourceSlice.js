import { createSlice } from '@reduxjs/toolkit'
export const resourceSlice = createSlice({
    name: 'resource',
    initialState: {
        showUpload: false,
        filesSelected: [],
        initOptions: [true, true, true], // 1:Archivos de sistema, 2:Archivos subidos, 3:Archivos por subir
        tags: [],
        fileTypes: [],
        groupTypes: 'images',
        limit: 1,
        maxSize: 1,
        setFiles: null
    },
    reducers: {
        setModalResource: (state, { payload }) => {
            state.showUpload = payload.showUpload || false
            state.filesSelected = payload.filesSelected || []
            state.initOptions = payload.initOptions || [true, true, true]
            state.tags = payload.tags || []
            state.fileTypes = payload.fileTypes || []
            state.groupTypes = payload.groupTypes || ''
            state.limit = payload.limit || 1
            state.maxSize = payload.maxSize || 1
            state.setFiles = payload.setFiles || null
        },
        setShowResource: (state, { payload }) => {
            state.showUpload = payload
        },
        setFilesSelected: (state, { payload }) => {
            state.filesSelected = payload
        },
        addFilesSelected: (state, { payload }) => {
            state.filesSelected = [...state.filesSelected, payload]
        },
        setInitOptions: (state, { payload }) => {
            state.initOptions = payload
        },
        setTags: (state, { payload }) => {
            state.tags = payload
        },
        setFileTypes: (state, { payload }) => {
            state.fileTypes = payload
        },
        setGroupTypes: (state, { payload }) => {
            state.groupTypes = payload
        },
        setLimit: (state, { payload }) => {
            state.limit = payload
        },
        setMaxSize: (state, { payload }) => {
            state.maxSize = payload
        },
        setSetFiles: (state, { payload }) => {
            state.setFiles = payload
        },
        resetResource: (state) => {
            state.showUpload = false
            state.filesSelected = []
            state.initOptions = [true, true, true]
            state.tags = []
            state.fileTypes = []
            state.groupTypes = 'images'
            state.limit = 1
            state.maxSize = 1
            state.setFiles = null
        }
    }
})

export const {
    setModalResource,
    setShowResource,
    setFilesSelected,
    addFilesSelected,
    setInitOptions,
    setTags,
    setFileTypes,
    setGroupTypes,
    setLimit,
    setMaxSize,
    setSetFiles,
    resetResource,
} = resourceSlice.actions