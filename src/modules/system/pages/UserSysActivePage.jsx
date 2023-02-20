import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { BsKey, BsShieldLock, BsTrash } from 'react-icons/bs'
import { FiUser } from 'react-icons/fi'
import { MdOutlineAlternateEmail } from 'react-icons/md'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { LinkBack, LoadingPage, ModuleNav } from '../../../components'
import { clearToolbarActions, setActiveUserSys, setToolbarActions, setToolbarTitle, useGetUsrSysByIdQuery } from '../../../store/actions'
import { UserSysModuleBanner, UserSysModuleEmail, UserSysModuleInformation, UserSysModulePassword, UserSysModuleRole, UserSysModuleDelete, CreateOccupation, UserSysModuleNotify } from '../components'
import { useNavigateState } from '../../../hooks'

export const UserSysActivePage = () => {

    const { userid } = useParams()
    const [state, redirect, redirectEscape] = useNavigateState('/app/sys/user_sys')

    const dispatch = useDispatch()
    const { data = null, isLoading, isError } = useGetUsrSysByIdQuery(userid)
    const { active } = useSelector(state => state.usersys)

    useEffect(() => {
        if (!!data) {
            dispatch(setActiveUserSys(data))

            dispatch(clearToolbarActions())
            dispatch(setToolbarTitle('USUARIO'))
            dispatch(setToolbarActions(
                <>
                    <LinkBack className='btn btn-neutral text-primary' to={`?w=usersys_create&id=new`} >Nuevo usuario</LinkBack>
                    <LinkBack className='btn btn-neutral text-primary' to={`?w=occupation_create&id=new`} >Nueva ocupación</LinkBack>
                </>
            ))
        }

        return () => {
            dispatch(setActiveUserSys(null))
            dispatch(clearToolbarActions())
        }
    }, [data])

    if (isLoading) {
        return <LoadingPage />
    }

    if (isError) {
        redirectEscape()
    }

    return (
        <>
            {
                !!active
                &&
                <div className='container'>
                    <ModuleNav
                        modules={
                            [
                                {
                                    id: 'infousersys',
                                    icon: FiUser,
                                    name: 'Información básica',
                                    title: true,
                                    module: UserSysModuleInformation
                                },
                                {
                                    id: 'notifyusersys',
                                    icon: IoMdNotificationsOutline,
                                    name: 'Notificaciones',
                                    title: true,
                                    module: UserSysModuleNotify
                                },
                                {
                                    id: 'emailusersys',
                                    icon: MdOutlineAlternateEmail,
                                    name: 'Correo',
                                    title: true,
                                    module: UserSysModuleEmail
                                },
                                {
                                    id: 'passwordusersys',
                                    icon: BsKey,
                                    name: 'Contraseña',
                                    title: true,
                                    module: UserSysModulePassword
                                },
                                {
                                    id: 'permissionusersys',
                                    icon: BsShieldLock,
                                    name: 'Roles del usuario',
                                    title: true,
                                    module: UserSysModuleRole
                                },
                                // {
                                //     id: 'sessionusersys',
                                //     icon: FaMobileAlt,
                                //     name: 'Sesiones',
                                //     title: true,
                                //     module: UserSysSessionModule
                                // },
                                {
                                    id: 'deleteusersys',
                                    icon: BsTrash,
                                    name: 'Eliminar cuenta',
                                    title: true,
                                    module: UserSysModuleDelete
                                },
                            ]
                        }
                    >
                        <UserSysModuleBanner />
                    </ModuleNav>
                </div>
            }
        </>
    )
}