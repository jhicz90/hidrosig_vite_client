import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { fetchByToken, normalizeText } from '../../helpers'
import { storeApi } from '../storeApi'

const SwalReact = withReactContent(Swal)

export const yearrateApi = storeApi.injectEndpoints({
    endpoints: (builder) => ({
        // YEARRATE
        newYearRate: builder.query({
            query: () => ({
                url: `yearrate/create/new`,
            }),
            transformResponse: (response, meta, arg) => response.yearrate
        }),
        addYearRate: builder.mutation({
            query: (newYearRate) => ({
                url: `yearrate/create/new`,
                method: 'post',
                data: newYearRate
            }),
            invalidatesTags: ['YrRt']
        }),
        getListYearRate: builder.query({
            query: (search) => ({
                url: `yearrate/list`,
                params: {
                    search
                }
            }),
            transformResponse: (response, meta, arg) => response.docs,
            providesTags: ['YrRt']
        }),
        getListYearRateByJunta: builder.query({
            query: ({ junta, search }) => ({
                url: `yearrate/search_by_junta/${junta}`,
                params: {
                    search
                }
            }),
            transformResponse: (response, meta, arg) => response.docs,
            providesTags: ['YrRt']
        }),
        getYearRateById: builder.query({
            query: (id) => ({
                url: `yearrate/edit/${id}`
            }),
            transformResponse: (response, meta, arg) => response.yearrate,
            providesTags: ['YrRt']
        }),
        updateYearRateById: builder.mutation({
            query: ({ id, yearrate }) => ({
                url: `yearrate/edit/${id}`,
                method: 'put',
                data: yearrate
            }),
            invalidatesTags: ['YrRt']
        }),
        updateOpClYearRateById: builder.mutation({
            query: ({ id, openclose }) => ({
                url: `yearrate/${openclose}/${id}`,
                method: 'put'
            }),
            invalidatesTags: ['YrRt']
        }),
        deleteYearRateById: builder.mutation({
            query: (id) => ({
                url: `yearrate/delete/${id}`,
                method: 'delete'
            }),
            invalidatesTags: ['YrRt']
        })
        // YEARRATE
    })
})

export const {
    useAddYearRateMutation,
    useDeleteYearRateByIdMutation,
    useGetListYearRateByJuntaQuery,
    useGetListYearRateQuery,
    useGetYearRateByIdQuery,
    useNewYearRateQuery,
    useUpdateOpClYearRateByIdMutation,
    useUpdateYearRateByIdMutation,
} = yearrateApi

export const closeCampaignByIds = (ids = []) => {
    return async (dispatch) => {

        const resp = await fetchByToken({
            endpoint: `yearrate/close/campaigns`,
            method: 'PUT',
            data: { campaigns: ids }
        })

        if (resp.ok) {
            dispatch(storeApi.util.invalidateTags(['YrRt']))
        }
    }
}

export const activeCampaignByIds = (ids = []) => {
    return async (dispatch) => {

        const resp = await fetchByToken({
            endpoint: `yearrate/active/campaigns`,
            method: 'PUT',
            data: { campaigns: ids }
        })

        if (resp.ok) {
            dispatch(storeApi.util.invalidateTags(['YrRt']))
        }
    }
}

export const inactiveCampaignByIds = (ids = []) => {
    return async (dispatch) => {

        const resp = await fetchByToken({
            endpoint: `yearrate/inactive/campaigns`,
            method: 'PUT',
            data: { campaigns: ids }
        })

        if (resp.ok) {
            dispatch(storeApi.util.invalidateTags(['YrRt']))
        }
    }
}

export const questionDeleteYearRate = async (yearrate) => {

    const wordConfirm = normalizeText(`${yearrate.year} - ${yearrate.campaign === 1 ? 'CHICA' : 'GRANDE'}`, { lowerCase: true, removeSpaces: true })

    return SwalReact.fire({
        title:
            <>
                <div className='text-uppercase'>Eliminar año - campaña</div>
                <div className="fs-5 fw-bold text-info mt-1">{`${yearrate.year} - ${yearrate.campaign === 1 ? 'CHICA - I' : 'GRANDE - II'}`}</div>
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

export const searchYearRateByJunta = async (junta, search) => {
    const resp = await fetchByToken({
        endpoint: `yearrate/search_by_junta/${junta}`,
        params: { search },
    })

    if (resp.ok) {
        return resp.docs
    } else {
        return []
    }
}