import { useEffect, useMemo } from 'react'
import { Modal } from 'react-bootstrap'
import { filesize } from 'filesize'
import { useResourceStore } from '../hooks'

//UPPY
import Uppy from '@uppy/core'
import Spanish from '@uppy/locales/lib/es_ES'
import Dashboard from '@uppy/react/lib/Dashboard'
import ImageEditor from '@uppy/image-editor'
import Webcam from '@uppy/webcam'

import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'
import '@uppy/image-editor/dist/style.css'
import '@uppy/webcam/dist/style.css'

export const FilesUploadModal = () => {

    const { resetModal, uploadManageFiles, uploadResources } = useResourceStore()
    const { show, title, tags, fileTypes, groupTypes, limit, maxSize, setFiles } = uploadManageFiles

    const allowedFileTypes = fileTypes.length > 0 ? fileTypes : acceptFiles(groupTypes)

    const uppy = useMemo(() => {
        return new Uppy({
            meta: { type: 'resource' },
            restrictions: {
                maxNumberOfFiles: limit,
                maxFileSize: maxSize * 1000000,
                allowedFileTypes
            },
            autoProceed: false,
        })
            .use(Webcam)
            .use(ImageEditor, { quality: 0.9 })
    }, [show, fileTypes, groupTypes, limit, maxSize])

    uppy.on('complete', (result) => {
        if (!!result.successful) {
            const files = result.successful.map(f => f.data)
            uploadResources(files, setFiles, tags)
        }
    })

    useEffect(() => {
        return () => uppy.close({ reason: 'unmount' })
    }, [uppy])

    return (
        <Modal
            show={show}
            size='xl'
            fullscreen='md-down'
            onHide={() => {
                resetModal()
                uppy.close({ reason: 'unmount' })
            }}
        >
            <Modal.Header closeButton closeVariant='white' style={{ backgroundColor: 'gold' }}>
                <Modal.Title>{title !== '' ? `Subir archivos para ${title}` : `Subir archivos`}</Modal.Title>
            </Modal.Header>
            <Dashboard
                hideUploadButton={false}
                width='auto'
                note={`Solo se permiten ${limit} archivos, con peso no mayores a ${filesize(maxSize * 1000000)}`}
                uppy={uppy}
                locale={Spanish}
                plugins={['Webcam', 'ImageEditor']}
            />
        </Modal>
    )
}

const acceptFiles = (type) => {
    try {
        return ({
            'images': ['image/*'],
            'videos': ['video/*'],
            'docs': ['.docx', '.xlsx', '.pdf'],
            'geodata': ['.shp', '.dbf', '.kml', '.gpx'],
            'word': ['.docx'],
            'excel': ['.xlsx']
        }[type])
    } catch (err) {
        console.log(err)
        return []
    }
}