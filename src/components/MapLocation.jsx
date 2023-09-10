import React, { memo, useEffect, useId, useRef, useState } from 'react'
import { MapContainer, TileLayer, GeoJSON, useMap, Circle } from 'react-leaflet'
import * as turf from '@turf/turf'
import { scaleZoom } from '@/helpers'

export const MapLocation = memo(function MapLocation({ className = '', geometry = [], style = {} }) {
    return (
        <div id={`wrapper-leaflet`} className={`position-relative overflow-hidden ${className}`}>
            <MapContainer
                zoomControl={true}
                center={[-4.79, -80.56]}
                zoom={13}
                scrollWheelZoom={false}
                style={{ height: '300px', ...style }}
            >
                {geometry.length > 0
                    &&
                    <CenterMap geometry={geometry.filter(g => typeof g === 'object')} />}
                <TileLayer
                    attribution={`&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors`}
                    url={`http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}`} />
                {geometry.length > 0
                    &&
                    <DrawGeo data={geometry} />}
            </MapContainer>
        </div>
    )
})

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
        <React.Fragment>
            {
                data.map(object => {
                    if (object.properties?.shape === 'Circle') {

                        const color = randomColorsMap()

                        return <Circle
                            key={`circle${object._id}`}
                            center={object.geometry.coordinates.slice().reverse()}
                            radius={object.properties.radius}
                            pmIgnore={false}
                            pathOptions={{
                                color: color,
                                weight: 2,
                                opacity: 0.9,
                                fillOpacity: 0.5
                            }}
                        />
                    } else {

                        const color = randomColorsMap()

                        return <GeoJSON
                            key={`feature${object._id}`}
                            data={object.geometry}
                            pmIgnore={false}
                            pathOptions={{
                                color: color,
                                weight: 2,
                                opacity: 0.9,
                                fillOpacity: 0.5
                            }}
                        />
                    }
                })
            }
        </React.Fragment>
    )
}

const randomColorsMap = () => {
    const colors = ['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628', '#f781bf', '#999999']
    return colors[Math.floor(Math.random() * colors.length)]
}