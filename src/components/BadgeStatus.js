import React from 'react'

export const badgeStatus = (status) => {
    switch (status) {
        case 'A':
            return <span className='badge bg-success'>Activo</span>

        case 'S':
            return <span className='badge bg-warning'>Suspendido</span>

        case 'D':
        default:
            return <span className='badge bg-secondary'>Desactivado</span>
    }
}

export const badgeActive = (status) => {
    switch (status) {
        case true:
            return <span className='badge bg-success'>Activo</span>

        case false:
        default:
            return <span className='badge bg-secondary'>Desactivado</span>
    }
}