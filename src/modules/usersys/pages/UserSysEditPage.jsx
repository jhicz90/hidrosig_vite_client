import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Navigate } from 'react-router'
import { FaIdBadge, FaAddressCard, FaKey, FaLock, FaMobileAlt, FaRegTrashAlt } from 'react-icons/fa'
import { removeActiveUserSys, startGetUserSys } from '../../../actions'
import { PageHeaderControl, LoadingPage,ModuleNav } from '../../../components'
import { UserSysAccountModule, UserSysBannerModule, UserSysDelete, UserSysInformationModule, UserSysSecurityModule, UserSysSessionModule } from '../components'

export const UserSysEditPage = () => {

    const { id } = useParams()
    const dispatch = useDispatch()
    const { active } = useSelector(state => state.usersys)

    useEffect(() => {
        if (id && id !== '') dispatch(startGetUserSys(id))
        return () => dispatch(removeActiveUserSys())
    }, [id, dispatch])

    return (
        <>
            <PageHeaderControl
                title={Object.keys(active).length === 0 ? 'Cargando...' : `${active.names} ${active.surnames}`}
                desc='Vista del usuario de sistema seleccionado'
            />
            {
                Object.keys(active).length === 0 ? <LoadingPage /> :
                    active.err === 'Error' ? <Navigate to={`/app/sys/user_sys`} replace /> :
                        <div className="container">
                            <ModuleNav
                                modules={[
                                    {
                                        id: 'bannerusersys',
                                        icon: FaIdBadge,
                                        name: 'Portada',
                                        title: false,
                                        module: UserSysBannerModule
                                    },
                                    {
                                        id: 'infousersys',
                                        icon: FaAddressCard,
                                        name: 'Información básica',
                                        title: true,
                                        module: UserSysInformationModule
                                    },
                                    {
                                        id: 'accountusersys',
                                        icon: FaKey,
                                        name: 'Cuenta',
                                        title: true,
                                        module: UserSysAccountModule
                                    },
                                    {
                                        id: 'securityusersys',
                                        icon: FaLock,
                                        name: 'Permisos y seguridad',
                                        title: true,
                                        module: UserSysSecurityModule
                                    },
                                    {
                                        id: 'sessionusersys',
                                        icon: FaMobileAlt,
                                        name: 'Sesiones',
                                        title: true,
                                        module: UserSysSessionModule
                                    },
                                    {
                                        id: 'deleteusersys',
                                        icon: FaRegTrashAlt,
                                        name: 'Eliminar',
                                        title: true,
                                        module: UserSysDelete
                                    },
                                ]}
                            />
                        </div>
            }
        </>
    )
}