import { fetchByToken } from '../../helpers'
import { clearFeatureCollection, setSavingNewGeometry } from './geoobjectSlice'

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