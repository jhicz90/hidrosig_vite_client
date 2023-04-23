import { useEffect, useMemo } from 'react'
import { Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { filesize } from 'filesize'
import { finishModalTempResource, startUploadTempResources } from '../store/actions'

//UPPY
import Uppy from '@uppy/core'
import Spanish from '@uppy/locales/lib/es_ES'
import Dashboard from '@uppy/react/lib/Dashboard'

import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'

export const FilesUploadTempModal = () => {

    const dispatch = useDispatch()
    const { showUploadTemp, fileTypesTemp, groupTypesTemp, setFilesTemp } = useSelector(state => state.resource)

    const allowedFileTypes = fileTypesTemp.length > 0 ? fileTypesTemp : acceptFiles(groupTypesTemp)

    const uppy = useMemo(() => {
        return new Uppy({
            meta: { type: 'temp' },
            restrictions: {
                maxNumberOfFiles: 3,
                maxFileSize: 10 * 1000000,
                allowedFileTypes
            },
            autoProceed: false,
        })
    }, [showUploadTemp, fileTypesTemp, groupTypesTemp])

    uppy.on('complete', (result) => {
        if (!!result.successful) {
            const files = result.successful.map(f => f.data)
            dispatch(startUploadTempResources({ files, setFilesTemp }))
        }
    })

    useEffect(() => {
        return () => uppy.close({ reason: 'unmount' })
    }, [uppy])

    return (
        <Modal
            show={showUploadTemp}
            size='xl'
            fullscreen='md-down'
            onHide={() => {
                dispatch(finishModalTempResource())
                uppy.close({ reason: 'unmount' })
            }}
        >
            <Modal.Header closeButton closeVariant='white' style={{ backgroundColor: 'gold' }}>
                <Modal.Title>Subir archivos</Modal.Title>
            </Modal.Header>
            <Dashboard
                width='auto'
                note={`Solo se permiten 3 archivos, con peso no mayores a ${filesize(10 * 1000000)}`}
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
            'geodata': ['.shp', '.dbf', '.kml'],
            'word': ['.docx'],
            'excel': ['.xlsx']
        }[type])
    } catch (err) {
        console.log(err)
        return []
    }
}