import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Card } from 'react-bootstrap'
import { zoneApi } from '../../../store/actions'
import { TagNewReg } from '../../../components'

export const ZoneBanner = () => {

    const { znid } = useParams()
    const { data = null } = useSelector(zoneApi.endpoints.getZoneById.select(znid))

    return (
        <Card>
            <Card.Body>
                <div className='row align-items-center g-3 text-center text-xl-start'>
                    <div className='col-12 col-sm-auto flex-1'>
                        <TagNewReg time={data.createdAt} />
                        <h3 className='fw-bolder mb-2'>{data.name}</h3>
                        <div className=''>Descripción: {data.desc}</div>
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}
