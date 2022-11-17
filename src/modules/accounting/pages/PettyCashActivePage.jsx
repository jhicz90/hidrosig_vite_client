import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useParams } from 'react-router-dom'
import { BsInfoCircle, BsReceipt, BsTrash } from 'react-icons/bs'
import { clearToolbarActions, setActivePettycash, setToolbarActions, setToolbarTitle, startGetPettycash, useGetPettyCashIdQuery } from '../../../store/actions'
import { LoadingPage, ModuleNav } from '../../../components'
import { CreateVoucher, PettyCashModuleBanner, PettyCashModuleDelete, PettyCashModuleInformation, PettyCashModuleVouchers } from '../components'

export const PettyCashActivePage = () => {

    const { pettycashid } = useParams()
    const dispatch = useDispatch()
    const { data = null, isLoading, isError } = useGetPettyCashIdQuery(pettycashid)
    const { active } = useSelector(state => state.pettycash)

    useEffect(() => {
        if (!!data) {
            dispatch(setActivePettycash(data))

            dispatch(clearToolbarActions())
            dispatch(setToolbarTitle('CAJA CHICA'))
            dispatch(setToolbarActions(
                <>
                    <CreateVoucher pettycash={data} />
                </>
            ))
        }

        return () => {
            dispatch(setActivePettycash(null))
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
                                {
                                    id: 'deletepettycash',
                                    icon: BsTrash,
                                    name: 'Eliminar caja chica',
                                    title: true,
                                    module: PettyCashModuleDelete
                                }
                            ]
                        }
                    >
                        <PettyCashModuleBanner />
                    </ModuleNav>
                </div>
            }
        </>
    )
}
