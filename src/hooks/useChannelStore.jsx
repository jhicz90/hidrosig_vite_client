import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { normalizeText } from '@/helpers'
import { setActiveAmbitIrrigationNetwork, setActiveNodeIrrigationNetwork, setNetIrrigDataFull } from '@/store/actions'
// import { useDeleteResourceFarmMutation } from '../store/'

const SwalReact = withReactContent(Swal)

export const useChannelStore = () => {

    const dispatch = useDispatch()
    const {
        activeNode: { id, name, depth, data },
        activeAmbit,
        netIrrig,
        netIrrigExp,
        netIrrigChk,
        netIrrigBase
    } = useSelector(state => state.irrigationnetwork)

    const setAmbit = (junta) => {
        dispatch(setActiveAmbitIrrigationNetwork(junta))
    }

    const setNode = (node) => {
        dispatch(setActiveNodeIrrigationNetwork(node))
    }

    const setNetIrrig = (netIrrig) => {
        dispatch(setNetIrrigDataFull(netIrrig))
    }



    return {
        //* PROPIEDADES
        id,
        name,
        depth,
        data,
        activeAmbit,
        netIrrig,
        netIrrigExp,
        netIrrigChk,
        netIrrigBase,
        //* METODOS
        setAmbit,
        setNode,
        setNetIrrig,
    }
}