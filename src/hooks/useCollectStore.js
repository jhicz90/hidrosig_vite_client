import { useDispatch, useSelector } from 'react-redux'
import { onSetSearch, onSetTypeSearch, onSetManageTypePay, onSetManagePaymentCenter } from '../store/collect'

export const useCollectStore = () => {

    const dispatch = useDispatch()
    const { search, typeSearch, activeTab, manageTypePay, managePaymentCenter } = useSelector(state => state.collect)

    const setSearch = (search) => {
        dispatch(onSetSearch(search))
    }

    const setTypeSearch = (typesearch) => {
        dispatch(onSetTypeSearch(typesearch))
    }

    const setTypePay = (value) => {
        dispatch(onSetManageTypePay(value))
    }

    const setPaymentCenterOpenClose = () => {
        dispatch(onSetManagePaymentCenter(!managePaymentCenter))
    }

    return {
        //* PROPIEDADES
        search,
        typeSearch,
        activeTab,
        manageTypePay,
        managePaymentCenter,
        //* METODOS
        setSearch,
        setTypeSearch,
        setTypePay,
        setPaymentCenterOpenClose
    }
}
