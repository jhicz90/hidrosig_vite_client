import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
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
        })
        // PETTYCASH
    })
})

export const {
    useAddPettyCashMutation,
    useDeletePettyCashByIdMutation,
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
            dispatch(storeApi.util.invalidateTags([{ type: 'Ptty', id }]))
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
            dispatch(storeApi.util.invalidateTags([{ type: 'Ptty', id }]))
        }
    }
}

export const questionDeletePettycash = async (name) => {

    const wordConfirm = normalizeText(name, { lowerCase: true, removeSpaces: true })

    return SwalReact.fire({
        title:
            <>
                <div className='text-uppercase'>Eliminar caja chica</div>
                <div className="fs-5 fw-bold text-info mt-1">{name}</div>
            </>,
        html:
            <>
                <div className='fs-5 mb-2'>¿Estás seguro de eliminar esta caja chica?</div>
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

export const startDeletePettycash = () => {
    return async (dispatch, getState) => {
        const { active } = getState().pettycash
        const { _id, name } = active

        const wordConfirm = normalizeText(name, { lowerCase: true, removeSpaces: true })

        SwalReact.fire({
            title:
                <>
                    <div className='text-uppercase'>Eliminar caja chica</div>
                    <div className="fs-5 fw-bold text-info mt-1">{name}</div>
                </>,
            html:
                <>
                    <div className='fs-5 mb-2'>¿Estás seguro de eliminar esta caja chica?</div>
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
        }).then(async (result) => {
            if (result.value) {

                dispatch(setSavingPettycash(true))

                const resp = await fetchByToken({
                    endpoint: `pettycash/delete/${_id}`,
                    method: 'DELETE'
                })

                dispatch(setSavingPettycash(false))

                if (resp.ok) {
                    dispatch(storeApi.util.invalidateTags([{ type: 'Ptty', id: _id }]))
                    dispatch(setActivePettycash(null))
                }
            }
        })
    }
}

export const startExportExcelActivePettyCash = (id) => {
    return async () => {
        await fetchByToken({
            endpoint: `pettycash/export/excel/${id}`
        })
    }
}

export const startExportPdfActivePettyCash = (id) => {
    return async () => {
        await fetchByToken({
            endpoint: `pettycash/export/pdf/${id}`
        })
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