import React, { useEffect } from 'react'
import { useMap } from 'react-leaflet'
import { GeomanControls } from 'react-leaflet-geoman-v2'
import { useGeoObjectStore } from '../../hooks'

import '@geoman-io/leaflet-geoman-free'
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css'

export const Geoman = () => {
    const map = useMap()
    const { addFeature, clearFeatures, featureCollection } = useGeoObjectStore()

    const handleCreate = () => {
        clearFeatures()
        map.pm.getGeomanLayers().forEach(layer => {
            if (layer.pm.getShape() === 'Marker') {
                const { lat, lng } = layer.getLatLng()

                addFeature({
                    type: 'Feature',
                    properties: {
                        shape: layer.pm.getShape()
                    },
                    geometry: {
                        type: 'Point',
                        coordinates: [lng, lat],
                    }
                })
            } else if (layer.pm.getShape() === 'Circle' || layer.pm.getShape() === 'CircleMarker') {
                const { lat, lng } = layer.getLatLng()

                addFeature({
                    type: 'Feature',
                    properties: {
                        radius: layer.getRadius(),
                        shape: layer.pm.getShape()
                    },
                    geometry: {
                        type: 'Point',
                        coordinates: [lng, lat],
                    }
                })
            } else {

                const shapeProps = layer?.feature?.properties || {}

                addFeature({
                    type: 'Feature',
                    properties: {
                        ...shapeProps,
                        shape: layer.pm.getShape()
                    },
                    geometry: layer.toGeoJSON().geometry
                })
            }
        })
    }

    useEffect(() => {
        map.pm.getGeomanLayers().forEach(layer => layer.removeFrom(map))
        featureCollection.features.forEach(feature => {
            if (feature?.properties.hasOwnProperty('radius') || feature?.properties.shape === 'Circle') {
                const circleShape = new L.Circle(feature.geometry.coordinates.slice().reverse(), {
                    radius: feature?.properties.radius,
                    pmIgnore: false,
                })

                circleShape.addTo(map)
            } else {
                const newShape = new L.GeoJSON(feature, { pmIgnore: false })

                newShape.bindPopup(/*html*/`
                <tr><td><table class='table' style='max-height: 200px; overflow-y: scroll;'>
                ${Object.entries(feature.properties).map(el => `<tr><td class="rgt">${el.join(":</td><td>")}</td></tr>`).join("")}
                </table></td></tr>
                `)

                newShape.addTo(map)
            }
        })
    }, [featureCollection])

    return (
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
            onCreate={handleCreate}
        />
    )
}
