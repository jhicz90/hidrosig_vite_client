import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import { TagNewReg } from '../../../components'
import { farmApi } from '../../../store/actions'

export const AreaFarmBanner = () => {

    const { prpid } = useParams()
    const { data = null } = useSelector(farmApi.endpoints.getFarmById.select(prpid))

    return (
        <Card>
            <Card.Body>
                <div className='row align-items-center g-3 text-center text-xxl-start'>
                    <div className='col-12 col-sm-auto flex-1'>
                        <TagNewReg time={data.createdAt} />
                        <h3 className='fw-bolder mb-2'>{data.name}</h3>
                        <a className='fw-bold'>Información adicional</a>
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}
