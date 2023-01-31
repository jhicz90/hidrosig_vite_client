import { fetchUpFilesByToken } from '../../helpers'
import { resetResource, setFileTypes, setGroupTypes, setInitOptions, setLimit, setMaxSize, setModalResource, setSetFiles, setShowResource, setTags } from './resourceSlice'

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

export const finishModalResource = () => {
    return async (dispatch) => {
        dispatch(setShowResource(false))
        dispatch(resetResource())
    }
}

export const startUploadResources = ({ files, setFiles = null, tags, access = 1, cloud = false }) => {
    return async (dispatch) => {

        let formData = new FormData()

        files.forEach(item => {
            formData.append('resources', item)
        })

        formData.append('tags', JSON.stringify(tags))

        formData.append('cloud', cloud)

        formData.append('access_mode', access)

        const resp = cloud
            ? await fetchUpFilesByToken({
                endpoint: 'resource/v1/up',
                data: formData
            })
            : await fetchUpFilesByToken({
                endpoint: 'resource/db/up',
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