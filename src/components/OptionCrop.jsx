import React from 'react'

export const OptionCropVariety = ({ crop: variety = null }) => {
    return (
        <div className='d-flex flex-column p-1'>
            {
                variety.hasOwnProperty('nameCropVariety')
                    ?
                    <div>{variety.nameCropVariety}</div>
                    :
                    <>
                        <div className='fw-bold'>{variety.crop.name}</div>
                        <div className='text-muted' style={{ fontSize: '0.75rem' }}>{variety.name}</div>
                    </>
            }
        </div>
    )
}
