import { useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { BsInfoCircle, BsTrash } from 'react-icons/bs'
import { FaBuffer } from 'react-icons/fa'
import { clearToolbarActions, setActiveJunta, setToolbarTitle, useGetJuntaByIdQuery } from '../../../store/actions'
import { LoadingPage, ModuleNav } from '../../../components'
import { JuntaModuleAmbit, JuntaModuleBanner, JuntaModuleDelete, JuntaModuleInformation } from '../components'

export const JuntaActivePage = () => {

    const { juntaid } = useParams()
    const dispatch = useDispatch()
    const { data = null, isLoading, isError } = useGetJuntaByIdQuery(juntaid)
    const { active } = useSelector(state => state.junta)

    useEffect(() => {
        if (!!data) {
            dispatch(setActiveJunta(data))

            dispatch(clearToolbarActions())
            dispatch(setToolbarTitle('JUNTA DE USUARIOS'))
        }

        return () => {
            dispatch(setActiveJunta(null))
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
                                    id: 'infojunta',
                                    icon: BsInfoCircle,
                                    name: 'Información básica',
                                    title: true,
                                    module: JuntaModuleInformation
                                },
                                {
                                    id: 'ambitjunta',
                                    icon: FaBuffer,
                                    name: 'Ámbito',
                                    title: true,
                                    module: JuntaModuleAmbit
                                },
                                {
                                    id: 'deletejunta',
                                    icon: BsTrash,
                                    name: 'Eliminar junta',
                                    title: true,
                                    module: JuntaModuleDelete
                                }
                            ]
                        }
                    >
                        <JuntaModuleBanner />
                    </ModuleNav>
                </div>
            }
        </>
    )
}