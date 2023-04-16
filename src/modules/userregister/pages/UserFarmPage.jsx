import { useEffect } from 'react'
import { Link, NavLink, Route, Routes, useParams } from 'react-router-dom'
import { AiFillNotification, AiOutlineWhatsApp } from 'react-icons/ai'
import { IoEllipsisVertical, IoReturnUpBack } from 'react-icons/io5'
import { Button, Card, Dropdown, Tab } from 'react-bootstrap'
import { LoadingPage, SliderNavFlip } from '../../../components'
import { UserFarmAdditionalData, UserFarmBanner, UserFarmInformation, UserFarmListAreaFarm, UserFarmListDocument } from '../components'
import { useNavigateState } from '../../../hooks'
import { questionActiveUserFarm, questionDeleteUserFarm, useDeleteUserFarmByIdMutation, useGetUserFarmByIdQuery, useUpdateUserFarmByIdMutation } from '../../../store/actions'

export const UserFarmPage = () => {

    const { userid } = useParams()
    const [redirect, redirectEscape] = useNavigateState('/app/user_reg/user_farm/users')

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
                            <h4 className='mb-0'>USUARIO AGRARIO</h4>
                        </div>
                        <div className='col-12 col-md-auto'>
                            <div className='d-flex gap-2'>
                                <Link
                                    to={`/app/user_reg/user_farm/users`}
                                    className='btn btn-neutral-secondary'
                                >
                                    <IoReturnUpBack size={24} />
                                    LISTA USUARIOS
                                </Link>
                                <Button variant='success' className='d-flex align-items-center gap-2'>
                                    <AiOutlineWhatsApp size={24} />
                                    Enviar mensaje
                                </Button>
                                <Button variant='primary' className='d-flex align-items-center gap-2'>
                                    <AiFillNotification size={24} />
                                    Generar notificación
                                </Button>
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
            </div>
            <div className='row'>
                <div className='col-12 col-lg-5 col-xl-3'>
                    <UserFarmBanner />
                </div>
                <div className='col-12 col-lg-7 col-xl-9'>
                    <Tab.Container>
                        <Card className='p-2'>
                            <SliderNavFlip>
                                <NavLink to={``} end className={({ isActive }) => isActive ? 'btn btn-neutral active' : 'btn btn-neutral'}>Información</NavLink>
                                <NavLink to={`prp`} className={({ isActive }) => isActive ? 'btn btn-neutral active' : 'btn btn-neutral'}>Predios</NavLink>
                                <NavLink to={`doc`} className={({ isActive }) => isActive ? 'btn btn-neutral active' : 'btn btn-neutral'}>Documentos</NavLink>
                                <NavLink to={`msg`} className={({ isActive }) => isActive ? 'btn btn-neutral active' : 'btn btn-neutral'}>Mensajes</NavLink>
                                <NavLink to={`add`} className={({ isActive }) => isActive ? 'btn btn-neutral active' : 'btn btn-neutral'}>Datos adicionales</NavLink>
                            </SliderNavFlip>
                        </Card>
                        <div className='mt-2'>
                            <Routes>
                                <Route index element={<UserFarmInformation />} />
                                <Route path={`prp`} element={<UserFarmListAreaFarm />} />
                                <Route path={`doc`} element={<UserFarmListDocument />} />
                                {/* <Route path={`comm`} element={<JuntaAmbitCommittee />} /> */}
                                <Route path={`add`} element={<UserFarmAdditionalData />} />
                            </Routes>
                        </div>
                    </Tab.Container>
                </div>
            </div>
        </div>
    )
}
