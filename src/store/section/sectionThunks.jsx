import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { fetchByToken, normalizeText } from '../../helpers'
import { storeApi } from '../storeApi'
import { addNewSection, setActiveNewSection, setActiveSection, setSavingSection, setSavingNewSection } from './sectionSlice'

const SwalReact = withReactContent(Swal)

export const startAddNewSection = () => {
    return async (dispatch, getState) => {

        dispatch(addNewSection())

        const { active } = getState().structure
        const { _id } = active

        const resp = await fetchByToken({
            endpoint: `section/create/new`,
            params: { structureId: _id }
        })

        dispatch(setSavingNewSection(false))

        if (resp.ok) {
            dispatch(setActiveNewSection({ ...resp.section, structureId: _id }))
        }
    }
}

export const startSaveNewSection = () => {
    return async (dispatch, getState) => {

        dispatch(setSavingNewSection(true))

        const { activeNew } = getState().section

        const newSection = {
            ...activeNew,
        }

        const resp = await fetchByToken({
            endpoint: `section/create/new`,
            data: newSection,
            method: 'POST'
        })

        dispatch(setSavingNewSection(false))

        if (resp.ok) {
            dispatch(storeApi.util.invalidateTags(['Irrig']))
            dispatch(setActiveNewSection(null))
        }
    }
}

export const startGetSection = (id) => {
    return async (dispatch) => {

        dispatch(setSavingSection(true))

        const resp = await fetchByToken({
            endpoint: `section/edit/${id}`
        })

        dispatch(setSavingSection(false))

        if (resp.ok) {
            dispatch(setActiveSection(resp.section))
        }
    }
}

export const startUpdateSection = () => {
    return async (dispatch, getState) => {

        dispatch(setSavingSection(true))

        const { active } = getState().section
        const { _id } = active

        const updateSection = {
            ...active
        }

        const resp = await fetchByToken({
            endpoint: `section/edit/${_id}`,
            data: updateSection,
            method: 'PUT'
        })

        dispatch(setSavingSection(false))

        if (resp.ok) {
            dispatch(setActiveSection(resp.section))
        }
    }
}

export const startDeleteSection = () => {
    return async (dispatch, getState) => {
        const { active } = getState().section
        const { _id, name } = active

        const wordConfirm = normalizeText(name, { lowerCase: true, removeSpaces: true })

        SwalReact.fire({
            title:
                <>
                    <div className='text-uppercase'>Eliminar tramo</div>
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

                dispatch(setSavingSection(true))

                const resp = await fetchByToken({
                    endpoint: `section/delete/${_id}`,
                    method: 'DELETE'
                })

                dispatch(setSavingSection(false))

                if (resp.ok) {
                    dispatch(setActiveSection(null))
                }
            }
        })
    }
}

export const searchRugosity = async (search) => {
    const resp = await fetchByToken({
        endpoint: 'rugosity/list',
        params: { search }
    })

    if (resp.ok) {
        return resp.docs
    } else {
        return []
    }
}