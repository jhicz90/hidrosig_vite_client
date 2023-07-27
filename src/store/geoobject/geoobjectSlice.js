import { createSlice } from '@reduxjs/toolkit'
export const geoobjectSlice = createSlice({
    name: 'geoobject',
    initialState: {
        map: null,
        featureCollection: {
            type: 'FeatureCollection',
            features: []
        },
        isSaving: false,
        isSavingNew: false,
    },
    reducers: {
        setMap: (state, { payload }) => {
            state.map = payload
        },
        addNewGeometry: (state, { payload }) => {
            state.featureCollection.features = [...state.featureCollection.features, payload]
        },
        addNewGeometrys: (state, { payload }) => {
            state.featureCollection.features = [
                ...state.featureCollection.features,
                ...payload,
            ]
        },
        setFeatureCollection: (state, { payload }) => {
            state.featureCollection = payload
        },
        setGeometryByIndex: (state, { payload }) => {
            state.featureCollection.features = state.featureCollection.features.map((f, index) => {
                if (payload.index === index) {
                    return {
                        ...f,
                        properties: {
                            ...f.properties,
                            ...payload.shape
                        },
                        geometry: payload.geometry
                    }
                } else {
                    return f
                }
            })
        },
        setGeometryById: (state, { payload }) => {
            state.featureCollection = state.featureCollection.features.map(f => {
                if (payload.includes(f.id.toString())) {
                    return {
                        ...f,
                        id: payload
                    }
                }

                return f
            })
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
    setFeatureCollection,
    setGeometryById,
    setGeometryByIndex,
    setMap,
    setSavingGeometry,
    setSavingNewGeometry,
} = geoobjectSlice.actions