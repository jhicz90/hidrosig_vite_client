import { Link, NavLink, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Tab } from 'react-bootstrap'
import { FiMap, FiPlus, FiUserPlus } from 'react-icons/fi'
import { ContainerController, SliderNavFlip } from '@/components'

export const IrrigationNetworkNavPage = () => {

    const { activeNode: { id = '' } } = useSelector(state => state.irrigationnetwork)

    return (
        <ContainerController>
            <div className='d-lg-flex align-items-lg-center justify-content-lg-between my-3'>
                <div className='min-w-400 flex-1'>
                    <h4 className='mb-0 text-uppercase'>RED DE RIEGO</h4>
                    {/* <div className='mt-1 mt-sm-0 d-flex flex-column flex-sm-row gap-0 gap-sm-4'>
                            <div className='mt-2 d-flex align-items-center gap-1 text-muted'>
                                <MdOutlineNumbers size={20} />
                                {data.receipt}
                            </div>
                            <div className='mt-2 d-flex align-items-center gap-1 text-muted'>
                                <HiCurrencyDollar size={20} />
                                {data.remainingAmount.toFixed(2)}
                            </div>
                            <div className='mt-2 d-flex align-items-center gap-1 text-muted'>
                                <LiaMoneyCheckAltSolid size={20} />
                                {data.check}
                            </div>
                            <div className='mt-2 d-flex align-items-center gap-1 text-muted'>
                                <HiCalendar size={20} />
                                <span className='text-capitalize'>{moment(data.startDeclaration).format('DD MMMM, YYYY')}</span>
                            </div>
                        </div> */}
                </div>
                <div className='mt-3 ms-lg-5 mt-lg-0 d-flex gap-2 flex-wrap'>
                    <Link
                        to={`chn/create`}
                        className='btn btn-sm btn-primary d-flex align-items-center gap-2'
                    >
                        <FiPlus />
                        Nuevo estructura
                    </Link>
                    <Link
                        to={`ws/create`}
                        className='btn btn-sm btn-primary d-flex align-items-center gap-2'
                    >
                        <FiMap />
                        Nuevo fuente de agua
                    </Link>
                </div>
            </div>
            {/* <div className='container-fluid'>
                <div className='row my-3'>
                    <div className='col-12'>
                        <div className='row align-items-center justify-content-between g-3'>
                            <div className='col-12 col-md-auto'>
                                <h4 className='mb-0'>RED DE RIEGO</h4>
                            </div>
                            <div className='col-12 col-md-auto'>
                                <div className='d-flex gap-2'>
                                    <LinkBack className='btn btn-neutral text-primary' to={`str/create`} state={{ parent: id || '' }}>Nueva estructura</LinkBack>
                                    <LinkBack className='btn btn-neutral text-primary' to={`ws/create`}>Nueva fuente de agua</LinkBack>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            <div className='row'>
                <div className='col-12'>
                    <Tab.Container>
                        <SliderNavFlip className='d-flex flex-stack rounded-3 bg-light-subtle nav-wrapper' cameraClass='nav nav-flip'>
                            <NavLink to={`net`} className={({ isActive }) => isActive ? 'btn btn-neutral active' : 'btn btn-neutral'}>Red de riego</NavLink>
                            <NavLink to={`chn`} className={({ isActive }) => isActive ? 'btn btn-neutral active' : 'btn btn-neutral'}>Canales</NavLink>
                            <NavLink to={`ws`} className={({ isActive }) => isActive ? 'btn btn-neutral active' : 'btn btn-neutral'}>Fuentes de agua</NavLink>
                            <NavLink to={`var`} className={({ isActive }) => isActive ? 'btn btn-neutral active' : 'btn btn-neutral'}>Variables</NavLink>
                            <NavLink to={`import`} className={({ isActive }) => isActive ? 'btn btn-neutral active' : 'btn btn-neutral'}>Importación</NavLink>
                        </SliderNavFlip>
                    </Tab.Container>
                </div>
            </div>
            <div className='mt-2'>
                <Outlet />
            </div>
        </ContainerController>
    )
}
