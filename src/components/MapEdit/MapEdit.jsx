import React, { useMemo } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import { Geoman } from '.'

import L from 'leaflet'

delete L.Icon.Default.prototype._getIconUrl

import 'leaflet/dist/leaflet.css'
import marker from 'leaflet/dist/images/marker-icon.png'
import marker2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import { useGeoObjectStore } from '../../hooks'

L.Icon.Default.mergeOptions({
    iconRetinaUrl: marker2x,
    iconUrl: marker,
    shadowUrl: markerShadow
})

export const MapEdit = () => {

    const { setMapRef } = useGeoObjectStore()

    const displayMap = useMemo(
        () => (
            <MapContainer
                center={[-9.5032, -74.9047]}
                zoomControl={true}
                zoom={6}
                minZoom={4.25}
                maxZoom={18}
                zoomDelta={0.1}
                zoomSnap={0.1}
                scrollWheelZoom={true}
                style={{ height: 'calc(100vh - 200px)' }}
                ref={setMapRef}
            >
                <TileLayer
                    url={`http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}`}
                />
                <Geoman />
            </MapContainer>
        ),
        [],
    )

    return (
        <React.Fragment>
            {displayMap}
        </React.Fragment>
    )
}

// const handleClick = (data) => {
//     SwalReact.fire({
//         iconHtml: <Image noImg={3011} />,
//         title:
//             <>
//                 <div className='text-uppercase'>¿Guardar esta area?</div>
//                 {/* <div className="fs-5 fw-bold text-info mt-1">{name}</div> */}
//             </>,
//         html:
//             <>
//                 <div className='fs-5 mb-2' style={{ textAlign: 'left' }}>El modelo de esta area sera guardado, con los datos ingresados o exportados, pero tambien puede agregar alguna descripción adicional para una mejor busqueda o especificación</div>
//             </>,
//         showCancelButton: true,
//         confirmButtonText: 'Guardar',
//         cancelButtonText: 'Cancelar',
//         allowOutsideClick: false,
//         customClass: {
//             confirmButton: `btn btn-success`,
//             cancelButton: `btn btn-neutral`,
//             input: `form-control`,
//             icon: `border-0 animate__animated animate__rubberBand`
//         },
//         input: 'textarea',
//         inputAttributes: {
//             autocapitalize: 'off'
//         },
//         buttonsStyling: false,
//         reverseButtons: true,
//     }).then(async (result) => {
//         if (result.isConfirmed) {
//             if (data.properties.shape === 'Circle' || data.properties.shape === 'Marker') {
//                 addPoint({
//                     desc: result.value,
//                     properties: data.properties,
//                     geometry: data.geometry
//                 })
//             } else if (data.properties.shape === 'Polygon') {
//                 addPolygon({
//                     desc: result.value,
//                     properties: data.properties,
//                     geometry: data.geometry
//                 })
//             } else if (data.properties.shape === 'Line') {
//                 addLine({
//                     desc: result.value,
//                     properties: data.properties,
//                     geometry: data.geometry
//                 })
//             }
//         }
//     })
// }

// useEffect(() => {
    //     map.pm.getGeomanLayers().forEach(layer => layer.removeFrom(map))
    //     featureCollection.features.forEach(feature => {
    //         if (feature?.properties.hasOwnProperty('radius') || feature?.properties.shape === 'Circle') {
    //             new L.Circle(feature.geometry.coordinates.slice().reverse(), {
    //                 radius: feature?.properties.radius,
    //                 pmIgnore: false,
    //             }).on('pm:update', handleChange).on('click', () => handleClick(feature)).addTo(map)
    //         } else {
    //             new L.GeoJSON(feature.geometry, { pmIgnore: false }).on('pm:update', handleChange).on('click', () => handleClick(feature)).addTo(map)
    //         }
    //     })
    // }, [featureCollection])