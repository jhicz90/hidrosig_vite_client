import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { normalizeText } from '@/helpers'
import { clearActiveNodeIrrigationNetwork, setActiveAmbitIrrigationNetwork, setActiveNodeIrrigationNetwork, setNetIrrigChkIrrigationNetwork, setNetIrrigDataFull, setNetIrrigExpIrrigationNetwork } from '@/store/actions'
// import { useDeleteResourceFarmMutation } from '../store/'

const SwalReact = withReactContent(Swal)

export const useChannelStore = () => {

    const dispatch = useDispatch()
    const {
        activeNode,
        activeAmbit,
        netIrrig,
        netIrrigExp,
        netIrrigChk,
        netIrrigBase
    } = useSelector(state => state.irrigationnetwork)

    const { id, name, depth, data } = activeNode

    const setAmbit = (junta) => {
        dispatch(setActiveAmbitIrrigationNetwork(junta))
    }

    const setNode = (node) => {
        dispatch(setActiveNodeIrrigationNetwork(node))
    }

    const clearNode = () => {
        dispatch(clearActiveNodeIrrigationNetwork())
    }

    const setNetIrrig = (netIrrig) => {
        dispatch(setNetIrrigDataFull(netIrrig))
    }

    const setNetIrrigExp = (netIrrigExp) => {
        dispatch(setNetIrrigExpIrrigationNetwork(netIrrigExp))
    }

    const setNetIrrigChk = (netIrrigChk) => {
        dispatch(setNetIrrigChkIrrigationNetwork(netIrrigChk))
    }

    return {
        //* PROPIEDADES
        id,
        name,
        depth,
        data,
        activeNode,
        activeAmbit,
        netIrrig,
        netIrrigExp,
        netIrrigChk,
        netIrrigBase,
        //* METODOS
        clearNode,
        setAmbit,
        setNode,
        setNetIrrig,
        setNetIrrigExp,
        setNetIrrigChk,
    }
}