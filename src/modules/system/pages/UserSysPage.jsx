import { useEffect } from 'react'
import { Link, NavLink, Route, Routes, useParams } from 'react-router-dom'
import { Button, Card, Dropdown, Tab } from 'react-bootstrap'
import { IoEllipsisVertical, IoLogoWhatsapp, IoReturnUpBack } from 'react-icons/io5'
import { useNavigateState } from '../../../hooks'
import { LoadingPage, SliderNavFlip } from '../../../components'
import { UserSysBanner, UserSysEmailAndPassword, UserSysInformation, UserSysNotify, UserSysRole } from '../components'
import { questionStatusUserSys, questionDeleteUserSys, useDeleteUserSysByIdMutation, useGetUserSysByIdQuery, useUpdateUserSysByIdMutation } from '../../../store/actions'

export const UserSysPage = () => {

    const { userid } = useParams()
    const [redirect, redirectEscape] = useNavigateState('/app/sys/user_sys/users')

    const { data = null, isLoading, isError } = useGetUserSysByIdQuery(userid)
    const [updateUserSys, { isLoading: isSaving }] = useUpdateUserSysByIdMutation()
    const [deleteUserSys] = useDeleteUserSysByIdMutation()

    const handleActive = async (id, usersys) => {
        if (await questionStatusUserSys(usersys)) {
            updateUserSys({
                id,
                usersys: { status: !usersys.status }
            })
        }
    }

    const handleDelete = async (id, usersys) => {
        if (await questionDeleteUserSys(usersys)) {
            deleteUserSys(id).unwrap().then(() => {
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
                            <h4 className='mb-0'>USUARIO DE SISTEMA</h4>
                        </div>
                        <div className='col-12 col-md-auto'>
                            <div className='d-flex gap-2'>
                                <Link
                                    to={`/app/sys/user_sys/users`}
                                    className='btn btn-neutral-secondary'
                                >
                                    <IoReturnUpBack size={24} />
                                    LISTA USUARIOS
                                </Link>
                                <Button variant='success' className='d-flex align-items-center gap-2'>
                                    <IoLogoWhatsapp size={24} />
                                    Enviar mensaje
                                </Button>
                                {
                                    data.role !== null
                                    &&
                                    <Button
                                        onClick={() => handleActive(userid, data)}
                                        disabled={isSaving || isLoading}
                                        variant={data.status ? 'danger' : 'success'}
                                    >
                                        {data.status ? 'Desactivar' : 'Activar'}
                                    </Button>
                                }
                                <Dropdown className='dropdown-noarrow'>
                                    <Dropdown.Toggle variant='neutral' className='d-flex align-items-center'>
                                        <IoEllipsisVertical size={24} />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item>Reportes</Dropdown.Item>
                                        <Dropdown.Item>Imprimir</Dropdown.Item>
                                        <Dropdown.Item
                                            onClick={() => handleDelete(userid, data)}
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
                    <UserSysBanner />
                </div>
                <div className='col-12 col-lg-7 col-xl-9'>
                    <Tab.Container>
                        <Card className='p-2'>
                            <SliderNavFlip>
                                <NavLink to={``} end className={({ isActive }) => isActive ? 'btn btn-neutral active' : 'btn btn-neutral'}>Información</NavLink>
                                <NavLink to={`pass`} className={({ isActive }) => isActive ? 'btn btn-neutral active' : 'btn btn-neutral'}>Correo y contraseña</NavLink>
                                <NavLink to={`role`} className={({ isActive }) => isActive ? 'btn btn-neutral active' : 'btn btn-neutral'}>Roles y permisos</NavLink>
                                <NavLink to={`ntfy`} className={({ isActive }) => isActive ? 'btn btn-neutral active' : 'btn btn-neutral'}>Notificaciones</NavLink>
                                {/* <NavLink to={`add`} className={({ isActive }) => isActive ? 'btn btn-neutral active' : 'btn btn-neutral'}>Datos adicionales</NavLink> */}
                            </SliderNavFlip>
                        </Card>
                        <div className='mt-2'>
                            <Routes>
                                <Route index element={<UserSysInformation />} />
                                <Route path={`pass`} element={<UserSysEmailAndPassword />} />
                                <Route path={`role`} element={<UserSysRole />} />
                                <Route path={`ntfy`} element={<UserSysNotify />} />
                                {/* <Route path={`add`} element={<UserFarmAdditionalData />} /> */}
                            </Routes>
                        </div>
                    </Tab.Container>
                </div>
            </div>
        </div>
    )
}