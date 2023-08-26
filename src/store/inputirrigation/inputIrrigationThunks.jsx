import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { fetchByToken, normalizeText } from '../../helpers'
import { storeApi } from '../storeApi'

const SwalReact = withReactContent(Swal)

export const inputirrigationApi = storeApi.injectEndpoints({
    endpoints: (builder) => ({
        // INPUTIRRIGATION
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
    useGetListInputIrrigByFarmQuery
} = inputirrigationApi