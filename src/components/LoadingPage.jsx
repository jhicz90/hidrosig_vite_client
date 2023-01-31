import React from 'react'
import { MoonLoader, PuffLoader } from 'react-spinners'

export const LoadingPage = () => {
    return (
        <div className='d-flex flex-column align-items-center justify-content-center my-5'>
            <PuffLoader size={80} color='#1f6bff' />
        </div>
    )
}
