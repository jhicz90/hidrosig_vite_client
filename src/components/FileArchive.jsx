import { useState, useEffect } from 'react'
import { filesize } from 'filesize'
import { prominent } from 'color.js'
import moment from 'moment'

import backTransparent from '../assets/backTransparent.png'
import { imageGet } from '../helpers'

export const FileArchive = ({ file = null, action = null, selected = false }) => {

    const file_Resource = file.resource
    const file_Name = file_Resource.fileName
    const file_Name_Ext = `${file_Resource.fileName}.${file_Resource.format}`
    const file_Size = file_Resource.bytes
    const thumbnailUrl = imageGet(file_Name, { size: 200 })

    const [backColor, setBackColor] = useState('rgb(200, 200, 200)')

    useEffect(() => {
        prominent(thumbnailUrl, { amount: 1 }).then(color => {
            if (color[0] === 0 && color[1] === 0 && color[2] === 0) {
                setBackColor(`url(${backTransparent})`)
            } else {
                setBackColor(`rgb(${color.join(',')})`)
            }
        })
    }, [thumbnailUrl])

    return (
        <div
            onClick={action}
            className="file"
            style={{
                boxShadow: `0 0 0 0.25rem ${selected ? '#0d6efd' : '#e9ecef'}`,
                borderRadius: '0.375rem',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#f0f0f0ad',
                overflow: 'hidden',
                width: '230px',
                height: '230px',
            }}
        >
            <div style={{
                flexGrow: 1,
                display: 'flex',
                background: backColor,
                borderRadius: '0.375rem 0.375rem 0 0',
            }} >
                <div style={{
                    flexGrow: 1,
                    backgroundImage: `url("${thumbnailUrl}")`,
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'contain',
                }} />
            </div>
            <div style={{
                fontSize: '12px',
                textAlign: 'center',
                wordBreak: 'break-word',
                padding: '0.5rem',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxHeight: '45px',
                color: selected ? '#0d6efd' : 'inherit'
            }}>
                <span
                    className='fw-semibold'
                    style={{
                        backgroundColor: 'transparent',
                        textDecoration: 'none',
                        padding: '2px 4px',
                        borderRadius: '3px'
                    }}
                    title={file_Name_Ext}
                >
                    {file_Name_Ext}
                </span>
            </div>
            <div style={{
                display: 'flex',
                padding: '4px 6px',
                fontSize: '10px',
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: 'white',
                borderTop: '1px solid #e9ecef'
            }}>
                <span style={{
                    backgroundColor: 'transparent',
                    textDecoration: 'none',
                    padding: '2px 4px',
                    borderRadius: '3px'
                }}>
                    {filesize(file_Size)}
                </span>
                <span style={{
                    backgroundColor: 'transparent',
                    textDecoration: 'none',
                    padding: '2px 4px',
                    borderRadius: '3px'
                }}>
                    {moment(file_Resource.updatedAt).format('L')}
                </span>
            </div>
        </div>
    )
}
