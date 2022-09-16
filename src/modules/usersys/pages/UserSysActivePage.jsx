import { useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { BsKey, BsPersonBadge, BsShieldLock } from 'react-icons/bs'
import { FiUser } from 'react-icons/fi'
import { MdOutlineAlternateEmail } from 'react-icons/md'
import { LoadingPage, ModuleNav } from '../../../components'
import { setActiveUserSys, startAddNewUserSys, startGetUserSys } from '../../../store/usersys'
import { UserSysModuleBanner, UserSysModuleEmail, UserSysModuleInformation, UserSysModulePassword, UserSysModulePermission } from '../components'

export const UserSysActivePage = () => {

    const { userid } = useParams()
    const dispatch = useDispatch()
    const { active } = useSelector(state => state.usersys)

    useEffect(() => {
        if (userid === 'new') {
            dispatch(startAddNewUserSys())
        } else if (userid !== '') {
            dispatch(startGetUserSys(userid))
        }

        return () => dispatch(setActiveUserSys(null))
    }, [userid, dispatch])

    return (
        <>
            {
                !!active
                    ?
                    <div className='container'>
                        <ModuleNav
                            modules={[
                                {
                                    id: 'bannerusersys',
                                    icon: BsPersonBadge,
                                    name: 'Portada',
                                    title: false,
                                    module: UserSysModuleBanner
                                },
                                {
                                    id: 'infousersys',
                                    icon: FiUser,
                                    name: 'Información básica',
                                    title: true,
                                    module: UserSysModuleInformation
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
                                    name: 'Permisos y seguridad',
                                    title: true,
                                    module: UserSysModulePermission
                                },
                                // {
                                //     id: 'sessionusersys',
                                //     icon: FaMobileAlt,
                                //     name: 'Sesiones',
                                //     title: true,
                                //     module: UserSysSessionModule
                                // },
                                // {
                                //     id: 'deleteusersys',
                                //     icon: FaRegTrashAlt,
                                //     name: 'Eliminar',
                                //     title: true,
                                //     module: UserSysDelete
                                // },
                            ]}
                        />
                    </div>
                    :
                    <LoadingPage />
            }
        </>
    )
}