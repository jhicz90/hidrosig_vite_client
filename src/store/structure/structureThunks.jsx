import Swal from 'sweetalert2'
import { toast } from 'react-hot-toast'
import withReactContent from 'sweetalert2-react-content'
import { fetchByToken, normalizeText } from '../../helpers'
import { storeApi } from '../storeApi'
import { setActiveNodeDataIrrigationNetwork, setActiveNodeLoadingIrrigationNetwork } from '../irrigationnetwork'
import { addNewStructure, setActiveNewStructure, setActiveStructure, setSavingStructure, setSavingNewStructure } from './structureSlice'

const SwalReact = withReactContent(Swal)

export const structureApi = storeApi.injectEndpoints({
    endpoints: (builder) => ({
        // STRUCTURE
        newStructure: builder.query({
            query: (parent) => ({
                url: `structure/create/new`,
                params: {
                    parent
                }
            }),
            transformResponse: (response, meta, arg) => response.structure
        }),
        addStructure: builder.mutation({
            query: (newStructure) => ({
                url: `structure/create/new`,
                method: 'post',
                data: newStructure
            }),
            invalidatesTags: ['Irrig']
        }),
        getListStructure: builder.query({
            query: (search) => ({
                url: `structure/list`,
                params: {
                    search
                }
            }),
            transformResponse: (response, meta, arg) => response.docs,
            providesTags: ['Irrig']
        }),
        getListWaterInByPoint: builder.query({
            query: ({ point, range }) => ({
                url: `structure/search_waterin_by_point/${point}`,
                params: {
                    range
                }
            }),
            transformResponse: (response, meta, arg) => response.docs,
            providesTags: ['Irrig']
        }),
        getStructureById: builder.query({
            query: (id) => ({
                url: `structure/edit/${id}`
            }),
            transformResponse: (response, meta, arg) => response.structure,
            providesTags: ['Irrig']
        }),
        updateStructureById: builder.mutation({
            query: ({ id, structure }) => ({
                url: `structure/edit/${id}`,
                method: 'put',
                data: structure
            }),
            invalidatesTags: ['Irrig']
        }),
        deleteStructureById: builder.mutation({
            query: (id) => ({
                url: `structure/delete/${id}`,
                method: 'delete'
            }),
            invalidatesTags: ['Irrig']
        }),
        // STRUCTURE
    })
})

export const {
    useAddStructureMutation,
    useDeleteStructureByIdMutation,
    useGetListStructureQuery,
    useGetListWaterInByPointQuery,
    useGetStructureByIdQuery,
    useLazyGetListWaterInByPointQuery,
    useLazyNewStructureQuery,
    useNewStructureQuery,
    useUpdateStructureByIdMutation,
} = structureApi

export const startAddNewStructure = () => {
    return async (dispatch, getState) => {
        const { activeNode: { id } } = getState().irrigationnetwork

        dispatch(addNewStructure())

        const resp = await fetchByToken({
            endpoint: `structure/create/new`,
            params: { parent: id }
        })

        dispatch(setSavingNewStructure(false))

        if (resp.ok) {
            dispatch(setActiveNewStructure(resp.structure))
        }
    }
}

export const startSaveNewStructure = () => {
    return async (dispatch, getState) => {

        dispatch(setSavingNewStructure(true))

        const { activeNew } = getState().structure

        const newStructure = {
            ...activeNew,
        }

        const resp = await fetchByToken({
            endpoint: `structure/create/new`,
            data: newStructure,
            method: 'POST'
        })

        dispatch(setSavingNewStructure(false))

        if (resp.ok) {
            dispatch(storeApi.util.invalidateTags(['Irrig']))
            dispatch(setActiveNewStructure(null))
        }
    }
}

export const startGetStructure = (id) => {
    return async (dispatch) => {

        dispatch(setSavingStructure(true))

        const resp = await fetchByToken({
            endpoint: `structure/edit/${id}`
        })

        dispatch(setSavingStructure(false))

        if (resp.ok) {
            dispatch(setActiveStructure(resp.structure))
        }
    }
}

