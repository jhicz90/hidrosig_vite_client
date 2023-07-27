import { useEffect, useMemo } from 'react'
import { Modal } from 'react-bootstrap'
import { filesize } from 'filesize'
import { useResourceStore } from '../hooks'

//UPPY
import Uppy from '@uppy/core'
import Spanish from '@uppy/locales/lib/es_ES'
import Dashboard from '@uppy/react/lib/Dashboard'

import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'

export const FilesUploadTempModal = () => {

    const { resetModalTemp, uploadManageFilesTemp, uploadResourcesTemp } = useResourceStore()
    const { show, title, fileTypes, groupTypes, limit, maxSize, setFiles } = uploadManageFilesTemp

    const allowedFileTypes = fileTypes.length > 0 ? fileTypes : acceptFiles(groupTypes)

    const uppy = useMemo(() => {
        return new Uppy({
            meta: { type: 'temp' },
            restrictions: {
                maxNumberOfFiles: limit,
                maxFileSize: maxSize * 1000000,
                allowedFileTypes
            },
            autoProceed: false,
        })
    }, [show, fileTypes, groupTypes])

    uppy.on('complete', (result) => {
        if (!!result.successful) {
            const files = result.successful.map(f => f.data)
            uploadResourcesTemp(files, setFiles)
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
                resetModalTemp()
                uppy.close({ reason: 'unmount' })
            }}
        >
            <Modal.Header closeButton closeVariant='white' style={{ backgroundColor: 'gold' }}>
                <Modal.Title>{title !== '' ? `Subir archivos para ${title}` : `Subir archivos`}</Modal.Title>
            </Modal.Header>
            <Dashboard
                width='auto'
                note={`Solo se permiten ${limit} archivos, con peso no mayores a ${filesize(maxSize * 1000000)}`}
                uppy={uppy}
                locale={Spanish}
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
            'geodata': ['.zip', '.kml', '.gpx'],
            'word': ['.docx'],
            'excel': ['.xlsx']
        }[type])
    } catch (err) {
        console.log(err)
        return []
    }
}