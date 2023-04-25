import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { fetchByToken, normalizeText } from '../../helpers'
import { storeApi } from '../storeApi'

const SwalReact = withReactContent(Swal)

export const farmApi = storeApi.injectEndpoints({
    endpoints: (builder) => ({
        // FARM
        newFarm: builder.query({
            query: () => ({
                url: `farm/create/new`,
            }),
            transformResponse: (response, meta, arg) => response.farm
        }),
        addFarm: builder.mutation({
            query: (newFarm) => ({
                url: `farm/create/new`,
                method: 'post',
                data: newFarm
            }),
            invalidatesTags: ['Frm']
        }),
        draftFarm: builder.mutation({
            query: (draftFarm) => ({
                url: `farm/draft/new`,
                method: 'post',
                data: draftFarm
            }),
            invalidatesTags: ['Frm']
        }),
        getListFarm: builder.query({
            query: (search) => ({
                url: `farm/list`,
                params: {
                    search
                }
            }),
            transformResponse: (response, meta, arg) => response.docs,
            providesTags: ['Frm']
        }),
        getListFarmByUserFarm: builder.query({
            query: ({ userfarm, search }) => ({
                url: `farm/search_by_userfarm/${userfarm}`,
                params: {
                    search
                }
            }),
            transformResponse: (response, meta, arg) => response.docs,
            providesTags: ['Frm']
        }),
        getFarmById: builder.query({
            query: (id) => ({
                url: `farm/edit/${id}`
            }),
            transformResponse: (response, meta, arg) => response.farm,
            providesTags: ['Frm']
        }),
        updateFarmById: builder.mutation({
            query: ({ id, farm }) => ({
                url: `farm/edit/${id}`,
                method: 'put',
                data: farm
            }),
            invalidatesTags: ['Frm']
        }),
        updateFarmByIdAddInputIrrig: builder.mutation({
            query: ({ id, inputIrrig }) => ({
                url: `farm/add/${id}`,
                method: 'put',
                data: inputIrrig
            }),
            invalidatesTags: ['Frm']
        }),
        deleteFarmById: builder.mutation({
            query: (id) => ({
                url: `farm/delete/${id}`,
                method: 'delete'
            }),
            invalidatesTags: ['Frm']
        })
        // FARM
    })
})

export const {
    useAddFarmMutation,
    useDeleteFarmByIdMutation,
    useDraftFarmMutation,
    useGetFarmByIdQuery,
    useGetListFarmByUserFarmQuery,
    useGetListFarmQuery,
    useLazyNewFarmQuery,
    useNewFarmQuery,
    useUpdateFarmByIdAddInputIrrigMutation,
    useUpdateFarmByIdMutation,
} = farmApi

export const startUpdateImageIdFarm = (id, images) => {
    return async (dispatch) => {

        const resp = await fetchByToken({
            endpoint: `farm/image/${id}`,
            data: { images },
            method: 'PUT'
        })

        if (resp.ok) {
            dispatch(storeApi.util.invalidateTags([{ type: 'Frm', id }]))
        }
    }
}

export const startDeleteImageFarm = (id, imageId) => {
    return async (dispatch) => {

        const resp = await fetchByToken({
            endpoint: `farm/image/${id}`,
            data: { images: [imageId] },
            method: 'DELETE'
        })

        if (resp.ok) {
            dispatch(storeApi.util.invalidateTags([{ type: 'Frm', id }]))
        }
    }
}

export const questionActiveFarm = async (active, names) => {

    return SwalReact.fire({
        title:
            <>
                <div className='text-uppercase'>Estado</div>
                <div className="fs-5 fw-bold text-info mt-1">{names}</div>
            </>,
        html:
            <>
                <div className='fs-5 mb-2'>¿Estás seguro de modificar el estado del predio?</div>
                <div className='alert alert-warning'>Recordar que al hacer el cambio podrán o no tener acceso, segun sea conveniente.</div>
            </>,
        showCancelButton: true,
        confirmButtonText: active ? 'Desactivar' : 'Activar',
        cancelButtonText: 'Cancelar',
        allowOutsideClick: false,
        icon: 'question',
        customClass: {
            confirmButton: active ? 'btn btn-warning' : 'btn btn-success',
            cancelButton: 'btn btn-neutral'
        },
        buttonsStyling: false,
        reverseButtons: true
    }).then(({ isConfirmed }) => {
        return isConfirmed
    })
}

export const questionDeleteFarm = async (name) => {

    const wordConfirm = normalizeText(name, { lowerCase: true, removeSpaces: true })

    return SwalReact.fire({
        title:
            <>
                <div className='text-uppercase'>Eliminar predio agrario</div>
                <div className="fs-5 fw-bold text-info mt-1">{name}</div>
            </>,
        html:
            <>
                <div className='fs-5 mb-2'>¿Estás seguro de eliminar este predio?</div>
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

export const startDeleteIdFarm = (farm) => {
    return async (dispatch) => {
        const { _id, name } = farm

        const wordConfirm = normalizeText(name, { lowerCase: true, removeSpaces: true })

        SwalReact.fire({
            title:
                <>
                    <div className='text-uppercase'>Eliminar predio agrario</div>
                    <div className="fs-5 fw-bold text-info mt-1">{name}</div>
                </>,
            html:
                <>
                    <div className='fs-5 mb-2'>¿Estás seguro de eliminar este predio?</div>
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

                const resp = await fetchByToken({
                    endpoint: `farm/delete/${_id}`,
                    method: 'DELETE'
                })

                if (resp.ok) {
                    dispatch(storeApi.util.invalidateTags(['Irrig']))
                }
            }
        })
    }
}