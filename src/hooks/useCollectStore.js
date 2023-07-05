import { useDispatch, useSelector } from 'react-redux'
import { onSetSearch, onSetTypeSearch } from '../store/collect'

export const useCollectStore = () => {

    const dispatch = useDispatch()
    const { search, typeSearch, activeTab } = useSelector(state => state.collect)

    const setSearch = (search) => {
        dispatch(onSetSearch(search))
    }

    const setTypeSearch = (typesearch) => {
        dispatch(onSetTypeSearch(typesearch))
    }

    return {
        //* PROPIEDADES
        search,
        typeSearch,
        activeTab,
        //* METODOS
        setSearch,
        setTypeSearch,
    }
}
