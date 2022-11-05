import { useState } from 'react'
import { Card } from 'react-bootstrap'
import { useGetBrowserQuery } from '../../../store/actions'
import { FileArchive, FolderArchive, LoadingPage } from '../../../components'

export const ResourceBrowser = () => {

    const { data: files = [], isLoading } = useGetBrowserQuery('')

    const browserFiles = files.map(f => ({
        ...f,
        name: f.fileName,
        id: f.fileName,
    }))

    return (
        <Card.Body>
            <FileBrowser loading={isLoading} files={browserFiles} />
        </Card.Body>
    )
}

export const FileBrowser = ({ files = [], loading = false }) => {

    const [selectedObjects, setSelectedObjects] = useState([])

    return (
        <>
            {
                loading
                    ?
                    <LoadingPage />
                    :

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
                                            key={f.id}
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
                                            key={f.id}
                                            file={f}
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
            }
        </>
    )
}
