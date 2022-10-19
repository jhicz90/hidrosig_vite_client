import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { prominent } from 'color.js'
import { FaPen } from 'react-icons/fa'
import { imageGet, imageSysGet } from '../helpers'

export const AvatarProfile = ({ className = '', avatarImg = null, noImg = 1086, actionChange = null }) => {

    const [backColor, setBackColor] = useState('rgb(200, 200, 200)')

    useEffect(() => {
        prominent(imageGet(avatarImg), { amount: 1 }).then(color => {
            if (color[0] === 0 && color[1] === 0 && color[2] === 0) {
                setBackColor(`rgb(255, 255, 255)`)
            } else {
                setBackColor(`rgb(${color.join(',')})`)
            }
        })
    }, [avatarImg])

    return (
        <div className='text-center mb-3'>
            <ProfileAvatar className={`${className}`}>
                <input
                    className='d-none'
                    id='input-upload-image'
                    type='file'
                    multiple={false}
                    accept='image/jpeg, image/png'
                    onChange={(e) => actionChange(e.target.files[0])}
                />
                <img
                    className='avatar-img'
                    src={avatarImg ? imageGet(avatarImg) : imageSysGet(noImg)}
                    style={{ background: backColor }}
                    alt={`avatar-image-${avatarImg}`}
                    loading={'lazy'}
                />
                {
                    !!actionChange
                    &&
                    <div className='d-block cursor-pointer'>
                        <label
                            htmlFor='input-upload-image'
                            className='position-absolute bottom-0 end-0 m-0 bg-primary text-white rounded-circle d-flex align-items-center justify-content-center'>
                            <FaPen />
                        </label>
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
        object-fit: contain;
        border-radius: 50%;
        border: 0.25rem solid #fff;
        box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important;
    }

    & label {
        height: 30px;
        width: 30px;
    }
`