import { useState, useEffect, useId } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { prominent } from 'color.js'
import { FaPen } from 'react-icons/fa'
import { imageGet, imageSysGet } from '../helpers'
import { startModalResource } from '../store/actions'
import { Image } from './Image'

export const AvatarProfile = ({ className = '', avatarImg = null, noImg = 1086, actionChange = null, size = '120px', sizeImage = 300, bgColor = false, cloud = false }) => {

    const inputUploadImage = useId()
    const dispatch = useDispatch()

    const [backColor, setBackColor] = useState('rgb(200, 200, 200)')

    const handleChangeImage = () => {
        dispatch(startModalResource({
            tags: ['perfil'],
            groupTypes: 'images',
            limit: 1,
            maxSize: 5,
            setFiles: actionChange
        }))
    }

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
                <Image
                    className='avatar-img'
                    img={avatarImg}
                    cloud={cloud}
                    style={{ background: bgColor ? backColor : 'transparent', width: size, height: size }}
                    thumb={true}
                    resSize={sizeImage}
                />
                {
                    !!actionChange
                    &&
                    <div className='d-block cursor-pointer'>
                        <button
                            onClick={handleChangeImage}
                            className='position-absolute bottom-0 end-0 m-0 bg-primary rounded-circle border border-primary text-white d-flex align-items-center justify-content-center'
                            style={{
                                width: '40px',
                                height: '40px'
                            }}
                        >
                            <FaPen />
                        </button>
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
        /* border: 1px solid #fff;
        border-color: rgba(13,110, 253, 1)!important; */
        box-shadow: 0 .125rem .25rem rgba(0,0,0,.075)!important;
    }

    & label {
        height: 25%;
        width: 25%;
    }
`