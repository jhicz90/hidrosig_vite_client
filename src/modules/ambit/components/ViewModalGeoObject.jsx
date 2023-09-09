import React, { useState } from 'react'
import { Button, Collapse, ListGroup, Offcanvas, Table } from 'react-bootstrap'
import { TbMapSearch, TbZoomInArea } from 'react-icons/tb'
import { PiPolygonBold } from 'react-icons/pi'
import { IoInformationCircleOutline, IoSaveOutline } from 'react-icons/io5'
import { centroid, cleanCoords, lineString, lineToPolygon } from '@turf/turf'
import { useGeoObjectStore } from '@/hooks'
import { } from '@/store/actions'
import _ from 'lodash'

export const ViewModalGeoObject = () => {

    const [show, setShow] = useState(false)
    const { featureCollection } = useGeoObjectStore()

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    return (
        <>
            <Button
                variant='neutral'
                size='sm'
                className='d-flex align-items-center gap-2'
                onClick={handleShow}
            >
                <TbMapSearch />
                Objetos geográficos
            </Button>
            <Offcanvas
                show={show}
                onHide={handleClose}
                placement='end'
                backdrop='static'
                enforceFocus={false}
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
                                    index={index}
                                />
                            )
                        }
                    </ListGroup>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

const ItemFeature = ({ index, feature }) => {

    const { mapRef, questionAddShape, setFeatureByIndex } = useGeoObjectStore()
    const [showInfo, setShowInfo] = useState(false)

    const flyToCoords = (geometry) => {

        const center = centroid(geometry).geometry.coordinates.reverse()

        mapRef.flyTo(center, 15)
    }

    const convertToPolygon = () => {
        const line = lineString(cleanCoords(feature).geometry.coordinates, { ...feature.properties })
        const newPolygon = lineToPolygon(line, { orderCoords: false, mutate: true })
        setFeatureByIndex(index, { shape: 'Polygon' }, cleanCoords(newPolygon).geometry)
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
                    {
                        feature.geometry.type === 'LineString'
                        &&
                        <Button
                            onClick={convertToPolygon}
                            variant='neutral'
                            className='d-flex align-items-center gap-2'
                        >
                            <PiPolygonBold />
                        </Button>
                    }
                    <Button
                        onClick={() => questionAddShape(feature)}
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
                    {/* <Table
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
                    </Table> */}
                </div>
            </Collapse>
        </ListGroup.Item>
    )
}

function findDuplicates(coords) {
    var orginal = _.flatten(coords, true)
    var flattened = _.flatten(coords, true);
    var repeats = [];

    do {
        var point = flattened.shift();

        _.each(flattened, function (testPoint) {
            if (testPoint[0] == point[0] && testPoint[1] == point[1]) {
                repeats.push(point);
            }
        });
    } while (flattened.length > 0);

    repeats = orginal.filter(f => !repeats.includes(f))

    return repeats;
}