import { Link, useParams } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { MdOutlineNumbers } from 'react-icons/md'
import { HiArrowUturnLeft, HiCalendar, HiChatBubbleLeftRight, HiCurrencyDollar, HiPrinter, HiUser, HiUserCircle } from 'react-icons/hi2'
import { LoadingPage } from '../../../components'
import { FarmCollectList } from '..'
import { useGetUserFarmByIdQuery } from '../../../store/actions'
import { namesUserFarm, typeUserFarm } from '../../../helpers'

export const FeeCollectBillUserFarmPage = () => {

    const { usrid } = useParams()
    const { data = null, isLoading, isSuccess } = useGetUserFarmByIdQuery(usrid)

    if (isLoading) {
        return <LoadingPage />
    }

    return (
        isSuccess
        &&
        <div className='container-fluid'>
            <div className='d-lg-flex align-items-lg-center justify-content-lg-between my-3'>
                <div className='min-w-0 flex-1'>
                    <h4 className='mb-0 text-uppercase'>USUARIO AGRARIO: <div className='d-inline-block text-primary'>{namesUserFarm(data)}</div></h4>
                    <div className='mt-1 mt-sm-0 d-flex flex-column flex-sm-row gap-0 gap-sm-4'>
                        <div className='mt-2 d-flex align-items-center gap-1 text-muted'>
                            <MdOutlineNumbers size={20} />
                            {data.code}
                        </div>
                        <div className='mt-2 d-flex align-items-center gap-1 text-muted'>
                            <HiUserCircle size={20} />
                            {typeUserFarm(data.type)}
                        </div>
                        <div className='mt-2 d-flex align-items-center gap-1 text-muted'>
                            <HiCurrencyDollar size={20} />
                            2000.00
                        </div>
                        <div className='mt-2 d-flex align-items-center gap-1 text-muted'>
                            <HiCalendar size={20} />
                            Actualizado el 12 Junio, 2023
                        </div>
                    </div>
                </div>
                <div className='mt-3 ms-lg-5 mt-lg-0 d-flex gap-2 flex-wrap'>
                    <Link
                        to={`/app/coll/bill/search`}
                        className='btn btn-sm btn-neutral d-flex align-items-center gap-2'
                    >
                        <HiArrowUturnLeft />
                        Nueva busqueda
                    </Link>
                    <Button
                        variant='neutral'
                        size='sm'
                        className='d-flex align-items-center gap-2'
                    >
                        <HiUser />
                        Ver usuario
                    </Button>
                    <Button
                        variant='neutral'
                        size='sm'
                        className='d-flex align-items-center gap-2'
                    >
                        <HiChatBubbleLeftRight />
                        Enviar mensaje
                    </Button>
                    <Button
                        variant='primary'
                        size='sm'
                        className='d-flex align-items-center gap-2'
                    >
                        <HiPrinter />
                        Generar reporte
                    </Button>
                </div>
            </div>
            <div className='row'>
                <div className='col-12'>
                    <FarmCollectList />
                </div>
            </div>
        </div>
    )
}