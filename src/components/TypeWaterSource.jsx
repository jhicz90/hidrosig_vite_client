import React from 'react'
import { imageSysGet } from '../helpers/ResourceRoute'

export const TypeWaterSource = ({ type = 1, size = '36px' }) => {
    return (
        <>
            {
                {
                    1: <img src={imageSysGet(3029)} style={{ width: size, height: size }} />,
                    2: <img src={imageSysGet(3035)} style={{ width: size, height: size }} />,
                    3: <img src={imageSysGet(3034)} style={{ width: size, height: size }} />,
                    4: <img src={imageSysGet(3033)} style={{ width: size, height: size }} />,
                    5: <img src={imageSysGet(3032)} style={{ width: size, height: size }} />,
                    6: <img src={imageSysGet(3031)} style={{ width: size, height: size }} />,
                    7: <img src={imageSysGet(3030)} style={{ width: size, height: size }} />,
                }[type] || <img src={imageSysGet(3028)} style={{ width: size, height: size }} />
            }
        </>
    )
}
