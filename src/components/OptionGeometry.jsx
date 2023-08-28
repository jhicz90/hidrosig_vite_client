import React from 'react'

export const OptionGeometry = ({ geo = null, simple = false }) => {
    return (
        <div className='d-flex flex-column w-100'>
            <div style={{ fontWeight: 'bold' }}>{geo.code}</div>
            <div style={{ fontSize: '12px' }}>
                {
                    geo.desc.length > 0
                    &&
                    <div className='row'>
                        <div className='col-3'>
                            Descripción:
                        </div>
                        <div className='col-9'>
                            {geo.desc.substring(0, 60)}{geo.desc.length > 60 && '...'}
                        </div>
                    </div>
                }
                {
                    !simple
                    &&
                    <React.Fragment>
                        <div className='row'>
                            <div className='col-3'>
                                Perimetro (metros):
                            </div>
                            <div className='col-9'>
                                {geo.view?.perimeter}
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-3'>
                                Área (metros cuadrados):
                            </div>
                            <div className='col-9'>
                                {geo.view?.areaM2}
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-3'>
                                Área (hectareas):
                            </div>
                            <div className='col-9'>
                                {geo.view?.areaHa}
                            </div>
                        </div>
                    </React.Fragment>
                }
                <div className='row'>
                    <div className='col-3'>
                        Subido por:
                    </div>
                    <div className='col-9'>
                        {!!geo.createdBy ? `${geo.createdBy?.names} ${geo.createdBy?.surnames}` : 'No puede especificar el usuario o ya no existe'}
                    </div>
                </div>
                <div className='row'>
                    <div className='col-3'>
                        Creado por:
                    </div>
                    <div className='col-9'>
                        {geo.createdByName}
                    </div>
                </div>
            </div>
        </div>
    )
}