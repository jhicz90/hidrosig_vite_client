import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Alert, Button, Card } from 'react-bootstrap'
import { InputSearch, MapLocation, OptionGeometry } from '../../../components'
import { useGetFarmByIdQuery, useLazyGetListPolygonQuery, useUpdateFarmByIdMutation } from '../../../store/actions'
import { AreaGeometryUpdateInAreaFarm } from '.'

export const AreaFarmAreaGeometry = () => {

    const { prpid } = useParams()
    const { data = null } = useGetFarmByIdQuery(prpid)
    const [feature, setFeature] = useState(null)

    useEffect(() => {
        setFeature(data.feature)
    }, [data])

    return (
        <React.Fragment>
            <div className='row'>
                <div className='col-12'>
                    <div className='d-flex flex-row-reverse justify-content-between align-items-center flex-wrap gap-2'>
                        <AreaGeometryUpdateInAreaFarm farm={prpid} />
                    </div>
                </div>
            </div>
            <div className='row my-2'>
                {
                    !!feature
                        ?
                        <React.Fragment>
                            <div className='col-12 col-lg-6'>
                                <Alert className='mb-2'>
                                    El area geográfica se usa como referencia de ubicación y limiticacion del área del predio, recordar que el área tiene que tener concordancia con la toma de riego
                                </Alert>
                                <Card className='mb-2'>
                                    <Card.Body>
                                        <OptionGeometry geo={feature} />
                                    </Card.Body>
                                </Card>
                            </div>
                            <div className='col-12 col-lg-6'>
                                <MapLocation
                                    geometry={
                                        [
                                            feature
                                        ]
                                    }
                                    className='rounded shadow'
                                    style={{
                                        height: '400px'
                                    }}
                                />
                            </div>
                        </React.Fragment>
                        :
                        <div className='col-12'>
                            <div className='card' style={{ minHeight: '200px' }}>
                                <div className='card-body'>
                                    <h3 className='position-absolute top-50 start-50 translate-middle text-center'>
                                        No ahi superficie en este predio
                                    </h3>
                                </div>
                            </div>
                        </div>
                }
            </div>
        </React.Fragment>
    )
}
