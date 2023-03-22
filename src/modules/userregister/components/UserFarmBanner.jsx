import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Card } from 'react-bootstrap'
import { AvatarProfile, TagNewReg } from '../../../components'
import { typeUserFarm } from '../../../helpers'
import { updateImageUserFarmById, userfarmApi } from '../../../store/actions'

export const UserFarmBanner = () => {

    const { userid } = useParams()
    const dispatch = useDispatch()
    const { data = null } = useSelector(userfarmApi.endpoints.getUserFarmById.select(userid))

    const handleChangeImage = (id, image) => {
        dispatch(updateImageUserFarmById(id, image))
    }

    return (
        <Card>
            <Card.Body>
                <div className='row align-items-center g-3 text-center text-xxl-start'>
                    <div className='col-12 col-xxl-auto'>
                        <AvatarProfile
                            className='mb-3'
                            noImgTxt={data.type > 1 ? `${data.socialReason}` : `${data.names} ${data.lastName} ${data.motherLastName}`}
                            noImg={4004}
                            avatarImg={data.image?.metadata.url}
                            cloud={data.image?.cloud}
                            actionChange={(image) => handleChangeImage(data?._id, image)}
                        />
                    </div>
                    <div className='col-12 col-sm-auto flex-1'>
                        <TagNewReg time={data.createdAt} />
                        <h3 className='fw-bolder mb-2'>{data.type > 1 ? `${data.socialReason}` : `${data.names} ${data.lastName} ${data.motherLastName}`}</h3>
                        <p className='mb-0'>{typeUserFarm(data.type)}</p>
                        <a className='fw-bold'>Información adicional</a>
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}
