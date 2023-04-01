export const OptionGeometry = ({ geo = null }) => {
    return (
        <div className='d-flex flex-column w-100'>
            <div style={{ fontWeight: 'bold' }}>{geo.code}</div>
            <div style={{ fontSize: '12px' }}>
                {
                    geo.desc.length > 0
                    &&
                    <div className='row'>
                        <div className='col-2'>
                            Descripción:
                        </div>
                        <div className='col-10'>
                            {geo.desc.substring(0, 60)}{geo.desc.length > 60 && '...'}
                        </div>
                    </div>
                }
                <div className='row'>
                    <div className='col-2'>
                        Perimetro (metros):
                    </div>
                    <div className='col-10'>
                        {geo.view.perimeter}
                    </div>
                </div>
                <div className='row'>
                    <div className='col-2'>
                        Área (metros cuadrados):
                    </div>
                    <div className='col-10'>
                        {geo.view.areaM2}
                    </div>
                </div>
                <div className='row'>
                    <div className='col-2'>
                        Área (hectareas):
                    </div>
                    <div className='col-10'>
                        {geo.view.areaHa}
                    </div>
                </div>
                <div className='row'>
                    <div className='col-2'>
                        Subido por:
                    </div>
                    <div className='col-10'>
                        {!!geo.createdBy ? `${geo.createdBy?.names} ${geo.createdBy?.surnames}` : 'No puede especificar el usuario o ya no existe'}
                    </div>
                </div>
                <div className='row'>
                    <div className='col-2'>
                        Creado por:
                    </div>
                    <div className='col-10'>
                        {geo.createdByName}
                    </div>
                </div>
            </div>
        </div>
    )
}