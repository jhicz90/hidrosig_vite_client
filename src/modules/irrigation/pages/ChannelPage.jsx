import React from 'react'
import { Link, NavLink, Route, Routes, useParams } from 'react-router-dom'
import { Button, Tab } from 'react-bootstrap'
import { HiArrowUturnLeft, HiCalendar, HiPrinter } from 'react-icons/hi2'
import moment from 'moment'
import { ChannelAdditionalData, ChannelView, ChannelImages, ChannelInformation, ChannelListFarm, ChannelListSection } from '../components'
import { LoadingPage, SliderNavFlip, ContainerController } from '@/components'
import { questionDeleteChannel, useDeleteChannelByIdMutation, useGetChannelByIdQuery } from '@/store/actions'

export const ChannelPage = () => {

    const { strid } = useParams()
    const { data = null, isLoading, isSuccess } = useGetChannelByIdQuery(strid)
    const [deleteStructure] = useDeleteChannelByIdMutation()

    const handleDelete = async (id, name) => {
        if (await questionDeleteChannel(name)) {
            deleteStructure(id)
        }
    }

    if (isLoading) {
        return <LoadingPage />
    }

    return (
        isSuccess
        &&
        <ContainerController>
            <div className='d-lg-flex align-items-lg-center justify-content-lg-between my-3'>
                <div className='min-w-400 flex-1'>
                    <h4 className='mb-0 text-uppercase'>CANAL: <div className='d-inline-block text-primary'>{data.name}</div></h4>
                    <div className='mt-1 mt-sm-0 d-flex flex-column flex-sm-row gap-0 gap-sm-4'>
                        {/* <div className='mt-2 d-flex align-items-center gap-1 text-muted'>
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
                        </div> */}
                        <div className='mt-2 d-flex align-items-center gap-1 text-muted'>
                            <HiCalendar size={20} />
                            <span className='text-capitalize'>{moment(data.updatedAt).format('DD MMMM, YYYY')}</span>
                        </div>
                    </div>
                </div>
                <div className='mt-3 ms-lg-5 mt-lg-0 d-flex gap-2 flex-wrap'>
                    <Link
                        to={`/app/schm/irrig/net`}
                        className='btn btn-sm btn-neutral d-flex align-items-center gap-2'
                    >
                        <HiArrowUturnLeft />
                        Red de riego
                    </Link>
                    <Link
                        to={`/app/schm/irrig/chn`}
                        className='btn btn-sm btn-neutral d-flex align-items-center gap-2'
                    >
                        <HiArrowUturnLeft />
                        Estructuras
                    </Link>
                    <Button
                        variant='primary'
                        size='sm'
                        className='d-flex align-items-center gap-2'
                    >
                        <HiPrinter />
                        Generar reporte
                    </Button>
                </div>
            </div>
            <div className='row'>
                <div className='col-md-12 col-lg-5 col-xl-4 mb-md-2'>
                    <ChannelView />
                </div>
                <div className='col-md-12 col-lg-7 col-xl-8'>
                    <Tab.Container>
                        <SliderNavFlip className='d-flex flex-stack rounded-3 bg-light-subtle nav-wrapper' cameraClass='nav nav-flip'>
                            <NavLink to={``} end className={({ isActive }) => isActive ? 'btn btn-neutral active' : 'btn btn-neutral'}>Información</NavLink>
                            <NavLink to={`sct`} className={({ isActive }) => isActive ? 'btn btn-neutral active' : 'btn btn-neutral'}>Tramos</NavLink>
                            <NavLink to={`prp`} className={({ isActive }) => isActive ? 'btn btn-neutral active' : 'btn btn-neutral'}>Predios</NavLink>
                            <NavLink to={`img`} className={({ isActive }) => isActive ? 'btn btn-neutral active' : 'btn btn-neutral'}>Imagenes</NavLink>
                            <NavLink to={`add`} className={({ isActive }) => isActive ? 'btn btn-neutral active' : 'btn btn-neutral'}>Datos adicionales</NavLink>
                        </SliderNavFlip>
                    </Tab.Container>
                    <div className='mt-2'>
                        <Routes>
                            <Route index element={<ChannelInformation />} />
                            <Route path={`sct/*`} element={<ChannelListSection />} />
                            <Route path={`prp`} element={<ChannelListFarm />} />
                            <Route path={`img`} element={<ChannelImages />} />
                            <Route path={`add`} element={<ChannelAdditionalData />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </ContainerController>
    )
}
