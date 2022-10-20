import { fetchByToken } from '../../helpers'
import { setNetIrrigIrrigationNetwork } from './irrigationnetworkSlice'

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