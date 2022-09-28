import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { BsFillEyeFill, BsInfoCircle, BsTrash } from 'react-icons/bs'
import { FiUsers } from 'react-icons/fi'
import { RiShieldUserLine } from 'react-icons/ri'
import validator from 'validator'
import { LoadingPage, ModuleNav } from '../../../components'
import { setActiveRole, startGetRole } from '../../../store/role'
import { RoleModuleBanner, RoleModuleInformation, RoleModuleLevel } from '../components'

export const RoleActivePage = () => {

    const { roleid } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { active } = useSelector(state => state.role)

    useEffect(() => {
        if (validator.isMongoId(roleid)) {
            dispatch(startGetRole(roleid))
        } else {
            navigate(-1)
        }

        return () => dispatch(setActiveRole(null))
    }, [roleid, dispatch])

    return (
        <>
            {
                !!active
                    ?
                    <div className='container'>
                        <ModuleNav
                            modules={[
                                {
                                    id: 'bannerrole',
                                    icon: BsFillEyeFill,
                                    name: 'Inicio',
                                    title: false,
                                    module: RoleModuleBanner
                                },
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
                                // {
                                //     id: 'tousersrole',
                                //     icon: FiUsers,
                                //     name: 'Usuarios',
                                //     title: true,
                                //     module: OccupationModuleToUsers
                                // },
                                // {
                                //     id: 'deleterole',
                                //     icon: BsTrash,
                                //     name: 'Eliminar ocupación',
                                //     title: true,
                                //     module: OccupationModuleDelete
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