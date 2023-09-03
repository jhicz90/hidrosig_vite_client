import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { storeApi } from '../storeApi'
import { addNewJunta, setActiveNewJunta, setActiveJunta, setSavingJunta, setSavingNewJunta } from './juntaSlice'
import { fetchByToken, normalizeText } from '../../helpers'

const SwalReact = withReactContent(Swal)

export const juntaApi = storeApi.injectEndpoints({
    endpoints: (builder) => ({
        // JUNTA
        newJunta: builder.query({
            query: () => ({
                url: `junta/create/new`,
            }),
            transformResponse: (response, meta, arg) => response.junta
        }),
        addJunta: builder.mutation({
            query: (newJunta) => ({
                url: `junta/create/new`,
                method: 'post',
                data: newJunta
            }),
            invalidatesTags: ['Orgz']
        }),
        getListJunta: builder.query({
            query: (search = '') => ({
                url: `junta/list`,
                params: {
                    search
                }
            }),
            transformResponse: (response, meta, arg) => response.docs,
            providesTags: ['Orgz']
        }),
        getJuntaById: builder.query({
            query: (id) => ({
                url: `junta/edit/${id}`
            }),
            transformResponse: (response, meta, arg) => response.junta,
            providesTags: ['Orgz']
        }),
        updateJuntaById: builder.mutation({
            query: ({ id, junta }) => ({
                url: `junta/edit/${id}`,
                method: 'put',
                data: junta
            }),
            invalidatesTags: ['Orgz']
        }),
        deleteJuntaById: builder.mutation({
            query: (id) => ({
                url: `junta/delete/${id}`,
                method: 'delete'
            }),
            invalidatesTags: ['Orgz']
        }),
        // JUNTA
    })
})

export const {
    useAddJuntaMutation,
    useDeleteJuntaByIdMutation,
    useGetJuntaByIdQuery,
    useGetListJuntaQuery,
    useLazyNewJuntaQuery,
    useNewJuntaQuery,
    useUpdateJuntaByIdMutation,
} = juntaApi

export const updateImageJuntaById = (id, image) => {
    return async (dispatch) => {

        const resp = await fetchByToken({
            endpoint: `junta/image/${id}`,
            data: { image },
            method: 'PUT'
        })

        if (resp.ok) {
            dispatch(storeApi.util.invalidateTags(['Orgz']))
        }
    }
}

export const questionStatusJunta = async (status, name) => {

    return SwalReact.fire({
        title:
            <>
                <div className='text-uppercase'>Estado</div>
                <div className="fs-5 fw-bold text-info mt-1">{name}</div>
            </>,
        html:
            <>
                <div className='fs-5 mb-2'>¿Estás seguro de modificar el estado?</div>
                <div className='alert alert-warning'>Recordar que al hacer el cambio las sesiones de los usuarios asociados a esta junta de usuarios se actualizaran.</div>
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

export const questionDeleteJunta = async (name) => {

    const wordConfirm = normalizeText(name, { lowerCase: true, removeSpaces: true })

    return SwalReact.fire({
        title:
            <>
                <div className='text-uppercase'>Eliminar junta de usuarios</div>
                <div className="fs-5 fw-bold text-info mt-1">{name}</div>
            </>,
        html:
            <>
                <div className='fs-5 mb-2'>¿Estás seguro de eliminar esta junta de usuarios?</div>
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

export const searchJunta = async (search) => {
    const resp = await fetchByToken({
        endpoint: 'junta/search',
        params: { search }
    })

    if (resp.ok) {
        return resp.docs
    } else {
        return []
    }
}