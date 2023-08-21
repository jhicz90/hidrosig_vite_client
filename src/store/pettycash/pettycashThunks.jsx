import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { toast } from 'react-hot-toast'
import { fetchByToken, normalizeText } from '../../helpers'
import { storeApi } from '../storeApi'
import { addNewPettycash, setActiveNewPettycash, setActivePettycash, setSavingPettycash, setSavingNewPettycash } from './pettycashSlice'

const SwalReact = withReactContent(Swal)

export const pettycashApi = storeApi.injectEndpoints({
    endpoints: (builder) => ({
        // PETTYCASH
        newPettyCash: builder.query({
            query: () => ({
                url: `pettycash/create/new`
            }),
            transformResponse: (response, meta, arg) => response.pettycash
        }),
        addPettyCash: builder.mutation({
            query: (newPettyCash) => ({
                url: `pettycash/create/new`,
                method: 'post',
                data: newPettyCash
            }),
            invalidatesTags: ['Ptty']
        }),
        getPettyCashById: builder.query({
            query: (id) => ({
                url: `pettycash/edit/${id}`,
            }),
            transformResponse: (response, meta, arg) => response.pettycash,
            providesTags: ['Ptty']
        }),
        getListPettyCash: builder.query({
            query: (search) => ({
                url: `pettycash/list`,
                params: {
                    search
                }
            }),
            transformResponse: (response, meta, arg) => response.docs,
            providesTags: ['Ptty']
        }),
        getListPettyCashByUsrSys: builder.query({
            query: ({ usersys, search }) => ({
                url: `pettycash/search_by_usersys/${usersys}`,
                params: {
                    search
                }
            }),
            transformResponse: (response, meta, arg) => response.docs,
            providesTags: ['Ptty']
        }),
        updatePettyCashById: builder.mutation({
            query: ({ id, pettycash }) => ({
                url: `pettycash/edit/${id}`,
                method: 'put',
                data: pettycash
            }),
            invalidatesTags: ['Ptty']
        }),
        deletePettyCashById: builder.mutation({
            query: (id) => ({
                url: `pettycash/delete/${id}`,
                method: 'delete'
            }),
            invalidatesTags: ['Ptty']
        }),
        deleteResourcePettyCash: builder.mutation({
            query: ({ id, resourceId, deleteFile }) => ({
                url: `pettycash/image/${id}`,
                method: 'delete',
                data: { images: [resourceId], deleteFile },
            }),
            invalidatesTags: ['Ptty']
        }),
        // PETTYCASH
    })
})

export const {
    useAddPettyCashMutation,
    useDeletePettyCashByIdMutation,
    useDeleteResourcePettyCashMutation,
    useGetListPettyCashByUsrSysQuery,
    useGetListPettyCashQuery,
    useGetPettyCashByIdQuery,
    useLazyNewPettyCashQuery,
    useNewPettyCashQuery,
    useUpdatePettyCashByIdMutation,
} = pettycashApi

export const startUpdateImageIdPettyCash = (id, images) => {
    return async (dispatch) => {

        const resp = await fetchByToken({
            endpoint: `pettycash/image/${id}`,
            data: { images },
            method: 'PUT'
        })

        if (resp.ok) {
            dispatch(storeApi.util.invalidateTags(['Ptty']))
        }
    }
}

export const startDeleteImagePettyCash = (id, imageId) => {
    return async (dispatch) => {

        const resp = await fetchByToken({
            endpoint: `pettycash/image/${id}`,
            data: { images: [imageId] },
            method: 'DELETE'
        })

        if (resp.ok) {
            dispatch(storeApi.util.invalidateTags(['Ptty']))
        }
    }
}

export const startExportExcelPettyCashById = (id) => {
    return async () => {

        const toastLoading = toast.loading('Exportando comprobantes a un archivo de excel...')

        await fetchByToken({
            endpoint: `pettycash/export/excel/${id}`
        })

        toast.dismiss(toastLoading)
    }
}

export const startExportPdfPettyCashById = (id) => {
    return async () => {

        const toastLoading = toast.loading('Exportando las imagenes de los comprobantes a un archivo de pdf...')

        await fetchByToken({
            endpoint: `pettycash/export/pdf/${id}`
        })

        toast.dismiss(toastLoading)
    }
}

export const searchOrgz = async (search) => {
    const resp = await fetchByToken({
        endpoint: 'pettycash/list_orgz',
        params: { search }
    })

    if (resp.ok) {
        return resp.docs
    } else {
        return []
    }
}