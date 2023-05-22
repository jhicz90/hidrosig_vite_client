import React from 'react'

export const OptionInputIrrig = ({ inputIrrig = null }) => {
    return (
        <div className='d-flex flex-column p-1'>
            <div className='fw-bold' style={{ fontSize: '0.75rem' }}>#{inputIrrig.code}</div>
            <div className='text-muted' style={{ fontSize: '0.75rem' }}>ESTRUCTURA DE RIEGO: {inputIrrig.structure.name}</div>
            <div className='d-flex gap-2'>
                <div className='text-muted' style={{ fontSize: '0.75rem' }}>AREA USO (Ha): {Number(inputIrrig.areaUseInput).toFixed(5)}</div>
                <div className='text-muted' style={{ fontSize: '0.75rem' }}>SISTEMA DE RIEGO: {inputIrrig.irrigSystem.name}</div>
            </div>
        </div>
    )
}
