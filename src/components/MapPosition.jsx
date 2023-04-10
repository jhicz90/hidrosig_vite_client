import { useState } from 'react'
import { MapContainer, Marker, Polyline, TileLayer, useMap } from 'react-leaflet'

import L from 'leaflet'

const polyline = [[51.505, -0.09], [51.507, -0.08], [51.51, -0.06]]

export const MapPosition = ({ className = 'my-2', geometry = [], view = {}, style = {} }) => {

    const [markerPosition, setMarkerPosition] = useState([51.505, -0.09])

    return (
        <MapContainer
            className={className}
            zoomControl={true}
            center={[-4.79, -80.56]}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: '300px', ...style }}
        >
            {
                Object.keys(view).length > 0
                &&
                <CenterMap view={view} />
            }
            <TileLayer
                attribution={`&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors`}
                url={`http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}`}
            />
            <Polyline positions={polyline} />
            <Marker
                autoPanPadding={[0, 0]}
                position={markerPosition}
                draggable={true}
                eventHandlers={
                    {
                        dragend: function (e) {
                            const latlng = e.target.getLatLng()
                            const bounds = L.latLngBounds(polyline)
                            if (!bounds.contains(latlng)) {
                                e.target.setLatLng(markerPosition)
                            } else {
                                setMarkerPosition(latlng)
                            }
                        }
                    }
                }
            />
        </MapContainer>
    )
}

const CenterMap = ({ view }) => {
    const [viewMap, setViewMap] = useState(view)
    const map = useMap()

    useEffect(() => {
        setViewMap(view)
    }, [view])

    map.setView([viewMap?.center[1], viewMap?.center[0]], viewMap?.zoom)

    return null
}