import React from 'react'
import { chckProp, imageGet, imageSysGet } from '../helpers'

export const Cover = ({ className = '', data = {}, noImg = 1087, min = false }) => {

    const image = chckProp(data, 'coverImage')
        ? data.coverImage.fileNamePreview
        : ''

    const imageMin = chckProp(data, 'coverImage')
        ? data.coverImage.fileNameThumbnail
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
