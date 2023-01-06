import { createSlice } from '@reduxjs/toolkit'
export const geoobjectSlice = createSlice({
    name: 'geoobject',
    initialState: {
        featureCollection: [],
        isSaving: false,
        isSavingNew: false,
    },
    reducers: {
        addNewGeometry: (state, { payload }) => {
            state.featureCollection = [...state.featureCollection, payload]
        },
        deleteGeometryById: (state, { payload }) => {
            state.featureCollection = state.featureCollection.filter(f => !payload.includes(f.id.toString()))
        },
        clearFeatureCollection: (state) => {
            state.featureCollection = []
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
    clearFeatureCollection,
    deleteGeometryById,
    setSavingGeometry,
    setSavingNewGeometry,
} = geoobjectSlice.actions