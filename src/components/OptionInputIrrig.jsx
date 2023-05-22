import React from 'react'

export const OptionInputIrrig = ({ inputIrrig = null, e = true, a = true, s = true }) => {
    return (
        <div className='d-flex flex-column p-1'>
            <div className='fw-bold' style={{ fontSize: '0.75rem' }}>#{inputIrrig.code}</div>
            {
                e
                &&
                <div className='text-muted' style={{ fontSize: '0.75rem' }}>ESTRUCTURA DE RIEGO: {inputIrrig.structure.name}</div>
            }
            {
                a
                &&
                <div className='text-muted' style={{ fontSize: '0.75rem' }}>AREA USO (Ha): {Number(inputIrrig.areaUseInput).toFixed(5)}</div>
            }
            {
                s
                &&
                <div className='text-muted' style={{ fontSize: '0.75rem' }}>SISTEMA DE RIEGO: {inputIrrig.irrigSystem.name}</div>
            }
        </div>
    )
}
