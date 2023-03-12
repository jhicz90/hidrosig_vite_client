import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { storeApi } from '../storeApi'

const SwalReact = withReactContent(Swal)

export const userfarmApi = storeApi.injectEndpoints({
    endpoints: (builder) => ({
        // USERFARM
        newUserFarm: builder.query({
            query: () => ({
                url: `userfarm/create/new`,
            }),
            transformResponse: (response, meta, arg) => response.userfarm
        }),
        addUserFarm: builder.mutation({
            query: (newUserFarm) => ({
                url: `userfarm/create/new`,
                method: 'post',
                data: newUserFarm
            }),
            invalidatesTags: ['UsrFrm']
        }),
        draftUserFarm: builder.mutation({
            query: (draftUserFarm) => ({
                url: `userfarm/draft/new`,
                method: 'post',
                data: draftUserFarm
            }),
            invalidatesTags: ['UsrFrm']
        }),
        getListUserFarm: builder.query({
            query: (search) => ({
                url: `userfarm/list`,
                params: {
                    search
                }
            }),
            transformResponse: (response, meta, arg) => response.docs,
            providesTags: ['UsrFrm']
        }),
        getUserFarmById: builder.query({
            query: (id) => ({
                url: `userfarm/edit/${id}`
            }),
            transformResponse: (response, meta, arg) => response.userfarm,
            providesTags: ['UsrFrm']
        }),
        updateUserFarmById: builder.mutation({
            query: ({ id, userfarm }) => ({
                url: `userfarm/edit/${id}`,
                method: 'put',
                data: userfarm
            }),
            invalidatesTags: ['UsrFrm']
        }),
        deleteUserFarmById: builder.mutation({
            query: (id) => ({
                url: `userfarm/delete/${id}`,
                method: 'delete'
            }),
            invalidatesTags: ['UsrFrm']
        })
        // USERFARM
    })
})

export const {
    useAddUserFarmMutation,
    useDeleteUserFarmByIdMutation,
    useDraftUserFarmMutation,
    useGetListUserFarmQuery,
    useGetUserFarmByIdQuery,
    useNewUserFarmQuery,
    useUpdateUserFarmByIdMutation,
} = userfarmApi