import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import validator from 'validator'
import { BsInfoCircle, BsTrash } from 'react-icons/bs'
import { FaImages } from 'react-icons/fa'
import { LoadingPage, ModuleNav } from '../../../components'
import { VoucherModuleBanner, VoucherModuleDelete, VoucherModuleImages, VoucherModuleInformation } from '../components'
import { clearToolbarActions, setActiveVoucher, setToolbarActions, startGetVoucher } from '../../../store/actions'

export const VoucherActivePage = () => {

    const { voucherid } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { active } = useSelector(state => state.voucher)

    useEffect(() => {
        if (validator.isMongoId(voucherid)) {
            dispatch(startGetVoucher(voucherid))
            dispatch(setToolbarActions(
                <>
                    <button className='btn btn-neutral'>Exportar</button>
                </>
            ))
        } else {
            navigate(-1)
        }

        return () => {
            dispatch(setActiveVoucher(null))
            dispatch(clearToolbarActions())
        }
    }, [voucherid, dispatch])

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
                    :
                    <LoadingPage />
            }
        </>
    )
}
