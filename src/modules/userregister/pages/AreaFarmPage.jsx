import React from 'react'
import { Link, NavLink, Route, Routes, useParams } from 'react-router-dom'
import { Button, Card, Dropdown, Tab } from 'react-bootstrap'
import { AiFillNotification } from 'react-icons/ai'
import { IoEllipsisVertical, IoReturnUpBack } from 'react-icons/io5'
import { MdOutlineNumbers } from 'react-icons/md'
import { HiArrowUturnLeft, HiCalendar, HiPrinter } from 'react-icons/hi2'
import moment from 'moment'
import { AreaFarmAdditionalData, AreaFarmAreaGeometry, AreaFarmBanner, AreaFarmImages, AreaFarmInformation, AreaFarmListHolder, AreaFarmWaterIn } from '../components'
import { ContainerController, LoadingPage, SliderNavFlip } from '../../../components'
import { questionActiveFarm, questionDeleteFarm, useDeleteFarmByIdMutation, useGetFarmByIdQuery, useUpdateFarmByIdMutation } from '../../../store/actions'

export const AreaFarmPage = () => {

    const { prpid } = useParams()
    const { data = null, isLoading, isSuccess } = useGetFarmByIdQuery(prpid)
    const [updateFarm, { isLoading: isSaving }] = useUpdateFarmByIdMutation()
    const [deleteFarm] = useDeleteFarmByIdMutation()

    const handleActive = async (id, active, name) => {
        if (await questionActiveFarm(!active, name)) {
            updateFarm({
                id,
                farm: { active }
            })
        }
    }

    const handleDelete = async (id, name) => {
        if (await questionDeleteFarm(name)) {
            deleteFarm(id).unwrap().then(() => {
                redirect()
            })
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
                    <h4 className='mb-0 text-uppercase'>PREDIO AGRARIO: <div className='d-inline-block text-primary'>{data.name}</div></h4>
                    <div className='mt-1 mt-sm-0 d-flex flex-column flex-lg-row gap-0 gap-lg-4'>
                        <div className='mt-2 d-flex align-items-center gap-1 text-muted'>
                            <MdOutlineNumbers size={20} />
                            {data.code}
                        </div>
                        {/* <div className='mt-2 d-flex align-items-center gap-1 text-muted'>
                            <HiUserCircle size={20} />
                            {typeUserFarm(data.type)}
                        </div> */}
                        <div className='mt-2 d-flex align-items-center gap-1 text-muted'>
                            <HiCalendar size={20} />
                            Actualizado el <span className='text-capitalize'>{moment(data.updatedAt).format('DD MMMM, YYYY')}</span>
                        </div>
                    </div>
                </div>
                <div className='mt-3 ms-lg-5 mt-lg-0 d-flex gap-2 flex-wrap'>
                    <Link
                        to={`/app/user_reg/user_farm/prps`}
                        className='btn btn-sm btn-neutral d-flex align-items-center gap-2'
                    >
                        <HiArrowUturnLeft />
                        Lista de predios
                    </Link>
                    <Button
                        variant='primary'
                        size='sm'
                        className='d-flex align-items-center gap-2'
                    >
                        <AiFillNotification />
                        Generar notificación
                    </Button>
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
            {/* <div className='row my-3'>
                <div className='col-12'>
                    <div className='row align-items-center justify-content-between g-3'>
                        <div className='col-12 col-md-auto'>
                            <h4 className='mb-0'>PREDIO AGRARIO</h4>
                        </div>
                        <div className='col-12 col-md-auto'>
                            <div className='d-flex gap-2'>
                                <Link
                                    to={`/app/user_reg/user_farm/prps`}
                                    className='btn btn-neutral-secondary'
                                >
                                    <IoReturnUpBack size={24} />
                                    LISTA PREDIOS
                                </Link>
                                <Button variant='primary' className='d-flex align-items-center gap-2'>
                                    <AiFillNotification size={24} />
                                    Generar notificación
                                </Button>
                                <Button
                                    onClick={() => handleActive(prpid, !data?.active, data?.name)}
                                    disabled={isSaving || isLoading}
                                    variant={data.active ? 'danger' : 'success'}
                                >
                                    {data.active ? 'Desactivar' : 'Activar'}
                                </Button>
                                <Dropdown className='dropdown-noarrow'>
                                    <Dropdown.Toggle variant='neutral' className='d-flex align-items-center'>
                                        <IoEllipsisVertical size={24} />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item>Reportes</Dropdown.Item>
                                        <Dropdown.Item>Imprimir</Dropdown.Item>
                                        <Dropdown.Item
                                            onClick={() => handleDelete(prpid, data?.name)}
                                            className='text-danger'
                                        >
                                            Eliminar
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            <div className='row'>
                <div className='col-12'>
                    <Tab.Container>
                        <SliderNavFlip className='d-flex flex-stack rounded-3 bg-light-subtle nav-wrapper' cameraClass='nav nav-flip'>
                            <NavLink to={``} end className={({ isActive }) => isActive ? 'btn btn-neutral active' : 'btn btn-neutral'}>Información</NavLink>
                            <NavLink to={`area`} className={({ isActive }) => isActive ? 'btn btn-neutral active' : 'btn btn-neutral'}>Superficie</NavLink>
                            <NavLink to={`win`} className={({ isActive }) => isActive ? 'btn btn-neutral active' : 'btn btn-neutral'}>Tomas de agua</NavLink>
                            <NavLink to={`sw`} className={({ isActive }) => isActive ? 'btn btn-neutral active' : 'btn btn-neutral'}>Drenaje</NavLink>
                            <NavLink to={`vol`} className={({ isActive }) => isActive ? 'btn btn-neutral active' : 'btn btn-neutral'}>Volumen</NavLink>
                            <NavLink to={`hld`} className={({ isActive }) => isActive ? 'btn btn-neutral active' : 'btn btn-neutral'}>Titulares</NavLink>
                            <NavLink to={`img`} className={({ isActive }) => isActive ? 'btn btn-neutral active' : 'btn btn-neutral'}>Imagenes</NavLink>
                            <NavLink to={`add`} className={({ isActive }) => isActive ? 'btn btn-neutral active' : 'btn btn-neutral'}>Datos adicionales</NavLink>
                        </SliderNavFlip>
                    </Tab.Container>
                </div>
            </div>
            <div className='mt-2'>
                <Routes>
                    <Route index element={<AreaFarmInformation />} />
                    <Route path={`area`} element={<AreaFarmAreaGeometry />} />
                    <Route path={`win`} element={<AreaFarmWaterIn />} />
                    {/* <Route path={`doc`} element={<UserFarmListDocument />} /> */}
                    <Route path={`hld`} element={<AreaFarmListHolder />} />
                    <Route path={`img`} element={<AreaFarmImages />} />
                    <Route path={`add`} element={<AreaFarmAdditionalData />} />
                </Routes>
            </div>
        </ContainerController>
    )
}
