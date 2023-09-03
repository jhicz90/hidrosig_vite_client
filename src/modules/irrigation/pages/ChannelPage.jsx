import { useEffect } from 'react'
import { Link, NavLink, Route, Routes, useParams } from 'react-router-dom'
import { Card, Dropdown, Tab } from 'react-bootstrap'
import { IoEllipsisVertical, IoReturnUpBack } from 'react-icons/io5'
import { ChannelAdditionalData, ChannelBanner, ChannelImages, ChannelInformation, ChannelListFarm, ChannelListSection } from '../components'
import { LoadingPage, SliderNavFlip } from '../../../components'
import { useNavigateState } from '../../../hooks'
import { questionDeleteChannel, useDeleteChannelByIdMutation, useGetChannelByIdQuery } from '../../../store/actions'

export const ChannelPage = () => {

    const { strid } = useParams()
    const [redirect, redirectEscape] = useNavigateState('/app/schm/irrig')

    const { data = null, isLoading, isError } = useGetChannelByIdQuery(strid)
    const [deleteStructure] = useDeleteChannelByIdMutation()

    const handleDelete = async (id, name) => {
        if (await questionDeleteChannel(name)) {
            deleteStructure(id)
        }
    }

    useEffect(() => {
        if (isError) {
            redirectEscape()
        }
    }, [isError])

    if (isLoading) {
        return <LoadingPage />
    }

    return (
        <>
            {
                !!data
                &&
                <div className='container-fluid my-3'>
                    <div className='row'>
                        <div className='col-12'>
                            <div className='row align-items-center justify-content-between g-3 mb-3'>
                                <div className='col-12 col-md-auto'>
                                    <h4 className='mb-0'>ESTRUCTURA</h4>
                                </div>
                                <div className='col-12 col-md-auto'>
                                    <div className='d-flex gap-2'>
                                        <Link to={`/app/schm/irrig`} className='btn btn-neutral-secondary'>
                                            <IoReturnUpBack size={24} />
                                            RED DE RIEGO
                                        </Link>
                                        <Link to={`/app/schm/irrig/str`} className='btn btn-neutral-secondary'>
                                            <IoReturnUpBack size={24} />
                                            ESTRUCTURAS
                                        </Link>
                                        <Dropdown className='dropdown-noarrow'>
                                            <Dropdown.Toggle variant='neutral' className='d-flex align-items-center'>
                                                <IoEllipsisVertical size={24} />
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item>Reportes</Dropdown.Item>
                                                <Dropdown.Item>Imprimir</Dropdown.Item>
                                                <Dropdown.Item
                                                    onClick={() => handleDelete(strid, data?.name)}
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
                    </div>
                    <div className='row'>
                        <div className='col-md-5 col-lg-5 col-xl-4'>
                            <ChannelBanner />
                        </div>
                        <div className='col-md-7 col-lg-7 col-xl-8'>
                            <Tab.Container>
                                <Card className='p-2'>
                                    <SliderNavFlip>
                                        <NavLink to={``} end className={({ isActive }) => isActive ? 'btn btn-neutral active' : 'btn btn-neutral'}>Información</NavLink>
                                        <NavLink to={`sct`} className={({ isActive }) => isActive ? 'btn btn-neutral active' : 'btn btn-neutral'}>Tramos</NavLink>
                                        <NavLink to={`prp`} className={({ isActive }) => isActive ? 'btn btn-neutral active' : 'btn btn-neutral'}>Predios</NavLink>
                                        <NavLink to={`img`} className={({ isActive }) => isActive ? 'btn btn-neutral active' : 'btn btn-neutral'}>Imagenes</NavLink>
                                        <NavLink to={`add`} className={({ isActive }) => isActive ? 'btn btn-neutral active' : 'btn btn-neutral'}>Datos adicionales</NavLink>
                                        {/* Usuarios en la estructura */}
                                        {/* <NavLink to={`area`} className={({ isActive }) => isActive ? 'btn btn-neutral active' : 'btn btn-neutral'}>Superficie</NavLink>
                                        <NavLink to={`hld`} className={({ isActive }) => isActive ? 'btn btn-neutral active' : 'btn btn-neutral'}>Titulares</NavLink>
                                        <NavLink to={`img`} className={({ isActive }) => isActive ? 'btn btn-neutral active' : 'btn btn-neutral'}>Imagenes</NavLink>
                                        <NavLink to={`add`} className={({ isActive }) => isActive ? 'btn btn-neutral active' : 'btn btn-neutral'}>Datos adicionales</NavLink> */}
                                    </SliderNavFlip>
                                </Card>
                                <div className='mt-2'>
                                    <Routes>
                                        <Route index element={<ChannelInformation />} />
                                        <Route path={`sct/*`} element={<ChannelListSection />} />
                                        <Route path={`prp`} element={<ChannelListFarm />} />
                                        <Route path={`img`} element={<ChannelImages />} />
                                        <Route path={`add`} element={<ChannelAdditionalData />} />
                                        {/* <Route path={`area`} element={<AreaFarmAreaGeometry />} />
                                        <Route path={`hld`} element={<AreaFarmListHolder />} />
                                        <Route path={`img`} element={<AreaFarmImages />} />
                                        <Route path={`add`} element={<AreaFarmAdditionalData />} /> */}
                                    </Routes>
                                </div>
                            </Tab.Container>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
