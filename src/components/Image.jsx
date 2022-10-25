import React, { useState } from 'react'
import { useEffect } from 'react'
import { imageGet, imageSysGet } from '../helpers'

export const Image = ({ className = '', style = {}, onClick = null, img = '', noImg = 2010, size = 'none', width = 0, height = 0, resSize = 0 }) => {

    const [wAvatar, setWAvatar] = useState(width)
    const [hAvatar, setHAvatar] = useState(height)

    useEffect(() => {
        if (size === 'none' && width === 0 && height === 0) {
            setWAvatar(100)
            setHAvatar(100)
        } else if (size === 'xs') {
            setWAvatar(25)
            setHAvatar(25)
        } else if (size === 'sm') {
            setWAvatar(50)
            setHAvatar(50)
        } else if (size === 'lg') {
            setWAvatar(200)
            setHAvatar(200)
        } else if (size === 'xl') {
            setWAvatar(300)
            setHAvatar(300)
        }
    }, [size, width, height])

    return (
        <img
            onClick={onClick}
            className={`${className}`}
            style={style}
            src={(img !== '' && img !== null && img !== undefined) ? imageGet(img, { size: resSize }) : imageSysGet(noImg)}
            width={wAvatar}
            height={hAvatar}
            alt={img}
            loading='lazy'
        />
    )
}