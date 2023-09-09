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