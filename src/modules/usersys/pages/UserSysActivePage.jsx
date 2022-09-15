import { useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FaIdBadge, FaAddressCard, FaKey, FaLock, FaMobileAlt, FaRegTrashAlt } from 'react-icons/fa'
import { LoadingPage, ModuleNav } from '../../../components'
import { setActiveUserSys, startGetUserSys } from '../../../store/usersys'
import { UserSysModuleBanner } from '../components'

export const UserSysActivePage = () => {

    const { userid } = useParams()
    const dispatch = useDispatch()
    const { active } = useSelector(state => state.usersys)

    useEffect(() => {
        if (userid && userid !== '') dispatch(startGetUserSys(userid))
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
                                    icon: FaIdBadge,
                                    name: 'Portada',
                                    title: false,
                                    module: UserSysModuleBanner
                                },
                                // {
                                //     id: 'infousersys',
                                //     icon: FaAddressCard,
                                //     name: 'Información básica',
                                //     title: true,
                                //     module: UserSysInformationModule
                                // },
                                // {
                                //     id: 'accountusersys',
                                //     icon: FaKey,
                                //     name: 'Cuenta',
                                //     title: true,
                                //     module: UserSysAccountModule
                                // },
                                // {
                                //     id: 'securityusersys',
                                //     icon: FaLock,
                                //     name: 'Permisos y seguridad',
                                //     title: true,
                                //     module: UserSysSecurityModule
                                // },
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