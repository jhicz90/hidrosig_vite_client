import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { fetchByToken, normalizeText } from '../../helpers'
import { addNewCommittee, setActiveNewCommittee, setActiveCommittee, setSavingCommittee, setSavingNewCommittee } from './committeeSlice'

const SwalReact = withReactContent(Swal)

export const startAddNewCommittee = () => {
    return async (dispatch) => {

        dispatch(addNewCommittee())

        const resp = await fetchByToken({
            endpoint: `committee/create/new`
        })

        dispatch(setSavingNewCommittee(false))

        if (resp.ok) {
            dispatch(setActiveNewCommittee(resp.committee))
        }
    }
}

export const startSaveNewCommittee = () => {
    return async (dispatch, getState) => {

        dispatch(setSavingNewCommittee(true))

        const { activeNew } = getState().committee

        const newCommittee = {
            ...activeNew,
            junta: activeNew.junta !== null ? activeNew.junta._id : null,
            zone: activeNew.zone !== null ? activeNew.zone._id : null
        }

        const resp = await fetchByToken({
            endpoint: `committee/create/new`,
            data: newCommittee,
            method: 'POST'
        })

        dispatch(setSavingNewCommittee(false))

        if (resp.ok) {
            dispatch(setActiveNewCommittee(null))
        }
    }
}

export const startGetCommittee = (id) => {
    return async (dispatch) => {

        dispatch(setSavingCommittee(true))

        const resp = await fetchByToken({
            endpoint: `committee/edit/${id}`
        })

        dispatch(setSavingCommittee(false))

        if (resp.ok) {
            dispatch(setActiveCommittee(resp.committee))
        }
    }
}

export const startUpdateCommittee = () => {
    return async (dispatch, getState) => {

        dispatch(setSavingCommittee(true))

        const { active } = getState().committee
        const { _id } = active

        const updateCommittee = {
            ...active
        }

        const resp = await fetchByToken({
            endpoint: `committee/edit/${_id}`,
            data: updateCommittee,
            method: 'PUT'
        })

        dispatch(setSavingCommittee(false))

        if (resp.ok) {
            dispatch(setActiveCommittee(resp.committee))
        }
    }
}

export const startUpdateImageCommittee = ({ image }) => {
    return async (dispatch, getState) => {
        const { active } = getState().committee
        const { _id } = active

        const resp = await fetchByToken({
            endpoint: `committee/image/${_id}`,
            data: { image },
            method: 'PUT'
        })

        if (resp.ok) {
            dispatch(setActiveCommittee(resp.Committee))
        }
    }
}

export const startUpdateStatusCommittee = (status) => {
    return async (dispatch, getState) => {
        const { active } = getState().committee
        const { _id, name, status: statusCommittee } = active

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
            confirmButtonText: statusCommittee ? 'Desactivar' : 'Activar',
            cancelButtonText: 'Cancelar',
            allowOutsideClick: false,
            icon: 'question',
            customClass: {
                confirmButton: statusCommittee ? 'btn btn-warning' : 'btn btn-success',
                cancelButton: 'btn btn-neutral'
            },
            buttonsStyling: false,
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {

                dispatch(setSavingCommittee(true))

                const resp = await fetchByToken({
                    endpoint: `committee/status/${_id}`,
                    data: { status },
                    method: 'PUT'
                })

                dispatch(setSavingCommittee(false))

                if (resp.ok) {
                    dispatch(setActiveCommittee(resp.Committee))
                }
            }
        })
    }
}

export const startUpdateInformationCommittee = ({ name, desc }) => {
    return async (dispatch, getState) => {

        dispatch(setSavingCommittee(true))

        const { active } = getState().committee
        const { _id } = active

        const resp = await fetchByToken({
            endpoint: `committee/info/${_id}`,
            data: { name, desc },
            method: 'PUT'
        })

        dispatch(setSavingCommittee(false))

        if (resp.ok) {
            dispatch(setActiveCommittee(resp.committee))
        }
    }
}

export const startDeleteCommittee = ({ navigate = null }) => {
    return async (dispatch, getState) => {
        const { active } = getState().committee
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

                dispatch(setSavingCommittee(true))

                const resp = await fetchByToken({
                    endpoint: `committee/delete/${_id}`,
                    method: 'DELETE'
                })

                dispatch(setSavingCommittee(false))

                if (resp.ok) {
                    navigate('/app/sys/occup')
                    dispatch(setActiveCommittee(null))
                }
            }
        })
    }
}

export const searchCommitteeByJunta = async (junta, search) => {
    if (junta === '') {
        return []
    } else {
        const resp = await fetchByToken({
            endpoint: 'committee/searchbyjunta',
            params: { junta, search },
            alert: false
        })

        if (resp.ok) {
            return resp.docs
        } else {
            return []
        }
    }
}