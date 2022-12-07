import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Switch from 'react-switch'
import { AvatarProfile } from '../../../components'
import { startUpdateStatusCommittee } from '../../../store/actions'

export const CommitteeModuleBanner = () => {

    const dispatch = useDispatch()
    const { active, isSaving } = useSelector(state => state.committee)
    const [data, setData] = useState(active)

    useEffect(() => {
        setData(active)
    }, [active])

    const confirmActiveStatus = (ck) => {
        dispatch(startUpdateStatusCommittee(ck))
    }

    // const handleChangeImage = () => {
    //     dispatch(startModalResource({
    //         title: 'Cambiar imagen del usuario',
    //         tags: ['usuario', 'perfil'],
    //         accept: 'images',
    //         setArchive: (data) => dispatch(startUpdateActiveJuntaImage({ image: data }))
    //     }))
    // }

    return (
        <div className='text-center'>
            <AvatarProfile className='mb-3' avatarImg={data.image?.metadata.url} />
            <div className='fs-5 mb-0'>{data.name}</div>
            <span className='text-secondary fw-semibold'>Comisión de usuarios</span>
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
