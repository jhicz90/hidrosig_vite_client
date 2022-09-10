import React from 'react'
import { imageGet } from '../helpers'

export const OptionImage = ({ option = {}, min = true }) => {

    const image = option.hasOwnProperty('image')
        && option.image !== null
        ? option.image.fileNamePreview
        : ''

    const imageMin = option.hasOwnProperty('image')
        && option.image !== null
        ? option.image.fileNameThumbnail
        : ''

    return (
        <div className="d-flex">
            <img src={imageGet(min ? imageMin : image)} alt={option._id} width={32} />
            <span className="ms-2 align-self-center">{option.name}</span>
        </div>
    )
}
