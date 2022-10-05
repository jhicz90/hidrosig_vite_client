import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import Switch from 'react-switch'
import { FaRegQuestionCircle } from 'react-icons/fa'
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
        <div className='text-center'>
            <h3 className='mb-0'>{active.name}</h3>
            <span className='small text-secondary fw-semibold'>Rol de usuario</span>
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
    )
}
