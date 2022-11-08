import React from 'react'
import { MoonLoader } from 'react-spinners'

export const LoadingPage = () => {
    return (
        <div className='d-flex flex-column align-items-center justify-content-center my-5'>
            <h4 className='mb-3'>Cargando...</h4>
            <MoonLoader color='#1f6bff' />
        </div>
    )
}
