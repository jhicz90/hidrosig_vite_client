import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, OverlayTrigger, Tooltip } from 'react-bootstrap'
import Switch from 'react-switch'
import { FaRegQuestionCircle } from 'react-icons/fa'
import { Cover, AvatarProfile } from '../../../components'
import { startUpdateStatusRole } from '../../../store/role'

export const RoleModuleBanner = () => {

    const dispatch = useDispatch()
    const { active, isSaving } = useSelector(state => state.role)
    const [data, setData] = useState(active)

    useEffect(() => {
        setData(active)
    }, [active])

    const confirmActiveStatus = (ck) => {
        dispatch(startUpdateStatusRole(ck))
    }

    return (
        <Card>
            <Cover coverImage={''} />
            <AvatarProfile avatarImg={data.image} />
            <Card.Body className='py-0 pb-3'>
                <div className='row'>
                    <div className='col'>
                        <div className='mt-3'>
                            Estado del rol de usuario
                            <OverlayTrigger
                                placement='auto'
                                overlay={
                                    <Tooltip>Puede habilitar o desabilitar el rol de usuario, al hacer dicho cambio se actualizaran todas las sesiones de usuario asociadas a este rol.</Tooltip>
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
