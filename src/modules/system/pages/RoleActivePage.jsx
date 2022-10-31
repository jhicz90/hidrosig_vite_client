import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { BsInfoCircle, BsShieldLock, BsTrash } from 'react-icons/bs'
import { RiShieldUserLine } from 'react-icons/ri'
import { FaBuffer } from 'react-icons/fa'
import validator from 'validator'
import { clearToolbarActions, setActiveRole, setToolbarActions, startGetRole } from '../../../store/actions'
import { LoadingPage, ModuleNav } from '../../../components'
import { CreateModule, CreatePermission, CreateRole, RoleModuleBanner, RoleModuleDelete, RoleModuleInformation, RoleModuleLevel, RoleModuleModuleAccess, RoleModulePermissions } from '../components'

export const RoleActivePage = () => {

    const { roleid } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { active } = useSelector(state => state.role)

    useEffect(() => {
        if (validator.isMongoId(roleid)) {
            dispatch(startGetRole(roleid))
            dispatch(setToolbarActions(
                <>
                    <CreatePermission />
                    <CreateModule />
                </>
            ))
        } else {
            navigate(-1)
        }

        return () => {
            dispatch(setActiveRole(null))
            dispatch(clearToolbarActions())
        }
    }, [roleid, dispatch])

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
                    :
                    <LoadingPage />
            }
        </>
    )
}