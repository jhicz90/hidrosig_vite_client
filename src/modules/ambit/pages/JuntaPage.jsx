import { NavLink, Route, Routes, useParams } from 'react-router-dom'
import { AiFillNotification } from 'react-icons/ai'
import { IoEllipsisVertical } from 'react-icons/io5'
import { Button, Card, Dropdown, Tab } from 'react-bootstrap'
import { questionDeleteJunta, questionStatusJunta, useDeleteJuntaByIdMutation, useGetJuntaByIdQuery, useUpdateJuntaByIdMutation } from '../../../store/actions'
import { LoadingPage, SliderNavFlip } from '../../../components'
import { JuntaAmbitZone, JuntaBanner, JuntaInformation, JuntaAmbitWaterSource, JuntaAmbitCommittee } from '../components'
import { useNavigateState } from '../../../hooks'

export const JuntaPage = () => {

    const { juntaid } = useParams()
    const [state, redirect, redirectEscape] = useNavigateState('/app/ambit/orgz/junta')

    const { data = null, isLoading, isError } = useGetJuntaByIdQuery(juntaid)
    const [updateJunta, { isLoading: isSaving }] = useUpdateJuntaByIdMutation()
    const [deleteJunta] = useDeleteJuntaByIdMutation()

    const handleStatus = async (id, status, name) => {
        if (await questionStatusJunta(status, name)) {
            updateJunta({
                id,
                junta: { status }
            })
        }
    }

    const handleDelete = async (id, name) => {
        if (await questionDeleteJunta(name)) {
            deleteJunta(id)
        }
    }

    if (isLoading) {
        return <LoadingPage />
    }

    if (isError) {
        redirectEscape()
    }

    return (
        <>
            {
                !!data
                &&
                <div className='container'>
                    <div className='row'>
                        <div className='col-12'>
                            <div className='row align-items-center justify-content-between g-3 mb-3'>
                                <div className='col-12 col-md-auto'>
                                    <h4 className='mb-0'>Detalles de Junta</h4>
                                </div>
                                <div className='col-12 col-md-auto'>
                                    <div className='d-flex gap-2'>
                                        <Button variant='primary' className='d-flex align-items-center gap-2'>
                                            <AiFillNotification size={24} />
                                            Enviar notificación
                                        </Button>
                                        <Button
                                            onClick={() => handleStatus(juntaid, !data?.status, data?.name)}
                                            disabled={isSaving || isLoading}
                                            variant={data.status ? 'danger' : 'success'}
                                        >
                                            {data.status ? 'Desactivar' : 'Activar'}
                                        </Button>
                                        <Dropdown className='dropdown-noarrow'>
                                            <Dropdown.Toggle variant='neutral' className='d-flex align-items-center'>
                                                <IoEllipsisVertical size={24} />
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item>Reportes</Dropdown.Item>
                                                <Dropdown.Item>Imprimir</Dropdown.Item>
                                                <Dropdown.Item
                                                    onClick={() => handleDelete(juntaid, data?.name)}
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
                            <JuntaBanner />
                        </div>
                        <div className='col-md-7 col-lg-7 col-xl-8'>
                            <Tab.Container>
                                <Card className='p-2'>
                                    <SliderNavFlip>
                                        <NavLink to={``} end className={({ isActive }) => isActive ? 'btn btn-neutral active' : 'btn btn-neutral'}>Información</NavLink>
                                        <NavLink to={`zn`} className={({ isActive }) => isActive ? 'btn btn-neutral active' : 'btn btn-neutral'}>Zonas</NavLink>
                                        <NavLink to={`ws`} className={({ isActive }) => isActive ? 'btn btn-neutral active' : 'btn btn-neutral'}>Fuentes de agua</NavLink>
                                        <NavLink to={`comm`} className={({ isActive }) => isActive ? 'btn btn-neutral active' : 'btn btn-neutral'}>Comisiones</NavLink>
                                        {/* <Nav.Item className='keen-slider__slide'>
                                            <NavLink to={``} end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Información</NavLink>
                                        </Nav.Item>
                                        <Nav.Item className='keen-slider__slide'>
                                            <NavLink to={`zn`} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Zonas</NavLink>
                                        </Nav.Item>
                                        <Nav.Item className='keen-slider__slide'>
                                            <NavLink to={`ws`} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Fuentes de agua</NavLink>
                                        </Nav.Item>
                                        <Nav.Item className='keen-slider__slide'>
                                            <NavLink to={`comm`} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Comisiones</NavLink>
                                        </Nav.Item> */}
                                    </SliderNavFlip>
                                </Card>
                                <div className='mt-2'>
                                    <Routes>
                                        <Route index element={<JuntaInformation />} />
                                        <Route path={`zn`} element={<JuntaAmbitZone />} />
                                        <Route path={`ws`} element={<JuntaAmbitWaterSource />} />
                                        <Route path={`comm`} element={<JuntaAmbitCommittee />} />
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