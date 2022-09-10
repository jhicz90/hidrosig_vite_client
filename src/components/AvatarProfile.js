import React from 'react'
import { chckProp, imageGet, imageSysGet } from '../helpers'

export const AvatarProfile = ({ className = '', data = {}, noImg = 1086, min = false }) => {

    const image = chckProp(data, 'image')
        ? data.image.fileNamePreview
        : ''

    const imageMin = chckProp(data, 'image')
        ? data.image.fileNameThumbnail
        : ''

    return (
        <img
            className={`${className}`}
            src={(image !== '' && image !== null && image !== undefined) ? imageGet(min ? imageMin : image) : imageSysGet(noImg)}
            alt={image}
            loading={'lazy'}
        />
    )
}