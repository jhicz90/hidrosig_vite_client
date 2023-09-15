import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Image } from '@/components'
import { addNewGeometry, clearFeatureCollection, setFeatureCollection, setGeometryByIndex, setMap, startImportShapes, useAddLineMutation, useAddPointMutation, useAddPolygonMutation } from '@/store/geoobject'

const SwalReact = withReactContent(Swal)

export const useGeoObjectStore = () => {

    const dispatch = useDispatch()
    const { map: mapRef, featureCollection } = useSelector(state => state.geoobject)
    const [addPoint] = useAddPointMutation()
    const [addPolygon] = useAddPolygonMutation()
    const [addLine] = useAddLineMutation()

    const setMapRef = (map) => {
        dispatch(setMap(map))
    }

    const setFeatureCllc = (fc) => {
        dispatch(setFeatureCollection(fc))
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

    const questionAddShape = (feature) => {
        SwalReact.fire({
            iconHtml: <Image noImg={3011} />,
            title:
                <>
                    <div className='text-uppercase'>¿Guardar este objeto?</div>
                    <div className="fs-5 fw-bold text-info mt-1">{feature?.properties?.name || feature?.properties?.shape || 'Forma'}</div>
                </>,
            html:
                <>
                    <div className='fs-5 mb-2' style={{ textAlign: 'left' }}>El modelo de esta area sera guardado, con los datos ingresados o exportados, pero tambien puede agregar alguna descripción adicional para una mejor busqueda o especificación</div>
                </>,
            showCancelButton: true,
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar',
            allowOutsideClick: false,
            customClass: {
                confirmButton: `btn btn-success`,
                cancelButton: `btn btn-neutral`,
                input: `form-control`,
                icon: `border-0 animate__animated animate__rubberBand`
            },
            input: 'textarea',
            inputAttributes: {
                autocapitalize: 'off'
            },
            buttonsStyling: false,
            reverseButtons: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                if (feature.properties.shape === 'Circle' || feature.properties.shape === 'Marker' || feature.properties.shape === 'CircleMarker') {
                    addPoint({
                        desc: result.value,
                        properties: feature.properties,
                        geometry: feature.geometry
                    })
                } else if (feature.properties.shape === 'Polygon') {
                    addPolygon({
                        desc: result.value,
                        properties: feature.properties,
                        geometry: feature.geometry
                    })
                } else if (feature.properties.shape === 'Line') {
                    addLine({
                        desc: result.value,
                        properties: feature.properties,
                        geometry: feature.geometry
                    })
                } else if (feature.geometry.type === 'Point') {
                    addPoint({
                        desc: result.value,
                        properties: feature.properties,
                        geometry: feature.geometry
                    })
                } else if (feature.geometry.type === 'Polygon') {
                    addPolygon({
                        desc: result.value,
                        properties: feature.properties,
                        geometry: feature.geometry
                    })
                } else if (feature.geometry.type === 'LineString') {
                    addLine({
                        desc: result.value,
                        properties: feature.properties,
                        geometry: feature.geometry
                    })
                }
            }
        })
    }

    return {
        //* PROPIEDADES
        mapRef,
        featureCollection,
        //* METODOS
        setMapRef,
        setFeatureCllc,
        addFeature,
        setFeatureByIndex,
        clearFeatures,
        importShapes,
        questionAddShape,
    }
}
