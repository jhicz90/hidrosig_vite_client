import { Link, useParams } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { HiArrowUturnLeft, HiCalendar, HiPrinter } from 'react-icons/hi2'
import { AiFillNotification } from 'react-icons/ai'
import { FaWater } from 'react-icons/fa'
import moment from 'moment'
import { ContainerController, LoadingPage } from '@/components'
import { questionDeleteWaterSource, useDeleteWaterSourceByIdMutation, useGetWaterSourceByIdQuery } from '@/store/actions'
import { WaterSourceInformation } from '../components'
import { typeWaterSource } from '@/helpers'

export const WaterSourcePage = () => {

    const { wsid } = useParams()
    const { data = null, isLoading, isSuccess } = useGetWaterSourceByIdQuery(wsid)
    const [deleteWaterSource, { isLoading: isDeleting }] = useDeleteWaterSourceByIdMutation()

    const handleDelete = async (id, name) => {
        if (await questionDeleteWaterSource(name)) {
            deleteWaterSource(id).unwrap().then(() => {
                redirect()
            })
        }
    }

    if (isLoading) {
        return <LoadingPage />
    }

    return (
        isSuccess
        &&
        <ContainerController>
            <div className='d-lg-flex align-items-lg-center justify-content-lg-between my-3'>
                <div className='min-w-400 flex-1'>
                    <h4 className='mb-0 text-uppercase'>FUENTE DE AGUA: <div className='d-inline-block text-primary'>{data.name}</div></h4>
                    <div className='mt-1 mt-sm-0 d-flex flex-column flex-lg-row gap-0 gap-lg-4'>
                        <div className='mt-2 d-flex align-items-center gap-1 text-muted'>
                            <FaWater size={20} />
                            {typeWaterSource(data.type)}
                        </div>
                        <div className='mt-2 d-flex align-items-center gap-1 text-muted'>
                            <HiCalendar size={20} />
                            Actualizado el <span className='text-capitalize'>{moment(data.updatedAt).format('DD MMMM, YYYY')}</span>
                        </div>
                    </div>
                </div>
                <div className='mt-3 ms-lg-5 mt-lg-0 d-flex gap-2 flex-wrap'>
                    <Link
                        to={`/app/schm/irrig/net`}
                        className='btn btn-sm btn-neutral d-flex align-items-center gap-2'
                    >
                        <HiArrowUturnLeft />
                        Red de riego
                    </Link>
                    <Link
                        to={`/app/schm/irrig/ws`}
                        className='btn btn-sm btn-neutral d-flex align-items-center gap-2'
                    >
                        <HiArrowUturnLeft />
                        Lista de fuentes de agua
                    </Link>
                    <Button
                        variant='primary'
                        size='sm'
                        className='d-flex align-items-center gap-2'
                    >
                        <AiFillNotification />
                        Generar notificación
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
            <div className='card'>
                <WaterSourceInformation />
            </div>
        </ContainerController>
    )
}
