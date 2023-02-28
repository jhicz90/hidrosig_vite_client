import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { fetchByToken, normalizeText } from '../../helpers'
import { storeApi } from '../storeApi'
import { setActiveNodeDataIrrigationNetwork, setActiveNodeLoadingIrrigationNetwork } from '../irrigationnetwork'
import { addNewWaterSource, setActiveNewWaterSource, setActiveWaterSource, setSavingWaterSource, setSavingNewWaterSource } from './watersourceSlice'

const SwalReact = withReactContent(Swal)

export const watersourceApi = storeApi.injectEndpoints({
    endpoints: (builder) => ({
        // WATERSOURCE
        newWaterSource: builder.query({
            query: () => ({
                url: `watersource/create/new`,
            }),
            transformResponse: (response, meta, arg) => response.watersource
        }),
        addWaterSource: builder.mutation({
            query: (newWaterSource) => ({
                url: `watersource/create/new`,
                method: 'post',
                data: newWaterSource
            }),
            invalidatesTags: ['Irrig']
        }),
        getListWaterSource: builder.query({
            query: (search) => ({
                url: `watersource/list`,
                params: {
                    search
                }
            }),
            transformResponse: (response, meta, arg) => response.docs,
            providesTags: ['Orgz', 'Irrig']
        }),
        getWaterSourceById: builder.query({
            query: (id) => ({
                url: `watersource/edit/${id}`
            }),
            transformResponse: (response, meta, arg) => response.watersource,
            providesTags: ['Irrig']
        }),
        getListWaterSourceByJunta: builder.query({
            query: ({ junta, search }) => ({
                url: `watersource/search_by_junta/${junta}`,
                params: {
                    search
                }
            }),
            transformResponse: (response, meta, arg) => response.docs,
            providesTags: ['Orgz', 'Irrig']
        }),
        updateWaterSourceById: builder.mutation({
            query: ({ id, watersource }) => ({
                url: `watersource/edit/${id}`,
                method: 'put',
                data: watersource
            }),
            invalidatesTags: ['Irrig']
        }),
        deleteWaterSourceById: builder.mutation({
            query: (id) => ({
                url: `watersource/delete/${id}`,
                method: 'delete'
            }),
            invalidatesTags: ['Irrig']
        })
        // WATERSOURCE
    })
})

export const {
    useAddWaterSourceMutation,
    useDeleteWaterSourceByIdMutation,
    useGetListWaterSourceByJuntaQuery,
    useGetListWaterSourceQuery,
    useGetWaterSourceByIdQuery,
    useNewWaterSourceQuery,
    useUpdateWaterSourceByIdMutation,
} = watersourceApi

export const startAddNewWaterSource = () => {
    return async (dispatch) => {

        dispatch(addNewWaterSource())

        const resp = await fetchByToken({
            endpoint: `watersource/create/new`
        })

        dispatch(setSavingNewWaterSource(false))

        if (resp.ok) {
            dispatch(setActiveNewWaterSource(resp.watersource))
        }
    }
}

export const startSaveNewWaterSource = () => {
    return async (dispatch, getState) => {

        dispatch(setSavingNewWaterSource(true))

        const { activeNew } = getState().watersource

        const newWaterSource = {
            ...activeNew,
            junta: activeNew.junta !== null ? activeNew.junta._id : null,
        }

        const resp = await fetchByToken({
            endpoint: `watersource/create/new`,
            data: newWaterSource,
            method: 'POST'
        })

        dispatch(setSavingNewWaterSource(false))

        if (resp.ok) {
            dispatch(storeApi.util.invalidateTags(['Trrt']))
            dispatch(setActiveNewWaterSource(null))
        }
    }
}

export const startGetWaterSource = (id) => {
    return async (dispatch) => {

        dispatch(setSavingWaterSource(true))

        const resp = await fetchByToken({
            endpoint: `watersource/edit/${id}`
        })

        dispatch(setSavingWaterSource(false))

        if (resp.ok) {
            dispatch(setActiveWaterSource(resp.watersource))
        }
    }
}

export const startUpdateWaterSource = () => {
    return async (dispatch, getState) => {

        dispatch(setSavingWaterSource(true))

        const { active } = getState().watersource
        const { _id } = active

        const updateWaterSource = {
            ...active
        }

        const resp = await fetchByToken({
            endpoint: `watersource/edit/${_id}`,
            data: updateWaterSource,
            method: 'PUT'
        })

        dispatch(setSavingWaterSource(false))

        if (resp.ok) {
            dispatch(setActiveWaterSource(resp.watersource))
        }
    }
}

export const startUpdateDataWaterSourceInIrrigNet = (watersource) => {
    return async (dispatch, getState) => {

        dispatch(setActiveNodeLoadingIrrigationNetwork(true))

        const { _id } = watersource

        const updateWaterSource = {
            ...watersource
        }

        const resp = await fetchByToken({
            endpoint: `watersource/edit/${_id}`,
            data: updateWaterSource,
            method: 'PUT'
        })

        dispatch(setActiveNodeLoadingIrrigationNetwork(false))

        if (resp.ok) {
            if (getState().activeNode.id === resp.watersource._id) {
                dispatch(setActiveNodeDataIrrigationNetwork(resp.watersource))
            }
        }
    }
}

export const startDeleteWaterSource = () => {
    return async (dispatch, getState) => {
        const { active } = getState().watersource
        const { _id, name } = active

        const wordConfirm = normalizeText(name, { lowerCase: true, removeSpaces: true })

        SwalReact.fire({
            title:
                <>
                    <div className='text-uppercase'>Eliminar fuente de agua</div>
                    <div className="fs-5 fw-bold text-info mt-1">{name}</div>
                </>,
            html:
                <>
                    <div className='fs-5 mb-2'>¿Estás seguro de eliminar esta fuente de agua?</div>
                    <div className='fs-5'>Si es asi, escriba <strong>{wordConfirm}</strong> para confirmar</div>
                </>,
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar',
            allowOutsideClick: false,
            icon: 'question',
            customClass: {
                confirmButton: `btn btn-danger`,
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
        }).then(async (result) => {
            if (result.value) {

                dispatch(setSavingWaterSource(true))

                const resp = await fetchByToken({
                    endpoint: `watersource/delete/${_id}`,
                    method: 'DELETE'
                })

                dispatch(setSavingWaterSource(false))

                if (resp.ok) {
                    dispatch(setActiveWaterSource(null))
                }
            }
        })
    }
}

export const searchWaterSource = async (search) => {
    const resp = await fetchByToken({
        endpoint: 'watersource/search',
        params: { search }
    })

    if (resp.ok) {
        return resp.docs
    } else {
        return []
    }
}

export const searchWaterSourceByJunta = async (junta, search) => {
    const resp = await fetchByToken({
        endpoint: `watersource/search_by_junta/${junta}`,
        params: { search }
    })

    if (resp.ok) {
        return resp.docs
    } else {
        return []
    }
}