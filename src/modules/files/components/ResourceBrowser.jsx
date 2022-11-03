import { useState } from 'react'
import { Card } from 'react-bootstrap'
import { FullFileBrowser, setChonkyDefaults } from 'chonky'
import { ChonkyIconFA } from 'chonky-icon-fontawesome'
import { useGetBrowserQuery } from '../../../store/actions'
import { imageGet } from '../../../helpers'
import { FileArchive, FolderArchive } from '../../../components'

setChonkyDefaults({ iconComponent: ChonkyIconFA })

export const ResourceBrowser = () => {

    const { data: files = [], isLoading } = useGetBrowserQuery('')

    const browserFiles = files.map(f => ({
        ...f,
        name: f.fileName,
        id: f.fileName,
    }))

    return (
        // <Card>
        //     <Card.Body>
        //         <FullFileBrowser files={browserFiles} folderChain={[{ id: 'xcv', name: 'Hans', isDir: true }]} />
        //     </Card.Body>
        //     <Card.Body>

        //     </Card.Body>
        // </Card>
        <Card.Body>
            <FileBrowser files={browserFiles} />
        </Card.Body>
    )
}

export const FileBrowser = ({ files = [] }) => {

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
                            <FolderArchive
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
                            <FileArchive
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
