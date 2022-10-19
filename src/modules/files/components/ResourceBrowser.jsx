import { useEffect, useMemo, useState } from 'react'
import { Card } from 'react-bootstrap'
import { FullFileBrowser, setChonkyDefaults } from 'chonky'
import { ChonkyIconFA } from 'chonky-icon-fontawesome'
import { FcFolder } from 'react-icons/fc'
import { filesize } from 'filesize'
import { prominent } from 'color.js'
import { useGetBrowserQuery } from '../../../store/storeApi'
import { imageGet } from '../../../helpers'

import backTransparent from '../../../assets/backTransparent.png'

setChonkyDefaults({ iconComponent: ChonkyIconFA })

export const ResourceBrowser = () => {

    const { data: files = [], isLoading } = useGetBrowserQuery('')

    const browserFiles = files.map(f => ({
        ...f,
        name: f.fileName,
        id: f.fileName,
    }))

    return (
        <Card>
            <Card.Body>
                <FullFileBrowser files={browserFiles} folderChain={[{ id: 'xcv', name: 'Hans', isDir: true }]} />
            </Card.Body>
            <Card.Body>
                <FileBrowser files={browserFiles} />
            </Card.Body>
        </Card>
    )
}

const FileBrowser = ({ files = [] }) => {
    return (
        <div style={{
            // display: 'grid',
            // justifyItems: 'stretch',
            // alignItems: 'stretch',
            // gridTemplateColumns: 'repeat(5, minmax(150px, 1fr))',
            // gridTemplateRows: '200px',
            display: 'flex',
            rowGap: '20px',
            columnGap: '20px',
            flexWrap: 'wrap'
        }}>
            {
                files.map(f => {
                    if (f.isDir) {
                        return (
                            <FolderComponent key={f.fileName} folderName={f.name} />
                        )
                    } else {
                        return (
                            <FileComponent key={f.fileName} fileName={f.name} thumbnailUrl={imageGet(f.name)} sizeFile={f.size} />
                        )
                    }
                })
            }
            {/* <FolderComponent folderName='Nueva carpeta asdasda sdas das dasd as' />
            <FileComponent fileName='Imagen' thumbnailUrl='https://picsum.photos/id/1/800' />
            <FileComponent fileName='Claves.txt' sizeFile={1} thumbnailUrl='http://localhost:4000/api/resource/image/sys/get/file_txt' />
            <FileComponent thumbnailUrl='https://picsum.photos/id/100/200/300' />
            <FileComponent thumbnailUrl='https://picsum.photos/id/200/200/300' />
            <FileComponent thumbnailUrl='https://picsum.photos/id/300/200/300' />
            <FileComponent thumbnailUrl='https://picsum.photos/id/400/200/300' />
            <FileComponent thumbnailUrl='https://picsum.photos/id/500/200/300' />
            <FileComponent thumbnailUrl='https://picsum.photos/id/600/200/300' />
            <FileComponent thumbnailUrl='https://picsum.photos/id/700/200/300' />
            <FileComponent thumbnailUrl='https://picsum.photos/id/800/200/300' />
            <FileComponent thumbnailUrl='https://picsum.photos/id/900/200/300' /> */}
        </div>
    )
}

const FolderComponent = ({ folderName = '' }) => {
    return (
        <div className="file" style={{
            boxShadow: '0 0 0 0.25rem #0d6efd',
            boxShadow: '0 0 0 0.25rem #e9ecef',
            borderRadius: '0.375rem',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#f0f0f0ad',
            overflow: 'hidden',
            width: '200px',
            height: '200px',
        }}>
            <div style={{
                flexGrow: 1,
                backgroundImage: 'url("http://localhost:4000/api/resource/image/sys/get/1022")',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain',
            }} />
            <div style={{
                fontSize: '14px',
                textAlign: 'center',
                // wordBreak: 'break-word',
                padding: '5px',
                // textOverflow: 'ellipsis'
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
            }}>
                <span style={{
                    backgroundColor: 'transparent',
                    textDecoration: 'none',
                    padding: '2px 4px',
                    borderRadius: '3px'
                }}>
                    {folderName}
                </span>
            </div>
        </div>
    )
}

const FileComponent = ({ fileName = '', thumbnailUrl = '', sizeFile = 0 }) => {

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
        <div className="file" style={{
            boxShadow: '0 0 0 0.25rem #0d6efd',
            boxShadow: '0 0 0 0.25rem #e9ecef',
            borderRadius: '0.375rem',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#f0f0f0ad',
            overflow: 'hidden',
            width: '200px',
            height: '200px',
        }}>
            <div style={{
                flexGrow: 1,
                display: 'flex',
                background: backColor
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
                fontSize: '14px',
                textAlign: 'center',
                wordBreak: 'break-word',
                paddingTop: '5px',
                maxHeight: '45px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical'
            }}>
                <span style={{
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
                padding: '0 6px',
                fontSize: '12px',
                flexDirection: 'row',
                justifyContent: 'space-between',
                fontFamily: 'monospace'
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