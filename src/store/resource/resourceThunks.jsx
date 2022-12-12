import { fetchUpFilesByToken } from '../../helpers'
import {
    resetModalResource,
    setModalAccept,
    setModalInit,
    setModalLimit,
    setModalMultiple,
    setModalResource,
    setModalSetArchive,
    setModalTags,
    setModalTitle
} from './resourceSlice'

export const startModalResource = ({
    init = 9,
    tags = [],
    accept = 'images',
    multiple = false,
    limit = 2,
    title = 'Seleccione o suba archivos',
    setArchive = null,
}) => {
    return async (dispatch) => {
        dispatch(resetModalResource())
        dispatch(setModalInit(init))
        dispatch(setModalTags(tags))
        dispatch(setModalAccept(accept))
        dispatch(setModalMultiple(multiple))
        dispatch(setModalLimit(limit))
        dispatch(setModalTitle(title))
        dispatch(setModalSetArchive(setArchive))
        dispatch(setModalResource(true))
    }
}

export const finishModalResource = () => {
    return async (dispatch) => {
        dispatch(setModalResource(false))
        dispatch(resetModalResource())
    }
}

export const startUploadResources = ({ files, setArchive = null, tags, multiple, access = 1, cloud = false }) => {
    return async (dispatch) => {

        let formData = new FormData()

        files.forEach(item => {
            formData.append('resources', item)
        })

        formData.append('tags', JSON.stringify(tags))

        formData.append('cloud', cloud)

        formData.append('access_mode', access)

        const resp = await fetchUpFilesByToken({
            endpoint: 'resource/up',
            data: formData
        })

        if (resp.ok) {
            if (!multiple) {
                (setArchive && resp.files.length > 0) && setArchive(resp.files[0]._id)
            } else {
                (setArchive && resp.files.length > 0) && setArchive(resp.files.map(f => f._id))
            }
        }
    }
}