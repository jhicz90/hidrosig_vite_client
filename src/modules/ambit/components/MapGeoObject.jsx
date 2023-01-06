import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ControlUiMap } from '../../../types'
import { formatLatLng, randomColor } from '../../../helpers'
import { addNewGeometry, deleteGeometryById } from '../../../store/actions'

import L from 'leaflet'
import { MapContainer, TileLayer, FeatureGroup, ZoomControl, Polygon, Polyline, Marker } from 'react-leaflet'
import { EditControl } from 'react-leaflet-draw'

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

    const dispatch = useDispatch()
    const { featureCollection } = useSelector(state => state.geoobject)

    return (
        <div className='container-fluid g-0'>
            <div className='row g-0'>
                <div className='col-12'>
                    <div className='container-fluid p-0'>
                        <div className='row g-0'>
                            <div className='col-12'>
                                <MapContainer zoomControl={false} center={[-4.79, -80.56]} zoom={13} scrollWheelZoom={true} style={{ height: 'calc(100vh - 140px)' }}>
                                    <TileLayer
                                        attribution={`&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors`}
                                        url={`http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}`}
                                    />
                                    <ZoomControl zoomInTitle='Acercar' zoomOutTitle='Alejar' />
                                    <FeatureGroup>
                                        <EditControl
                                            position='topright'
                                            draw={{
                                                // rectangle: {
                                                //     shapeOptions: {
                                                //         color: '#ffffff'
                                                //     }
                                                // },
                                                rectangle: false,
                                                circle: false,
                                                // polygon: false,
                                                circlemarker: false,
                                            }}
                                            onEdited={e => console.log(e)}
                                            onCreated={e => {
                                                console.log('NUEVO', e)
                                                dispatch(addNewGeometry({
                                                    id: e.layer._leaflet_id,
                                                    type: e.layerType,
                                                    typeGeoObj: 'LineString',
                                                    coord: e.layer._latlngs,
                                                    coordGeoObj: formatLatLng(e.layer._latlngs || [])
                                                }))
                                            }}
                                            onDeleted={e => {
                                                dispatch(deleteGeometryById(Object.getOwnPropertyNames(e.layers._layers)))
                                            }}
                                        />
                                        {/* {
                                            featureCollection.length > 0
                                            &&
                                            featureCollection.map((sh, i) => {
                                                if (i < 30) {
                                                    if (sh.type === 'Polygon') {
                                                        return (
                                                            <Polygon
                                                                key={`polygon_shape_${i}`}
                                                                pathOptions={{ color: sh.color }}
                                                                positions={sh.coord}
                                                                eventHandlers={{
                                                                    click: () => {
                                                                        dispatch(addNewGeometry({ type: sh.type, coord: sh.coord }))
                                                                    }
                                                                }}>
                                                            </Polygon>
                                                        )
                                                    } else if (sh.type === 'LineString') {
                                                        return <Polyline key={`polyline_shape_${i}`} pathOptions={{ color: randomColor }} positions={sh.coord} />
                                                    } else if (sh.type === 'Point') {
                                                        return <Marker key={`marker_shape_${i}`} pathOptions={{ color: randomColor }} position={sh.coord} />
                                                    } else {
                                                        return null
                                                    }
                                                } else {
                                                    return null
                                                }
                                            })
                                        } */}
                                    </FeatureGroup>
                                </MapContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
