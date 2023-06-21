import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Card } from 'react-bootstrap'
import { typeUserFarm } from '../../../helpers'
import { Avatar, TagNewReg } from '../../../components'
import { userfarmApi } from '../../../store/actions'

export const CollectBanner = () => {

    const { usrid } = useParams()
    const { data = null } = useSelector(userfarmApi.endpoints.getUserFarmById.select(usrid))

    return (
        <div className='row rows-cols-1 gy-3 gx-0'>
            <Card>
                <Card.Body>
                    <div className='row align-items-center g-3 text-center text-xxl-start'>
                        <div className='col-12 col-xxl-auto'>
                            <Avatar
                                noImgTxt={data?.type > 1 ? `${data?.socialReason}` : `${data?.names} ${data?.lastName} ${data?.motherLastName}`}
                                noImg={4004}
                                img={data?.image?.metadata.url}
                                cloud={data?.image?.cloud}
                                width={75}
                                height={75}
                            />
                        </div>
                        <div className='col-12 col-sm-auto flex-1'>
                            <TagNewReg time={data?.createdAt} />
                            <div className='fw-bolder mb-0'>{data?.type > 1 ? `${data?.socialReason}` : `${data?.names} ${data?.lastName} ${data?.motherLastName}`}</div>
                            <div className='mb-0'>{data?.docid}</div>
                            <p className='mb-0'>{typeUserFarm(data?.type)}</p>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}