export const startUpdateStructure = () => {
    return async (dispatch, getState) => {

        dispatch(setSavingStructure(true))

        const { active } = getState().structure
        const { _id } = active

        const updateStructure = {
            ...active
        }

        const resp = await fetchByToken({
            endpoint: `structure/edit/${_id}`,
            data: updateStructure,
            method: 'PUT'
        })

        dispatch(setSavingStructure(false))

        if (resp.ok) {
            dispatch(setActiveStructure(resp.structure))
        }
    }
}

export const startUpdateDataStructureInIrrigNet = (structure) => {
    return async (dispatch, getState) => {

        dispatch(setActiveNodeLoadingIrrigationNetwork(true))

        const { _id } = structure

        const updateStructure = {
            ...structure
        }

        const resp = await fetchByToken({
            endpoint: `structure/edit/${_id}`,
            data: updateStructure,
            method: 'PUT'
        })

        dispatch(setActiveNodeLoadingIrrigationNetwork(false))

        if (resp.ok) {
            if (getState().activeNode.id === resp.structure._id) {
                dispatch(setActiveNodeDataIrrigationNetwork(resp.structure))
            }
        }
    }
}

export const startUpdateImageIdStructure = (id, images) => {
    return async (dispatch) => {

        const resp = await fetchByToken({
            endpoint: `structure/image/${id}`,
            data: { images },
            method: 'PUT'
        })

        if (resp.ok) {
            dispatch(storeApi.util.invalidateTags(['Irrig']))
        }
    }
}

export const startDeleteImageStructure = (id, imageId) => {
    return async (dispatch) => {

        const resp = await fetchByToken({
            endpoint: `structure/image/${id}`,
            data: { images: [imageId] },
            method: 'DELETE'
        })

        if (resp.ok) {
            dispatch(storeApi.util.invalidateTags(['Irrig']))
        }
    }
}

export const questionDeleteStructure = async (name) => {

    const wordConfirm = normalizeText(name, { lowerCase: true, removeSpaces: true })

    return SwalReact.fire({
        title:
            <>
                <div className='text-uppercase'>Eliminar estructura</div>
                <div className="fs-5 fw-bold text-info mt-1">{name}</div>
            </>,
        html:
            <>
                <div className='fs-5 mb-2'>¿Estás seguro de eliminar?</div>
                <div className='fs-5'>Si es asi, escriba <strong>{wordConfirm}</strong> para confirmar</div>
            </>,
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
        allowOutsideClick: false,
        icon: 'question',
        customClass: {
            confirmButton: `btn btn-warning`,
            cancelButton: `btn btn-neutral`
        },
        input: 'text',
        inputAttributes: {
            autocapitalize: 'off'
        },
        buttonsStyling: false,
        reverseButtons: true,
        preConfirm: (typed) => {
            if (typed === wordConfirm) {
                return true
            } else {
                return false
            }
        }
    }).then(({ value }) => {
        return value
    })
}

export const startExportNet = () => {
    return async (dispatch) => {

        const toastLoading = toast.loading('Exportando canales y tramos...')

        const resp = await fetchByToken({
            endpoint: `structure/export/net`,
        })

        toast.dismiss(toastLoading)
    }
}

export const startImportNet = (fileName) => {
    return async (dispatch) => {

        const toastLoading = toast.loading('Importando canales y tramos...')

        const resp = await fetchByToken({
            endpoint: `structure/import/net`,
            data: { filename: fileName },
            method: 'POST'
        })

        toast.dismiss(toastLoading)
    }
}

export const searchStructureByJunta = async (junta, search) => {
    const resp = await fetchByToken({
        endpoint: `structure/search_by_junta/${junta}`,
        params: { search }
    })

    if (resp.ok) {
        return resp.docs
    } else {
        return []
    }
}

export const searchSectionByJunta = async (junta, search) => {
    const resp = await fetchByToken({
        endpoint: `section/search_by_junta/${junta}`,
        params: { search }
    })

    if (resp.ok) {
        return resp.docs
    } else {
        return []
    }
}