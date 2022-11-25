import { useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { BsInfoCircle, BsShieldLock, BsTrash } from 'react-icons/bs'
import { RiShieldUserLine } from 'react-icons/ri'
import { FaBuffer } from 'react-icons/fa'
import { clearToolbarActions, setActiveRole, setToolbarActions, setToolbarTitle, useGetRoleByIdQuery } from '../../../store/actions'
import { LoadingPage, ModuleNav } from '../../../components'
import { CreateModule, CreatePermission, RoleModuleBanner, RoleModuleDelete, RoleModuleInformation, RoleModuleLevel, RoleModuleModuleAccess, RoleModulePermissions } from '../components'

export const RoleActivePage = () => {

    const { roleid } = useParams()
    const dispatch = useDispatch()
    const { data = null, isLoading, isError } = useGetRoleByIdQuery(roleid)
    const { active } = useSelector(state => state.role)

    useEffect(() => {
        if (!!data) {
            dispatch(setActiveRole(data))

            dispatch(clearToolbarActions())
            dispatch(setToolbarTitle('ROL DE USUARIO'))
            dispatch(setToolbarActions(
                <>
                    <CreatePermission />
                    <CreateModule />
                </>
            ))
        }

        return () => {
            dispatch(setActiveRole(null))
            dispatch(clearToolbarActions())
        }
    }, [data])

    if (isLoading) {
        return <LoadingPage />
    }

    if (isError) {
        return <Navigate to={-1} />
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
                                    id: 'inforole',
                                    icon: BsInfoCircle,
                                    name: 'Información básica',
                                    title: true,
                                    module: RoleModuleInformation
                                },
                                {
                                    id: 'lvlrole',
                                    icon: RiShieldUserLine,
                                    name: 'Nivel de rol',
                                    title: true,
                                    module: RoleModuleLevel
                                },
                                {
                                    id: 'permsrole',
                                    icon: BsShieldLock,
                                    name: 'Permisos',
                                    title: true,
                                    module: RoleModulePermissions
                                },
                                {
                                    id: 'modulerole',
                                    icon: FaBuffer,
                                    name: 'Módulos',
                                    title: true,
                                    module: RoleModuleModuleAccess
                                },
                                {
                                    id: 'deleterole',
                                    icon: BsTrash,
                                    name: 'Eliminar',
                                    title: true,
                                    module: RoleModuleDelete
                                },
                            ]

                        }
                    >
                        <RoleModuleBanner />
                    </ModuleNav>
                </div>
            }
        </>
    )
}