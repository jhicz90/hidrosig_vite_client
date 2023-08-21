import React from 'react'
import { Link, NavLink, Route, Routes, useParams } from 'react-router-dom'
import { Button, Tab } from 'react-bootstrap'
import moment from 'moment'
import { HiArrowUturnLeft, HiCalendar, HiCurrencyDollar, HiPrinter } from 'react-icons/hi2'
import { LiaMoneyCheckAltSolid } from 'react-icons/lia'
import { MdOutlineNumbers } from 'react-icons/md'
import { FaLockOpen } from 'react-icons/fa'
import { useGetPettyCashByIdQuery } from '../../../store/actions'
import { ContainerController, LoadingPage, SliderNavFlip } from '../../../components'
import { DeletePettyCash, ExportExcelPettyCash, ExportPdfPettyCash, PettyCashImages, PettyCashInformation, PettyCashListVouchers } from '../components'

export const PettyCashPage = () => {

    const { pettycashid } = useParams()

    const { data = null, isLoading } = useGetPettyCashByIdQuery(pettycashid)

    if (isLoading) {
        return <LoadingPage />
    }

    return (
        !!data
        &&
        <ContainerController>
            <div className='d-lg-flex align-items-lg-center justify-content-lg-between my-3'>
                <div className='min-w-400 flex-1'>
                    <h4 className='mb-0 text-uppercase'>CAJA CHICA: <div className='d-inline-block text-primary'>{data.name}</div></h4>
                    <div className='mt-1 mt-sm-0 d-flex flex-column flex-sm-row gap-0 gap-sm-4'>
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
                    </div>
                </div>
                <div className='mt-3 ms-lg-5 mt-lg-0 d-flex gap-2 flex-wrap'>
                    <Link
                        to={`/app/acct/petty_cash`}
                        className='btn btn-sm btn-neutral d-flex align-items-center gap-2'
                    >
                        <HiArrowUturnLeft />
                        Lista de caja chica
                    </Link>
                    <ExportExcelPettyCash pettycash={pettycashid} />
                    <ExportPdfPettyCash pettycash={pettycashid} />
                    <Button
                        variant='primary'
                        size='sm'
                        className='d-flex align-items-center gap-2'
                    >
                        <HiPrinter />
                        Generar reporte
                    </Button>
                    <Button
                        variant='secondary'
                        size='sm'
                        active={true}
                        className='d-flex align-items-center gap-2'
                    >
                        {/* <FaLock /> */}
                        <FaLockOpen />
                        Abrir caja
                    </Button>
                    <DeletePettyCash pettycash={data} />
                </div>
            </div>
            <div className='row'>
                <div className='col-12'>
                    <Tab.Container>
                        <SliderNavFlip className='d-flex flex-stack rounded-3 bg-light-subtle nav-wrapper' cameraClass='nav nav-flip'>
                            <NavLink to={``} end className={({ isActive }) => isActive ? 'btn btn-neutral active' : 'btn btn-neutral'}>Información</NavLink>
                            <NavLink to={`img`} className={({ isActive }) => isActive ? 'btn btn-neutral active' : 'btn btn-neutral'}>Images</NavLink>
                            <NavLink to={`vch`} className={({ isActive }) => isActive ? 'btn btn-neutral active' : 'btn btn-neutral'}>Comprobantes</NavLink>
                        </SliderNavFlip>
                    </Tab.Container>
                </div>
            </div>
            <div className='mt-2'>
                <Routes>
                    <Route index element={<PettyCashInformation />} />
                    <Route path={`img`} element={<PettyCashImages />} />
                    <Route path={`vch`} element={<PettyCashListVouchers />} />
                </Routes>
            </div>
        </ContainerController>
    )
}
