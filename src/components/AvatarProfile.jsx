import styled from 'styled-components'
import { FaPen } from 'react-icons/fa'
import { imageGet, imageSysGet } from '../helpers'

export const AvatarProfile = ({ className = '', avatarImg = null, noImg = 1086, actionChange = null }) => {
    return (
        <ProfileAvatar className={`shadow-sm ${className}`}>
            <img
                className='avatar-img'
                src={avatarImg ? imageGet(avatarImg) : imageSysGet(noImg)}
                alt={`avatar-image-${avatarImg}`}
                loading={'lazy'}
            />
            <span
                // onClick={handleChangeImage}
                className='avatar-uploader-trigger shadow-sm'>
                <FaPen size={20} />
            </span>
        </ProfileAvatar>

    )
}

const ProfileAvatar = styled.div`
    position: relative;
    display: flex;
    border-radius: 50%;
    background-color: #fff;
    border: 0.25rem solid #fff;
    margin: -6.3rem auto 0.5rem auto;
    justify-content: center;
    height: 10.5rem;
    width: 10.5rem;

    & img.avatar-img {
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
    }

    & .avatar-uploader-trigger {
        position: absolute;
        bottom: 0;
        right: 0;
        cursor: pointer;
        border-radius: 50%;
        transition: 0.2s;
        width: 2.40625rem;
        height: 2.40625rem;
        display: inline-flex;
        flex-shrink: 0;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        color: #677788;
        background-color: #fff;
    }

    &:hover .avatar-uploader-trigger {
        color: #fff;
        background-color: #377dff;
    }
`