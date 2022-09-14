import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card } from 'react-bootstrap'
import Switch from 'react-switch'
import { startModalResource, startUpdateActiveUserSysActive, startUpdateActiveUserSysCover, startUpdateActiveUserSysImage } from '../../../actions'
import { AvatarProfile, Cover, TimeAgo } from '../../../components'
import { formatAgoDate } from '../../../helpers'

export const UserSysBannerModule = () => {

    const dispatch = useDispatch()
    const { active } = useSelector(state => state.usersys)
    const [data, setData] = useState(active)

    useEffect(() => {
        setData(active)
    }, [active])

    const confirmActiveStatus = (ck) => {
        dispatch(startUpdateActiveUserSysActive({ state: ck }))
    }

    const handleChangeImage = () => {
        dispatch(startModalResource({
            title: "Cambiar imagen del usuario",
            tags: ['usuario', 'perfil'],
            accept: 'images',
            setArchive: (data) => dispatch(startUpdateActiveUserSysImage({ image: data }))
        }))
    }

    const handleChangeCover = () => {
        dispatch(startModalResource({
            title: "Cambiar imagen de portada",
            tags: ['usuario', 'portada'],
            accept: 'images',
            setArchive: (data) => dispatch(startUpdateActiveUserSysCover({ coverImage: data }))
        }))
    }

    return (
        <Card>
            <div className="profile-cover">
                <div className="profile-cover-img-wrapper">
                    <Cover className="profile-cover-img" data={data} />
                    <div className="profile-cover-uploader p-3">
                        <button
                            onClick={handleChangeCover}
                            className="btn btn-neutral"
                        >
                            <i className="fas fa-camera"></i>
                            <span className="d-none d-sm-inline-block ms-1">Subir portada</span>
                        </button>
                    </div>
                </div>
            </div>
            <label className="avatar-profile avatar-xxl avatar-circle avatar-uploader profile-cover-avatar">
                <AvatarProfile className="avatar-img" data={data} />
                <span
                    onClick={handleChangeImage}
                    className="avatar-uploader-trigger">
                    <i className="avatar-uploader-icon shadow-sm fas fa-pen"></i>
                </span>
            </label>
            <Card.Body>
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="fw-bold mt-3">Registro ID</div>
                        <div className="text-secondary">{data._id}</div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="fw-bold mt-3">Ultimo ingreso</div>
                        <div className="text-secondary">
                            {
                                data.logs
                                    ?
                                    (
                                        data.logs.length > 0 ? formatAgoDate(data.logs[data.logs.length - 1].loginDate) : 'Sin logueo'
                                    )
                                    :
                                    'Sin logueo'
                            }
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="fw-bolder mt-3">Creado</div>
                        <TimeAgo timestamp={data.createdAt} />
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="fw-bolder mt-3">Actualizado</div>
                        <TimeAgo timestamp={data.updatedAt} timeago={true} />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="fw-bolder mt-3">Estado de usuario</div>
                        <Switch
                            onChange={confirmActiveStatus}
                            checked={data.active}
                            handleDiameter={30}
                            height={40}
                            width={140}
                            activeBoxShadow="0 0 0 2px #2684ff"
                            onColor="#198754"
                            offColor="#ffcd39"
                            uncheckedIcon={<div className="d-flex justify-content-center align-items-center text-black h-100 me-5">Desactivado</div>}
                            checkedIcon={<div className="d-flex justify-content-center align-items-center text-white h-100 ms-5">Activado</div>}
                        />
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}
