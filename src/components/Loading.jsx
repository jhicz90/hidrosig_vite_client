import React from 'react'
import { ScaleLoader } from 'react-spinners'

export const Loading = () => {
    return (
        <div className="spinner-wrapper">
            <div className="loading top-50 start-50 translate-middle">
                <h4>Cargando...</h4>
                <ScaleLoader color='#1f6bff' height={90} width={15} margin={6} />
            </div>
        </div>
    )
}
