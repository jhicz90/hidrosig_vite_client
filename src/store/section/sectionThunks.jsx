import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { fetchByToken, normalizeText } from '../../helpers'
import { storeApi } from '../storeApi'
import { addNewSection, setActiveNewSection, setActiveSection, setSavingSection, setSavingNewSection } from './sectionSlice'

const SwalReact = withReactContent(Swal)

export const zoneApi = storeApi.injectEndpoints({
    endpoints: (builder) => ({
        // SECTION
        newSectionByStructure: builder.query({
            query: (structureId) => ({
                url: `section/create/new`,
                params: {
                    structureId
                }
            }),
            transformResponse: (response, meta, arg) => response.section,
        }),
        addSection: builder.mutation({
            query: (newSection) => ({
                url: `section/create/new`,
                method: 'post',
                data: newSection
            }),
            invalidatesTags: ['Irrig']
        }),
        getListSection: builder.query({
            query: (search) => ({
                url: `section/list`,
                params: {
                    search
                }
            }),
            transformResponse: (response, meta, arg) => response.docs,
            providesTags: ['Irrig']
        }),
        getSectionById: builder.query({
            query: (id) => ({
                url: `section/edit/${id}`
            }),
            transformResponse: (response, meta, arg) => response.section,
            providesTags: ['Irrig']
        }),
        getListSectionByStructure: builder.query({
            query: ({ structureId, search }) => ({
                url: `section/search_by_structure/${structureId}`,
                params: {
                    search
                }
            }),
            transformResponse: (response, meta, arg) => response.docs,
            providesTags: ['Irrig']
        }),
        updateSectionById: builder.mutation({
            query: ({ id, section }) => ({
                url: `section/edit/${id}`,
                method: 'put',
                data: section
            }),
            invalidatesTags: ['Irrig']
        }),
        deleteSectionById: builder.mutation({
            query: (id) => ({
                url: `section/delete/${id}`,
                method: 'delete'
            }),
            invalidatesTags: ['Irrig']
        }),
        getCalcProperties: builder.query({
            query: ({ type, mayorBasis, minorBasis, height, tight, slope, diameter, coated, leftSlopeThickness, rightSlopeThickness, grade, rugosity }) => ({
                url: `structure/cpprop`,
                params: { type, mayorBasis, minorBasis, height, tight, slope, diameter, coated, leftSlopeThickness, rightSlopeThickness, grade, rugosity }
            }),
            transformResponse: (response, meta, arg) => response.cpprop,
            providesTags: ['Irrig']
        }),
        // SECTION
    })
})

export const {
    useAddSectionMutation,
    useDeleteSectionByIdMutation,
    useGetCalcPropertiesQuery,
    useGetListSectionByStructureQuery,
    useGetListSectionQuery,
    useGetSectionByIdQuery,
    useLazyNewSectionByStructureQuery,
    useNewSectionByStructureQuery,
    useUpdateSectionByIdMutation,
} = zoneApi

export const startAddNewSection = ({ structureId = null }) => {
    return async (dispatch, getState) => {

        dispatch(addNewSection())

        const resp = await fetchByToken({
            endpoint: `section/create/new`,
            params: { structureId }
        })

        dispatch(setSavingNewSection(false))

        if (resp.ok) {
            dispatch(setActiveNewSection({ ...resp.section, structureId }))
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
            dispatch(setActiveNewSection(null))
            dispatch(storeApi.util.invalidateTags(['Irrig']))
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
            dispatch(storeApi.util.invalidateTags(['Irrig']))
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

export const startDeleteIdSection = (voucher) => {
    return async (dispatch) => {
        const { _id, name } = voucher

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
                    dispatch(storeApi.util.invalidateTags(['Irrig']))
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