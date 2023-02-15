import { toast } from 'react-hot-toast'
import { fetchUpFilesByToken } from '../../helpers'
import { resetResource, resetResourceTemp, setFileTypes, setGroupTypes, setInitOptions, setLimit, setMaxSize, setModalResource, setModalResourceTemp, setSetFiles, setShowResource, setShowResourceTemp, setTags, setUploading } from './resourceSlice'

export const startModalResource = ({
    init = [true, true, true],
    tags = [],
    fileTypes = [],
    groupTypes = '',
    limit = 1,
    maxSize = 1,
    setFiles = null,
}) => {
    return async (dispatch) => {
        dispatch(resetResource())
        dispatch(setModalResource({
            showUpload: true,
            initOptions: init,
            tags,
            fileTypes,
            groupTypes,
            limit,
            maxSize,
            setFiles
        }))
    }
}

export const startModalTempResource = ({
    fileTypesTemp = [],
    groupTypesTemp = '',
    setFilesTemp = null,
}) => {
    return async (dispatch) => {
        dispatch(resetResourceTemp())
        dispatch(setModalResourceTemp({
            showUploadTemp: true,
            fileTypesTemp,
            groupTypesTemp,
            setFilesTemp
        }))
    }
}

export const finishModalResource = () => {
    return async (dispatch) => {
        dispatch(setShowResource(false))
        dispatch(resetResource())
    }
}

export const finishModalTempResource = () => {
    return async (dispatch) => {
        dispatch(setShowResourceTemp(false))
        dispatch(resetResourceTemp())
    }
}

export const startUploadResources = ({ files, setFiles = null, tags, access = 1, cloud = false }) => {
    return async (dispatch) => {

        dispatch(setShowResource(false))

        let formData = new FormData()

        files.forEach(item => {
            formData.append('resources', item)
        })

        formData.append('tags', JSON.stringify(tags))

        formData.append('cloud', cloud)

        formData.append('access_mode', access)

        const toastLoading = toast.loading('Subiendo archivos...')

        const resp = cloud
            ? await fetchUpFilesByToken({
                endpoint: 'resource/v1/up',
                data: formData
            })
            : await fetchUpFilesByToken({
                endpoint: 'resource/db/up',
                data: formData
            })

        toast.dismiss(toastLoading)

        if (resp.ok) {
            if (setFiles && resp.files.length === 1) {
                setFiles(resp.files[0]._id)
            } else if (setFiles && resp.files.length > 1) {
                setFiles(resp.files.map(f => f._id))
            }
        }
    }
}

export const startUploadTempResources = ({ files, setFilesTemp = null }) => {
    return async (dispatch) => {

        dispatch(setShowResourceTemp(false))

        let formData = new FormData()

        files.forEach(item => {
            formData.append('temp', item)
        })

        const toastLoading = toast.loading('Subiendo archivos...')

        const resp = await fetchUpFilesByToken({
            endpoint: 'resource/temp/up',
            data: formData
        })

        toast.dismiss(toastLoading)

        if (resp.ok) {
            if (setFilesTemp && resp.filesTemp.length === 1) {
                setFilesTemp(resp.filesTemp[0])
            } else if (setFilesTemp && resp.filesTemp.length > 1) {
                setFilesTemp(resp.filesTemp)
            }
        }
    }
}