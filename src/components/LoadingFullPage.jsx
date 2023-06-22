import React from 'react'
import { ScaleLoader } from 'react-spinners'

export const LoadingFullPage = () => {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '100%', position: 'fixed', top: '0px', bottom: '0px', left: '0px', right: '0px', zIndex: '2000', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <h4 className="ui-text-light-grey">Cargando...</h4>
            <ScaleLoader color='#1f6bff' height={90} width={15} margin={6} />
        </div>
    )
}
