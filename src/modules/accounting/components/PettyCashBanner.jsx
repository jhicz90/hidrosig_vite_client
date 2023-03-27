import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Card } from 'react-bootstrap'
import { pettycashApi } from '../../../store/actions'
import { TagNewReg } from '../../../components'

export const PettyCashBanner = () => {

    const { pettycashid } = useParams()
    const { data = null } = useSelector(pettycashApi.endpoints.getPettyCashById.select(pettycashid))

    return (
        <Card>
            <Card.Body>
                <div className='row align-items-center g-3 text-center text-xxl-start'>
                    <div className='col-12 col-sm-auto flex-1'>
                        <TagNewReg time={data.createdAt} />
                        <h3 className='fw-bolder mb-2'>{data.name}</h3>
                        <div className=''>Numero de comprobante:{data.receipt}</div>
                        <div className=''>S/.{data.remainingAmount}</div>
                        <div className=''>Numero de cheque:{data.check}</div>
                        <a className='fw-bold'>Información adicional</a>
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}
