import React, { useState } from 'react'
import { useEffect } from 'react'
import { imageGet, imageSysGet } from '../helpers'

export const NameTag = ({ className = '', nameTag = '', img, noImg = 1085, size = 'none' }) => {

    const [wAvatar, setWAvatar] = useState(50)
    const [hAvatar, setHAvatar] = useState(50)
    
    useEffect(() => {
        if (size === 'none') {
            setWAvatar(36)
            setHAvatar(36)
        } else if (size === 'xs') {
            setWAvatar(24)
            setHAvatar(24)
        } else if (size === 'sm') {
            setWAvatar(48)
            setHAvatar(48)
        } else if (size === 'lg') {
            setWAvatar(64)
            setHAvatar(64)
        } else if (size === 'xl') {
            setWAvatar(80)
            setHAvatar(80)
        }
    }, [size])

    return (
        <>
            <span className={`badge rounded-pill bg-primary p-0 ${className}`}>
                <img
                    className="avatar rounded-circle"
                    style={{ margin: '1px' }}
                    src={img !== '' ? imageGet(img) : imageSysGet(noImg)}
                    width={wAvatar}
                    height={hAvatar}
                    alt={img}
                />
                <span
                    className="d-inline-block text-truncate"
                    style={{
                        margin: '0 10px',
                        verticalAlign: 'middle',
                        fontSize: '1rem',
                        fontWeight: '400',
                        maxWidth: '132px'
                    }}
                >
                    {nameTag}
                </span>
            </span>
        </>
    )
}
