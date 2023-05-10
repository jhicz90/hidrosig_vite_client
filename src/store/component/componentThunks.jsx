import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { fetchByToken } from '../../helpers'
import { storeApi } from '../storeApi'

const SwalReact = withReactContent(Swal)

export const componentApi = storeApi.injectEndpoints({
    endpoints: (builder) => ({
        // COMPONENT
        newComp: builder.query({
            query: () => ({
                url: `component/create/new`,
            }),
            transformResponse: (response, meta, arg) => response.component
        }),
        addComp: builder.mutation({
            query: (newComponent) => ({
                url: `component/create/new`,
                method: 'post',
                data: newComponent
            }),
            invalidatesTags: ['Comp']
        }),
        getListComp: builder.query({
            query: (search) => ({
                url: `component/list`,
                params: {
                    search
                }
            }),
            transformResponse: (response, meta, arg) => response.docs,
            providesTags: ['Comp']
        }),
        getListCompByJunta: builder.query({
            query: ({ junta, search }) => ({
                url: `component/list_by_junta/${junta}`,
                params: {
                    search
                }
            }),
            transformResponse: (response, meta, arg) => response.docs,
            providesTags: ['Comp']
        }),
        getCompById: builder.query({
            query: (id) => ({
                url: `component/edit/${id}`
            }),
            transformResponse: (response, meta, arg) => response.component,
            providesTags: ['Comp']
        }),
        updateCompById: builder.mutation({
            query: ({ id, component }) => ({
                url: `component/edit/${id}`,
                method: 'put',
                data: component
            }),
            invalidatesTags: ['Comp']
        }),
        deleteCompById: builder.mutation({
            query: (id) => ({
                url: `component/delete/${id}`,
                method: 'delete'
            }),
            invalidatesTags: ['Comp']
        }),
        // COMPONENT
    })
})

export const {
   useAddCompMutation,
   useDeleteCompByIdMutation,
   useGetCompByIdQuery,
   useGetListCompByJuntaQuery,
   useGetListCompQuery,
   useLazyGetListCompByJuntaQuery,
   useNewCompQuery,
   useUpdateCompByIdMutation,
} = componentApi

export const searchCompByJunta = async (junta, search) => {
    if (junta === '') {
        return []
    } else {
        const resp = await fetchByToken({
            endpoint: `component/search_by_junta/${junta}`,
            params: { search },
        })

        if (resp.ok) {
            return resp.docs
        } else {
            return []
        }
    }
}