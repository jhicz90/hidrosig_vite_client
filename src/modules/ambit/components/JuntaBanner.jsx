import React, { useState, useEffect } from 'react'
import { Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Switch from 'react-switch'
import { AvatarProfile } from '../../../components'
import { juntaApi, startUpdateImageJunta, startUpdateStatusJunta } from '../../../store/actions'

export const JuntaBanner = () => {

    const { juntaid } = useParams()
    const dispatch = useDispatch()
    const { data = null } = useSelector(juntaApi.endpoints.getJuntaById.select(juntaid))

    const confirmActiveStatus = (ck) => {
        dispatch(startUpdateStatusJunta(ck))
    }

    const handleChangeImage = (e) => {
        dispatch(startUpdateImageJunta(e))
    }

    return (
        <Card className='text-center'>
            <AvatarProfile className='mb-3' avatarImg={data.image?.metadata.url} actionChange={handleChangeImage} />
            <div className='fs-5 mb-0'>{data.name}</div>
            <span className='text-secondary fw-semibold'>Junta de usuarios</span>
            <div className='row mt-3'>
                <div className='col'>
                    <Switch
                        onChange={confirmActiveStatus}
                        checked={data.status}
                        handleDiameter={30}
                        // disabled={isSaving}
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
        </Card>
    )
}
