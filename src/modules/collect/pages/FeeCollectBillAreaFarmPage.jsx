import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { HiSwitchHorizontal } from 'react-icons/hi'
import { HiArrowUturnLeft, HiCalendar, HiCurrencyDollar, HiMap, HiPrinter, HiQueueList } from 'react-icons/hi2'
import moment from 'moment'
import { AreaFarmListCampaign, FeeCollectAreaFarmNavPage } from '..'
import { LoadingPage } from '@/components'
import { useGetFarmByIdQuery } from '@/store/actions'

export const FeeCollectBillAreaFarmPage = () => {

    const { usrid, prpid } = useParams()
    const { data = null, isLoading, isSuccess } = useGetFarmByIdQuery(prpid)

    if (isLoading) {
        return <LoadingPage />
    }

    return (
        isSuccess
        &&
        <div className='container-fluid'>
            <div className='d-lg-flex align-items-lg-center justify-content-lg-between my-3'>
                <div className='min-w-0 flex-1'>
                    <h4 className='mb-0 text-uppercase'>PREDIO: <div className='d-inline-block text-primary'>{data.name}</div></h4>
                    <div className='mt-1 mt-sm-0 d-flex flex-column flex-sm-row gap-0 gap-sm-4'>
                        <div className='mt-2 d-flex align-items-center gap-1 text-muted'>
                            <HiSwitchHorizontal size={20} />
                            {data.inputIrrigation.length}
                        </div>
                        <div className='mt-2 d-flex align-items-center gap-1 text-muted'>
                            <HiCurrencyDollar size={20} />
                            2000.00
                        </div>
                        <div className='mt-2 d-flex align-items-center gap-1 text-muted'>
                            <HiCalendar size={20} />
                            {`Actualizado el ${moment(data.updatedAt).format('DD MMMM, YYYY')}`}
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
                    {
                        !!usrid
                        &&
                        <Link
                            to={`/app/coll/bill/usr/${usrid}`}
                            className='btn btn-sm btn-neutral d-flex align-items-center gap-2'
                        >
                            <HiQueueList />
                            Lista de predios
                        </Link>
                    }
                    <Button
                        variant='neutral'
                        size='sm'
                        className='d-flex align-items-center gap-2'
                    >
                        <HiMap />
                        Predio
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
                <div className='col-12 col-lg-5 col-xl-3'>
                    <AreaFarmListCampaign />
                </div>
                <div className='col-12 col-lg-7 col-xl-9'>
                    <FeeCollectAreaFarmNavPage />
                </div>
            </div>
        </div>
    )
}