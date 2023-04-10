import { fetchByToken, treeNetIrrig } from '../../helpers'
import { storeApi } from '../storeApi'
import { setActiveNodeDataIrrigationNetwork, setActiveNodeLoadingIrrigationNetwork, setNetIrrigDataFull } from './irrigationnetworkSlice'

export const irrigationApi = storeApi.injectEndpoints({
    endpoints: (builder) => ({
        // IRRIGATION
        getIrrigationNetByJunta: builder.query({
            query: ({ junta = '' }) => ({
                url: `structure/irrignet`,
                params: { junta }
            }),
            transformResponse: (response, meta, arg) => response.net,
            providesTags: ['Irrig', 'Orgz'],
            onQueryStarted: async ({ showCheckbox }, { dispatch, queryFulfilled }) => {
                try {
                    const { data } = await queryFulfilled
                    dispatch(setNetIrrigDataFull(treeNetIrrig(data, showCheckbox)))
                } catch (error) { }
            },
        }),
        getListWaterInForArea: builder.query({
            query: ({ id, range = 200 }) => ({
                url: `structure/search_waterin/${id}`,
                params: { range }
            }),
            transformResponse: (response, meta, arg) => response.docs,
            providesTags: ['Irrig']
        })
        // IRRIGATION
    })
})

export const {
    useLazyGetIrrigationNetByJuntaQuery,
    useLazyGetListWaterInForAreaQuery,
} = irrigationApi

export const startGetActiveIrrigationNetwork = (id, depth) => {
    return async (dispatch) => {

        dispatch(setActiveNodeLoadingIrrigationNetwork(true))

        const resp = await fetchByToken({
            endpoint: `structure/active_irrignet`,
            params: { id, depth }
        })

        dispatch(setActiveNodeLoadingIrrigationNetwork(false))

        if (resp.ok) {
            dispatch(setActiveNodeDataIrrigationNetwork(resp.active))
        }
    }
}

export const searchIrrigationNetworkByJunta = (junta) => {
    return async (dispatch) => {
        const resp = await fetchByToken({
            endpoint: `structure/irrignet`,
            params: { junta }
        })

        if (resp.ok) {
            dispatch(setNetIrrigDataFull(resp.net))
        } else {
            dispatch(setNetIrrigDataFull([]))
        }
    }
}

export const searchIrrigationSystem = async (junta, search) => {
    const resp = await fetchByToken({
        endpoint: `irrigation_system/search_by_junta/${junta}`,
        params: { search }
    })

    if (resp.ok) {
        return resp.docs
    } else {
        return []
    }
}