import Swal from 'sweetalert2'
import { toast } from 'react-hot-toast'
import withReactContent from 'sweetalert2-react-content'
import { fetchByToken, normalizeText } from '../../helpers'
import { storeApi } from '../storeApi'
import { setActiveNodeDataIrrigationNetwork } from '../irrigationnetwork'
import { addNewChannel, setActiveNewChannel, setActiveChannel, setSavingChannel, setSavingNewChannel } from './channelSlice'

const SwalReact = withReactContent(Swal)

export const channelApi = storeApi.injectEndpoints({
    endpoints: (builder) => ({
        // STRUCTURE
        newChannel: builder.query({
            query: (parent) => ({
                url: `channel/create/new`,
                params: {
                    parent
                }
            }),
            transformResponse: (response, meta, arg) => response.channel
        }),
        addChannel: builder.mutation({
            query: (newChannel) => ({
                url: `channel/create/new`,
                method: 'post',
                data: newChannel
            }),
            invalidatesTags: ['Irrig']
        }),
        getListChannel: builder.query({
            query: (search) => ({
                url: `channel/list`,
                params: {
                    search
                }
            }),
            transformResponse: (response, meta, arg) => response.docs,
            providesTags: ['Irrig']
        }),
        getListWaterInByPoint: builder.query({
            query: ({ point, range }) => ({
                url: `channel/search_waterin_by_point/${point}`,
                params: {
                    range
                }
            }),
            transformResponse: (response, meta, arg) => response.docs,
            providesTags: ['Irrig']
        }),
        getListWaterInAndPointByCoordinates: builder.query({
            query: ({ lat, lng, range }) => ({
                url: `channel/search_waterin_by_coordinates/${lat}/${lng}`,
                params: {
                    range
                }
            }),
            transformResponse: (response, meta, arg) => response.docs,
            providesTags: ['Irrig']
        }),
        getChannelById: builder.query({
            query: (id) => ({
                url: `channel/edit/${id}`
            }),
            transformResponse: (response, meta, arg) => response.channel,
            providesTags: ['Irrig']
        }),
        updateChannelById: builder.mutation({
            query: ({ id, channel }) => ({
                url: `channel/edit/${id}`,
                method: 'put',
                data: channel
            }),
            invalidatesTags: ['Irrig']
        }),
        deleteChannelById: builder.mutation({
            query: (id) => ({
                url: `channel/delete/${id}`,
                method: 'delete'
            }),
            invalidatesTags: ['Irrig']
        }),
        // STRUCTURE
    })
})

export const {
    useAddChannelMutation,
    useDeleteChannelByIdMutation,
    useGetListChannelQuery,
    useGetListWaterInByPointQuery,
    useGetChannelByIdQuery,
    useLazyGetListWaterInAndPointByCoordinatesQuery,
    useLazyGetListWaterInByPointQuery,
    useLazyNewChannelQuery,
    useNewChannelQuery,
    useUpdateChannelByIdMutation,
} = channelApi

export const startAddNewChannel = () => {
    return async (dispatch, getState) => {
        const { activeNode: { id } } = getState().irrigationnetwork

        dispatch(addNewChannel())

        const resp = await fetchByToken({
            endpoint: `channel/create/new`,
            params: { parent: id }
        })

        dispatch(setSavingNewChannel(false))

        if (resp.ok) {
            dispatch(setActiveNewChannel(resp.channel))
        }
    }
}

export const startSaveNewChannel = () => {
    return async (dispatch, getState) => {

        dispatch(setSavingNewChannel(true))

        const { activeNew } = getState().channel

        const newChannel = {
            ...activeNew,
        }

        const resp = await fetchByToken({
            endpoint: `channel/create/new`,
            data: newChannel,
            method: 'POST'
        })

        dispatch(setSavingNewChannel(false))

        if (resp.ok) {
            dispatch(storeApi.util.invalidateTags(['Irrig']))
            dispatch(setActiveNewChannel(null))
        }
    }
}

export const startGetChannel = (id) => {
    return async (dispatch) => {

        dispatch(setSavingChannel(true))

        const resp = await fetchByToken({
            endpoint: `channel/edit/${id}`
        })

        dispatch(setSavingChannel(false))

        if (resp.ok) {
            dispatch(setActiveChannel(resp.channel))
        }
    }
}

export const startUpdateChannel = () => {
    return async (dispatch, getState) => {

        dispatch(setSavingChannel(true))

        const { active } = getState().channel
        const { _id } = active

        const updateChannel = {
            ...active
        }

        const resp = await fetchByToken({
            endpoint: `channel/edit/${_id}`,
            data: updateChannel,
            method: 'PUT'
        })

        dispatch(setSavingChannel(false))

        if (resp.ok) {
            dispatch(setActiveChannel(resp.channel))
        }
    }
}

export const startUpdateDataChannelInIrrigNet = (channel) => {
    return async (dispatch, getState) => {

        // dispatch(setActiveNodeLoadingIrrigationNetwork(true))

        const { _id } = channel

        const updateChannel = {
            ...channel
        }

        const resp = await fetchByToken({
            endpoint: `channel/edit/${_id}`,
            data: updateChannel,
            method: 'PUT'
        })

        // dispatch(setActiveNodeLoadingIrrigationNetwork(false))

        if (resp.ok) {
            if (getState().activeNode.id === resp.channel._id) {
                dispatch(setActiveNodeDataIrrigationNetwork(resp.channel))
            }
        }
    }
}

export const startUpdateImageIdChannel = (id, images) => {
    return async (dispatch) => {

        const resp = await fetchByToken({
            endpoint: `channel/image/${id}`,
            data: { images },
            method: 'PUT'
        })

        if (resp.ok) {
            dispatch(storeApi.util.invalidateTags(['Irrig']))
        }
    }
}

export const startDeleteImageChannel = (id, imageId) => {
    return async (dispatch) => {

        const resp = await fetchByToken({
            endpoint: `channel/image/${id}`,
            data: { images: [imageId] },
            method: 'DELETE'
        })

        if (resp.ok) {
            dispatch(storeApi.util.invalidateTags(['Irrig']))
        }
    }
}

export const questionDeleteChannel = async (name) => {

    const wordConfirm = normalizeText(name, { lowerCase: true, removeSpaces: true })

    return SwalReact.fire({
        title:
            <>
                <div className='text-uppercase'>Eliminar canal</div>
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
            endpoint: `channel/export/net`,
        })

        toast.dismiss(toastLoading)
    }
}

export const startImportNet = (fileName) => {
    return async (dispatch) => {

        const toastLoading = toast.loading('Importando canales y tramos...')

        const resp = await fetchByToken({
            endpoint: `channel/import/net`,
            data: { filename: fileName },
            method: 'POST'
        })

        toast.dismiss(toastLoading)
    }
}

export const searchChannelByJunta = async (junta, search) => {
    const resp = await fetchByToken({
        endpoint: `channel/search_by_junta/${junta}`,
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