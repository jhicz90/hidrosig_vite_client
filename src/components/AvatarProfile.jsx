import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { FaPen } from 'react-icons/fa'
import styled from 'styled-components'
import { prominent } from 'color.js'
import { imageGet, imageSysGet, upperCaseCatch } from '../helpers'
import { startModalResource } from '../store/actions'
import { useResourceStore } from '../hooks'

export const AvatarProfile = ({ className = '', avatarImg = null, noImgTxt = 'USR', noImg = 1086, actionChange = null, size = 120, sizeImage = 300, bgColor = false }) => {

    const dispatch = useDispatch()
    const { initResource } = useResourceStore()

    const nameTxt = upperCaseCatch(noImgTxt).slice(0, 2)

    const [backColor, setBackColor] = useState('rgb(200, 200, 200)')

    const sizeCssInPx = (size) => `${size}px`

    const handleChangeImage = () => {
        initResource({
            tags: ['perfil']
        })
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
            <ProfileAvatar className={`${className}`} style={{ width: sizeCssInPx(size), height: sizeCssInPx(size) }}>
                {
                    (avatarImg !== '' && avatarImg !== null && avatarImg !== undefined)
                        ?
                        // <Image
                        //     className='avatar-img'
                        //     img={avatarImg}
                        //     style={{ background: bgColor ? backColor : 'transparent', width: sizeCssInPx(size), height: sizeCssInPx(size) }}
                        //     thumb={true}
                        //     resSize={sizeImage}
                        //     noImg={noImg}
                        // />
                        <img
                            className='avatar-img'
                            style={{ background: bgColor ? backColor : 'transparent', width: sizeCssInPx(size), height: sizeCssInPx(size) }}
                            src={(avatarImg !== '' && avatarImg !== null && avatarImg !== undefined) ? imageGet(avatarImg, { size, face: true }) : imageSysGet(noImg)}
                            width={size}
                            height={size}
                            alt={avatarImg}
                            loading='lazy'
                        />
                        :
                        <div className='avatar rounded-circle' style={{ width: sizeCssInPx(size), height: sizeCssInPx(size) }}>
                            <span className='avatar-initials' style={{ fontSize: sizeCssInPx(size / 2), width: sizeCssInPx(size), height: sizeCssInPx(size) }}>{nameTxt}</span>
                        </div>
                }
                {
                    !!actionChange
                    &&
                    <div className='d-block cursor-pointer'>
                        <button
                            onClick={handleChangeImage}
                            className='position-absolute bottom-0 end-0 m-0 bg-primary rounded-circle border border-primary text-white d-flex align-items-center justify-content-center'
                            style={{
                                width: sizeCssInPx(size / 2),
                                height: sizeCssInPx(size / 2)
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