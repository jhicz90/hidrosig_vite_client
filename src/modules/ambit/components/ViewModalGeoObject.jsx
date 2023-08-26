import React, { useState } from 'react'
import { Button, Collapse, ListGroup, Offcanvas, Table } from 'react-bootstrap'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { TbMapSearch, TbZoomInArea } from 'react-icons/tb'
import { IoInformationCircleOutline, IoSaveOutline } from 'react-icons/io5'
import { centroid } from '@turf/turf'
import { Image } from '../../../components'
import { useGeoObjectStore } from '../../../hooks'
import { useAddLineMutation, useAddPointMutation, useAddPolygonMutation } from '../../../store/actions'

const SwalReact = withReactContent(Swal)

export const ViewModalGeoObject = () => {

    const [showView, setShowView] = useState(false)
    const { featureCollection } = useGeoObjectStore()

    return (
        <>
            <Button
                variant='neutral'
                size='sm'
                className='d-flex align-items-center gap-2'
                onClick={() => setShowView(v => !v)}
            >
                <TbMapSearch />
                Objetos geográficos
            </Button>
            <Offcanvas
                show={showView}
                onHide={() => setShowView(false)}
                placement='end'
            >
                <Offcanvas.Header closeButton closeVariant='white'>
                    <Offcanvas.Title>
                        Lista de objetos geográficos
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ListGroup>
                        {
                            featureCollection.features.map((f, index) =>
                                <ItemFeature
                                    key={`feature_${index}`}
                                    feature={f}
                                />
                            )
                        }
                    </ListGroup>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

const ItemFeature = ({ feature }) => {

    const { mapRef } = useGeoObjectStore()
    const [showInfo, setShowInfo] = useState(false)
    const [addPoint] = useAddPointMutation()
    const [addPolygon] = useAddPolygonMutation()
    const [addLine] = useAddLineMutation()

    const flyToCoords = (geometry) => {

        const center = centroid(geometry).geometry.coordinates.reverse()

        mapRef.flyTo(center, 15)
    }

    const handleSave = () => {
        SwalReact.fire({
            iconHtml: <Image noImg={3011} />,
            title:
                <>
                    <div className='text-uppercase'>¿Guardar este objeto?</div>
                    <div className="fs-5 fw-bold text-info mt-1">{feature?.properties?.name || feature?.properties?.shape || 'Forma'}</div>
                </>,
            html:
                <>
                    <div className='fs-5 mb-2' style={{ textAlign: 'left' }}>El modelo de esta area sera guardado, con los datos ingresados o exportados, pero tambien puede agregar alguna descripción adicional para una mejor busqueda o especificación</div>
                </>,
            showCancelButton: true,
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar',
            allowOutsideClick: false,
            customClass: {
                confirmButton: `btn btn-success`,
                cancelButton: `btn btn-neutral`,
                input: `form-control`,
                icon: `border-0 animate__animated animate__rubberBand`
            },
            input: 'textarea',
            inputAttributes: {
                autocapitalize: 'off'
            },
            buttonsStyling: false,
            reverseButtons: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                if (feature.properties.shape === 'Circle' || feature.properties.shape === 'Marker' || feature.properties.shape === 'CircleMarker') {
                    addPoint({
                        desc: result.value,
                        properties: feature.properties,
                        geometry: feature.geometry
                    })
                } else if (feature.properties.shape === 'Polygon') {
                    addPolygon({
                        desc: result.value,
                        properties: feature.properties,
                        geometry: feature.geometry
                    })
                } else if (feature.properties.shape === 'Line') {
                    addLine({
                        desc: result.value,
                        properties: feature.properties,
                        geometry: feature.geometry
                    })
                }
            }
        })
    }

    return (
        <ListGroup.Item>
            <div className='d-flex align-items-center'>
                <div
                    style={{ flexGrow: 1 }}
                >
                    {feature?.properties?.name || feature?.properties?.shape || 'Forma'}
                </div>
                <div className='d-flex gap-2'>
                    <Button
                        onClick={() => setShowInfo(v => !v)}
                        variant='neutral'
                        className='d-flex align-items-center gap-2'
                    >
                        <IoInformationCircleOutline />
                    </Button>
                    <Button
                        onClick={handleSave}
                        variant='neutral'
                        className='d-flex align-items-center gap-2'
                    >
                        <IoSaveOutline />
                    </Button>
                    <Button
                        onClick={() => flyToCoords(feature.geometry)}
                        variant='neutral'
                        className='d-flex align-items-center gap-2'
                    >
                        <TbZoomInArea />
                    </Button>
                </div>
            </div>
            <Collapse className='mt-2' in={showInfo}>
                <div>
                    <Table
                        striped
                        bordered
                        hover
                        size='sm'
                        className='mb-0'
                    >
                        <thead>
                            <tr>
                                <th>CAMPO</th>
                                <th>VALOR</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Object.entries(feature.properties).map((el, fieldIndex) =>
                                    <tr key={`${new Date().getTime()}_${fieldIndex}`}>
                                        {
                                            el.map((d, valueIndex) =>
                                                <td key={`${new Date().getTime()}_${fieldIndex}_${valueIndex}`}>{d}</td>
                                            )
                                        }
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>
                </div>
            </Collapse>
        </ListGroup.Item>
    )
}