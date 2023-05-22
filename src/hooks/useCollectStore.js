import { useDispatch, useSelector } from 'react-redux'
import { onAddFav, onAddSearched, onClearListSearched, onDeleteFavSaved, onDeleteSearchedById, onSetActivePrpIdInUsrNav, onSetActiveTab, onSetCmpActiveNav, onSetFavSaved, onSetOptionActiveNav, onSetSearch, onSetTypeSearch } from '../store/collect'

export const useCollectStore = () => {

    const dispatch = useDispatch()
    const { search, typeSearch, activeTab, listSearched, listSearchedFav } = useSelector(state => state.collect)

    const setSearch = (search) => {
        dispatch(onSetSearch(search))
    }

    const setTypeSearch = (search) => {
        dispatch(onSetTypeSearch())
    }

    const addTab = (tab) => {
        dispatch(onAddSearched(tab))
    }

    const setActiveTab = (idTab) => {
        dispatch(onSetActiveTab(idTab))
    }

    const deleteTab = (idTab) => {
        dispatch(onDeleteSearchedById(idTab))
    }

    const clearSearches = () => {
        dispatch(onClearListSearched())
    }

    const loadFavsSaved = () => {
        dispatch(onSetFavSaved())
    }

    const addFav = (idTab) => {
        dispatch(onAddFav(idTab))
    }

    const deleteFav = (idTab) => {
        dispatch(onDeleteFavSaved(idTab))
    }

    const setActivePrp = ({ id = '', prpId = '' }) => {
        dispatch(onSetActivePrpIdInUsrNav({ id, prpId }))
    }

    const setOptionActiveNav = ({ id = '', navOption = '' }) => {
        dispatch(onSetOptionActiveNav({ id, navOption }))
    }

    const setCampaignActiveNav = ({ id = '', campId = '' }) => {
        dispatch(onSetCmpActiveNav({ id, campId }))
    }

    return {
        //* PROPIEDADES
        search,
        typeSearch,
        activeTab,
        listSearched,
        listSearchedFav,
        //* METODOS
        setSearch,
        setTypeSearch,
        loadFavsSaved,
        addTab,
        setActiveTab,
        deleteTab,
        clearSearches,
        addFav,
        deleteFav,
        setActivePrp,
        setOptionActiveNav,
        setCampaignActiveNav,
    }
}
