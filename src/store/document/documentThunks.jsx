import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { storeApi } from '../storeApi'
import { addNewDocument, setActiveNewDocument, setActiveDocument, setSavingDocument, setSavingNewDocument } from './documentSlice'
import { fetchByToken, normalizeText } from '../../helpers'

const SwalReact = withReactContent(Swal)

export const documentApi = storeApi.injectEndpoints({
    endpoints: (builder) => ({
        // FILES
        newDocument: builder.query({
            query: () => ({
                url: `document/create/new`,
            }),
            transformResponse: (response, meta, arg) => response.zone
        }),
        addDocument: builder.mutation({
            query: (newDocument) => ({
                url: `document/create/new`,
                method: 'post',
                data: newDocument
            }),
            invalidatesTags: ['Files']
        }),
        getBrowser: builder.query({
            query: (folder) => ({
                url: `resource/browser/${folder}`,
            }),
            transformResponse: (response, meta, arg) => response.browser,
            providesTags: ['Files']
        }),
        getListDocument: builder.query({
            query: (search) => ({
                url: `document/list`,
                params: {
                    search
                }
            }),
            transformResponse: (response, meta, arg) => response.docs,
            providesTags: ['Files']
        }),
        getListDocumentByUserFarm: builder.query({
            query: ({ userfarm, search }) => ({
                url: `document/search_by_userfarm/${userfarm}`,
                params: {
                    search
                }
            }),
            transformResponse: (response, meta, arg) => response.docs,
            providesTags: ['Files']
        }),
        getDocumentById: builder.query({
            query: (id) => ({
                url: `document/edit/${id}`,
            }),
            transformResponse: (response, meta, arg) => response.document,
            providesTags: ['Files']
        }),
        updateDocumentById: builder.mutation({
            query: ({ id, document }) => ({
                url: `document/edit/${id}`,
                method: 'put',
                data: document
            }),
            invalidatesTags: ['Files']
        }),
        deleteDocumentById: builder.mutation({
            query: (id) => ({
                url: `document/delete/${id}`,
                method: 'delete'
            }),
            invalidatesTags: ['Files']
        }),
        // FILES
    })
})

export const {
    useAddDocumentMutation,
    useDeleteDocumentByIdMutation,
    useGetBrowserQuery,
    useGetDocumentByIdQuery,
    useLazyGetDocumentByIdQuery,
    useGetListDocumentByUserFarmQuery,
    useGetListDocumentQuery,
    useNewDocumentQuery,
    useUpdateDocumentByIdMutation,
} = documentApi

export const startAddNewDocument = () => {
    return async (dispatch) => {

        dispatch(addNewDocument())

        const resp = await fetchByToken({
            endpoint: `document/create/new`
        })

        dispatch(setSavingNewDocument(false))

        if (resp.ok) {
            dispatch(setActiveNewDocument(resp.document))
        }
    }
}

export const startSaveNewDocument = () => {
    return async (dispatch, getState) => {

        dispatch(setSavingNewDocument(true))

        const { activeNew } = getState().document

        const newDocument = {
            ...activeNew,
            junta: activeNew.junta !== null ? activeNew.junta._id : null,
        }

        const resp = await fetchByToken({
            endpoint: `document/create/new`,
            data: newDocument,
            method: 'POST'
        })

        dispatch(setSavingNewDocument(false))

        if (resp.ok) {
            dispatch(storeApi.util.invalidateTags(['Files']))
            dispatch(setActiveNewDocument(null))
        }
    }
}

export const startGetDocument = (id) => {
    return async (dispatch) => {

        dispatch(setSavingDocument(true))

        const resp = await fetchByToken({
            endpoint: `document/edit/${id}`
        })

        dispatch(setSavingDocument(false))

        if (resp.ok) {
            dispatch(setActiveDocument(resp.document))
        }
    }
}

export const startUpdateDocument = () => {
    return async (dispatch, getState) => {

        dispatch(setSavingDocument(true))

        const { active } = getState().document
        const { _id } = active

        const updateDocument = {
            ...active
        }

        const resp = await fetchByToken({
            endpoint: `document/edit/${_id}`,
            data: updateDocument,
            method: 'PUT'
        })

        dispatch(setSavingDocument(false))

        if (resp.ok) {
            dispatch(setActiveDocument(resp.document))
        }
    }
}

export const startUpdateDocsDocument = (docs) => {
    return async (dispatch, getState) => {
        const { active } = getState().document
        const { _id } = active

        const resp = await fetchByToken({
            endpoint: `document/docs/${_id}`,
            data: { docs },
            method: 'PUT'
        })

        if (resp.ok) {
            dispatch(setActiveDocument(resp.document))
        }
    }
}

export const startUpdateDocsIdDocument = (id, docs) => {
    return async (dispatch) => {

        const resp = await fetchByToken({
            endpoint: `document/docs/${id}`,
            data: { docs },
            method: 'PUT'
        })

        if (resp.ok) {
            dispatch(storeApi.util.invalidateTags(['Files']))
        }
    }
}

export const startDeleteFileDocument = (id, fileId) => {
    return async (dispatch) => {

        const resp = await fetchByToken({
            endpoint: `document/docs/${id}`,
            data: { docs: [fileId] },
            method: 'DELETE'
        })

        if (resp.ok) {
            dispatch(storeApi.util.invalidateTags(['Files']))
        }
    }
}

export const startUpdateInformationDocument = ({ name, nameAbrev, nameLarge, nameLargeAbrev, desc, docid, email }) => {
    return async (dispatch, getState) => {

        dispatch(setSavingDocument(true))

        const { active } = getState().document
        const { _id } = active

        const resp = await fetchByToken({
            endpoint: `document/info/${_id}`,
            data: { name, nameAbrev, nameLarge, nameLargeAbrev, desc, docid, email },
            method: 'PUT'
        })

        dispatch(setSavingDocument(false))

        if (resp.ok) {
            dispatch(setActiveDocument(resp.document))
        }
    }
}

export const startDeleteDocument = () => {
    return async (dispatch, getState) => {
        const { active } = getState().document
        const { _id, name } = active

        const wordConfirm = normalizeText(name, { lowerCase: true, removeSpaces: true, removeSymbols: true })

        SwalReact.fire({
            title:
                <>
                    <div className='text-uppercase'>Eliminar documento</div>
                    <div className="fs-5 fw-bold text-info mt-1">{name}</div>
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

                dispatch(setSavingDocument(true))

                const resp = await fetchByToken({
                    endpoint: `document/delete/${_id}`,
                    method: 'DELETE'
                })

                dispatch(setSavingDocument(false))

                if (resp.ok) {
                    dispatch(setActiveDocument(null))
                }
            }
        })
    }
}

export const searchDocument = async (search) => {
    const resp = await fetchByToken({
        endpoint: 'document/list',
        params: { search }
    })

    if (resp.ok) {
        return resp.docs
    } else {
        return []
    }
}