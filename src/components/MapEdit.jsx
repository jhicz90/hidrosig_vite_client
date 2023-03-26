import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import { GeomanControls } from 'react-leaflet-geoman-v2'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { setFeatureCollection, useAddPointMutation, useAddPolygonMutation } from '../store/actions'

import L from 'leaflet'

delete L.Icon.Default.prototype._getIconUrl

import 'leaflet/dist/leaflet.css'
import '@geoman-io/leaflet-geoman-free'
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css'
import marker from 'leaflet/dist/images/marker-icon.png'
import marker2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import { Image } from './Image'

L.Icon.Default.mergeOptions({
    iconRetinaUrl: marker2x,
    iconUrl: marker,
    shadowUrl: markerShadow
})

const SwalReact = withReactContent(Swal)

export const MapEdit = () => {
    return (
        <MapContainer
            center={[-9.5032, -74.9047]}
            zoomControl={false}
            zoom={6}
            minZoom={4.25}
            maxZoom={18}
            zoomDelta={0.1}
            zoomSnap={0.1}
            scrollWheelZoom={true}
            style={{ height: 'calc(100vh - 140px)' }}
        >
            <TileLayer
                url={`http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}`}
            />
            <Geoman />
        </MapContainer>
    )
}

export const Geoman = () => {

    const map = useMap()
    const dispatch = useDispatch()
    const { featureCollection } = useSelector(state => state.geoobject)
    const [addPoint] = useAddPointMutation()
    const [addPolygon] = useAddPolygonMutation()

    const handleChange = () => {

        const newGeo = {
            type: 'FeatureCollection',
            features: []
        }
        const layers = map.pm.getGeomanLayers()

        if (layers) {
            layers.forEach((layer) => {
                if (layer.pm.getShape() === 'Circle') {
                    const { lat, lng } = layer.getLatLng()

                    const data = {
                        type: 'Feature',
                        properties: {
                            shape: layer.pm.getShape(),
                            radius: layer.getRadius(),
                        },
                        geometry: {
                            type: 'Point',
                            coordinates: [lng, lat],
                        },
                    }

                    layer.on('click', () => handleClick(data))

                    newGeo.features.push(data)
                } else {
                    const dataLayer = layer.toGeoJSON()
                    const data = {
                        ...dataLayer,
                        properties: {
                            ...dataLayer.properties,
                            shape: layer.pm.getShape(),
                        }
                    }

                    layer.on('click', () => handleClick(data))

                    newGeo.features.push(data)
                }
            })
        }

        dispatch(setFeatureCollection(newGeo))
    }

    const handleClick = (data) => {
        SwalReact.fire({
            iconHtml: <Image noImg={3011} />,
            title:
                <>
                    <div className='text-uppercase'>¿Guardar esta area?</div>
                    {/* <div className="fs-5 fw-bold text-info mt-1">{name}</div> */}
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
                if (data.properties.shape === 'Circle' || data.properties.shape === 'Marker') {
                    addPoint({
                        desc: result.value,
                        properties: data.properties,
                        geometry: data.geometry
                    })
                } else if (data.properties.shape === 'Polygon') {
                    addPolygon({
                        desc: result.value,
                        properties: data.properties,
                        geometry: data.geometry
                    })
                }
            }
        })
    }

    useEffect(() => {
        map.pm.getGeomanLayers().forEach(layer => layer.removeFrom(map))
        featureCollection.features.forEach(feature => {
            if (feature?.properties.hasOwnProperty('radius') || feature?.properties.shape === 'Circle') {
                new L.Circle(feature.geometry.coordinates.slice().reverse(), {
                    radius: feature?.properties.radius,
                    pmIgnore: false,
                }).on('pm:update', handleChange).on('click', () => handleClick(feature)).addTo(map)
            } else {
                new L.GeoJSON(feature.geometry, { pmIgnore: false }).on('pm:update', handleChange).on('click', () => handleClick(feature)).addTo(map)
            }
        })
    }, [featureCollection])

    return (
        <>
            <GeomanControls
                lang={'es'}
                options={{
                    drawText: false
                }}
                globalOptions={{
                    snapDistance: 15,
                    allowSelfIntersection: false,
                    continueDrawing: false,
                    templineStyle: { color: 'rgba(0, 255, 102, 0.5)' },
                    hintlineStyle: { color: 'rgba(0, 255, 102, 0.5)', dashArray: [5, 5] },
                    pathOptions: { color: 'rgba(0, 255, 102, 0.5)' }
                }}
                // eventDebugFn={console.log}
                onCreate={handleChange}
                // onChange={handleChange}
                // onUpdate={debounce(handleChange, 2000)}
            // onEdit={handleChange}
            // onMapRemove={handleChange}
            // onMapCut={handleChange}
            // onDragEnd={handleChange}
            // onMarkerDragEnd={handleChange}
            />
        </>
    )
}