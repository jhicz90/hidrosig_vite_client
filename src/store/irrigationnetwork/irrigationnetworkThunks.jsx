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
        // IRRIGATION
    })
})

export const {
    useLazyGetIrrigationNetByJuntaQuery
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