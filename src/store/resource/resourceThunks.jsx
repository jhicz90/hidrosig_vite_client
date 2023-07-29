import { fetchUpFilesByToken } from '../../helpers'
import { resetResource, resetResourceTemp, setFileTypes, setGroupTypes, setInitOptions, setLimit, setMaxSize, setModalResource, setModalResourceTemp, setSetFiles, setShowResource, setShowResourceTemp, setTags } from './resourceSlice'

export const startModalResource = ({
    init,
    tags,
    fileTypes,
    groupTypes,
    limit,
    maxSize,
    setFiles,
}) => {
    return async (dispatch) => {
        dispatch(resetResource())
        dispatch(setModalResource({
            show: true,
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
    fileTypes,
    groupTypes,
    limit,
    maxSize,
    setFiles,
}) => {
    return async (dispatch) => {
        dispatch(resetResourceTemp())
        dispatch(setModalResourceTemp({
            show: true,
            fileTypes,
            groupTypes,
            limit,
            maxSize,
            setFiles
        }))
    }
}

export const finishModalResource = () => {
    return async (dispatch) => {
        dispatch(resetResource())
    }
}

export const finishModalTempResource = () => {
    return async (dispatch) => {
        dispatch(resetResourceTemp())
    }
}

export const startUploadResources = ({ files, setFiles = null, tags, access = 1 }) => {
    return async (dispatch) => {

        dispatch(setShowResource(false))

        let formData = new FormData()

        files.forEach(item => {
            formData.append('resources', item)
        })

        formData.append('tags', JSON.stringify(tags))

        formData.append('access_mode', access)

        const resp = await fetchUpFilesByToken({
            endpoint: 'resource/v1/up',
            data: formData
        })

        if (resp.ok) {
            if (setFiles && resp.files.length === 1) {
                setFiles(resp.files[0]._id)
            } else if (setFiles && resp.files.length > 1) {
                setFiles(resp.files.map(f => f._id))
            }
        }
    }
}

export const startUploadTempResources = ({ files, setFiles = null }) => {
    return async (dispatch) => {

        dispatch(setShowResourceTemp(false))

        let formData = new FormData()

        files.forEach(item => {
            formData.append('temp', item)
        })

        const resp = await fetchUpFilesByToken({
            endpoint: 'resource/temp/up',
            data: formData
        })

        if (resp.ok) {
            if (setFiles && resp.filesTemp.length === 1) {
                setFiles(resp.filesTemp[0])
            } else if (setFiles && resp.filesTemp.length > 1) {
                setFiles(resp.filesTemp)
            }
        }
    }
}