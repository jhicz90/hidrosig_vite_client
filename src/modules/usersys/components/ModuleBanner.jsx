import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, OverlayTrigger, Tooltip } from 'react-bootstrap'
import Switch from 'react-switch'
import { Cover, AvatarProfile } from '../../../components'
import { startUpdateStatusUserSys } from '../../../store/usersys'
import { FaRegQuestionCircle } from 'react-icons/fa'

export const UserSysModuleBanner = () => {

    const dispatch = useDispatch()
    const { active } = useSelector(state => state.usersys)
    const [data, setData] = useState(active)

    useEffect(() => {
        setData(active)
    }, [active])

    const confirmActiveStatus = (ck) => {
        dispatch(startUpdateStatusUserSys({ state: ck }))
    }

    // const handleChangeImage = () => {
    //     dispatch(startModalResource({
    //         title: 'Cambiar imagen del usuario',
    //         tags: ['usuario', 'perfil'],
    //         accept: 'images',
    //         setArchive: (data) => dispatch(startUpdateActiveUserSysImage({ image: data }))
    //     }))
    // }

    // const handleChangeCover = () => {
    //     dispatch(startModalResource({
    //         title: 'Cambiar imagen de portada',
    //         tags: ['usuario', 'portada'],
    //         accept: 'images',
    //         setArchive: (data) => dispatch(startUpdateActiveUserSysCover({ coverImage: data }))
    //     }))
    // }

    return (
        <Card>
            <Cover coverImage={data.coverImage.fileName} />
            <AvatarProfile avatarImg={data.image.fileName} />
            <Card.Body className='py-0 pb-3'>
                <div className='row'>
                    <div className='col'>
                        <div className='mt-3'>
                            Estado de la cuenta de usuario
                            <OverlayTrigger
                                placement='auto'
                                overlay={
                                    <Tooltip>Puede habilitar o desabilitar la cuenta de usuario, al hacer dicho cambio se actualizaran todas las sesiones.</Tooltip>
                                }
                            >
                                <div className='d-inline ms-1'>
                                    <FaRegQuestionCircle />
                                </div>
                            </OverlayTrigger>
                        </div>
                        <Switch
                            onChange={confirmActiveStatus}
                            checked={data.active}
                            handleDiameter={30}
                            height={40}
                            width={140}
                            activeBoxShadow='0 0 0 2px #2684ff'
                            onColor='#198754'
                            offColor='#ffcd39'
                            uncheckedIcon={<div className='d-flex justify-content-center align-items-center text-black h-100 me-5'>Desactivado</div>}
                            checkedIcon={<div className='d-flex justify-content-center align-items-center text-white h-100 ms-5'>Activado</div>}
                        />
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}
