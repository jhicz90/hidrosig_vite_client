import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { normalizeText } from '../helpers'
// import { useDeleteResourceFarmMutation } from '../store/'

const SwalReact = withReactContent(Swal)

export const useChannelStore = () => {

    const dispatch = useDispatch()
    const {
        activeNode: { id, name, depth, data, loading },
        activeAmbit,
        netIrrig,
        netIrrigExp,
        netIrrigChk,
        netIrrigBase
    } = useSelector(state => state.irrigationnetwork)

    return {
        //* PROPIEDADES
        id,
        name,
        depth,
        data,
        loading,
        activeAmbit,
        netIrrig,
        netIrrigExp,
        netIrrigChk,
        netIrrigBase,
        //* METODOS

    }
}