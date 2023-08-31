import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Alert, Button, Card } from 'react-bootstrap'
import { InputSearch, MapLocation, OptionGeometry } from '../../../components'
import { useGetFarmByIdQuery, useLazyGetListPolygonQuery, useUpdateFarmByIdMutation } from '../../../store/actions'

export const AreaFarmAreaGeometry = () => {

    const { prpid } = useParams()
    const { data = null } = useGetFarmByIdQuery(prpid)
    const [searchArea, { data: optionsAreas = [], isFetching: isLoadingSearchArea }] = useLazyGetListPolygonQuery()
    const [updateFarm, { isLoading: isUpdating }] = useUpdateFarmByIdMutation()
    const [search, setSearch] = useState('')
    const [feature, setFeature] = useState(null)

    const handleUpdate = (feature) => {
        updateFarm({
            id: prpid,
            farm: { feature }
        })
    }

    useEffect(() => {
        setFeature(data.feature)
    }, [data])

    return (
        <React.Fragment>
            <div className='row g-2'>
                <div className='col-12 col-lg-6'>
                    {
                        !!feature
                        &&
                        <React.Fragment>
                            <Alert className='mb-2'>
                                El area geográfica se usa como referencia de ubicación y limiticacion del área del predio, recordar que el área tiene que tener concordancia con la toma de riego
                            </Alert>
                            <Card className='mb-2'>
                                <Card.Body>
                                    <OptionGeometry geo={feature} />
                                </Card.Body>
                            </Card>
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
                        </React.Fragment>
                    }
                </div>
                <div className='col-12 col-lg-6'>
                    <div className='row'>
                        <div className='col-12'>
                            <InputSearch
                                className='mb-2'
                                value={search}
                                onChange={(e) => {
                                    if (e.trim() !== '') searchArea(e)
                                    setSearch(e)
                                }}
                                placeholder='Buscar areas...'
                                loading={isLoadingSearchArea}
                            />
                        </div>
                    </div>
                    <div className='row row-cols-1 g-2'>
                        {
                            optionsAreas.filter(a => a._id !== feature?._id).map(area =>
                                <div key={area._id} className='col'>
                                    <Card>
                                        <div className='row g-0'>
                                            <div className='col-4'>
                                                {
                                                    !!area
                                                    &&
                                                    <MapLocation
                                                        className='rounded-start'
                                                        geometry={
                                                            [
                                                                { ...area }
                                                            ]
                                                        }
                                                        style={{
                                                            height: '250px'
                                                        }}
                                                    />
                                                }
                                            </div>
                                            <div className='col-8 d-flex flex-column justify-content-between'>
                                                <div className='d-flex flex-column justify-content-between p-2 h-100'>
                                                    <OptionGeometry geo={area} />
                                                    <Button
                                                        onClick={() => {
                                                            handleUpdate(area._id)
                                                        }}
                                                        disabled={isUpdating}
                                                        size='sm'
                                                        className='mt-2 w-100'
                                                    >
                                                        Seleccionar Area
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
