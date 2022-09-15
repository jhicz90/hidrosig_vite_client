import { FaCamera } from 'react-icons/fa'
import styled from 'styled-components'
import { chckProp, imageGet, imageSysGet } from '../helpers'

export const Cover = ({ className = '', coverImage = null, noImg = 1087, actionChange = null }) => {
    return (
        <ProfileCover className={className}>
            <div className='profile-cover-img-wrapper'>
                <img
                    className='profile-cover-img'
                    src={coverImage ? imageGet(coverImage) : imageSysGet(noImg)}
                    alt={`cover-image-${coverImage}`}
                    loading={'lazy'}
                />
                <div className='profile-cover-uploader p-3'>
                    <button
                        onClick={actionChange}
                        className='btn btn-neutral d-flex align-items-center'
                    >
                        <FaCamera size={20} />
                        <span className='d-none d-sm-inline-block ms-1'>Subir portada</span>
                    </button>
                </div>
            </div>
        </ProfileCover>

    )
}

const ProfileCover = styled.div`
     position: relative;
     height: 7.5rem;
     padding: 1rem 1rem;
     border-radius: 9px;

    &,
    & .profile-cover-img,
    & .profile-cover-img-wrapper {
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
    } 

    & .profile-cover-img-wrapper {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        height: 7.5rem;
        background-color: #e7eaf3;
        border-radius: 9px;
    }

    & .profile-cover-img {
        width: 100%;
        height: 7.5rem;
        object-fit: cover;
        vertical-align: top;
        border-radius: 9px;
    }

    & .profile-cover-uploader {
        position: absolute;
        bottom: 0;
        right: 0;
        overflow: hidden;
        margin-bottom: 0;
    }

    & .avatar-uploader {
        cursor: pointer;
        display: inline-block;
        transition: 0.2s;
        margin-bottom: 0;
    }

    & .profile-cover-avatar {
        display: flex;
        background-color: #fff;
        border: 0.25rem solid #fff;
        margin: -6.3rem auto 0.5rem auto;
        justify-content: center;
    }

    @media (min-width: 992px) {
        height: 10rem;

        .profile-cover-img-wrapper {
            height: 10rem;
        }

        .profile-cover-img {
            height: 10rem;
        }
    }
`