import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { randomColor } from '../../../helpers'
import { addNewGeometry } from '../../../store/actions'

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

L.drawLocal = {
    draw: {
        toolbar: {
            // #TODO: this should be reorganized where actions are nested in actions
            // ex: actions.undo  or actions.cancel
            actions: {
                title: 'Cancelar dibujo',
                text: 'Cancelar'
            },
            finish: {
                title: 'Terminar dibujo',
                text: 'Finalizar'
            },
            undo: {
                title: 'Eliminar último punto dibujado',
                text: 'Eliminar último punto'
            },
            buttons: {
                polyline: 'Dibujar una polilínea',
                polygon: 'Dibujar un polígono',
                rectangle: 'Dibujar un rectangulo',
                circle: 'Dibujar un círculo',
                marker: 'Dibujar una marca o punto',
                circlemarker: 'Dibujar una marca circular',
            }
        },
        handlers: {
            circle: {
                tooltip: {
                    start: 'Haga clic y arrastre para dibujar un círculo.'
                },
                radius: 'Radio'
            },
            circlemarker: {
                tooltip: {
                    start: 'Haga clic en el mapa para colocar el marcador circular.'
                }
            },
            marker: {
                tooltip: {
                    start: 'Haga clic en el mapa para colocar el marcador.'
                }
            },
            polygon: {
                tooltip: {
                    start: 'Haga clic para comenzar a dibujar la forma.',
                    cont: 'Haga clic para continuar dibujando la forma.',
                    end: 'Haga clic en el primer punto para cerrar esta forma.'
                }
            },
            polyline: {
                error: '¡<strong>Error:</strong> los bordes de la forma no pueden cruzarse!',
                tooltip: {
                    start: 'Haga clic para comenzar a dibujar la línea.',
                    cont: 'Haga clic para continuar dibujando la línea.',
                    end: 'Haga clic en el último punto para terminar la línea.'
                }
            },
            rectangle: {
                tooltip: {
                    start: 'Haga clic y arrastre para dibujar un rectángulo.'
                }
            },
            simpleshape: {
                tooltip: {
                    end: 'Suelte el mouse para terminar de dibujar.'
                }
            }
        }
    },
    edit: {
        toolbar: {
            actions: {
                save: {
                    title: 'Guardar cambios',
                    text: 'Guardar'
                },
                cancel: {
                    title: 'Cancelar edición, descarta todos los cambios',
                    text: 'Cancelar'
                },
                clearAll: {
                    title: 'Borrar todas las capas',
                    text: 'Borrar todo'
                }
            },
            buttons: {
                edit: 'Editar capas',
                editDisabled: 'No hay capas para editar',
                remove: 'Eliminar capas',
                removeDisabled: 'No hay capas para eliminar'
            }
        },
        handlers: {
            edit: {
                tooltip: {
                    text: 'Arrastre o marque para editar las figuras.',
                    subtext: 'Click en cancelar para deshacer los cambios.'
                }
            },
            remove: {
                tooltip: {
                    text: 'Dar click en una figura para quitarla.'
                }
            }
        }
    }
}

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
                                                polygon: false,
                                                circlemarker: false,
                                            }}
                                            onEdited={e => console.log(e)}
                                            onCreated={e => console.log(e)}
                                            onDeleted={e => console.log(e)}
                                        />
                                        {
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
                                        }
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
