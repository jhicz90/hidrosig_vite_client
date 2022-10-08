import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { BsKey, BsShieldLock, BsTrash } from 'react-icons/bs'
import { FiUser } from 'react-icons/fi'
import { MdOutlineAlternateEmail } from 'react-icons/md'
import validator from 'validator'
import { LoadingPage, ModuleNav } from '../../../components'
import { setActiveUserSys, startGetUserSys } from '../../../store/usersys'
import { UserSysModuleBanner, UserSysModuleEmail, UserSysModuleInformation, UserSysModulePassword, UserSysModuleRole, UserSysModuleDelete } from '../components'

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
                    :
                    <LoadingPage />
            }
        </>
    )
}