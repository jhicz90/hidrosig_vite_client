import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { fetchByToken, normalizeText } from '../../helpers'
import { storeApi } from '../storeApi'
import { addNewOccupation, setActiveNewOccupation, setActiveOccupation, setSavingOccupation, setSavingNewOccupation } from './occupationSlice'

const SwalReact = withReactContent(Swal)

export const occupationApi = storeApi.injectEndpoints({
    endpoints: (builder) => ({
        // OCCUPATION
        newOccup: builder.query({
            query: () => ({
                url: `occupation/create/new`,
            }),
            transformResponse: (response, meta, arg) => response.occupation
        }),
        addOccup: builder.mutation({
            query: (newOccup) => ({
                url: `occupation/create/new`,
                method: 'POST',
                data: newOccup
            }),
            invalidatesTags: ['Occup']
        }),
        getListOccup: builder.query({
            query: (search) => ({
                url: `occupation/list`,
                params: {
                    search
                }
            }),
            transformResponse: (response, meta, arg) => response.docs,
            providesTags: ['Occup']
        }),
        getOccupById: builder.query({
            query: (id) => ({
                url: `occupation/edit/${id}`
            }),
            transformResponse: (response, meta, arg) => response.occupation,
            providesTags: ['Occup']
        }),
        updateOccupById: builder.mutation({
            query: ({ id, occupation }) => ({
                url: `occupation/edit/${id}`,
                method: 'PUT',
                data: occupation
            }),
            invalidatesTags: ['Occup']
        }),
        deleteOccupById: builder.mutation({
            query: (id) => ({
                url: `occupation/delete/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Occup']
        })
        // OCCUPATION
    })
})

export const {
    useAddOccupMutation,
    useDeleteOccupByIdMutation,
    useGetListOccupQuery,
    useGetOccupByIdQuery,
    useNewOccupQuery,
    useUpdateOccupByIdMutation,
} = occupationApi

export const startAddNewOccupation = () => {
    return async (dispatch) => {

        dispatch(addNewOccupation())

        const resp = await fetchByToken({
            endpoint: `occupation/create/new`
        })

        dispatch(setSavingNewOccupation(false))

        if (resp.ok) {
            dispatch(setActiveNewOccupation(resp.occupation))
        }
    }
}

export const startSaveNewOccupation = () => {
    return async (dispatch, getState) => {

        dispatch(setSavingNewOccupation(true))

        const { activeNew } = getState().occupation

        const newOccupation = {
            ...activeNew
        }

        const resp = await fetchByToken({
            endpoint: `occupation/create/new`,
            data: newOccupation,
            method: 'POST'
        })

        dispatch(setSavingNewOccupation(false))

        if (resp.ok) {
            dispatch(storeApi.util.invalidateTags(['Occup']))
            dispatch(setActiveNewOccupation(null))
        }
    }
}

export const startGetOccupation = (id) => {
    return async (dispatch) => {

        dispatch(setSavingOccupation(true))

        const resp = await fetchByToken({
            endpoint: `occupation/edit/${id}`
        })

        dispatch(setSavingOccupation(false))

        if (resp.ok) {
            dispatch(setActiveOccupation(resp.occupation))
        }
    }
}

export const startUpdateOccupation = () => {
    return async (dispatch, getState) => {

        dispatch(setSavingOccupation(true))

        const { active } = getState().occupation
        const { _id } = active

        const updateOccupation = {
            ...active
        }

        const resp = await fetchByToken({
            endpoint: `occupation/edit/${_id}`,
            data: updateOccupation,
            method: 'PUT'
        })

        dispatch(setSavingOccupation(false))

        if (resp.ok) {
            dispatch(setActiveOccupation(resp.occupation))
        }
    }
}

export const startUpdateImageOccupation = (image) => {
    return async (dispatch, getState) => {
        const { active } = getState().occupation
        const { _id } = active

        const resp = await fetchByToken({
            endpoint: `occupation/image/${_id}`,
            data: { image },
            method: 'PUT'
        })

        if (resp.ok) {
            dispatch(setActiveOccupation(resp.occupation))
        }
    }
}

export const startUpdateStatusOccupation = (status) => {
    return async (dispatch, getState) => {
        const { active } = getState().occupation
        const { _id, name, status: statusOccupation } = active

        SwalReact.fire({
            title:
                <>
                    <div className='text-uppercase'>Estado</div>
                    <div className="fs-5 fw-bold text-info mt-1">{name}</div>
                </>,
            html:
                <>
                    <div className='fs-5 mb-2'>¿Estás seguro de modificar el estado?</div>
                    <div className='alert alert-warning'>Recordar que al hacer el cambio las sesiones de los usuarios asociados a esta ocupación se reiniciaran.</div>
                </>,
            showCancelButton: true,
            confirmButtonText: statusOccupation ? 'Desactivar' : 'Activar',
            cancelButtonText: 'Cancelar',
            allowOutsideClick: false,
            icon: 'question',
            customClass: {
                confirmButton: statusOccupation ? 'btn btn-warning' : 'btn btn-success',
                cancelButton: 'btn btn-neutral'
            },
            buttonsStyling: false,
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {

                dispatch(setSavingOccupation(true))

                const resp = await fetchByToken({
                    endpoint: `occupation/status/${_id}`,
                    data: { status },
                    method: 'PUT'
                })

                dispatch(setSavingOccupation(false))

                if (resp.ok) {
                    dispatch(setActiveOccupation(resp.occupation))
                }
            }
        })
    }
}

export const startUpdateInformationOccupation = ({ name, desc }) => {
    return async (dispatch, getState) => {

        dispatch(setSavingOccupation(true))

        const { active } = getState().occupation
        const { _id } = active

        const resp = await fetchByToken({
            endpoint: `occupation/info/${_id}`,
            data: { name, desc },
            method: 'PUT'
        })

        dispatch(setSavingOccupation(false))

        if (resp.ok) {
            dispatch(setActiveOccupation(resp.occupation))
        }
    }
}

export const startUpdateLevelOccupation = ({ levelOccupation, junta, committee }) => {
    return async (dispatch, getState) => {

        dispatch(setSavingOccupation(true))

        const { active } = getState().occupation
        const { _id } = active

        const resp = await fetchByToken({
            endpoint: `occupation/change_type/${_id}`,
            data: { levelOccupation, junta, committee },
            method: 'PUT'
        })

        dispatch(setSavingOccupation(false))

        if (resp.ok) {
            dispatch(setActiveOccupation(resp.occupation))
        }
    }
}

export const startDeleteOccupation = ({ navigate = null }) => {
    return async (dispatch, getState) => {
        const { active } = getState().occupation
        const { _id, name } = active

        const wordConfirm = normalizeText(name, { lowerCase: true, removeSpaces: true })

        SwalReact.fire({
            title:
                <>
                    <div className='text-uppercase'>Eliminar ocupación</div>
                    <div className="fs-5 fw-bold text-info mt-1">{name}</div>
                </>,
            html:
                <>
                    <div className='fs-5 mb-2'>¿Estás seguro de eliminar esta ocupación?</div>
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

                dispatch(setSavingOccupation(true))

                const resp = await fetchByToken({
                    endpoint: `occupation/delete/${_id}`,
                    method: 'DELETE'
                })

                dispatch(setSavingOccupation(false))

                if (resp.ok) {
                    navigate('/app/sys/occup')
                    dispatch(setActiveOccupation(null))
                }
            }
        })
    }
}

export const registerOccupation = async (name) => {
    const resp = await fetchByToken({
        endpoint: 'occupation/create/new',
        data: { name },
        method: 'POST'
    })

    if (resp.ok) {
        return resp.category
    } else {
        return null
    }
}

export const searchOccupation = async (search) => {
    const resp = await fetchByToken({
        endpoint: 'occupation/list',
        params: { search }
    })

    if (resp.ok) {
        return resp.docs
    } else {
        return []
    }
}