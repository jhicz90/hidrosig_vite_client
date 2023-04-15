import { useEffect } from 'react'
import { Link, NavLink, Route, Routes, useParams } from 'react-router-dom'
import { Button, Card, Tab } from 'react-bootstrap'
import { IoReturnUpBack } from 'react-icons/io5'
import { LoadingPage, SliderNavFlip } from '../../../components'
import { VoucherBanner, VoucherImages, VoucherInformation } from '../components'
import { questionDeleteVoucher, useDeleteVoucherByIdMutation, useGetVoucherByIdQuery } from '../../../store/actions'
import { useNavigateState } from '../../../hooks'

export const VoucherPage = () => {

    const { voucherid } = useParams()
    const [redirect, redirectEscape] = useNavigateState('/app/acct/voucher')

    const { data = null, isLoading, isError } = useGetVoucherByIdQuery(voucherid)
    const [deleteVoucher] = useDeleteVoucherByIdMutation()

    const handleDelete = async (id, voucher) => {
        if (await questionDeleteVoucher(voucher)) {
            deleteVoucher(id)
        }
    }

    const handleBack = () => {
        redirect()
    }

    useEffect(() => {
        if (isError) {
            redirectEscape()
        }
    }, [isError])

    if (isLoading) {
        return <LoadingPage />
    }

    return (
        !!data
        &&
        <div className='container-fluid my-3'>
            <div className='row'>
                <div className='col-12'>
                    <div className='row align-items-center justify-content-between g-3 mb-3'>
                        <div className='col-12 col-md-auto'>
                            <h4 className='mb-0'>COMPROBANTE</h4>
                        </div>
                        <div className='col-12 col-md-auto'>
                            <div className='d-flex gap-2'>
                                <Link
                                    to={`/app/acct/petty_cash/${data?.pettycash?._id}/vch`}
                                    className='btn btn-neutral-secondary'
                                >
                                    <IoReturnUpBack size={24} />
                                    CAJA CHICA / COMPROBANTES
                                </Link>
                                <Button
                                    onClick={() => handleDelete(voucherid, data)}
                                    variant='danger'
                                >
                                    Eliminar
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col-12 col-lg-5 col-xl-3'>
                    <VoucherBanner />
                </div>
                <div className='col-12 col-lg-7 col-xl-9'>
                    <Tab.Container>
                        <Card className='p-2'>
                            <SliderNavFlip>
                                <NavLink to={``} end className={({ isActive }) => isActive ? 'btn btn-neutral active' : 'btn btn-neutral'}>Información</NavLink>
                                <NavLink to={`img`} className={({ isActive }) => isActive ? 'btn btn-neutral active' : 'btn btn-neutral'}>Images</NavLink>
                            </SliderNavFlip>
                        </Card>
                        <div className='mt-2'>
                            <Routes>
                                <Route index element={<VoucherInformation />} />
                                <Route path={`img`} element={<VoucherImages />} />
                            </Routes>
                        </div>
                    </Tab.Container>
                </div>
            </div>
        </div>
    )
}
