import { useEffect } from 'react'
import { Link, NavLink, Route, Routes, useParams } from 'react-router-dom'
import { Card, Dropdown, Tab } from 'react-bootstrap'
import { IoEllipsisVertical, IoReturnUpBack } from 'react-icons/io5'
import { useNavigateState } from '../../../hooks'
import { LoadingPage, SliderNavFlip } from '../../../components'
import { ZoneAreaGeometry, ZoneBanner, ZoneInformation } from '../components'
import { questionDeleteZone, useDeleteZoneByIdMutation, useGetZoneByIdQuery } from '../../../store/actions'

export const ZonePage = () => {

    const { znid } = useParams()
    const [redirect, redirectEscape] = useNavigateState('/app/ambit/trrty/zone')

    const { data = null, isLoading, isError } = useGetZoneByIdQuery(znid)
    const [deleteZone] = useDeleteZoneByIdMutation()

    const handleDelete = async (id, name) => {
        if (await questionDeleteZone(name)) {
            deleteZone(id).unwrap().then(() => {
                redirect()
            })
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
        <div className='container-fluid'>
            <div className='row my-3'>
                <div className='col-12'>
                    <div className='row align-items-center justify-content-between g-3'>
                        <div className='col-12 col-md-auto'>
                            <h4 className='mb-0'>ZONA</h4>
                        </div>
                        <div className='col-12 col-md-auto'>
                            <div className='d-flex gap-2'>
                                <Link
                                    to={`/app/ambit/trrty/zone`}
                                    className='btn btn-neutral-secondary'
                                >
                                    <IoReturnUpBack size={24} />
                                    LISTA ZONAS
                                </Link>
                                <Dropdown className='dropdown-noarrow'>
                                    <Dropdown.Toggle variant='neutral' className='d-flex align-items-center'>
                                        <IoEllipsisVertical size={24} />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item>Reportes</Dropdown.Item>
                                        <Dropdown.Item>Imprimir</Dropdown.Item>
                                        <Dropdown.Item
                                            onClick={() => handleDelete(znid, data?.name)}
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
                <div className='col-12 col-lg-5 col-xl-3'>
                    <ZoneBanner />
                </div>
                <div className='col-12 col-lg-7 col-xl-9'>
                    <Tab.Container>
                        <Card className='p-2'>
                            <SliderNavFlip>
                                <NavLink to={``} end className={({ isActive }) => isActive ? 'btn btn-neutral active' : 'btn btn-neutral'}>Información</NavLink>
                                <NavLink to={`area`} className={({ isActive }) => isActive ? 'btn btn-neutral active' : 'btn btn-neutral'}>Zona geográfica</NavLink>
                            </SliderNavFlip>
                        </Card>
                        <div className='mt-2'>
                            <Routes>
                                <Route index element={<ZoneInformation />} />
                                <Route path={`area`} element={<ZoneAreaGeometry />} />
                            </Routes>
                        </div>
                    </Tab.Container>
                </div>
            </div>
        </div>
    )
}
