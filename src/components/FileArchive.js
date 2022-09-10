import React from 'react'
import fileSize from 'filesize'
import { useProgressiveImage } from '../hooks'
import { imageGet } from '../helpers'
import { TimeAgo } from './TimeAgo'

export const FileArchive = ({ file, handleSelect = null }) => {

    const loaded = useProgressiveImage(imageGet(file.fileNameThumbnail))

    return (
        <div className="file-box">
            <div className="file">
                <div style={{ cursor: 'pointer' }} onClick={() => handleSelect(file)}>
                    <div
                        className="file-image"
                        style={{
                            width: '100%',
                            height: '200px',
                            overflow: 'hidden',
                            backgroundPosition: 'top',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            backgroundImage: `url(${loaded || ''})`
                        }}
                    />
                    <div className="file-name">
                        <span
                            className="d-inline-block text-truncate"
                            style={{
                                maxWidth: '150px',
                                fontWeight: 'bold'
                            }}>
                            {file.name}
                        </span>
                        <br />
                        <small className="d-block">
                            {
                                file.tags.map((tag, index) =>
                                    <span key={`file${file._id}tag${index + 1}`} className="badge bg-warning text-dark text-uppercase me-1">{tag}</span>
                                )
                            }
                        </small>
                        <small className="d-block">Tamaño: {fileSize(file.size !== undefined ? file.size : 0)}</small>
                        <small className="d-block">Subido el: <TimeAgo timestamp={file.createdAt} /></small>
                    </div>
                </div>
            </div>
        </div>
    )
}
