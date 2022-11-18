import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useParams } from 'react-router-dom'
import { BsInfoCircle, BsTrash } from 'react-icons/bs'
import { FaImages } from 'react-icons/fa'
import { LoadingPage, ModuleNav } from '../../../components'
import { VoucherModuleBanner, VoucherModuleDelete, VoucherModuleImages, VoucherModuleInformation } from '../components'
import { clearToolbarActions, setActiveVoucher, setToolbarActions, setToolbarTitle, useGetVoucherByIdQuery } from '../../../store/actions'

export const VoucherActivePage = () => {

    const { voucherid } = useParams()
    const dispatch = useDispatch()
    const { data = null, isLoading, isError } = useGetVoucherByIdQuery(voucherid)
    const { active } = useSelector(state => state.voucher)

    useEffect(() => {
        if (!!data) {
            dispatch(setActiveVoucher(data))

            dispatch(clearToolbarActions())
            dispatch(setToolbarTitle('COMPROBANTE'))
            dispatch(setToolbarActions(
                <>
                    <button className='btn btn-neutral'>Exportar</button>
                </>
            ))
        }

        return () => {
            dispatch(setActiveVoucher(null))
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
                                    id: 'infovoucher',
                                    icon: BsInfoCircle,
                                    name: 'Información básica',
                                    title: true,
                                    module: VoucherModuleInformation
                                },
                                {
                                    id: 'imagesvoucher',
                                    icon: FaImages,
                                    name: 'Imagenes',
                                    title: true,
                                    module: VoucherModuleImages
                                },
                                {
                                    id: 'deletevoucher',
                                    icon: BsTrash,
                                    name: 'Eliminar comprobante',
                                    title: true,
                                    module: VoucherModuleDelete
                                }
                            ]
                        }
                    >
                        <VoucherModuleBanner />
                    </ModuleNav>
                </div>
            }
        </>
    )
}
