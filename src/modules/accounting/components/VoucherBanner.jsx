import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Card } from 'react-bootstrap'
import { TagNewReg } from '../../../components'
import { voucherApi } from '../../../store/actions'

export const VoucherBanner = () => {

    const { voucherid } = useParams()
    const { data = null } = useSelector(voucherApi.endpoints.getVoucherById.select(voucherid))

    return (
        <Card>
            <Card.Body>
                <div className='row align-items-center g-3 text-center text-xl-start'>
                    <div className='col-12 col-sm-auto flex-1'>
                        <TagNewReg time={data.createdAt} />
                        <h3 className='fw-bolder mb-2'>{`${data.serie}-${data.numReceipt}`}</h3>
                        <div className=''>Concepto: {data.concept}</div>
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}
