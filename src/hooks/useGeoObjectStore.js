import { useDispatch, useSelector } from 'react-redux'
import { addNewGeometry, clearFeatureCollection, setGeometryByIndex, setMap, startImportShapes } from '../store/geoobject'

export const useGeoObjectStore = () => {

    const dispatch = useDispatch()
    const { map: mapRef, featureCollection } = useSelector(state => state.geoobject)

    const setMapRef = (map) => {
        dispatch(setMap(map))
    }

    const addFeature = (feature) => {
        dispatch(addNewGeometry(feature))
    }

    const clearFeatures = () => {
        dispatch(clearFeatureCollection())
    }

    const setFeatureByIndex = (index, shape, geometry) => {
        dispatch(setGeometryByIndex({ index, shape, geometry }))
    }

    const importShapes = (data) => {
        dispatch(startImportShapes(data))
    }

    return {
        //* PROPIEDADES
        mapRef,
        featureCollection,
        //* METODOS
        setMapRef,
        addFeature,
        setFeatureByIndex,
        clearFeatures,
        importShapes,
    }
}
