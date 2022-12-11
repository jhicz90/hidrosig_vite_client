import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { storeApi } from '../storeApi'
import { addNewDocument, setActiveNewDocument, setActiveDocument, setSavingDocument, setSavingNewDocument } from './documentSlice'
import { fetchByToken, normalizeText } from '../../helpers'

const SwalReact = withReactContent(Swal)

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

export const startUpdateStatusDocument = (status) => {
    return async (dispatch, getState) => {
        const { active } = getState().document
        const { _id, name, status: statusDocument } = active

        SwalReact.fire({
            title:
                <>
                    <div className='text-uppercase'>Estado</div>
                    <div className="fs-5 fw-bold text-info mt-1">{name}</div>
                </>,
            html:
                <>
                    <div className='fs-5 mb-2'>¿Estás seguro de modificar el estado?</div>
                    <div className='alert alert-warning'>Recordar que al hacer el cambio las sesiones de los usuarios asociados a esta document de usuarios se actualizaran.</div>
                </>,
            showCancelButton: true,
            confirmButtonText: statusDocument ? 'Desactivar' : 'Activar',
            cancelButtonText: 'Cancelar',
            allowOutsideClick: false,
            icon: 'question',
            customClass: {
                confirmButton: statusDocument ? 'btn btn-warning' : 'btn btn-success',
                cancelButton: 'btn btn-neutral'
            },
            buttonsStyling: false,
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {

                dispatch(setSavingDocument(true))

                const resp = await fetchByToken({
                    endpoint: `document/status/${_id}`,
                    data: { status },
                    method: 'PUT'
                })

                dispatch(setSavingDocument(false))

                if (resp.ok) {
                    dispatch(setActiveDocument(resp.Document))
                }
            }
        })
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

export const startDeleteDocument = ({ navigate = null }) => {
    return async (dispatch, getState) => {
        const { active } = getState().document
        const { _id, name } = active

        const wordConfirm = normalizeText(name, { lowerCase: true, removeSpaces: true })

        SwalReact.fire({
            title:
                <>
                    <div className='text-uppercase'>Eliminar document de usuarios</div>
                    <div className="fs-5 fw-bold text-info mt-1">{name}</div>
                </>,
            html:
                <>
                    <div className='fs-5 mb-2'>¿Estás seguro de eliminar este documento?</div>
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

                dispatch(setSavingDocument(true))

                const resp = await fetchByToken({
                    endpoint: `document/delete/${_id}`,
                    method: 'DELETE'
                })

                dispatch(setSavingDocument(false))

                if (resp.ok) {
                    navigate('/app/ambit/orgz')
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