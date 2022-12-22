import { useEffect, useMemo } from 'react'
import { Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { finishModalResource } from '../store/actions'

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

    const dispatch = useDispatch()
    const { showUpload, tags, fileTypes, groupTypes, limit, maxSize, setFiles } = useSelector(state => state.resource)
    const allowedFileTypes = fileTypes > 0 ? fileTypes : acceptFiles(groupTypes)

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
    }, [showUpload, fileTypes, groupTypes, limit, maxSize])

    uppy.on('complete', (result) => {
        console.log(result.successful)
        // const url = result.successful[0].uploadURL
        // store.dispatch({
        //   type: 'SET_USER_AVATAR_URL',
        //   payload: { url },
        // })
    })

    useEffect(() => {
        return () => uppy.close({ reason: 'unmount' })
    }, [uppy])

    return (
        <Modal
            show={showUpload}
            size='xl'
            onHide={() => {
                dispatch(finishModalResource())
                uppy.close({ reason: 'unmount' })
            }}
        >
            <Dashboard
                width='auto'
                note={'Solo se permiten 3 archivos, con peso no mayores a 2 MB'}
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
            'geodata': ['application/zipped-shapefile', 'application/dbase'],
            'word': ['.docx'],
            'excel': ['.xlsx']
        }[type])
    } catch (err) {
        console.log(err)
        return []
    }
}