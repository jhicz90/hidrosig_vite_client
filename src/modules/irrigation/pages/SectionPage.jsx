import { useEffect } from 'react'
import { Link, NavLink, Route, Routes, useParams } from 'react-router-dom'
import { Card, Dropdown, Tab } from 'react-bootstrap'
import { IoEllipsisVertical, IoReturnUpBack } from 'react-icons/io5'
import { SectionAdditionalData, SectionBanner, SectionInformation, SectionLongitude } from '../components'
import { LoadingPage, SliderNavFlip } from '../../../components'
import { useNavigateState } from '../../../hooks'
import { questionDeleteSection, useDeleteSectionByIdMutation, useGetSectionByIdQuery } from '../../../store/actions'

export const SectionPage = () => {

    const { sectid } = useParams()
    const [redirect, redirectEscape] = useNavigateState('/app/schm/irrig')

    const { data = null, isLoading, isError } = useGetSectionByIdQuery(sectid)
    const [deleteSection] = useDeleteSectionByIdMutation()

    const handleDelete = async (id, data) => {
        if (await questionDeleteSection(data)) {
            deleteSection(id)
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
        !!data
        &&
        <div className='container-fluid my-3'>
            <div className='row'>
                <div className='col-12'>
                    <div className='row align-items-center justify-content-between g-3 mb-3'>
                        <div className='col-12 col-md-auto'>
                            <h4 className='mb-0'>TRAMO</h4>
                        </div>
                        <div className='col-12 col-md-auto'>
                            <div className='d-flex gap-2'>
                                <Link to={`/app/schm/irrig/str/${data.channel._id}`} className='btn btn-neutral-secondary'>
                                    <IoReturnUpBack size={24} />
                                    {data.channel.name}
                                </Link>
                                <Dropdown className='dropdown-noarrow'>
                                    <Dropdown.Toggle variant='neutral' className='d-flex align-items-center'>
                                        <IoEllipsisVertical size={24} />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item>Reportes</Dropdown.Item>
                                        <Dropdown.Item>Imprimir</Dropdown.Item>
                                        <Dropdown.Item
                                            onClick={() => handleDelete(sectid, data)}
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
                    <SectionBanner />
                </div>
                <div className='col-md-7 col-lg-7 col-xl-8'>
                    <Tab.Container>
                        <Card className='p-2'>
                            <SliderNavFlip>
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
                        </Card>
                        <div className='mt-2'>
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
        </div>
    )
}
