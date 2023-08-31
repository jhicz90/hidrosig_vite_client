import { useEffect, useId, useRef, useState } from 'react'
import { MapContainer, TileLayer, GeoJSON, useMap, Circle } from 'react-leaflet'
import * as turf from '@turf/turf'
import { randomColor, scaleZoom } from '../helpers'

export const MapLocation = ({ id = useId(), className = '', geometry = [], style = {} }) => {

    useEffect(() => {
        const windowResizeEvent = () => {
            const wrapperElement = document.getElementById(`wrapper-leaflet-${id}`)
            const elemWidth = wrapperElement.offsetWidth
            const elemHeight = wrapperElement.offsetHeight

            document.getElementById(`${id}`).style.width = elemWidth
            document.getElementById(`${id}`).style.height = elemHeight
            // document.getElementById(`${id}`).invalidateSize()
        }

        window.onresize = windowResizeEvent
    }, [])

    return (
        <div id={`wrapper-leaflet-${id}`} className={`position-relative overflow-hidden ${className}`}>
            <MapContainer
                id={id}
                zoomControl={true}
                center={[-4.79, -80.56]}
                zoom={13}
                scrollWheelZoom={false}
                style={{ height: '300px', ...style }}
            >
                {
                    geometry.length > 0
                    &&
                    <CenterMap geometry={geometry.filter(g => typeof g === 'object')} />
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
        </div>
    )
}

const CenterMap = ({ geometry = [] }) => {
    const geometrys = turf.featureCollection(geometry.map(g => ({ ...g.geometry, properties: g.properties })))
    const zoom = scaleZoom(geometry.map(g => turf.area(turf.bboxPolygon(turf.bbox(g.geometry)))).reduce((p, a) => p + a, 0) / geometry.length)
    const [viewMap, setViewMap] = useState(turf.center(turf.explode(geometrys)).geometry.coordinates)
    const map = useMap()

    useEffect(() => {
        setViewMap(turf.center(turf.explode(geometrys)).geometry.coordinates)
    }, [geometry])

    // map.fitWorld()
    map.setView([viewMap[1], viewMap[0]], zoom)

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
                    if (object.properties?.shape === 'Circle') {
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