import { fetchByToken } from '../../helpers'
import { storeApi } from '../storeApi'
import { addNewGeometrys, clearFeatureCollection, setFeatureCollection, setSavingNewGeometry } from './geoobjectSlice'

export const geoobjectApi = storeApi.injectEndpoints({
    endpoints: (builder) => ({
        // POINT
        addPoint: builder.mutation({
            query: (newPoint) => ({
                url: `geoobject/point/create/new`,
                method: 'post',
                data: newPoint
            }),
            invalidatesTags: ['Geo']
        }),
        // POINT
        // POLYGON
        addPolygon: builder.mutation({
            query: (newPolygon) => ({
                url: `geoobject/polygon/create/new`,
                method: 'post',
                data: newPolygon
            }),
            invalidatesTags: ['Geo']
        }),
        // POLYGON
    })
})

export const {
    useAddPointMutation,
    useAddPolygonMutation,
} = geoobjectApi

export const startSaveNewGeometry = () => {
    return async (dispatch, getState) => {

        dispatch(setSavingNewGeometry(true))

        const { featureCollection } = getState().geoobject

        const newGeometryCollection = {
            geometryCollection: featureCollection
        }

        const resp = await fetchByToken({
            endpoint: `geoobject/create/new`,
            data: newGeometryCollection,
            method: 'POST'
        })

        dispatch(setSavingNewGeometry(false))

        if (resp.ok) {
            // dispatch(storeApi.util.invalidateTags(['Files']))
            dispatch(clearFeatureCollection())
        }
    }
}

export const searchPolygonObject = async (search) => {
    const resp = await fetchByToken({
        endpoint: 'geoobject/search/polygon',
        params: { search }
    })

    if (resp.ok) {
        return resp.docs
    } else {
        return []
    }
}

export const searchGeoObject = async (search, geoobj = 1) => {
    const resp = await fetchByToken({
        endpoint: 'geoobject/list',
        params: { search, geoobj }
    })

    if (resp.ok) {
        return resp.docs
    } else {
        return []
    }
}

export const startImportShapes = (fileName) => {
    return async (dispatch, getState) => {
        const resp = await fetchByToken({
            endpoint: `geoobject/import/shp`,
            data: { filename: fileName },
            method: 'POST'
        })

        if (resp.ok) {
            const importFeatures = resp.shapes?.features.map(f => {
                if (f.geometry.type === 'Polygon' && !f.properties.hasOwnProperty('shape')) return {
                    ...f, 
                    properties: {
                        ...f.properties,
                        shape: 'Polygon'
                    }
                }
            })
            dispatch(addNewGeometrys(importFeatures))
        }
    }
}