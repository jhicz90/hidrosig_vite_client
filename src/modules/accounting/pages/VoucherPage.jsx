import React from 'react'
import { Link, NavLink, Route, Routes, useParams } from 'react-router-dom'
import { Tab } from 'react-bootstrap'
import { BsReceipt } from 'react-icons/bs'
import { MdOutlineNumbers } from 'react-icons/md'
import { HiArrowUturnLeft, HiCalendar, HiCurrencyDollar } from 'react-icons/hi2'
import moment from 'moment'
import { useGetVoucherByIdQuery } from '../../../store/actions'
import { ContainerController, LoadingPage, SliderNavFlip } from '../../../components'
import { DeleteVoucher, VoucherImages, VoucherInformation } from '../components'

export const VoucherPage = () => {

    const { voucherid } = useParams()

    const { data = null, isLoading } = useGetVoucherByIdQuery(voucherid)

    if (isLoading) {
        return <LoadingPage />
    }

    return (
        !!data
        &&
        <ContainerController>
            <div className='d-lg-flex align-items-lg-center justify-content-lg-between my-3'>
                <div className='min-w-400 flex-1'>
                    <h4 className='mb-0 text-uppercase'>COMPROBANTE: <div className='d-inline-block text-primary'>{`${data.serie}-${data.numReceipt}`}</div></h4>
                    <div className='mt-1 mt-sm-0 d-flex flex-column flex-sm-row gap-0 gap-sm-4'>
                        <div className='mt-2 d-flex align-items-center gap-1 text-muted'>
                            <BsReceipt size={20} />
                            {data.serie}
                        </div>
                        <div className='mt-2 d-flex align-items-center gap-1 text-muted'>
                            <MdOutlineNumbers size={20} />
                            {data.numReceipt}
                        </div>
                        <div className='mt-2 d-flex align-items-center gap-1 text-muted'>
                            <HiCurrencyDollar size={20} />
                            {data.amountReceipt.toFixed(2)}
                        </div>
                        <div className='mt-2 d-flex align-items-center gap-1 text-muted'>
                            <HiCalendar size={20} />
                            <span className='text-capitalize'>{moment(data.voucherDay).format('DD MMMM, YYYY')}</span>
                        </div>
                    </div>
                </div>
                <div className='mt-3 ms-lg-5 mt-lg-0 d-flex gap-2 flex-wrap'>
                    <Link
                        to={`/app/acct/petty_cash/${data?.pettycash?._id}/vch`}
                        className='btn btn-sm btn-neutral d-flex align-items-center gap-2'
                    >
                        <HiArrowUturnLeft />
                        CAJA CHICA - {data?.pettycash?.name}
                    </Link>
                    <DeleteVoucher voucher={data} />
                </div>
            </div>
            <div className='row'>
                <div className='col-12'>
                    <Tab.Container>
                        <SliderNavFlip className='d-flex flex-stack rounded-3 bg-light-subtle nav-wrapper' cameraClass='nav nav-flip'>
                            <NavLink to={``} end className={({ isActive }) => isActive ? 'btn btn-neutral active' : 'btn btn-neutral'}>Información</NavLink>
                            <NavLink to={`img`} className={({ isActive }) => isActive ? 'btn btn-neutral active' : 'btn btn-neutral'}>Images</NavLink>
                        </SliderNavFlip>
                    </Tab.Container>
                </div>
            </div>
            <div className='card card-next-nav'>
                <Routes>
                    <Route index element={<VoucherInformation />} />
                    <Route path={`img`} element={<VoucherImages />} />
                </Routes>
            </div>
        </ContainerController>
    )
}
