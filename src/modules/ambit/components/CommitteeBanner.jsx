import { Card } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AvatarProfile } from '../../../components'
import { committeeApi, updateImageCommById } from '../../../store/actions'

export const CommitteeBanner = () => {

    const { commid } = useParams()
    const dispatch = useDispatch()
    const { data = null } = useSelector(committeeApi.endpoints.getCommById.select(commid))

    const handleChangeImage = (id, image) => {
        dispatch(updateImageCommById(id, image))
    }

    return (
        <Card>
            <Card.Body>
                <div className='row align-items-center g-3 text-center text-xxl-start'>
                    <div className='col-12 col-xxl-auto'>
                        <AvatarProfile
                            className='mb-3'
                            avatarImg={data.image?.metadata.url}
                            cloud={data.image?.cloud}
                            actionChange={(image) => handleChangeImage(data?._id, image)}
                        />
                    </div>
                    <div className='col-12 col-sm-auto flex-1'>
                        <h3 className='fw-bolder mb-2'>{data.name}</h3>
                        <p className='mb-0'>Comisión de usuarios</p>
                        <a className='fw-bold'>Información adicional</a>
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}
