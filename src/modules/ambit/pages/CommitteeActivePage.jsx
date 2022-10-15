import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { BsInfoCircle } from 'react-icons/bs'
import validator from 'validator'
import { setActiveCommittee, startGetCommittee } from '../../../store/actions'
import { LoadingPage, ModuleNav } from '../../../components'
import { CommitteeModuleBanner, CommitteeModuleInformation } from '../components'

export const CommitteeActivePage = () => {

    const { commid } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { active } = useSelector(state => state.committee)

    useEffect(() => {
        if (validator.isMongoId(commid)) {
            dispatch(startGetCommittee(commid))
        } else {
            navigate(-1)
        }

        return () => dispatch(setActiveCommittee(null))
    }, [commid, dispatch])

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
                                        id: 'infocommittee',
                                        icon: BsInfoCircle,
                                        name: 'Información básica',
                                        title: true,
                                        module: CommitteeModuleInformation
                                    }
                                ]
                            }
                        >
                            <CommitteeModuleBanner />
                        </ModuleNav>
                    </div>
                    :
                    <LoadingPage />
            }
        </>
    )
}