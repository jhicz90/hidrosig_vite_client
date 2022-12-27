import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { fetchByToken, normalizeText } from '../../helpers'
import { storeApi } from '../storeApi'
import { setActiveNodeDataIrrigationNetwork, setActiveNodeLoadingIrrigationNetwork } from '../irrigationnetwork'
import { addNewStructure, setActiveNewStructure, setActiveStructure, setSavingStructure, setSavingNewStructure } from './structureSlice'

const SwalReact = withReactContent(Swal)

export const startAddNewStructure = () => {
    return async (dispatch, getState) => {
        const { activeNode: { id } } = getState().irrigationnetwork

        dispatch(addNewStructure())

        const resp = await fetchByToken({
            endpoint: `structure/create/new`,
            params: { parent: id }
        })

        dispatch(setSavingNewStructure(false))

        if (resp.ok) {
            dispatch(setActiveNewStructure(resp.structure))
        }
    }
}

export const startSaveNewStructure = () => {
    return async (dispatch, getState) => {

        dispatch(setSavingNewStructure(true))

        const { activeNew } = getState().structure

        const newStructure = {
            ...activeNew,
        }

        const resp = await fetchByToken({
            endpoint: `structure/create/new`,
            data: newStructure,
            method: 'POST'
        })

        dispatch(setSavingNewStructure(false))

        if (resp.ok) {
            dispatch(storeApi.util.invalidateTags(['Irrig']))
            dispatch(setActiveNewStructure(null))
        }
    }
}

export const startGetStructure = (id) => {
    return async (dispatch) => {

        dispatch(setSavingStructure(true))

        const resp = await fetchByToken({
            endpoint: `structure/edit/${id}`
        })

        dispatch(setSavingStructure(false))

        if (resp.ok) {
            dispatch(setActiveStructure(resp.structure))
        }
    }
}

export const startUpdateStructure = () => {
    return async (dispatch, getState) => {

        dispatch(setSavingStructure(true))

        const { active } = getState().structure
        const { _id } = active

        const updateStructure = {
            ...active
        }

        const resp = await fetchByToken({
            endpoint: `structure/edit/${_id}`,
            data: updateStructure,
            method: 'PUT'
        })

        dispatch(setSavingStructure(false))

        if (resp.ok) {
            dispatch(setActiveStructure(resp.structure))
        }
    }
}

export const startUpdateDataStructureInIrrigNet = (structure) => {
    return async (dispatch, getState) => {

        dispatch(setActiveNodeLoadingIrrigationNetwork(true))

        const { _id } = structure

        const updateStructure = {
            ...structure
        }

        const resp = await fetchByToken({
            endpoint: `structure/edit/${_id}`,
            data: updateStructure,
            method: 'PUT'
        })

        dispatch(setActiveNodeLoadingIrrigationNetwork(false))

        if (resp.ok) {
            if (getState().activeNode.id === resp.structure._id) {
                dispatch(setActiveNodeDataIrrigationNetwork(resp.structure))
            }
        }
    }
}

export const startDeleteStructure = () => {
    return async (dispatch, getState) => {
        const { active } = getState().structure
        const { _id, name } = active

        const wordConfirm = normalizeText(name, { lowerCase: true, removeSpaces: true })

        SwalReact.fire({
            title:
                <>
                    <div className='text-uppercase'>Eliminar estructura</div>
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

                dispatch(setSavingStructure(true))

                const resp = await fetchByToken({
                    endpoint: `structure/delete/${_id}`,
                    method: 'DELETE'
                })

                dispatch(setSavingStructure(false))

                if (resp.ok) {
                    dispatch(setActiveStructure(null))
                }
            }
        })
    }
}
