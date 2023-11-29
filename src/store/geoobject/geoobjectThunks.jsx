import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { fetchByToken } from '../../helpers'
import { storeApi } from '../storeApi'
import { addNewGeometrys, clearFeatureCollection, setFeatureCollection, setSavingNewGeometry } from './geoobjectSlice'

const SwalReact = withReactContent(Swal)

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
        getListPolygon: builder.query({
            query: (search = '') => ({
                url: `geoobject/search/polygon`,
                params: {
                    search
                }
            }),
            transformResponse: (response, meta, arg) => response.docs,
            providesTags: ['Geo']
        }),
        // POLYGON
        // LINE
        addLine: builder.mutation({
            query: (newLine) => ({
                url: `geoobject/linestring/create/new`,
                method: 'post',
                data: newLine
            }),
            invalidatesTags: ['Geo']
        }),
        addMultiLine: builder.mutation({
            query: (newMultiLine) => ({
                url: `geoobject/mlinestring/create/new`,
                method: 'post',
                data: newMultiLine
            }),
            invalidatesTags: ['Geo']
        }),
        getListLine: builder.query({
            query: (search = '') => ({
                url: `geoobject/search/linestring`,
                params: {
                    search
                }
            }),
            transformResponse: (response, meta, arg) => response.docs,
            providesTags: ['Geo']
        }),
        // LINE
    })
})

export const {
    useAddLineMutation,
    useAddMultiLineMutation,
    useAddPointMutation,
    useAddPolygonMutation,
    useGetListPolygonQuery,
    useLazyGetListPolygonQuery,
    useLazyGetListLineQuery,
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

export const searchPointObject = async (search) => {
    const resp = await fetchByToken({
        endpoint: 'geoobject/search/point',
        params: { search }
    })

    if (resp.ok) {
        return resp.docs
    } else {
        return []
    }
}

export const searchLineStringObject = async (search) => {
    const resp = await fetchByToken({
        endpoint: 'geoobject/search/linestring',
        params: { search }
    })

    if (resp.ok) {
        return resp.docs
    } else {
        return []
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
            const { featureCollection } = getState().geoobject

            if (featureCollection.features.length > 0) {
                SwalReact.fire({
                    title: <div>Importación</div>,
                    html:
                        <>
                            <div className='fs-5 mb-2'>¿Desea eliminar los objetos actuales del mapa?</div>
                        </>,
                    showCancelButton: true,
                    confirmButtonText: 'Eliminar',
                    cancelButtonText: 'Agregar a los demás',
                    allowOutsideClick: false,
                    icon: 'question',
                    customClass: {
                        confirmButton: `btn btn-danger`,
                        cancelButton: `btn btn-success`
                    },
                    buttonsStyling: false,
                    reverseButtons: true,
                }).then(async ({ isConfirmed }) => {
                    if (isConfirmed) {
                        if (resp.hasOwnProperty('featureCollection')) {
                            dispatch(setFeatureCollection(resp.featureCollection))
                        }
                    } else {
                        if (resp.hasOwnProperty('featureCollection')) {
                            dispatch(addNewGeometrys(resp.featureCollection.features))
                        }
                    }
                })
            } else {
                if (resp.hasOwnProperty('featureCollection')) {
                    dispatch(setFeatureCollection(resp.featureCollection))
                }
            }
        }
    }
}