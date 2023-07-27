import { createSlice } from '@reduxjs/toolkit'
export const resourceSlice = createSlice({
    name: 'resource',
    initialState: {
        uploadManageFiles: {
            show: false,
            title: '',
            filesSelected: [], // Seleccionar archivos ya subidos
            initOptions: [false, false, false], // 1:Archivos de sistema, 2:Archivos subidos, 3:Archivos por subir
            tags: [],
            fileTypes: [],
            groupTypes: '', // Si no ahi ningun grupo seleccionado se desabilita el upload y esto servira como filtro
            limit: 1,
            maxSize: 1,
            setFiles: null,
        },
        uploadManageFilesTemp: {
            show: false,
            title: '',
            filesSelected: [], // Seleccionar archivos ya subidos
            initOptions: [false, false, false], // 1:Archivos de sistema, 2:Archivos subidos, 3:Archivos por subir
            fileTypes: [],
            groupTypes: '', //  Si no ahi ningun grupo seleccionado se desabilita el upload y esto servira como filtro
            limit: 1,
            maxSize: 1,
            setFiles: null,
        }
    },
    reducers: {
        setModalResource: (state, { payload }) => {
            state.uploadManageFiles = {
                show: payload.show || false,
                title: payload.title || '',
                filesSelected: payload.filesSelected || [],
                initOptions: payload.initOptions || [false, false, false],
                tags: payload.tags || [],
                fileTypes: payload.fileTypes || [],
                groupTypes: payload.groupTypes || '',
                limit: payload.limit || 1,
                maxSize: payload.maxSize || 1,
                setFiles: payload.setFiles || null,
            }
        },
        setModalResourceTemp: (state, { payload }) => {
            state.uploadManageFilesTemp = {
                show: payload.show || false,
                title: payload.title || '',
                filesSelected: payload.filesSelected || [],
                initOptions: payload.initOptions || [false, false, false],
                fileTypes: payload.fileTypes || [],
                groupTypes: payload.groupTypes || '',
                limit: payload.limit || 1,
                maxSize: payload.maxSize || 1,
                setFiles: payload.setFiles || null,
            }
        },
        setShowResource: (state, { payload }) => {
            state.uploadManageFiles.show = payload
        },
        setShowResourceTemp: (state, { payload }) => {
            state.uploadManageFilesTemp.show = payload
        },
        setFilesSelected: (state, { payload }) => {
            state.uploadManageFiles.filesSelected = payload
        },
        setFilesSelectedTemp: (state, { payload }) => {
            state.uploadManageFilesTemp.filesSelected = payload
        },
        setInitOptions: (state, { payload }) => {
            state.uploadManageFiles.initOptions = payload
        },
        setInitOptionsTemp: (state, { payload }) => {
            state.uploadManageFilesTemp.initOptions = payload
        },
        setTags: (state, { payload }) => {
            state.uploadManageFiles.tags = payload
        },
        setFileTypes: (state, { payload }) => {
            state.uploadManageFiles.fileTypes = payload
        },
        setFileTypesTemp: (state, { payload }) => {
            state.uploadManageFilesTemp.fileTypes = payload
        },
        setGroupTypes: (state, { payload }) => {
            state.uploadManageFiles.groupTypes = payload
        },
        setGroupTypesTemp: (state, { payload }) => {
            state.uploadManageFilesTemp.groupTypes = payload
        },
        setLimit: (state, { payload }) => {
            state.uploadManageFiles.limit = payload
        },
        setLimitTemp: (state, { payload }) => {
            state.uploadManageFilesTemp.limit = payload
        },
        setMaxSize: (state, { payload }) => {
            state.uploadManageFiles.maxSize = payload
        },
        setMaxSizeTemp: (state, { payload }) => {
            state.uploadManageFilesTemp.maxSize = payload
        },
        setSetFiles: (state, { payload }) => {
            state.uploadManageFiles.setFiles = payload
        },
        setSetFilesTemp: (state, { payload }) => {
            state.uploadManageFilesTemp.setFiles = payload
        },
        resetResource: (state) => {
            state.uploadManageFiles = {
                show: false,
                title: '',
                filesSelected: [],
                initOptions: [false, false, false],
                tags: [],
                fileTypes: [],
                groupTypes: '',
                limit: 1,
                maxSize: 1,
                setFiles: null,
            }
        },
        resetResourceTemp: (state) => {
            state.uploadManageFilesTemp = {
                show: false,
                title: '',
                filesSelected: [],
                initOptions: [false, false, false],
                fileTypes: [],
                groupTypes: '',
                limit: 1,
                maxSize: 1,
                setFiles: null,
            }
        },
    }
})

export const {
    resetResource,
    resetResourceTemp,
    setFilesSelected,
    setFilesSelectedTemp,
    setFileTypes,
    setFileTypesTemp,
    setGroupTypes,
    setGroupTypesTemp,
    setInitOptions,
    setInitOptionsTemp,
    setLimit,
    setLimitTemp,
    setMaxSize,
    setMaxSizeTemp,
    setModalResource,
    setModalResourceTemp,
    setSetFiles,
    setSetFilesTemp,
    setShowResource,
    setShowResourceTemp,
    setTags,
} = resourceSlice.actions