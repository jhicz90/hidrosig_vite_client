import { useDispatch, useSelector } from 'react-redux'
import { finishModalResource, finishModalTempResource, setShowResource, setShowResourceTemp, startModalResource, startModalTempResource, startUploadResources, startUploadTempResources } from '../store/resource'

export const useResourceStore = () => {

    const dispatch = useDispatch()
    const { uploadManageFiles, uploadManageFilesTemp } = useSelector(state => state.resource)

    const openModal = () => {
        dispatch(setShowResource(true))
    }

    const openModalTemp = () => {
        dispatch(setShowResourceTemp(true))
    }

    const closeModal = () => {
        dispatch(setShowResource(false))
    }

    const closeModalTemp = () => {
        dispatch(setShowResourceTemp(false))
    }

    const resetModal = () => {
        dispatch(finishModalResource())
    }

    const resetModalTemp = () => {
        dispatch(finishModalTempResource())
    }

    const initResource = ({
        init = [true, true, true],
        tags = [],
        fileTypes = [],
        groupTypes = '',
        limit = 1,
        maxSize = 1,
        setFiles = null,
    }) => {
        dispatch(startModalResource({
            init,
            tags,
            fileTypes,
            groupTypes,
            limit,
            maxSize,
            setFiles
        }))
    }

    const initResourceTemp = ({
        fileTypes = [],
        groupTypes = '',
        limit = 1,
        maxSize = 1,
        setFiles = null,
    }) => {
        dispatch(startModalTempResource({
            fileTypes,
            groupTypes,
            limit,
            maxSize,
            setFiles
        }))
    }

    const uploadResources = (files, setFiles, tags = []) => {
        dispatch(startUploadResources({ files, setFiles, tags }))
    }

    const uploadResourcesTemp = (files, setFiles) => {
        dispatch(startUploadTempResources({ files, setFiles }))
    }

    return {
        //* PROPIEDADES
        uploadManageFiles,
        uploadManageFilesTemp,
        //* METODOS
        openModal,
        closeModal,
        openModalTemp,
        closeModalTemp,
        uploadResources,
        uploadResourcesTemp,
        resetModal,
        resetModalTemp,
        initResource,
        initResourceTemp,
    }
}
