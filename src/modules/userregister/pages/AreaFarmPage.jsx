import { useEffect } from 'react'
import { Link, NavLink, Route, Routes, useParams } from 'react-router-dom'
import { Button, Card, Dropdown, Tab } from 'react-bootstrap'
import { AiFillNotification } from 'react-icons/ai'
import { IoEllipsisVertical, IoReturnUpBack } from 'react-icons/io5'
import { AreaFarmAdditionalData, AreaFarmAreaGeometry, AreaFarmBanner, AreaFarmImages, AreaFarmInformation, AreaFarmListHolder, AreaFarmWaterIn } from '../components'
import { LoadingPage, SliderNavFlip } from '../../../components'
import { useNavigateState } from '../../../hooks'
import { questionActiveFarm, questionDeleteFarm, useDeleteFarmByIdMutation, useGetFarmByIdQuery, useUpdateFarmByIdMutation } from '../../../store/actions'

export const AreaFarmPage = () => {

    const { prpid } = useParams()
    const [redirect, redirectEscape] = useNavigateState('/app/user_reg/user_farm/prps')

    const { data = null, isLoading, isError } = useGetFarmByIdQuery(prpid)
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
            </div>
            <div className='row'>
                <div className='col-12 col-lg-5 col-xl-3'>
                    <AreaFarmBanner />
                </div>
                <div className='col-12 col-lg-7 col-xl-9'>
                    <Tab.Container>
                        <Card className='p-2'>
                            <SliderNavFlip>
                                <NavLink to={``} end className={({ isActive }) => isActive ? 'btn btn-neutral active' : 'btn btn-neutral'}>Información</NavLink>
                                <NavLink to={`area`} className={({ isActive }) => isActive ? 'btn btn-neutral active' : 'btn btn-neutral'}>Superficie</NavLink>
                                <NavLink to={`win`} className={({ isActive }) => isActive ? 'btn btn-neutral active' : 'btn btn-neutral'}>Tomas de agua</NavLink>
                                <NavLink to={`sw`} className={({ isActive }) => isActive ? 'btn btn-neutral active' : 'btn btn-neutral'}>Drenaje</NavLink>
                                <NavLink to={`vol`} className={({ isActive }) => isActive ? 'btn btn-neutral active' : 'btn btn-neutral'}>Volumen</NavLink>
                                <NavLink to={`hld`} className={({ isActive }) => isActive ? 'btn btn-neutral active' : 'btn btn-neutral'}>Titulares</NavLink>
                                <NavLink to={`img`} className={({ isActive }) => isActive ? 'btn btn-neutral active' : 'btn btn-neutral'}>Imagenes</NavLink>
                                <NavLink to={`add`} className={({ isActive }) => isActive ? 'btn btn-neutral active' : 'btn btn-neutral'}>Datos adicionales</NavLink>
                            </SliderNavFlip>
                        </Card>
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
                    </Tab.Container>
                </div>
            </div>
        </div>
    )
}
