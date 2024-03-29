import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Alert, Card } from 'react-bootstrap'
import { AreaGeometryUpdateInAreaFarm } from '.'
import { MapLocation, OptionGeometry } from '@/components'
import { farmApi } from '@/store/actions'

export const AreaFarmAreaGeometry = () => {

    const { prpid } = useParams()
    const { data = null } = useSelector(farmApi.endpoints.getFarmById.select(prpid))
    const [feature, setFeature] = useState(null)

    useEffect(() => {
        setFeature(data.feature)
    }, [data])

    return (
        <React.Fragment>
            <div className='container-flex-stack'>
                <div className='d-flex flex-row-reverse justify-content-between align-items-center flex-wrap gap-2'>
                    <AreaGeometryUpdateInAreaFarm farm={prpid} />
                </div>
                <div className='row'>
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
            </div>
        </React.Fragment>
    )
}
