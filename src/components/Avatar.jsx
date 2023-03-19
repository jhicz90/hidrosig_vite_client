import React, { useState } from 'react'
import { useEffect } from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { imageGet, imageSysGet, upperCaseCatch } from '../helpers'

export const Avatar = ({ className = '', img = '', noImgTxt = 'USR', noImg = 2010, nameTag = false, imgTag = '', noImgTag = 1085, tag = '', circle = false, cloud = false, size = 'none', width = 0, height = 0 }) => {

    const [wAvatar, setWAvatar] = useState(width)
    const [hAvatar, setHAvatar] = useState(height)
    const nameTxt = upperCaseCatch(noImgTxt).slice(0, 2)

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
        <div className="position-relative">
            {
                (img !== '' && img !== null && img !== undefined)
                    ?
                    <img
                        className={`avatar ${circle ? "rounded-circle" : "rounded-2"} ${className}`}
                        src={img !== '' ? imageGet(img, { cloud, size: 500, thumb: true }) : imageSysGet(noImg)}
                        width={wAvatar}
                        height={hAvatar}
                        alt={img}
                    />
                    :
                    <div className={`avatar ${circle ? "rounded-circle" : "rounded-2"} ${className}`} style={{ width: wAvatar, height: hAvatar }}>
                        <span className='avatar-initials' style={{ fontSize: '80%', width: wAvatar, height: hAvatar }}>{nameTxt}</span>
                    </div>
            }
            {
                nameTag &&
                (
                    tag !== ''
                        ?
                        <OverlayTrigger
                            placement="auto"
                            overlay={
                                <Tooltip>{tag}</Tooltip>
                            }
                        >
                            <img
                                className={`avatar position-absolute translate-middle ${circle ? "rounded-circle" : "rounded-2"}`}
                                style={{ top: '75%' }}
                                src={imgTag !== '' ? imageGet(imgTag) : imageSysGet(noImgTag)}
                                width={wAvatar / 2}
                                height={hAvatar / 2}
                                alt={imgTag}
                            />
                        </OverlayTrigger>
                        :
                        <img
                            className={`avatar position-absolute translate-middle ${circle ? "rounded-circle" : "rounded-2"}`}
                            style={{ top: '75%' }}
                            src={imgTag !== '' ? imageGet(imgTag) : imageSysGet(noImgTag)}
                            width={wAvatar / 2}
                            height={hAvatar / 2}
                            alt={imgTag}
                        />
                )
            }
        </div>
    )
}
