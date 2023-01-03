import { createSlice } from '@reduxjs/toolkit'
export const geoobjectSlice = createSlice({
    name: 'geoobject',
    initialState: {
        featureCollection: [],
    },
    reducers: {
        addNewGeometry: (state, { payload }) => {
            state.featureCollection = [...state.featureCollection, ...payload]
        },
        clearFeatureCollection: (state) => {
            state.featureCollection = []
        },
    }
});

export const {
    addNewGeometry,
    clearFeatureCollection,
} = geoobjectSlice.actions