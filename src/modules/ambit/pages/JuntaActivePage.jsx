import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { BsInfoCircle, BsTrash } from 'react-icons/bs'
import { FaBuffer } from 'react-icons/fa'
import validator from 'validator'
import { setActiveJunta, startGetJunta } from '../../../store/actions'
import { LoadingPage, ModuleNav } from '../../../components'
import { JuntaModuleAmbit, JuntaModuleBanner, JuntaModuleDelete, JuntaModuleInformation } from '../components'

export const JuntaActivePage = () => {

    const { juntaid } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { active } = useSelector(state => state.junta)

    useEffect(() => {
        if (validator.isMongoId(juntaid)) {
            dispatch(startGetJunta(juntaid))
        } else {
            navigate(-1)
        }

        return () => dispatch(setActiveJunta(null))
    }, [juntaid, dispatch])

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
                    :
                    <LoadingPage />
            }
        </>
    )
}