import { useEffect, useMemo, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Switch from 'react-switch'
import { Image } from './Image'
import { finishModalResource, startUploadResources } from '../store/actions'

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
    const { showUpload, tags, fileTypes, groupTypes, limit, maxSize, setFiles, uploading } = useSelector(state => state.resource)
    const { options } = useSelector(state => state.auth)
    const [typeUpload, setTypeUpload] = useState(true)

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
        if (!!result.successful) {
            const files = result.successful.map(f => f.data)
            dispatch(startUploadResources({ files, setFiles, tags }))
        }
        // console.log(result.successful)
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
            <Modal.Header closeButton closeVariant='white' style={{ backgroundColor: 'gold' }}>
                <Modal.Title>Subir archivos</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    options.resource.upload === 1
                    &&
                    <div className='d-flex align-items-center gap-2 h-100 text-dark'>
                        <Image noImg={1092} width={25} height={25} /> Base de datos
                    </div>
                }
                {
                    options.resource.upload === 2
                    &&
                    <div className='d-flex align-items-center gap-2 h-100 text-dark'>
                        <Image noImg={1091} width={25} height={25} /> Cloudinary
                    </div>
                }
                {
                    options.resource.upload === 3
                    &&
                    <Switch
                        checked={typeUpload}
                        handleDiameter={30}
                        height={40}
                        width={80}
                        activeBoxShadow='0 0 0 2px #2684ff'
                        onColor='#198754'
                        offColor='#0d6efd'
                        checkedIcon={
                            <div className='d-flex justify-content-center align-items-center text-white h-100'>
                                <Image noImg={1092} width={25} height={25} />
                            </div>
                        }
                        uncheckedIcon={
                            <div className='d-flex justify-content-center align-items-center text-black h-100'>
                                <Image noImg={1091} width={25} height={25} />
                            </div>
                        }
                    />
                }
            </Modal.Body>
            <Dashboard
                hideUploadButton={uploading}
                width='auto'
                note={`Solo se permiten ${limit} archivos, con peso no mayores a 2 MB`}
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