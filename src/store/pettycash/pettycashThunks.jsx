import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { fetchByToken, normalizeText } from '../../helpers'
import { storeApi } from '../storeApi'
import { addNewPettycash, setActiveNewPettycash, setActivePettycash, setSavingPettycash, setSavingNewPettycash } from './pettycashSlice'

const SwalReact = withReactContent(Swal)

export const {
    useAddPettyCashMutation,
    useGetListPettyCashByUsrSysQuery,
    useGetListPettyCashQuery,
    useGetPettyCashByIdQuery,
    useNewPettyCashQuery,
} = storeApi.injectEndpoints({
    endpoints: (builder) => ({
        // PETTYCASH
        newPettyCash: builder.query({
            query: () => ({
                url: `pettycash/create/new`,
                params: {
                    pettycashId
                }
            }),
            transformResponse: (response, meta, arg) => response.pettycash
        }),
        addPettyCash: builder.mutation({
            query: (newPettyCash) => ({
                url: `pettycash/create/new`,
                method: 'post',
                data: newPettyCash
            }),
            invalidatesTags: ['Acct - Ptty']
        }),
        getListPettyCash: builder.query({
            query: (search) => ({
                url: `pettycash/list`,
                params: {
                    search
                }
            }),
            transformResponse: (response, meta, arg) => response.docs,
            providesTags: ['Acct - Ptty']
        }),
        getPettyCashById: builder.query({
            query: (id) => ({
                url: `pettycash/edit/${id}`,
            }),
            transformResponse: (response, meta, arg) => response.pettycash,
            providesTags: ['Acct - Ptty']
        }),
        getListPettyCashByUsrSys: builder.query({
            query: ({ usersys, search }) => ({
                url: `pettycash/search_by_usersys/${usersys}`,
                params: {
                    search
                }
            }),
            transformResponse: (response, meta, arg) => response.docs,
            providesTags: ['Acct - Ptty']
        }),
        // PETTYCASH
    })
})

export const startAddNewPettycash = () => {
    return async (dispatch) => {

        dispatch(addNewPettycash())

        const resp = await fetchByToken({
            endpoint: `pettycash/create/new`
        })

        dispatch(setSavingNewPettycash(false))

        if (resp.ok) {
            dispatch(setActiveNewPettycash(resp.pettycash))
        }
    }
}

export const startSaveNewPettycash = () => {
    return async (dispatch, getState) => {

        dispatch(setSavingNewPettycash(true))

        const { activeNew } = getState().pettycash

        const newPettycash = {
            ...activeNew
        }

        const resp = await fetchByToken({
            endpoint: `pettycash/create/new`,
            data: newPettycash,
            method: 'POST'
        })

        dispatch(setSavingNewPettycash(false))

        if (resp.ok) {
            dispatch(storeApi.util.invalidateTags(['Acct - Ptty']))
            dispatch(setActiveNewPettycash(null))
        }
    }
}

export const startGetPettycash = (id) => {
    return async (dispatch) => {

        dispatch(setSavingPettycash(true))

        const resp = await fetchByToken({
            endpoint: `pettycash/edit/${id}`
        })

        dispatch(setSavingPettycash(false))

        if (resp.ok) {
            dispatch(setActivePettycash(resp.pettycash))
        }
    }
}

export const startUpdatePettycash = () => {
    return async (dispatch, getState) => {

        dispatch(setSavingPettycash(true))

        const { active } = getState().pettycash
        const { _id } = active

        const updatePettycash = {
            ...active
        }

        const resp = await fetchByToken({
            endpoint: `pettycash/edit/${_id}`,
            data: updatePettycash,
            method: 'PUT'
        })

        dispatch(setSavingPettycash(false))

        if (resp.ok) {
            dispatch(storeApi.util.invalidateTags(['Acct - Ptty']))
            dispatch(setActivePettycash(resp.pettycash))
        }
    }
}

export const startUpdateInformationPettycash = ({ code, year, name, desc, receipt, check, remainingAmount, oldBalance, startDeclaration }) => {
    return async (dispatch, getState) => {

        dispatch(setSavingPettycash(true))

        const { active } = getState().pettycash
        const { _id } = active

        const resp = await fetchByToken({
            endpoint: `pettycash/edit/${_id}`,
            data: { code, year, name, desc, receipt, check, remainingAmount, oldBalance, startDeclaration },
            method: 'PUT'
        })

        dispatch(setSavingPettycash(false))

        if (resp.ok) {
            dispatch(storeApi.util.invalidateTags(['Acct - Ptty']))
            dispatch(setActivePettycash(resp.pettycash))
        }
    }
}

export const startUpdateImageIdPettyCash = (id, images) => {
    return async (dispatch) => {

        const resp = await fetchByToken({
            endpoint: `pettycash/image/${id}`,
            data: { images },
            method: 'PUT'
        })

        if (resp.ok) {
            dispatch(storeApi.util.invalidateTags(['Acct - Ptty']))
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
            dispatch(storeApi.util.invalidateTags(['Acct - Ptty']))
        }
    }
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
                    dispatch(storeApi.util.invalidateTags(['Acct - Ptty']))
                    dispatch(setActivePettycash(null))
                }
            }
        })
    }
}

export const startExportExcelActivePettyCash = () => {
    return async (dispatch, getState) => {

        const { active } = getState().pettycash
        const { _id } = active

        await fetchByToken({
            endpoint: `pettycash/export/excel/${_id}`
        })
    }
}

export const startExportPdfActivePettyCash = () => {
    return async (dispatch, getState) => {

        const { active } = getState().pettycash
        const { _id } = active

        await fetchByToken({
            endpoint: `pettycash/export/pdf/${_id}`
        })
    }
}