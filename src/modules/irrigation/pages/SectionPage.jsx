import React from 'react'
import { Link, NavLink, Route, Routes, useParams } from 'react-router-dom'
import { Button, Tab } from 'react-bootstrap'
import { HiArrowUturnLeft, HiCalendar, HiPrinter } from 'react-icons/hi2'
import moment from 'moment'
import { SectionAdditionalData, SectionView, SectionInformation, SectionLongitude } from '../components'
import { ContainerController, LoadingPage, SliderNavFlip } from '@/components'
import { questionDeleteSection, useDeleteSectionByIdMutation, useGetSectionByIdQuery } from '@/store/actions'

export const SectionPage = () => {

    const { sectid } = useParams()
    const { data = null, isLoading, isSuccess } = useGetSectionByIdQuery(sectid)
    const [deleteSection] = useDeleteSectionByIdMutation()

    const handleDelete = async (id, data) => {
        if (await questionDeleteSection(data)) {
            deleteSection(id)
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
                    <h4 className='mb-0 text-uppercase'>TRAMO: <div className='d-inline-block text-primary'>{data.name}</div></h4>
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
                        to={`/app/schm/irrig/chn/${data.channel._id}`}
                        className='btn btn-sm btn-neutral d-flex align-items-center gap-2'
                    >
                        <HiArrowUturnLeft />
                        Estructura {data.channel.name}
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
                <div className='col-12 col-xl-4 mb-2'>
                    <SectionView />
                </div>
                <div className='col-12 col-xl-8'>
                    <Tab.Container>
                        <SliderNavFlip className='d-flex flex-stack rounded-3 bg-light-subtle nav-wrapper' cameraClass='nav nav-flip'>
                            <NavLink to={``} end className={({ isActive }) => isActive ? 'btn btn-neutral active' : 'btn btn-neutral'}>Información</NavLink>
                            <NavLink to={`lon`} className={({ isActive }) => isActive ? 'btn btn-neutral active' : 'btn btn-neutral'}>Longitud</NavLink>
                            <NavLink to={`prp`} className={({ isActive }) => isActive ? 'btn btn-neutral active' : 'btn btn-neutral'}>Predios</NavLink>
                            <NavLink to={`add`} className={({ isActive }) => isActive ? 'btn btn-neutral active' : 'btn btn-neutral'}>Datos adicionales</NavLink>
                            {/* Usuarios en la estructura */}
                            {/* <NavLink to={`area`} className={({ isActive }) => isActive ? 'btn btn-neutral active' : 'btn btn-neutral'}>Superficie</NavLink>
                                        <NavLink to={`hld`} className={({ isActive }) => isActive ? 'btn btn-neutral active' : 'btn btn-neutral'}>Titulares</NavLink>
                                        <NavLink to={`img`} className={({ isActive }) => isActive ? 'btn btn-neutral active' : 'btn btn-neutral'}>Imagenes</NavLink>
                                        <NavLink to={`add`} className={({ isActive }) => isActive ? 'btn btn-neutral active' : 'btn btn-neutral'}>Datos adicionales</NavLink> */}
                        </SliderNavFlip>
                        <div className='card card-next-nav'>
                            <Routes>
                                <Route index element={<SectionInformation />} />
                                <Route path={`lon`} element={<SectionLongitude />} />
                                <Route path={`add`} element={<SectionAdditionalData />} />
                                {/* <Route path={`sct/*`} element={<StructureListSection />} />
                                        <Route path={`img`} element={<StructureImages />} />
                                        <Route path={`add`} element={<StructureAdditionalData />} /> */}
                            </Routes>
                        </div>
                    </Tab.Container>
                </div>
            </div>
        </ContainerController>
    )
}
