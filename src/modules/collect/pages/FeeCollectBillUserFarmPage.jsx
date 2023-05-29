import { Link, Outlet, useParams } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { AiFillNotification } from 'react-icons/ai'
import { IoReturnUpBack } from 'react-icons/io5'
import { LoadingPage } from '../../../components'
import { useGetUserFarmByIdQuery } from '../../../store/actions'
import { CollectBanner } from '..'

export const FeeCollectBillUserFarmPage = () => {

    const { usrid } = useParams()
    const { data = null, isLoading } = useGetUserFarmByIdQuery(usrid)

    if (isLoading) {
        return <LoadingPage />
    }

    return (
        !!data
        &&
        <div className='container-fluid'>
            <div className='row my-3'>
                <div className='col-12'>
                    <div className='row align-items-center justify-content-between g-3'>
                        <div className='col-12 col-md-auto'>
                            <h4 className='mb-0 text-uppercase'>{data.names} {data.lastName} {data.motherLastName}</h4>
                        </div>
                        <div className='col-12 col-md-auto'>
                            <div className='d-flex gap-2'>
                                <Link
                                    to={`/app/coll/bill/search`}
                                    className='btn btn-neutral-secondary'
                                >
                                    <IoReturnUpBack size={24} />
                                    NUEVA BUSQUEDA
                                </Link>
                                <Button variant='primary' className='d-flex align-items-center gap-2'>
                                    <AiFillNotification size={24} />
                                    Enviar notificación
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col-12 col-lg-5 col-xl-3'>
                    <CollectBanner />
                </div>
                <div className='col-12 col-lg-7 col-xl-9'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}