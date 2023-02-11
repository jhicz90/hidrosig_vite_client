import { createSlice } from '@reduxjs/toolkit'
export const resourceSlice = createSlice({
    name: 'resource',
    initialState: {
        showUpload: false,
        showUploadTemp: false,
        filesSelected: [],
        initOptions: [true, true, true], // 1:Archivos de sistema, 2:Archivos subidos, 3:Archivos por subir
        tags: [],
        fileTypes: [],
        fileTypesTemp: [],
        groupTypes: 'images',
        groupTypesTemp: 'images',
        limit: 1,
        maxSize: 1,
        setFiles: null,
        setFilesTemp: null,
        uploading: false,
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
            state.uploading = payload.uploading || false
        },
        setModalResourceTemp: (state, { payload }) => {
            state.showUploadTemp = payload.showUploadTemp || false
            state.fileTypesTemp = payload.fileTypesTemp || []
            state.groupTypesTemp = payload.groupTypesTemp || ''
            state.setFilesTemp = payload.setFilesTemp || null
        },
        setShowResource: (state, { payload }) => {
            state.showUpload = payload
        },
        setShowResourceTemp: (state, { payload }) => {
            state.showUploadTemp = payload
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
        setFileTypesTemp: (state, { payload }) => {
            state.fileTypesTemp = payload
        },
        setGroupTypes: (state, { payload }) => {
            state.groupTypes = payload
        },
        setGroupTypesTemp: (state, { payload }) => {
            state.groupTypesTemp = payload
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
        setSetFilesTemp: (state, { payload }) => {
            state.setFilesTemp = payload
        },
        setUploading: (state, { payload }) => {
            state.uploading = payload
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
            state.uploading = false
        },
        resetResourceTemp: (state) => {
            state.showUploadTemp = false
            state.fileTypesTemp = []
            state.groupTypesTemp = 'images'
        },
    }
})

export const {
    addFilesSelected,
    resetResource,
    resetResourceTemp,
    setFilesSelected,
    setFileTypes,
    setFileTypesTemp,
    setGroupTypes,
    setGroupTypesTemp,
    setInitOptions,
    setLimit,
    setMaxSize,
    setModalResource,
    setModalResourceTemp,
    setSetFiles,
    setSetFilesTemp,
    setShowResource,
    setShowResourceTemp,
    setTags,
    setUploading,
} = resourceSlice.actions