import React from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { Nav, Tab } from 'react-bootstrap'
import { FiMap, FiUserPlus } from 'react-icons/fi'
import { LinkBack } from '../../../components'

export const UserAndFarmNavPage = () => {
    return (
        <React.Fragment>
            <div className='container'>
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
                        {/* <Button
                            onClick={handleExportExcel}
                            variant='neutral'
                            size='sm'
                            className='d-flex align-items-center gap-2'
                        >
                            <FaRegFileExcel color='green' />
                            Exportar EXCEL
                        </Button>
                        <Button
                            onClick={handleExportPDF}
                            variant='neutral'
                            size='sm'
                            className='d-flex align-items-center gap-2'
                        >
                            <FaRegFilePdf color='red' />
                            Exportar Comprobantes
                        </Button>
                        <Button
                            variant='primary'
                            size='sm'
                            className='d-flex align-items-center gap-2'
                        >
                            <HiPrinter />
                            Generar reporte
                        </Button>
                        <Button
                            onClick={() => handleDelete(pettycashid, data?.name)}
                            variant='danger'
                            size='sm'
                            className='d-flex align-items-center gap-2'
                        >
                            Eliminar
                        </Button> */}
                    </div>
                </div>
            </div>
            <div className='container-fluid g-0'>
                <div className='row g-0'>
                    <div className='col'>
                        <Tab.Container>
                            <Nav variant='tabs' className='px-3'>
                                <Nav.Item>
                                    <NavLink to={`users`} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Usuarios</NavLink>
                                </Nav.Item>
                                <Nav.Item>
                                    <NavLink to={`prps`} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Predios</NavLink>
                                </Nav.Item>
                                <Nav.Item>
                                    <NavLink to={`import`} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Importación</NavLink>
                                </Nav.Item>
                            </Nav>
                        </Tab.Container>
                    </div>
                </div>
            </div>
            <div className='container'>
                <div className='mt-2'>
                    <Outlet />
                </div>
            </div>
        </React.Fragment>
    )
}
