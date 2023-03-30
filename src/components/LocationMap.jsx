import { useEffect, useRef, useState } from 'react'
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet'

export const LocationMap = ({ geometry = {}, view }) => {

    return (
        <MapContainer
            zoomControl={true}
            center={[-4.79, -80.56]}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: '300px' }}
        >
            <CenterMap view={view} />
            <TileLayer
                attribution={`&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors`}
                url={`http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}`}
            />
            <DrawGeo data={geometry} />
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

const DrawGeo = ({ data }) => {

    const geoJsonRef = useRef()

    useEffect(() => {
        if (geoJsonRef.current) {
            geoJsonRef.current.clearLayers()
            geoJsonRef.current.addData(data)
        }
    }, [geoJsonRef, data])

    return (
        <GeoJSON
            ref={geoJsonRef}
            data={data}
        />
    )
}