import { FullFileBrowser } from 'chonky'
import { Card } from 'react-bootstrap'
import { useGetBrowserQuery } from '../../../store/storeApi'

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
        </Card>
    )
}
