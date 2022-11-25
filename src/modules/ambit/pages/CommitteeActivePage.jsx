import { useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { BsInfoCircle, BsTrash } from 'react-icons/bs'
import { FaBuffer } from 'react-icons/fa'
import { clearToolbarActions, setActiveCommittee, setToolbarTitle, useGetCommByIdQuery } from '../../../store/actions'
import { LoadingPage, ModuleNav } from '../../../components'
import { CommitteeModuleAmbit, CommitteeModuleBanner, CommitteeModuleDelete, CommitteeModuleInformation } from '../components'

export const CommitteeActivePage = () => {

    const { commid } = useParams()
    const dispatch = useDispatch()
    const { data = null, isLoading, isError } = useGetCommByIdQuery(commid)
    const { active } = useSelector(state => state.committee)

    useEffect(() => {
        if (!!data) {
            dispatch(setActiveCommittee(data))

            dispatch(clearToolbarActions())
            dispatch(setToolbarTitle('COMISIÓN DE USUARIOS'))
        }

        return () => {
            dispatch(setActiveCommittee(null))
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
                                    id: 'infocommittee',
                                    icon: BsInfoCircle,
                                    name: 'Información básica',
                                    title: true,
                                    module: CommitteeModuleInformation
                                },
                                {
                                    id: 'ambitcommittee',
                                    icon: FaBuffer,
                                    name: 'Ámbito',
                                    title: true,
                                    module: CommitteeModuleAmbit
                                },
                                {
                                    id: 'deletecommittee',
                                    icon: BsTrash,
                                    name: 'Eliminar comisión',
                                    title: true,
                                    module: CommitteeModuleDelete
                                }
                            ]
                        }
                    >
                        <CommitteeModuleBanner />
                    </ModuleNav>
                </div>
            }
        </>
    )
}