import React from 'react'
import { Link, NavLink, Route, Routes, useParams } from 'react-router-dom'
import { Button, Tab } from 'react-bootstrap'
import { AiFillNotification, AiOutlineWhatsApp } from 'react-icons/ai'
import { HiArrowUturnLeft, HiCalendar, HiPrinter, HiUserCircle } from 'react-icons/hi2'
import { MdOutlineNumbers } from 'react-icons/md'
import moment from 'moment'
import { ContainerController, LoadingPage, SliderNavFlip } from '../../../components'
import { UserFarmAdditionalData, UserFarmInformation, UserFarmListAreaFarm, UserFarmListDocument } from '../components'
import { questionActiveUserFarm, questionDeleteUserFarm, useDeleteUserFarmByIdMutation, useGetUserFarmByIdQuery, useUpdateUserFarmByIdMutation } from '../../../store/actions'
import { namesUserFarm, typeUserFarm } from '../../../helpers'

export const UserFarmPage = () => {

    const { userid } = useParams()

    const { data = null, isLoading, isError } = useGetUserFarmByIdQuery(userid)
    const [updateUserFarm, { isLoading: isSaving }] = useUpdateUserFarmByIdMutation()
    const [deleteUserFarm] = useDeleteUserFarmByIdMutation()

    const handleActive = async (id, active, names) => {
        if (await questionActiveUserFarm(!active, names)) {
            updateUserFarm({
                id,
                userfarm: { active }
            })
        }
    }

    const handleDelete = async (id, names) => {
        if (await questionDeleteUserFarm(names)) {
            deleteUserFarm(id)
        }
    }

    if (isLoading) {
        return <LoadingPage />
    }

    return (
        !!data
        &&
        <ContainerController>
            <div className='d-lg-flex align-items-lg-center justify-content-lg-between my-3'>
                <div className='min-w-400 flex-1'>
                    <h4 className='mb-0 text-uppercase'>USUARIO AGRARIO: <div className='d-inline-block text-primary'>{namesUserFarm(data)}</div></h4>
                    <div className='mt-1 mt-sm-0 d-flex flex-column flex-sm-row gap-0 gap-sm-4'>
                        <div className='mt-2 d-flex align-items-center gap-1 text-muted'>
                            <MdOutlineNumbers size={20} />
                            {data.code}
                        </div>
                        <div className='mt-2 d-flex align-items-center gap-1 text-muted'>
                            <HiUserCircle size={20} />
                            {typeUserFarm(data.type)}
                        </div>
                        <div className='mt-2 d-flex align-items-center gap-1 text-muted'>
                            <HiCalendar size={20} />
                            Actualizado el <span className='text-capitalize'>{moment(data.updatedAt).format('DD MMMM, YYYY')}</span>
                        </div>
                    </div>
                </div>
                <div className='mt-3 ms-lg-5 mt-lg-0 d-flex gap-2 flex-wrap'>
                    <Link
                        to={`/app/user_reg/user_farm/users`}
                        className='btn btn-sm btn-neutral d-flex align-items-center gap-2'
                    >
                        <HiArrowUturnLeft />
                        Lista de usuarios
                    </Link>
                    <Button
                        variant='success'
                        size='sm'
                        className='d-flex align-items-center gap-2'
                    >
                        <AiOutlineWhatsApp />
                        Enviar mensaje
                    </Button>
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
                            <h4 className='mb-0'>USUARIO AGRARIO</h4>
                        </div>
                        <div className='col-12 col-md-auto'>
                            <div className='d-flex gap-2'>
                                <Button
                                    onClick={() => handleActive(userid, !data?.active, data?.names)}
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
                                            onClick={() => handleDelete(userid, data?.names)}
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
                            <NavLink to={`prp`} className={({ isActive }) => isActive ? 'btn btn-neutral active' : 'btn btn-neutral'}>Predios</NavLink>
                            <NavLink to={`doc`} className={({ isActive }) => isActive ? 'btn btn-neutral active' : 'btn btn-neutral'}>Documentos</NavLink>
                            <NavLink to={`msg`} className={({ isActive }) => isActive ? 'btn btn-neutral active' : 'btn btn-neutral'}>Mensajes</NavLink>
                            <NavLink to={`add`} className={({ isActive }) => isActive ? 'btn btn-neutral active' : 'btn btn-neutral'}>Datos adicionales</NavLink>
                        </SliderNavFlip>
                    </Tab.Container>
                </div>
            </div>
            <div className='mt-2'>
                <Routes>
                    <Route index element={<UserFarmInformation />} />
                    <Route path={`prp`} element={<UserFarmListAreaFarm />} />
                    <Route path={`doc`} element={<UserFarmListDocument />} />
                    {/* <Route path={`comm`} element={<JuntaAmbitCommittee />} /> */}
                    <Route path={`add`} element={<UserFarmAdditionalData />} />
                </Routes>
            </div>
        </ContainerController>
    )
}
