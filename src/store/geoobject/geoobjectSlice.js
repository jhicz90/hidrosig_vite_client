import { createSlice } from '@reduxjs/toolkit'
export const geoobjectSlice = createSlice({
    name: 'geoobject',
    initialState: {
        featureCollection: {
            type: 'FeatureCollection',
            features: []
        },
        isSaving: false,
        isSavingNew: false,
    },
    reducers: {
        addNewGeometry: (state, { payload }) => {
            state.featureCollection.features = [...state.featureCollection.features, payload]
        },
        addNewGeometrys: (state, { payload }) => {
            state.featureCollection.features = [...state.featureCollection.features, ...payload]
        },
        deleteGeometryById: (state, { payload }) => {
            state.featureCollection = state.featureCollection.features.filter(f => !payload.includes(f.id.toString()))
        },
        editFeatureCollection: (state, { payload }) => {
            state.featureCollection = payload
        },
        clearFeatureCollection: (state) => {
            state.featureCollection = {
                type: 'FeatureCollection',
                features: []
            }
        },
        setSavingGeometry: (state, { payload }) => {
            state.isSaving = payload
        },
        setSavingNewGeometry: (state, { payload }) => {
            state.isSavingNew = payload
        },
    }
});

export const {
    addNewGeometry,
    addNewGeometrys,
    clearFeatureCollection,
    deleteGeometryById,
    editFeatureCollection,
    setSavingGeometry,
    setSavingNewGeometry,
} = geoobjectSlice.actions