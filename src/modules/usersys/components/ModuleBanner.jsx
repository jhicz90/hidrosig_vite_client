import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Switch from 'react-switch'
import { AvatarProfile } from '../../../components'
import { startUpdateStatusUserSys } from '../../../store/usersys'

export const UserSysModuleBanner = () => {

    const dispatch = useDispatch()
    const { active, isSaving } = useSelector(state => state.usersys)
    const [data, setData] = useState(active)

    useEffect(() => {
        setData(active)
    }, [active])

    const confirmActiveStatus = (ck) => {
        dispatch(startUpdateStatusUserSys(ck))
    }

    // const handleChangeImage = () => {
    //     dispatch(startModalResource({
    //         title: 'Cambiar imagen del usuario',
    //         tags: ['usuario', 'perfil'],
    //         accept: 'images',
    //         setArchive: (data) => dispatch(startUpdateActiveUserSysImage({ image: data }))
    //     }))
    // }

    return (
        <div className='text-center'>
            <AvatarProfile avatarImg={data.image} />
            <div className='fs-5 mb-0'>{`${data.names} ${data.surnames}`}</div>
            <span className='text-secondary fw-semibold'>Usuario de sistema</span>
            <div className='row mt-3'>
                <div className='col'>
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
        </div>
        // <Card>
        //     <Cover coverImage={data.coverImage} />
        //     <Card.Body className='py-0 pb-3'>
        //         <div className='row'>
        //             <div className='col'>
        //                 <div className='mt-3'>
        //                     Estado de la cuenta de usuario
        //                     <OverlayTrigger
        //                         placement='auto'
        //                         overlay={
        //                             <Tooltip>Puede habilitar o desabilitar la cuenta de usuario, al hacer dicho cambio se actualizaran todas las sesiones.</Tooltip>
        //                         }
        //                     >
        //                         <div className='d-inline ms-1'>
        //                             <FaRegQuestionCircle />
        //                         </div>
        //                     </OverlayTrigger>
        //                 </div>
        //                 <Switch
        //                     onChange={confirmActiveStatus}
        //                     checked={data.status}
        //                     handleDiameter={30}
        //                     disabled={isSaving}
        //                     height={40}
        //                     width={140}
        //                     activeBoxShadow='0 0 0 2px #2684ff'
        //                     onColor='#198754'
        //                     offColor='#ffcd39'
        //                     uncheckedIcon={<div className='d-flex justify-content-center align-items-center text-black h-100 me-5'>Desactivado</div>}
        //                     checkedIcon={<div className='d-flex justify-content-center align-items-center text-white h-100 ms-5'>Activado</div>}
        //                 />
        //             </div>
        //         </div>
        //     </Card.Body>
        // </Card>
    )
}
