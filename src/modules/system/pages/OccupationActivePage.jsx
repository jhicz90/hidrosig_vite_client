import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { BsInfoCircle, BsTrash } from 'react-icons/bs'
import { FiBarChart2, FiUsers } from 'react-icons/fi'
import { clearToolbarActions, setActiveOccupation, setToolbarActions, setToolbarTitle, useGetOccupByIdQuery, } from '../../../store/actions'
import { LoadingPage, ModuleNav } from '../../../components'
import { OccupationModuleBanner, OccupationModuleDelete, OccupationModuleInformation, OccupationModuleLevel, OccupationModuleToUsers } from '../components'

export const OccupationActivePage = () => {

    const { occupid } = useParams()
    const dispatch = useDispatch()
    const { data = null, isLoading, isError } = useGetOccupByIdQuery(occupid)
    const { active } = useSelector(state => state.occupation)

    useEffect(() => {
        if (!!data) {
            dispatch(setActiveOccupation(data))

            dispatch(clearToolbarActions())
            dispatch(setToolbarTitle('OCUPACIÓN'))
            dispatch(setToolbarActions(
                <>
                    <button className='btn btn-neutral'>Agregar usuarios</button>
                </>
            ))
        }

        return () => {
            dispatch(setActiveOccupation(null))
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
                            modules={[
                                {
                                    id: 'infooccupation',
                                    icon: BsInfoCircle,
                                    name: 'Información básica',
                                    title: true,
                                    module: OccupationModuleInformation
                                },
                                {
                                    id: 'lvloccupation',
                                    icon: FiBarChart2,
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
                        >
                            <OccupationModuleBanner />
                        </ModuleNav>
                    </div>
            }
        </>
    )
}