import React from 'react'
import * as turf from '@turf/turf'

export const OptionGeometry = ({ geo = null, simple = false }) => {
    return (
        <div className='d-flex flex-column w-100'>
            <div className='text-primary' style={{ fontWeight: 'bold' }}>{geo.code}</div>
            <div className='row mt-0 gy-1 gx-0' style={{ fontSize: '12px' }}>
                {
                    geo.desc.length > 0
                    &&
                    <React.Fragment>
                        <div className='col-4 col-xl-4 fw-bold'>
                            DESCRIPCIÓN
                        </div>
                        <div className='col-8 col-xl-8'>
                            {geo.desc.substring(0, 60)}{geo.desc.length > 60 && '...'}
                        </div>
                    </React.Fragment>
                }
                {
                    !simple && geo.geometry.type === 'Polygon'
                    &&
                    <React.Fragment>
                        <div className='col-4 col-xl-4 fw-bold'>
                            PERIMETRO (metros):
                        </div>
                        <div className='col-8 col-xl-8'>
                            {turf.length(turf.polygonToLine(geo.geometry), { units: 'meters' }).toFixed(2)}
                        </div>
                        <div className='col-4 col-xl-4 fw-bold'>
                            ÁREA (metros cuadrados):
                        </div>
                        <div className='col-8 col-xl-8'>
                            {turf.area(geo.geometry).toFixed(2)}
                        </div>
                        <div className='col-4 col-xl-4 fw-bold'>
                            ÁREA (hectareas):
                        </div>
                        <div className='col-8 col-xl-8'>
                            {(turf.area(geo.geometry) * 0.0001).toFixed(2)}
                        </div>
                    </React.Fragment>
                }
                {
                    !simple && geo.geometry.type === 'LineString'
                    &&
                    <React.Fragment>
                        <div className='col-4 col-xl-4 fw-bold'>
                            PERIMETRO (metros):
                        </div>
                        <div className='col-8 col-xl-8'>
                            {turf.length(geo.geometry, { units: 'meters' }).toFixed(2)}
                        </div>
                    </React.Fragment>
                }
                <div className='col-4 col-xl-4 fw-bold'>
                    SUBIDO POR:
                </div>
                <div className='col-8 col-xl-8'>
                    {!!geo.createdBy ? `${geo.createdBy?.names} ${geo.createdBy?.surnames}` : 'No puede especificar el usuario o ya no existe'}
                </div>
                <div className='col-4 col-xl-4 fw-bold'>
                    CREADO POR:
                </div>
                <div className='col-8 col-xl-8'>
                    {geo.createdByName}
                </div>
            </div>
        </div>
    )
}