import { useState, useEffect } from 'react'
import { filesize } from 'filesize'
import { prominent } from 'color.js'

import backTransparent from '../assets/backTransparent.png'

export const FileArchive = ({ fileName = '', thumbnailUrl = '', sizeFile = 0, action = null, selected = false }) => {

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
                    }}>
                    {fileName}
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
                    {filesize(sizeFile)}
                </span>
                <span style={{
                    backgroundColor: 'transparent',
                    textDecoration: 'none',
                    padding: '2px 4px',
                    borderRadius: '3px'
                }}>
                    10/10/2022
                </span>
            </div>
        </div>
    )
}
