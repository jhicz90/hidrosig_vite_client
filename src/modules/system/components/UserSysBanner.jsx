import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Card } from 'react-bootstrap'
import { AvatarProfile, TagNewReg } from '../../../components'
import { updateImageUserSysById, usersysApi } from '../../../store/actions'

export const UserSysBanner = () => {

    const { userid } = useParams()
    const dispatch = useDispatch()
    const { data = null } = useSelector(usersysApi.endpoints.getUserSysById.select(userid))

    const handleChangeImage = (id, image) => {
        dispatch(updateImageUserSysById(id, image))
    }

    return (
        <Card>
            <Card.Body>
                <div className='row align-items-center g-3 text-center text-xxl-start'>
                    <div className='col-12 col-xxl-auto'>
                        <AvatarProfile
                            className='mb-3'
                            noImgTxt={data.names}
                            noImg={1082}
                            avatarImg={data.image?.metadata.url}
                            cloud={data.image?.cloud}
                            actionChange={(image) => handleChangeImage(data?._id, image)}
                        />
                    </div>
                    <div className='col-12 col-sm-auto flex-1'>
                        <TagNewReg time={data.createdAt} />
                        <h3 className='fw-bolder mb-2'>{`${data.names} ${data.surnames}`}</h3>
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}
