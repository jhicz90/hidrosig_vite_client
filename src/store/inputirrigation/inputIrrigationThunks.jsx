import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { fetchByToken, normalizeText } from '../../helpers'
import { storeApi } from '../storeApi'

const SwalReact = withReactContent(Swal)

export const inputirrigationApi = storeApi.injectEndpoints({
    endpoints: (builder) => ({
        // INPUTIRRIGATION
        newInputIrrigation: builder.query({
            query: (farm) => ({
                url: `inputirrigation/create/new`,
                params: {
                    farm
                }
            }),
            transformResponse: (response, meta, arg) => response.inputIrrigation
        }),
        addInputIrrigation: builder.mutation({
            query: (newInputIrrigation) => ({
                url: `inputirrigation/create/new`,
                method: 'post',
                data: newInputIrrigation
            }),
            invalidatesTags: ['Frm']
        }),
        getInputIrrigationById: builder.query({
            query: (id) => ({
                url: `inputirrigation/edit/${id}`
            }),
            transformResponse: (response, meta, arg) => response.inputIrrigation,
            providesTags: ['Frm']
        }),
        updateInputIrrigationById: builder.mutation({
            query: ({ id, inputIrrigation }) => ({
                url: `inputirrigation/edit/${id}`,
                method: 'put',
                data: inputIrrigation
            }),
            invalidatesTags: ['Frm']
        }),
        getListInputIrrigByFarm: builder.query({
            query: (farm) => ({
                url: `inputirrigation/search_by_farm/${farm}`
            }),
            transformResponse: (response, meta, arg) => response.docs,
            providesTags: ['Frm']
        }),
        // INPUTIRRIGATION
    })
})

export const {
    useAddInputIrrigationMutation,
    useGetInputIrrigationByIdQuery,
    useGetListInputIrrigByFarmQuery,
    useLazyNewInputIrrigationQuery,
    useNewInputIrrigationQuery,
    useUpdateInputIrrigationByIdMutation,
} = inputirrigationApi