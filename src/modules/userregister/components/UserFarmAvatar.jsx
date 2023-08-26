import React from 'react'
import { AvatarProfile } from '../../../components'
import { namesUserFarm } from '../../../helpers'
import { useUpdateImageUserFarmByIdMutation } from '../../../store/userfarm'

export const UserFarmAvatar = ({ usrfarm = null }) => {

    const [updateImage] = useUpdateImageUserFarmByIdMutation()

    return (
        <React.Fragment>
            <AvatarProfile
                noImgTxt={namesUserFarm(usrfarm)}
                noImg={4004}
                avatarImg={usrfarm.image?.metadata.url}
                size={50}
                actionChange={(image) => updateImage({ id: usrfarm._id, image })}
            />
            <h4 className='mb-0 text-uppercase'>USUARIO AGRARIO: <div className='d-inline-block text-primary'>{namesUserFarm(usrfarm)}</div></h4>
        </React.Fragment>
    )
}
