import { fetchByToken, treeNetIrrig } from '../../helpers'
import { storeApi } from '../storeApi'
import { setActiveNodeDataIrrigationNetwork, setActiveNodeLoadingIrrigationNetwork, setNetIrrigDataFull } from './irrigationnetworkSlice'

export const irrigationApi = storeApi.injectEndpoints({
    endpoints: (builder) => ({
        // IRRIGATION
        getIrrigationNetByJunta: builder.query({
            query: ({ junta = '' }) => ({
                url: `channel/irrignet`,
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
                url: `channel/search_waterin/${id}`,
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

export const searchIrrigationNetworkByJunta = (junta) => {
    return async (dispatch) => {
        const resp = await fetchByToken({
            endpoint: `channel/irrignet`,
            params: { junta }
        })

        if (resp.ok) {
            dispatch(setNetIrrigDataFull(resp.net))
        } else {
            dispatch(setNetIrrigDataFull([]))
        }
    }
}