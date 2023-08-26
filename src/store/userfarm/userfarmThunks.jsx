import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { fetchByToken, normalizeText } from '../../helpers'
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
        getListUserFarmByFarm: builder.query({
            query: ({ farm, search }) => ({
                url: `userfarm/search_by_farm/${farm}`,
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
        updateImageUserFarmById: builder.mutation({
            query: ({ id, image }) => ({
                url: `userfarm/image/${id}`,
                method: 'put',
                data: { image }
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
    useGetListUserFarmByFarmQuery,
    useGetListUserFarmQuery,
    useGetUserFarmByIdQuery,
    useLazyNewUserFarmQuery,
    useNewUserFarmQuery,
    useUpdateImageUserFarmByIdMutation,
    useUpdateUserFarmByIdMutation,
} = userfarmApi

export const updateImageUserFarmById = (id, image) => {
    return async (dispatch) => {

        const resp = await fetchByToken({
            endpoint: `userfarm/image/${id}`,
            data: { image },
            method: 'PUT'
        })

        if (resp.ok) {
            dispatch(storeApi.util.invalidateTags(['UsrFrm']))
        }
    }
}

export const questionActiveUserFarm = async (active, names) => {

    return SwalReact.fire({
        title:
            <>
                <div className='text-uppercase'>Estado</div>
                <div className="fs-5 fw-bold text-info mt-1">{names}</div>
            </>,
        html:
            <>
                <div className='fs-5 mb-2'>¿Estás seguro de modificar el estado?</div>
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

export const questionDeleteUserFarm = async (names) => {

    const wordConfirm = normalizeText(names, { lowerCase: true, removeSpaces: true })

    return SwalReact.fire({
        title:
            <>
                <div className='text-uppercase'>Eliminar usuario agrario</div>
                <div className="fs-5 fw-bold text-info mt-1">{names}</div>
            </>,
        html:
            <>
                <div className='fs-5 mb-2'>¿Estás seguro de eliminar este usuario agrario?</div>
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

export const searchUserFarm = async (search) => {
    const resp = await fetchByToken({
        endpoint: 'userfarm/search',
        params: { search }
    })

    if (resp.ok) {
        return resp.docs
    } else {
        return []
    }
}