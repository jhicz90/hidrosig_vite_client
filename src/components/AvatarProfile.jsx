import styled from 'styled-components'
import { FaPen } from 'react-icons/fa'
import { imageGet, imageSysGet } from '../helpers'

export const AvatarProfile = ({ className = '', avatarImg = null, noImg = 1086, actionChange = null }) => {
    return (
        <div className='text-center mb-3'>
            <ProfileAvatar className={`${className}`}>
                <img
                    className='avatar-img'
                    src={avatarImg ? imageGet(avatarImg) : imageSysGet(noImg)}
                    alt={`avatar-image-${avatarImg}`}
                    loading={'lazy'}
                />
                {
                    !!actionChange
                    &&
                    <div className='d-block cursor-pointer'>
                        <span
                            onClick={actionChange}
                            className='position-absolute bottom-0 end-0 m-0 bg-primary text-white rounded-circle d-flex align-items-center justify-content-center'>
                            <FaPen />
                        </span>
                    </div>
                }
            </ProfileAvatar>
        </div>
    )
}

const ProfileAvatar = styled.div`
    position: relative;
    display: inline-block;
    height: 120px;
    width: 120px;

    & img.avatar-img {
        height: 120px;
        width: 120px;
        object-fit: cover;
        border-radius: 50%;
        border: 0.25rem solid #fff;
        box-shadow: 0 .125rem .25rem rgba(0,0,0,.075) !important;
    }

    & span {
        height: 30px;
        width: 30px;
    }
`