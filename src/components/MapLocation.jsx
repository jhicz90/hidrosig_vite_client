import { useEffect, useRef, useState } from 'react'
import { MapContainer, TileLayer, GeoJSON, useMap, Circle } from 'react-leaflet'
import { randomColor } from '../helpers'

export const MapLocation = ({ className = 'my-2', geometry = [], style = {} }) => {
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
                geometry.length > 0
                &&
                <CenterMap data={geometry} />
            }
            <TileLayer
                attribution={`&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors`}
                url={`http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}`}
            />
            {
                geometry.length > 0
                &&
                <DrawGeo data={geometry} />
            }
        </MapContainer>
    )
}

const CenterMap = ({ data = [] }) => {
    const [viewMap, setViewMap] = useState(data[0].properties)
    const map = useMap()

    useEffect(() => {
        setViewMap(data[0].properties)
    }, [data])

    map.setView([viewMap.center[1], viewMap.center[0]], viewMap.zoom)

    return null
}

const DrawGeo = ({ data = [] }) => {

    const geoJsonRef = useRef()

    useEffect(() => {
        if (geoJsonRef.current) {
            geoJsonRef.current.clearLayers()
            geoJsonRef.current.addData(data)
        }
    }, [geoJsonRef, data])

    return (
        <>
            {
                data.map(object => {
                    if (object.properties.shape === 'Circle') {
                        return <Circle
                            key={`circle${object._id}`}
                            center={object.geometry.coordinates.slice().reverse()}
                            radius={object.properties.radius}
                            pmIgnore={false}
                            pathOptions={{ fillColor: randomColor }}
                        />
                    } else {
                        return <GeoJSON
                            key={`feature${object._id}`}
                            data={object.geometry}
                            pmIgnore={false}
                            pathOptions={{ fillColor: randomColor }}
                        />
                    }
                })
            }
        </>
    )
}