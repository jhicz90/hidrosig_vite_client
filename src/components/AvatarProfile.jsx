import { useState, useEffect, useId } from 'react'
import styled from 'styled-components'
import { prominent } from 'color.js'
import { FaPen } from 'react-icons/fa'
import { imageGet, imageSysGet } from '../helpers'

export const AvatarProfile = ({ className = '', avatarImg = null, noImg = 1086, actionChange = null, size = '120px' }) => {

    const inputUploadImage = useId()

    const [backColor, setBackColor] = useState('rgb(200, 200, 200)')

    useEffect(() => {
        if (avatarImg !== null) {
            prominent(imageGet(avatarImg), { amount: 3 }).then(colors => {
                const randomPicked = Math.floor(Math.random() * colors.length)
                if (colors[randomPicked][0] === 0 && colors[randomPicked][1] === 0 && colors[randomPicked][2] === 0) {
                    setBackColor(`rgb(255, 255, 255)`)
                } else {
                    setBackColor(`rgb(${colors[randomPicked].join(',')})`)
                }
            })
        }
    }, [avatarImg])

    return (
        <div className='text-center'>
            <ProfileAvatar className={`${className}`} style={{ width: size, height: size }}>
                <input
                    className='d-none'
                    id={inputUploadImage}
                    type='file'
                    multiple={false}
                    accept='image/jpeg, image/png'
                    onChange={(e) => actionChange(e.target.files[0])}
                />
                <img
                    className='avatar-img'
                    src={avatarImg !== null ? imageGet(avatarImg) : imageSysGet(noImg)}
                    style={{ background: backColor, width: size, height: size }}
                    alt={`avatar-image-${avatarImg}`}
                    loading={'lazy'}
                />
                {
                    !!actionChange
                    &&
                    <div className='d-block cursor-pointer'>
                        <label
                            htmlFor={inputUploadImage}
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
        border: 1px solid #fff;
        box-shadow: 0 .125rem .25rem rgba(0,0,0,.075)!important;
        border-color: rgba(13,110, 253, 1)!important;
    }

    & label {
        height: 25%;
        width: 25%;
    }
`