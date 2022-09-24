import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { BsFillEyeFill, BsInfoCircle, BsTrash } from 'react-icons/bs'
import { FiUsers } from 'react-icons/fi'
import { RiShieldUserLine } from 'react-icons/ri'
import validator from 'validator'
import { LoadingPage, ModuleNav } from '../../../components'
import { setActiveOccupation, startGetOccupation, } from '../../../store/occupation'
import { OccupationModuleBanner, OccupationModuleDelete, OccupationModuleInformation, OccupationModuleLevel, OccupationModuleToUsers } from '../components'

export const OccupationActivePage = () => {

    const { occupid } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { active } = useSelector(state => state.occupation)

    useEffect(() => {
        if (validator.isMongoId(occupid)) {
            dispatch(startGetOccupation(occupid))
        } else {
            navigate(-1)
        }

        return () => dispatch(setActiveOccupation(null))
    }, [occupid, dispatch])

    return (
        <>
            {
                !!active
                    ?
                    <div className='container'>
                        <ModuleNav
                            modules={[
                                {
                                    id: 'banneroccupation',
                                    icon: BsFillEyeFill,
                                    name: 'Inicio',
                                    title: false,
                                    module: OccupationModuleBanner
                                },
                                {
                                    id: 'infooccupation',
                                    icon: BsInfoCircle,
                                    name: 'Información básica',
                                    title: true,
                                    module: OccupationModuleInformation
                                },
                                {
                                    id: 'lvloccupation',
                                    icon: RiShieldUserLine,
                                    name: 'Nivel de ocupación',
                                    title: true,
                                    module: OccupationModuleLevel
                                },
                                {
                                    id: 'tousersoccupation',
                                    icon: FiUsers,
                                    name: 'Usuarios',
                                    title: true,
                                    module: OccupationModuleToUsers
                                },
                                {
                                    id: 'deleteoccupation',
                                    icon: BsTrash,
                                    name: 'Eliminar ocupación',
                                    title: true,
                                    module: OccupationModuleDelete
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