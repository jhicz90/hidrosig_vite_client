import React from 'react'

export const TypeWaterSource = ({ type = 1, size = 36 }) => {
    return (
        <>
            {
                {
                    1: <img className='me-2' src='https://img.icons8.com/color/512/dam.png' width={size} height={size} />,
                    2: <img className='me-2' src='https://img.icons8.com/color/512/valley.png' width={size} height={size} />,
                    3: <img className='me-2' src='https://img.icons8.com/color/512/rain--v1.png' width={size} height={size} />,
                    4: <img className='me-2' src='https://img.icons8.com/color/512/hand-dug-well.png' width={size} height={size} />,
                    5: <img className='me-2' src='https://img.icons8.com/color/512/pumphouse.png' width={size} height={size} />,
                    6: <img className='me-2' src='https://img.icons8.com/color/512/water-treatment-plant.png' width={size} height={size} />,
                    7: <img className='me-2' src='https://img.icons8.com/color/512/flow.png' width={size} height={size} />,
                }[type] || <img className='me-2' src='https://img.icons8.com/color/512/water-element.png' width={size} height={size} />
            }
        </>
    )
}
