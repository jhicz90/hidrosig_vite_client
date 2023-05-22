import { useEffect, createRef } from 'react'
import { Button } from 'react-bootstrap'
import { BsStar, BsStarFill, BsXLg } from 'react-icons/bs'
import { FeeCollectBillAreaFarmPage, FeeCollectBillUserFarmPage, FeeCollectSearchPage } from '..'
import { SliderNavFlip } from '../../../components'
import { useCollectStore } from '../../../hooks'

export const FeeCollectNavPage = () => {

    const flicking = createRef()
    const { listSearched, activeTab, setActiveTab, loadFavsSaved, clearSearches } = useCollectStore()

    const handleChangeActiveTab = (nameKey, list) => {
        const index = list.findIndex(ls => ls.id === nameKey)

        flicking.current.forceUpdate()
        flicking.current.moveTo(index)
        setActiveTab(nameKey)
    }

    useEffect(() => {
        loadFavsSaved()
    }, [])

    return (
        <>
            <div className='container-fluid'>
                <div className='row my-3'>
                    <div className='col-12'>
                        <div className='row align-items-center justify-content-between g-3'>
                            <div className='col-12 col-md-auto'>
                                <h4 className='mb-0'>COBRANZA DE TARIFA</h4>
                            </div>
                            <div className='col-12 col-md-auto'>
                                <div className='d-flex gap-2'>
                                    <Button
                                        onClick={() => {
                                            flicking.current.forceUpdate()
                                            flicking.current.moveTo(0)
                                            setActiveTab('search')
                                        }}
                                        className='btn btn-neutral text-primary'
                                    >
                                        Nueva busqueda
                                    </Button>
                                    {
                                        listSearched.length > 0
                                        &&
                                        <Button
                                            onClick={() => {
                                                setActiveTab('search')
                                                clearSearches()
                                            }}
                                            variant='neutral'
                                            className='text-danger'
                                        >
                                            Limpiar busquedas
                                        </Button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row g-0 justify-content-center'>
                <div className='col'>
                    <SliderNavFlip refSlider={flicking} className='px-3 nav nav-tabs' spacingChilds={true}>
                        <li className='nav-item'>
                            <TabNavItem
                                idTab={'search'}
                                title={'Busqueda'}
                                actionClick={() => setActiveTab('search')}
                                actions={false}
                            />
                        </li>
                        {
                            listSearched.map(({ id, title, typeSearch }, index) =>
                                <li key={`bill-nav-${index}-${id}`} className='nav-item'>
                                    <TabNavItem
                                        idTab={id}
                                        title={title}
                                        actionClick={() => {
                                            flicking.current.forceUpdate()
                                            flicking.current.moveTo(index + 1)
                                            setActiveTab(id)
                                        }}
                                    />
                                </li>
                            )
                        }
                    </SliderNavFlip>
                    <div className='tab-content'>
                        <TabContent idTab='search'>
                            <FeeCollectSearchPage navToTab={handleChangeActiveTab} />
                        </TabContent>
                        {
                            listSearched.map(({ id, typeSearch }, index) =>
                                <TabContent
                                    key={`bill-pane-${index}-${id}`}
                                    idTab={id}
                                    activeTab={activeTab}
                                >
                                    {
                                        typeSearch === 'usr'
                                            ?
                                            <FeeCollectBillUserFarmPage usrId={id} />
                                            :
                                            <FeeCollectBillAreaFarmPage />
                                    }
                                </TabContent>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

const TabNavItem = ({ idTab, title, actionClick, actions = true }) => {

    const { listSearchedFav, activeTab, setActiveTab, deleteTab, deleteFav, addFav } = useCollectStore()

    const handleClose = () => {
        setActiveTab('search')
        deleteTab(idTab)
    }

    return (
        <span className={`nav-link d-flex p-0 align-items-center ${activeTab === idTab ? 'active' : ''}`}>
            <span onClick={actionClick} className='p-2'>{title}</span>
            {
                actions
                &&
                <>
                    {
                        listSearchedFav.find(fav => fav.id === idTab)
                            ?
                            <button
                                onClick={() => deleteFav(idTab)}
                                className='btn p-0 px-1 d-flex align-items-center'
                                size='sm'
                            >
                                <BsStarFill size={20} color='gold' />
                            </button>
                            :
                            <button
                                onClick={() => addFav(idTab)}
                                className='btn p-0 px-1 d-flex align-items-center'
                                size='sm'
                            >
                                <BsStar size={20} />
                            </button>
                    }
                    {
                        !listSearchedFav.find(fav => fav.id === idTab)
                        &&
                        <button
                            onClick={handleClose}
                            className='btn p-0 px-1 d-flex align-items-center'
                            size='sm'
                        >
                            <BsXLg size={20} />
                        </button>
                    }
                </>
            }
        </span>
    )
}

const TabContent = ({ idTab, children }) => {

    const { activeTab } = useCollectStore()

    return (
        <div className={`tab-pane fade ${activeTab === idTab ? 'show active' : ''}`}>
            {children}
        </div>
    )
}