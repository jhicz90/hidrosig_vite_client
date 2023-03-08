import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { fetchByToken, normalizeText } from '../../helpers'
import { storeApi } from '../storeApi'
import { addNewCommittee, setActiveNewCommittee, setActiveCommittee, setSavingCommittee, setSavingNewCommittee } from './committeeSlice'

const SwalReact = withReactContent(Swal)

export const committeeApi = storeApi.injectEndpoints({
    endpoints: (builder) => ({
        // COMMITTEE
        newComm: builder.query({
            query: () => ({
                url: `committee/create/new`,
            }),
            transformResponse: (response, meta, arg) => response.committee
        }),
        addComm: builder.mutation({
            query: (newCommittee) => ({
                url: `committee/create/new`,
                method: 'post',
                data: newCommittee
            }),
            invalidatesTags: ['Orgz']
        }),
        getListComm: builder.query({
            query: (search) => ({
                url: `committee/list`,
                params: {
                    search
                }
            }),
            transformResponse: (response, meta, arg) => response.docs,
            providesTags: ['Orgz']
        }),
        getCommById: builder.query({
            query: (id) => ({
                url: `committee/edit/${id}`
            }),
            transformResponse: (response, meta, arg) => response.committee,
            providesTags: ['Orgz']
        }),
        getListCommByJunta: builder.query({
            query: ({ junta, search }) => ({
                url: `committee/search_by_junta/${junta}`,
                params: {
                    search
                }
            }),
            transformResponse: (response, meta, arg) => response.docs,
            providesTags: ['Orgz']
        }),
        updateCommById: builder.mutation({
            query: ({ id, committee }) => ({
                url: `committee/edit/${id}`,
                method: 'put',
                data: committee
            }),
            invalidatesTags: ['Orgz']
        }),
        deleteCommById: builder.mutation({
            query: (id) => ({
                url: `committee/delete/${id}`,
                method: 'delete'
            }),
            invalidatesTags: ['Orgz']
        }),
        // COMMITTEE
    })
})

export const {
    useAddCommMutation,
    useDeleteCommByIdMutation,
    useGetCommByIdQuery,
    useGetListCommByJuntaQuery,
    useGetListCommQuery,
    useNewCommQuery,
    useUpdateCommByIdMutation,
} = committeeApi

export const updateImageCommById = (id, image) => {
    return async (dispatch) => {

        const resp = await fetchByToken({
            endpoint: `committee/image/${id}`,
            data: { image },
            method: 'PUT'
        })

        if (resp.ok) {
            dispatch(storeApi.util.invalidateTags(['Orgz']))
        }
    }
}

export const questionStatusCommittee = async (status, name) => {

    return SwalReact.fire({
        title:
            <>
                <div className='text-uppercase'>Estado</div>
                <div className="fs-5 fw-bold text-info mt-1">{name}</div>
            </>,
        html:
            <>
                <div className='fs-5 mb-2'>¿Estás seguro de modificar el estado?</div>
                <div className='alert alert-warning'>Recordar que al hacer el cambio las sesiones de los usuarios asociados a esta organización se reiniciaran o se les restringira el acceso.</div>
            </>,
        showCancelButton: true,
        confirmButtonText: status ? 'Desactivar' : 'Activar',
        cancelButtonText: 'Cancelar',
        allowOutsideClick: false,
        icon: 'question',
        customClass: {
            confirmButton: status ? 'btn btn-warning' : 'btn btn-success',
            cancelButton: 'btn btn-neutral'
        },
        buttonsStyling: false,
        reverseButtons: true
    }).then(({ isConfirmed }) => {
        return isConfirmed
    })
}

export const questionDeleteCommittee = (name) => {

    const wordConfirm = normalizeText(name, { lowerCase: true, removeSpaces: true })

    return SwalReact.fire({
        title:
            <>
                <div className='text-uppercase'>Eliminar</div>
                <div className="fs-5 fw-bold text-info mt-1">{name}</div>
            </>,
        html:
            <>
                <div className='fs-5 mb-2'>¿Estás seguro de eliminar esta comisión de usuarios?</div>
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

export const searchCommitteeByJunta = async (junta, search) => {
    if (junta === '') {
        return []
    } else {
        const resp = await fetchByToken({
            endpoint: `committee/search_by_junta/${junta}`,
            params: { search },
            alert: false
        })

        if (resp.ok) {
            return resp.docs
        } else {
            return []
        }
    }
}