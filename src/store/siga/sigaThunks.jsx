import { fetchByToken } from '../../helpers'
import { setListCommittee, setListRate, setNetIrrig } from './sigaSlice'

export const startGetSigaComms = () => {
    return async (dispatch) => {
        const resp = await fetchByToken({
            endpoint: `siga/list-comms`
        })

        if (resp.ok) {
            dispatch(setListCommittee(resp.comms))
        } else {
            dispatch(setListCommittee([]))
        }
    }
}

export const startGetSigaRates = ({ type }) => {
    return async (dispatch) => {
        const resp = await fetchByToken({
            endpoint: `siga/list-rates`,
            params: { type }
        })

        if (resp.ok) {
            dispatch(setListRate(resp.rates))
        } else {
            dispatch(setListRate([]))
        }
    }
}

export const startGetSigaIrrigationNetwork = () => {
    return async (dispatch) => {
        const resp = await fetchByToken({
            endpoint: `siga/net`
        })

        if (resp.ok) {
            dispatch(setNetIrrig(resp.net))
        } else {
            dispatch(setNetIrrig([]))
        }
    }
}

export const startReportSigaCollectEfficiency = () => {
    return async (dispatch, getState) => {
        const { reportCommittee, reportRate, reportDate: { end }, netIrrigChk } = getState().siga

        await fetchByToken({
            endpoint: `siga/collectefficiency`,
            params: {
                comm: reportCommittee,
                rate: reportRate,
                net: netIrrigChk,
                endDate: end
            }
        })
    }
}

export const startReportSigaIrrigationScheduling = () => {
    return async (dispatch, getState) => {
        const { reportCommittee, reportRate, reportDate: { start, end }, netIrrigChk } = getState().siga

        await fetchByToken({
            endpoint: `siga/irrigationscheduling`,
            params: {
                comm: reportCommittee,
                rate: reportRate,
                net: netIrrigChk,
                startDate: start,
                endDate: end
            }
        })
    }
}