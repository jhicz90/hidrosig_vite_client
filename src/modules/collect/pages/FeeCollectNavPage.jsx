import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Nav, Tab } from 'react-bootstrap'
import { IoMdClose } from 'react-icons/io'
import { LinkBack, SliderNavFlip } from '../../../components'
import { clearSearched, deleteSearchedById } from '../../../store/actions'

export const FeeCollectNavPage = () => {

    const dispatch = useDispatch()
    const { listSearched = [] } = useSelector(state => state.collect)

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
                                    <LinkBack className='btn btn-neutral text-primary' relative to={`create`}>Nueva busqueda</LinkBack>
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
                        <SliderNavFlip className='px-3 nav nav-tabs overflow-visible' spacingChilds={false}>
                            <Nav.Item>
                                <NavLink to={`search`} end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Busqueda</NavLink>
                            </Nav.Item>
                            {
                                listSearched.map(({ id, title, typeSearch }, index) =>
                                    <Nav.Item key={`bill-nav-${index}-${id}`} >
                                        <NavItemLink idLink={id} title={title} typeSearch={typeSearch} />
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

const NavItemLink = ({ idLink, title, typeSearch }) => {

    const { pathname } = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    return (
        <div
            className={`nav-link d-flex flex-row gap-2 ${pathname === `/app/coll/bill/usr/${idLink}` || pathname === `/app/coll/bill/prp/${idLink}` ? 'active' : ''}`}
        >
            <Link
                to={`${typeSearch}/${idLink}`}
                className='text-decoration-none'
            >
                {typeSearch === 'usr' ? `Usuario - ${title}` : `Predio - ${title}`}
            </Link>
            <button
                onClick={() => {
                    dispatch(deleteSearchedById(idLink))
                    navigate('/app/coll/bill/search', { replace: true })
                }}
                className='btn p-0 d-flex align-items-center'
                size='sm'
            >
                <IoMdClose size={16} />
            </button>
        </div>
    )
}