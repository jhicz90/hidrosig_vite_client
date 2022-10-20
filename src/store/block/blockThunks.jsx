import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { fetchByToken, normalizeText } from '../../helpers'
import { storeApi } from '../storeApi'
import { addNewBlock, setActiveNewBlock, setActiveBlock, setSavingBlock, setSavingNewBlock } from './blockSlice'

const SwalReact = withReactContent(Swal)

export const startAddNewBlock = () => {
    return async (dispatch) => {

        dispatch(addNewBlock())

        const resp = await fetchByToken({
            endpoint: `block/create/new`
        })

        dispatch(setSavingNewBlock(false))

        if (resp.ok) {
            dispatch(setActiveNewBlock(resp.block))
        }
    }
}

export const startSaveNewBlock = () => {
    return async (dispatch, getState) => {

        dispatch(setSavingNewBlock(true))

        const { activeNew } = getState().block

        const newBlock = {
            ...activeNew,
            junta: activeNew.junta !== null ? activeNew.junta._id : null,
            committee: activeNew.committee !== null ? activeNew.committee._id : null,
        }

        const resp = await fetchByToken({
            endpoint: `block/create/new`,
            data: newBlock,
            method: 'POST'
        })

        dispatch(setSavingNewBlock(false))

        if (resp.ok) {
            dispatch(storeApi.util.invalidateTags(['Trrt']))
            dispatch(setActiveNewBlock(null))
        }
    }
}

export const startGetBlock = (id) => {
    return async (dispatch) => {

        dispatch(setSavingBlock(true))

        const resp = await fetchByToken({
            endpoint: `block/edit/${id}`
        })

        dispatch(setSavingBlock(false))

        if (resp.ok) {
            dispatch(setActiveBlock(resp.block))
        }
    }
}

export const startUpdateBlock = () => {
    return async (dispatch, getState) => {

        dispatch(setSavingBlock(true))

        const { active } = getState().block
        const { _id } = active

        const updateBlock = {
            ...active
        }

        const resp = await fetchByToken({
            endpoint: `block/edit/${_id}`,
            data: updateBlock,
            method: 'PUT'
        })

        dispatch(setSavingBlock(false))

        if (resp.ok) {
            dispatch(setActiveBlock(resp.block))
        }
    }
}

export const startDeleteBlock = ({ navigate = null }) => {
    return async (dispatch, getState) => {
        const { active } = getState().block
        const { _id, name } = active

        const wordConfirm = normalizeText(name, { lowerCase: true, removeSpaces: true })

        SwalReact.fire({
            title:
                <>
                    <div className='text-uppercase'>Eliminar bloque de riego</div>
                    <div className="fs-5 fw-bold text-info mt-1">{name}</div>
                </>,
            html:
                <>
                    <div className='fs-5 mb-2'>¿Estás seguro de eliminar este bloque de riego?</div>
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

                dispatch(setSavingBlock(true))

                const resp = await fetchByToken({
                    endpoint: `block/delete/${_id}`,
                    method: 'DELETE'
                })

                dispatch(setSavingBlock(false))

                if (resp.ok) {
                    navigate('/app/ambit/trrty')
                    dispatch(setActiveBlock(null))
                }
            }
        })
    }
}

export const searchBlock = async (search) => {
    const resp = await fetchByToken({
        endpoint: 'block/search',
        params: { search }
    })

    if (resp.ok) {
        return resp.docs
    } else {
        return []
    }
}

export const searchBlockByJunta = async (junta, search) => {
    const resp = await fetchByToken({
        endpoint: `block/search_by_junta/${junta}`,
        params: { search }
    })

    if (resp.ok) {
        return resp.docs
    } else {
        return []
    }
}

export const searchBlockByAmbit = async (junta, committee, search) => {
    const resp = await fetchByToken({
        endpoint: `block/search_by_ambit/${junta}/${committee}`,
        params: { search }
    })

    if (resp.ok) {
        return resp.docs
    } else {
        return []
    }
}