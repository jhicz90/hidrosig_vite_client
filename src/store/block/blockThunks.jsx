import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { fetchByToken, normalizeText } from '../../helpers'
import { storeApi } from '../storeApi'
import { addNewBlock, setActiveNewBlock, setActiveBlock, setSavingBlock, setSavingNewBlock } from './blockSlice'

const SwalReact = withReactContent(Swal)

export const blockApi = storeApi.injectEndpoints({
    endpoints: (builder) => ({
        // BLOCK
        newBlock: builder.query({
            query: () => ({
                url: `block/create/new`,
            }),
            transformResponse: (response, meta, arg) => response.block
        }),
        addBlock: builder.mutation({
            query: (newBlock) => ({
                url: `block/create/new`,
                method: 'post',
                data: newBlock
            }),
            invalidatesTags: ['Orgz', 'Trrt']
        }),
        getListBlock: builder.query({
            query: (search) => ({
                url: `block/search`,
                params: {
                    search
                }
            }),
            transformResponse: (response, meta, arg) => response.docs,
            providesTags: ['Orgz', 'Trrt']
        }),
        getListBlockByJunta: builder.query({
            query: ({ junta, search }) => ({
                url: `block/search_by_junta/${junta}`,
                params: {
                    search
                }
            }),
            transformResponse: (response, meta, arg) => response.docs,
            providesTags: ['Orgz', 'Trrt']
        }),
        getListBlockByAmbit: builder.query({
            query: ({ junta, comm, search }) => ({
                url: `block/search_by_ambit/${junta}/${comm}`,
                params: {
                    search
                }
            }),
            transformResponse: (response, meta, arg) => response.docs,
            providesTags: ['Orgz', 'Trrt']
        }),
        getBlockById: builder.query({
            query: (id) => ({
                url: `block/edit/${id}`
            }),
            transformResponse: (response, meta, arg) => response.block,
            providesTags: ['Orgz', 'Trrt']
        }),
        updateBlockById: builder.mutation({
            query: ({ id, block }) => ({
                url: `block/edit/${id}`,
                method: 'put',
                data: block
            }),
            invalidatesTags: ['Orgz', 'Trrt']
        }),
        deleteBlockById: builder.mutation({
            query: (id) => ({
                url: `block/delete/${id}`,
                method: 'delete'
            }),
            invalidatesTags: ['Orgz', 'Trrt']
        }),
        // BLOCK
    })
})

export const {
    useAddBlockMutation,
    useDeleteBlockByIdMutation,
    useGetBlockByIdQuery,
    useGetListBlockByAmbitQuery,
    useGetListBlockByJuntaQuery,
    useGetListBlockQuery,
    useLazyGetListBlockByJuntaQuery,
    useLazyGetListBlockQuery,
    useLazyNewBlockQuery,
    useNewBlockQuery,
    useUpdateBlockByIdMutation,
} = blockApi

export const questionDeleteBlock = async (name) => {

    const wordConfirm = normalizeText(name, { lowerCase: true, removeSpaces: true })

    return SwalReact.fire({
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
    }).then(({ value }) => {
        return value
    })
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