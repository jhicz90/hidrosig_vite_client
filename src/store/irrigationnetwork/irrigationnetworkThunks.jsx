import { fetchByToken } from '../../helpers'
import { setActiveNodeDataIrrigationNetwork, setActiveNodeLoadingIrrigationNetwork, setNetIrrigIrrigationNetwork } from './irrigationnetworkSlice'

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
            dispatch(setNetIrrigIrrigationNetwork(resp.net))
        } else {
            dispatch(setNetIrrigIrrigationNetwork([]))
        }
    }
}