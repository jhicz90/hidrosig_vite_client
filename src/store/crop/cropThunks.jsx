import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { fetchByToken, normalizeText } from '../../helpers'
import { storeApi } from '../storeApi'

const SwalReact = withReactContent(Swal)

export const cropApi = storeApi.injectEndpoints({
    endpoints: (builder) => ({
        // CROP
        newCrop: builder.query({
            query: () => ({
                url: `crop/create/new`,
            }),
            transformResponse: (response, meta, arg) => response.crop
        }),
        addCrop: builder.mutation({
            query: (newCrop) => ({
                url: `crop/create/new`,
                method: 'post',
                data: newCrop
            }),
            invalidatesTags: ['Crp']
        }),
        getListCrop: builder.query({
            query: (search) => ({
                url: `crop/list`,
                params: {
                    search
                }
            }),
            transformResponse: (response, meta, arg) => response.docs,
            providesTags: ['Crp']
        }),
        getListCropByJunta: builder.query({
            query: ({ junta, search }) => ({
                url: `crop/search_by_junta/${junta}`,
                params: {
                    search
                }
            }),
            transformResponse: (response, meta, arg) => response.docs,
            providesTags: ['Crp']
        }),
        getCropById: builder.query({
            query: (id) => ({
                url: `crop/edit/${id}`
            }),
            transformResponse: (response, meta, arg) => response.crop,
            providesTags: ['Crp']
        }),
        updateCropById: builder.mutation({
            query: ({ id, crop }) => ({
                url: `crop/edit/${id}`,
                method: 'put',
                data: crop
            }),
            invalidatesTags: ['Crp']
        }),
        deleteCropById: builder.mutation({
            query: (id) => ({
                url: `crop/delete/${id}`,
                method: 'delete'
            }),
            invalidatesTags: ['Crp']
        }),
        // CROP
    })
})

export const {
    useAddCropMutation, 
    useDeleteCropByIdMutation,
    useGetCropByIdQuery,
    useGetListCropByJuntaQuery,
    useGetListCropQuery,
    useNewCropQuery,
    useUpdateCropByIdMutation,
} = cropApi

export const searchCropByJunta = async (junta, search) => {
    const resp = await fetchByToken({
        endpoint: `crop/search_by_junta/${junta}`,
        params: { search }
    })

    if (resp.ok) {
        return resp.docs
    } else {
        return []
    }
}