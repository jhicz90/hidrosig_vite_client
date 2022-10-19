import { Card } from 'react-bootstrap'
import { FullFileBrowser, setChonkyDefaults } from 'chonky'
import { ChonkyIconFA } from 'chonky-icon-fontawesome'
import { FcFolder } from 'react-icons/fc'
import { useGetBrowserQuery } from '../../../store/storeApi'

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
                <FileBrowser />
            </Card.Body>
        </Card>
    )
}

const FileBrowser = () => {

    return (
        <div style={{
            display: 'grid',
            justifyItems: 'stretch',
            alignItems: 'stretch',
            gridTemplateColumns: 'repeat(5, minmax(150px, 1fr))',
            gridTemplateRows: '150px',
            rowGap: '10px',
            columnGap: '10px'
        }}>
            <div className="folder" style={{
                padding: '0.5rem',
                border: '2px solid rgb(187 187 187)',
                borderRadius: '0.375rem',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#f0f0f0ad'
            }}>
                <FcFolder style={{ flexGrow: 1 }} size={'100%'} />
                <div style={{
                    fontSize: '14px',
                    textAlign: 'center',
                    wordBreak: 'break-word',
                    paddingTop: '5px'
                }}>
                    <span style={{
                        backgroundColor: 'transparent',
                        textDecoration: 'none',
                        padding: '2px 4px',
                        borderRadius: '3px'
                    }}>
                        Carpeta nueva
                    </span>
                </div>
            </div>
            <div className="file" style={{
                padding: '0.5rem',
                border: '2px solid rgb(187 187 187)',
                borderRadius: '0.375rem',
                display: 'flex',
                alignItems: 'center',
                justifyItems: 'center'
            }}>
                <img style={{ width: '100%', height: '100%', objectFit: 'contain' }} src="http://localhost:4000/api/resource/image/get/a8ec444c-4057-46e3-b1f9-296d4ec92e40.png" alt="fileimage" />
            </div>
        </div>
    )
}