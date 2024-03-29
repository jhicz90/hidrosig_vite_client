import { Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { AvatarProfile } from '../../../components'
import { juntaApi, updateImageJuntaById } from '../../../store/actions'

export const JuntaBanner = () => {

    const { juntaid } = useParams()
    const dispatch = useDispatch()
    const { data = null } = useSelector(juntaApi.endpoints.getJuntaById.select(juntaid))

    const handleChangeImage = (id, image) => {
        dispatch(updateImageJuntaById(id, image))
    }

    return (
        <Card>
            <Card.Body>
                <div className='row align-items-center g-3 text-center text-xxl-start'>
                    <div className='col-12 col-xxl-auto'>
                        <AvatarProfile
                            className='mb-3'
                            noImgTxt={data.name}
                            noImg={4003}
                            avatarImg={data.image?.metadata.url}
                            cloud={data.image?.cloud}
                            actionChange={(image) => handleChangeImage(data?._id, image)}
                        />
                    </div>
                    <div className='col-12 col-sm-auto flex-1'>
                        <h3 className='fw-bolder mb-2'>{data.name}</h3>
                        <p className='mb-0'>Junta de usuarios</p>
                        <a className='fw-bold'>Información adicional</a>
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}
