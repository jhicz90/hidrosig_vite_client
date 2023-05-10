import { useEffect, createRef } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Nav, Tab } from 'react-bootstrap'
import { BsStar, BsStarFill, BsXLg } from 'react-icons/bs'
import { SliderNavFlip } from '../../../components'
import { addSearchedFav, addingFavSaved, clearSearched, deleteSearchedById, deleteSearchedFav } from '../../../store/actions'

export const FeeCollectNavPage = () => {

    const dispatch = useDispatch()
    const flicking = createRef()
    const { listSearched = [] } = useSelector(state => state.collect)

    useEffect(() => {
        dispatch(addingFavSaved())
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
                                    <Link
                                        onClick={() => flicking.current.moveTo(0)}
                                        className='btn btn-neutral text-primary'
                                        to={`/app/coll/bill/search`}
                                    >
                                        Nueva busqueda
                                    </Link>
                                    {
                                        listSearched.length > 0
                                        &&
                                        <Button
                                            onClick={() => dispatch(clearSearched())}
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
                    <Tab.Container>
                        <SliderNavFlip refSlider={flicking} className='px-3 nav nav-tabs' spacingChilds={false}>
                            <Nav.Item>
                                <NavLink to={`search`} end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Busqueda</NavLink>
                            </Nav.Item>
                            {
                                listSearched.map(({ id, title, typeSearch }, index) =>
                                    <Nav.Item key={`bill-nav-${index}-${id}`}>
                                        <NavItemLink
                                            onClick={() => {
                                                flicking.current.forceUpdate()
                                                flicking.current.moveTo(index + 1)
                                            }}
                                            idLink={id}
                                            title={title}
                                            typeSearch={typeSearch}
                                        />
                                    </Nav.Item>
                                )
                            }
                        </SliderNavFlip>
                        <Outlet />
                    </Tab.Container>
                </div>
            </div>
        </>
    )
}

const NavItemLink = ({ idLink, title, typeSearch, onClick = null }) => {

    const { pathname } = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { listSearchedFav = [] } = useSelector(state => state.collect)

    return (
        <div
            onClick={onClick}
            className={`nav-link d-flex flex-row gap-2 p-2 ${pathname.includes(`/app/coll/bill/usr/${idLink}`) || pathname.includes(`/app/coll/bill/prp/${idLink}`) ? 'active' : ''}`}
        >
            <Link
                to={`${typeSearch}/${idLink}`}
                className='text-decoration-none'
            >
                {typeSearch === 'usr' ? `Usuario - ${title}` : `Predio - ${title}`}
            </Link>
            {
                listSearchedFav.find(fav => fav.id === idLink)
                    ?
                    <button
                        onClick={() => dispatch(deleteSearchedFav(idLink))}
                        className='btn p-0 d-flex align-items-center'
                        size='sm'
                    >
                        <BsStarFill color='gold' />
                    </button>
                    :
                    <button
                        onClick={() => dispatch(addSearchedFav({ id: idLink, title, typeSearch }))}
                        className='btn p-0 d-flex align-items-center'
                        size='sm'
                    >
                        <BsStar />
                    </button>
            }
            <button
                onClick={() => {
                    dispatch(deleteSearchedById(idLink))
                    navigate('/app/coll/bill/search', { replace: true })
                }}
                className='btn p-0 d-flex align-items-center'
                size='sm'
            >
                <BsXLg />
            </button>
        </div>
    )
}