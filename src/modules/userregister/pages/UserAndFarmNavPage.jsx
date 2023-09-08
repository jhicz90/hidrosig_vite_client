import React from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { Tab } from 'react-bootstrap'
import { FiMap, FiUserPlus } from 'react-icons/fi'
import { ContainerController, SliderNavFlip } from '@/components'

export const UserAndFarmNavPage = () => {
    return (
        <ContainerController>
            <div className='d-lg-flex align-items-lg-center justify-content-lg-between my-3'>
                <div className='min-w-400 flex-1'>
                    <h4 className='mb-0 text-uppercase'>USUARIOS Y PREDIOS</h4>
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
                        to={`users/create`}
                        className='btn btn-sm btn-primary d-flex align-items-center gap-2'
                    >
                        <FiUserPlus />
                        Nuevo usuario
                    </Link>
                    <Link
                        to={`prps/create`}
                        className='btn btn-sm btn-primary d-flex align-items-center gap-2'
                    >
                        <FiMap />
                        Nuevo predio
                    </Link>
                </div>
            </div>
            <div className='row'>
                <div className='col-12'>
                    <Tab.Container>
                        <SliderNavFlip className='d-flex flex-stack rounded-3 bg-light-subtle nav-wrapper' cameraClass='nav nav-flip'>
                            <NavLink to={`users`} className={({ isActive }) => isActive ? 'btn btn-neutral active' : 'btn btn-neutral'}>Usuarios</NavLink>
                            <NavLink to={`prps`} className={({ isActive }) => isActive ? 'btn btn-neutral active' : 'btn btn-neutral'}>Predios</NavLink>
                            <NavLink to={`import`} className={({ isActive }) => isActive ? 'btn btn-neutral active' : 'btn btn-neutral'}>Importación</NavLink>
                        </SliderNavFlip>
                    </Tab.Container>
                </div>
            </div>
            <div className='card card-next-nav'>
                <Outlet />
            </div>
        </ContainerController>
    )
}
