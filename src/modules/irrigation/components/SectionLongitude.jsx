import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Alert, Card } from 'react-bootstrap'
import { LineGeometryUpdateInSection } from '.'
import { MapLocation, OptionGeometry } from '@/components'
import { sectionApi } from '@/store/actions'

export const SectionLongitude = () => {

    const { sectid } = useParams()
    const { data = null } = useSelector(sectionApi.endpoints.getSectionById.select(sectid))
    const [feature, setFeature] = useState(null)

    useEffect(() => {
        setFeature(data.feature)
    }, [data])

    return (
        <React.Fragment>
            <div className='container-flex-stack'>
                <div className='d-flex flex-row-reverse justify-content-between align-items-center flex-wrap gap-2'>
                    <LineGeometryUpdateInSection section={sectid} />
                </div>
                <div className='row'>
                    {
                        !!feature
                            ?
                            <React.Fragment>
                                <div className='col-12 col-lg-6'>
                                    <Alert className='mb-2'>
                                        La linea geográfica se usa como referencia de ubicación y dirección del canal.
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
                                            No ahi linea geografica en este tramo
                                        </h3>
                                    </div>
                                </div>
                            </div>
                    }
                </div>
            </div>
            {/* <form id='form-irrigation-section-longitude' onSubmit={handleSubmit(handleUpdate)}>
                <div className='row'>
                    <div className='col-12'>
                        <Form.Group className='mb-3' controlId='pFeature'>
                            <Form.Label>Área geográfica</Form.Label>
                            <Controller
                                name='feature'
                                control={control}
                                render={({ field }) =>
                                    <AsyncSelect
                                        {...field}
                                        inputId='pFeature'
                                        classNamePrefix='rc-select'
                                        styles={{
                                            control: (baseStyles, state) => ({
                                                ...baseStyles,
                                                minHeight: '150px',
                                            }),
                                        }}
                                        isClearable
                                        defaultOptions
                                        cacheOptions
                                        loadOptions={searchLineStringObject}
                                        menuPlacement={'auto'}
                                        placeholder={`Buscar...`}
                                        loadingMessage={({ inputValue }) => `Buscando '${inputValue}'`}
                                        noOptionsMessage={({ inputValue }) => `Sin resultados con ...${inputValue}`}
                                        getOptionValue={e => e._id}
                                        getOptionLabel={e => <OptionGeometry geo={e} />}
                                    />
                                }
                            />
                        </Form.Group>
                    </div>
                </div>
                {
                    !!watch('feature')
                    &&
                    <MapLocation
                        geometry={
                            [
                                watch('feature')
                            ]
                        }
                    />
                }
                <div className='d-flex justify-content-end gap-2'>
                    <Button
                        disabled={isUpdating}
                        variant='primary'
                        type='submit'
                    >
                        Guardar cambios
                    </Button>
                </div>
            </form> */}
        </React.Fragment>
    )
}
