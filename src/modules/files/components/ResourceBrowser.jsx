import { useEffect, useState } from 'react'
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

    const [selectedObjects, setSelectedObjects] = useState([])

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
                            <FolderComponent
                                key={f.fileName}
                                folderName={f.name}
                                action={() =>
                                    selectedObjects.find(o => o.id === f.id)
                                        ? setSelectedObjects([...selectedObjects.filter(o => o.id !== f.id)])
                                        : setSelectedObjects([...selectedObjects, f])
                                }
                                selected={selectedObjects.find(o => o.id === f.id)}
                            />
                        )
                    } else {
                        return (
                            <FileComponent
                                key={f.fileName}
                                fileName={f.name}
                                thumbnailUrl={imageGet(f.name)}
                                sizeFile={f.size}
                                action={() =>
                                    selectedObjects.find(o => o.id === f.id)
                                        ? setSelectedObjects([...selectedObjects.filter(o => o.id !== f.id)])
                                        : setSelectedObjects([...selectedObjects, f])
                                }
                                selected={selectedObjects.find(o => o.id === f.id)}
                            />
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

const FolderComponent = ({ folderName = '', action = null, selected = false }) => {
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
                backgroundImage: 'url("http://localhost:4000/api/resource/image/sys/get/1022")',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain',
                borderRadius: '0.375rem 0.375rem 0 0',
            }} />
            <div style={{
                fontSize: '16px',
                textAlign: 'center',
                padding: '0.5rem',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
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
                    {folderName}
                </span>
            </div>
        </div>
    )
}

const FileComponent = ({ fileName = '', thumbnailUrl = '', sizeFile = 0, action = null, selected = false }) => {

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