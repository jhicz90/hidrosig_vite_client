import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { BsInfoCircle, BsReceipt } from 'react-icons/bs'
import validator from 'validator'
import { setActivePettycash, startGetPettycash } from '../../../store/actions'
import { LoadingPage, ModuleNav } from '../../../components'
import { PettyCashModuleBanner, PettyCashModuleInformation, PettyCashModuleVouchers } from '../components'

export const PettyCashActivePage = () => {

    const { pettycashid } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { active } = useSelector(state => state.pettycash)

    useEffect(() => {
        if (validator.isMongoId(pettycashid)) {
            dispatch(startGetPettycash(pettycashid))
        } else {
            navigate(-1)
        }

        return () => dispatch(setActivePettycash(null))
    }, [pettycashid, dispatch])

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
                                        id: 'infopettycash',
                                        icon: BsInfoCircle,
                                        name: 'Información básica',
                                        title: true,
                                        module: PettyCashModuleInformation
                                    },
                                    {
                                        id: 'voucherpettycash',
                                        icon: BsReceipt,
                                        name: 'Comprobantes',
                                        title: true,
                                        module: PettyCashModuleVouchers
                                    },
                                    // {
                                    //     id: 'deletepettycash',
                                    //     icon: BsTrash,
                                    //     name: 'Eliminar comisión',
                                    //     title: true,
                                    //     module: CommitteeModuleDelete
                                    // }
                                ]
                            }
                        >
                            <PettyCashModuleBanner />
                        </ModuleNav>
                    </div>
                    :
                    <LoadingPage />
            }
        </>
    )
}