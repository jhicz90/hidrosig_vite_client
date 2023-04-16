import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Card } from 'react-bootstrap'
import { TagNewReg } from '../../../components'
import { blockApi } from '../../../store/actions'

export const BlockBanner = () => {
    
    const { blkid } = useParams()
    const { data = null } = useSelector(blockApi.endpoints.getBlockById.select(blkid))

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
