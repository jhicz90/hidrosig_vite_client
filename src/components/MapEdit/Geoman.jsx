import React, { useEffect, useRef } from 'react'
import { FeatureGroup } from 'react-leaflet'
import { GeomanControls } from 'react-leaflet-geoman-v2'
import { useGeoObjectStore } from '../../hooks'

import '@geoman-io/leaflet-geoman-free'
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css'

export const Geoman = () => {
    // const { mapRef, setMapRef, setFeatureCollection, addFeature, clearFeatures, featureCollection } = useGeoObjectStore()
    const ref = useRef(null)
    const { setFeatureCllc, featureCollection } = useGeoObjectStore()

    const handleChange = () => {
        const newGeo = {
            type: 'FeatureCollection',
            features: [],
        }

        const layers = ref.current?.getLayers()

        if (layers) {
            layers.forEach((layer) => {
                if (layer instanceof L.Marker) {
                    const { lat, lng } = layer.getLatLng()

                    newGeo.features.push({
                        type: 'Feature',
                        properties: {
                            shape: layer.pm.getShape()
                        },
                        geometry: {
                            type: 'Point',
                            coordinates: [lng, lat],
                        },
                    })
                } else if (layer instanceof L.Circle || layer instanceof L.CircleMarker) {
                    const { lat, lng } = layer.getLatLng()

                    newGeo.features.push({
                        type: 'Feature',
                        properties: {
                            radius: layer.getRadius(),
                            shape: layer.pm.getShape()
                        },
                        geometry: {
                            type: 'Point',
                            coordinates: [lng, lat],
                        },
                    })
                } else {
                    newGeo.features.push(layer.toGeoJSON())
                }
            })
        }

        setFeatureCllc(newGeo)
        // clearFeatures()
        // map.pm.getGeomanLayers().forEach(layer => {
        //     if (layer.pm.getShape() === 'Marker') {
        //         const { lat, lng } = layer.getLatLng()

        //         addFeature({
        //             type: 'Feature',
        //             properties: {
        //                 shape: layer.pm.getShape()
        //             },
        //             geometry: {
        //                 type: 'Point',
        //                 coordinates: [lng, lat],
        //             }
        //         })
        //     } else if (layer.pm.getShape() === 'Circle' || layer.pm.getShape() === 'CircleMarker') {
        //         const { lat, lng } = layer.getLatLng()

        //         addFeature({
        //             type: 'Feature',
        //             properties: {
        //                 radius: layer.getRadius(),
        //                 shape: layer.pm.getShape()
        //             },
        //             geometry: {
        //                 type: 'Point',
        //                 coordinates: [lng, lat],
        //             }
        //         })
        //     } else {

        //         const shapeProps = layer?.feature?.properties || {}

        //         addFeature({
        //             type: 'Feature',
        //             properties: {
        //                 ...shapeProps,
        //                 shape: layer.pm.getShape()
        //             },
        //             geometry: layer.toGeoJSON().geometry
        //         })
        //     }
        // })
    }

    useEffect(() => {
        if (featureCollection.features.length > 0) {
            L.geoJSON(featureCollection).eachLayer((layer) => {
                if (layer instanceof L.Circle) {
                    new L.Circle(layer.feature.geometry.coordinates.slice().reverse(), {
                        radius: layer.feature?.properties.radius,
                    }).addTo(ref.current)
                } else if (layer instanceof L.CircleMarker) {
                    new L.CircleMarker(layer.feature.geometry.coordinates.slice().reverse()).addTo(ref.current)
                } else {
                    ref.current?.addLayer(layer).bindPopup('Hola desde la figura')
                }
            })
        }
    }, [featureCollection])



    // useEffect(() => {
    //     map.pm.getGeomanLayers().forEach(layer => layer.removeFrom(map))
    //     featureCollection.features.forEach(feature => {
    //         if (feature?.properties.hasOwnProperty('radius') || feature?.properties.shape === 'Circle') {
    //             const circleShape = new L.Circle(feature.geometry.coordinates.slice().reverse(), {
    //                 radius: feature?.properties.radius,
    //                 pmIgnore: false,
    //             })

    //             circleShape.addTo(map)
    //         } else {
    //             const newShape = new L.GeoJSON(feature, { pmIgnore: false })

    //             newShape.bindPopup(/*html*/`
    //             <tr><td><table class='table' style='max-height: 200px; overflow-y: scroll;'>
    //             ${Object.entries(feature.properties).map(el => `<tr><td class="rgt">${el.join(":</td><td>")}</td></tr>`).join("")}
    //             </table></td></tr>
    //             `)

    //             newShape.addTo(map)
    //         }
    //     })
    // }, [featureCollection])

    return (
        <FeatureGroup
            ref={ref}
        >
            <GeomanControls
                lang={'es'}
                options={{
                    drawText: false
                }}
                globalOptions={{
                    editable: true,
                    snapDistance: 15,
                    allowSelfIntersection: false,
                    continueDrawing: false,
                    templineStyle: { color: 'rgba(0, 255, 102, 0.5)' },
                    hintlineStyle: { color: 'rgba(0, 255, 102, 0.5)', dashArray: [5, 5] },
                    pathOptions: { color: 'rgba(0, 255, 102, 0.5)' }
                }}
                // eventDebugFn={console.log}
                onCreate={handleChange}
                onChange={handleChange}
                onUpdate={handleChange}
                onEdit={handleChange}
                onMapRemove={handleChange}
                onMapCut={handleChange}
                onDragStart={handleChange}
                // onDragEnd={handleChange}
                onMarkerDragEnd={handleChange}
            />
        </FeatureGroup>
    )
}
