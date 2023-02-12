import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ControlUiMap } from '../../../types'
import { formatLatLng, randomColor, typeGeoData } from '../../../helpers'
import { addNewGeometry, deleteGeometryById, editFeatureCollection } from '../../../store/actions'

import L from 'leaflet'
import { MapContainer, TileLayer, ZoomControl, useMap, GeoJSON, LayersControl } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'
import '@geoman-io/leaflet-geoman-free'
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css'

delete L.Icon.Default.prototype._getIconUrl

import marker from 'leaflet/dist/images/marker-icon.png'
import marker2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

L.Icon.Default.mergeOptions({
    iconRetinaUrl: marker2x,
    iconUrl: marker,
    shadowUrl: markerShadow
})

L.drawLocal = ControlUiMap

export const MapGeoObject = () => {

    const { featureCollection } = useSelector(state => state.geoobject)

    return (
        <div className='container-fluid g-0'>
            <div className='row g-0'>
                <div className='col-12'>
                    <div className='container-fluid p-0'>
                        <div className='row g-0'>
                            <div className='col-12'>
                                <MapContainer zoomControl={false} center={[-4.79, -80.56]} zoom={13} scrollWheelZoom={true} style={{ height: 'calc(100vh - 140px)' }}>
                                    <ZoomControl zoomInTitle='Acercar' zoomOutTitle='Alejar' />
                                    <TileLayer
                                        attribution={`&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors`}
                                        url={`http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}`}
                                    />
                                    {
                                        featureCollection.features.length > 0 &&
                                        <LayersControl position='topright'>
                                            <LayersControl.Overlay name='Importados'>
                                                <GeoJSON data={featureCollection} />
                                            </LayersControl.Overlay>
                                        </LayersControl>
                                    }
                                    <Geoman />
                                </MapContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const Geoman = () => {

    const map = useMap()

    map.pm.addControls()

    map.pm.setLang('es')

    map.pm.setGlobalOptions({
        snapDistance: 15,
        allowSelfIntersection: false,
        templineStyle: { color: "rgba(0, 255, 102, 0.5)" },
        hintlineStyle: { color: "rgba(0, 255, 102, 0.5)", dashArray: [5, 5] },
        pathOptions: { color: "rgba(0, 255, 102, 0.5)" }
    })

    return null
}

// export const EditControlMap = () => {

//     const map = useMap()
//     const ref = useRef(null)
//     const dispatch = useDispatch()
//     const { featureCollection } = useSelector(state => state.geoobject)

//     useEffect(() => {
//         if (featureCollection?.features.length === 0) {
//             ref.current?.clearLayers()
//         } else if (ref.current?.getLayers().length === 0 && featureCollection) {
//             // L.geoJSON(featureCollection).addTo(map)
//             L.geoJSON(featureCollection).eachLayer((layer) => {
//                 ref.current?.addLayer(layer)
//                 // if (
//                 //     layer instanceof L.Polyline ||
//                 //     layer instanceof L.Polygon ||
//                 //     layer instanceof L.Point
//                 // ) {
//                 // map.addLayer(layer)
//                 //         // if (layer?.feature?.properties.radius && ref.current) {
//                 //         //     new L.Circle(layer.feature.geometry.coordinates.slice().reverse(), {
//                 //         //         radius: layer.feature?.properties.radius,
//                 //         //     }).addTo(ref.current)
//                 //         // } else {
//                 //         //     ref.current?.addLayer(layer)
//                 //         // }
//                 // }
//             })
//         }
//     }, [featureCollection])

//     const handleChange = (e) => {
//         const geo = ref.current?.toGeoJSON()
//         if (geo?.type === 'FeatureCollection') {
//             dispatch(editFeatureCollection(geo))
//         }
//     }

//     return (
//         <FeatureGroup ref={ref}>
//             <EditControl
//                 position='topright'
//                 onEdited={handleChange}
//                 onCreated={handleChange}
//                 onDeleted={handleChange}
//                 draw={{
//                     rectangle: false,
//                     circle: false,
//                     circlemarker: false,
//                 }}
//             />
//         </FeatureGroup>
//     )
// }