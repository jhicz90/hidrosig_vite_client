import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, OverlayTrigger, Tooltip } from 'react-bootstrap'
import Switch from 'react-switch'
import { FaRegQuestionCircle } from 'react-icons/fa'
import { Cover, AvatarProfile } from '../../../components'
import { startUpdateStatusOccupation } from '../../../store/occupation'

export const OccupationModuleBanner = () => {

    const dispatch = useDispatch()
    const { active, isSaving } = useSelector(state => state.occupation)
    const [data, setData] = useState(active)

    useEffect(() => {
        setData(active)
    }, [active])

    const confirmActiveStatus = (ck) => {
        dispatch(startUpdateStatusOccupation(ck))
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
            <Cover coverImage={''} />
            <AvatarProfile avatarImg={data.image} />
            <Card.Body className='py-0 pb-3'>
                <div className='row'>
                    <div className='col'>
                        <div className='mt-3'>
                            Estado de la ocupación
                            <OverlayTrigger
                                placement='auto'
                                overlay={
                                    <Tooltip>Puede habilitar o desabilitar la ocupación, al hacer dicho cambio se actualizaran todas las sesiones de usuario asociadas a esta ocupación.</Tooltip>
                                }
                            >
                                <div className='d-inline ms-1'>
                                    <FaRegQuestionCircle />
                                </div>
                            </OverlayTrigger>
                        </div>
                        <Switch
                            onChange={confirmActiveStatus}
                            checked={data.status}
                            handleDiameter={30}
                            disabled={isSaving}
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
