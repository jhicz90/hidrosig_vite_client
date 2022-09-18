import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { BsKey, BsPersonBadge, BsShieldLock, BsTrash } from 'react-icons/bs'
import { FiUser } from 'react-icons/fi'
import { MdOutlineAlternateEmail } from 'react-icons/md'
import validator from 'validator'
import { LoadingPage, ModuleNav } from '../../../components'
import { setActiveUserSys, startGetUserSys } from '../../../store/usersys'
import { UserSysModuleBanner, UserSysModuleEmail, UserSysModuleInformation, UserSysModulePassword, UserSysModulePermission, UserSysModuleDelete } from '../components'

export const UserSysActivePage = () => {

    const { userid } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { active } = useSelector(state => state.usersys)

    useEffect(() => {
        if (validator.isMongoId(userid)) {
            dispatch(startGetUserSys(userid))
        } else {
            navigate(-1)
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
                                {
                                    id: 'deleteusersys',
                                    icon: BsTrash,
                                    name: 'Eliminar cuenta',
                                    title: true,
                                    module: UserSysModuleDelete
                                },
                            ]}
                        />
                    </div>
                    :
                    <LoadingPage />
            }
        </>
    )
}