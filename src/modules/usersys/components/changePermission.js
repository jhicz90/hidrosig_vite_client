import React, { useEffect, useState } from 'react'
import { Alert, Button, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import validator from 'validator'
import AsyncSelect from 'react-select/async'
import { msgAlert } from '../../../helpers'
import { searchPerms, startUpdateActiveUserSysPermission } from '../../../actions'

export const ChangePermission = () => {

    const dispatch = useDispatch()
    const { active } = useSelector(state => state.usersys)
    const [showModal, setShowModal] = useState(false)
    const [permission, setPermission] = useState(active.permission)
    const [passwordConfirm, setPasswordConfirm] = useState('')

    const handleChangePerms = (value) => {
        setPermission(value)
    }

    const handleSubmitChange = () => {
        if (permission !== null && !validator.isEmpty(passwordConfirm)) {
            dispatch(startUpdateActiveUserSysPermission({ passwordConfirm, permission }))
            onHide()
        } else {
            msgAlert('Ingrese y verifique todos los campos válidos')
        }
    }

    const onHide = () => {
        setShowModal(false)
    }

    useEffect(() => {
        setPermission(active.permission)
        setPasswordConfirm('')
    }, [active, showModal])

    return (
        <>
            <button
                onClick={() => setShowModal(!showModal)}
                className="btn btn-neutral fw-bolder px-3"
            >
                Cambiar permiso
            </button>
            <Modal
                show={showModal}
                onHide={onHide}
                backdrop='static'
            >
                <Modal.Header closeButton closeVariant='white'>
                    <Modal.Title>
                        Permiso
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Alert variant="warning">
                        <div className="d-flex align-items-center">
                            <i className="fas fa-exclamation-circle fa-2x"></i>
                            <div className="d-flex flex-stack flex-grow-1 ms-3">
                                Por favor, busque e ingrese un permiso válido es requerido para la verificación. Y recuerde que al efectuar el cambio, la cuenta que este iniciada se cerrara por seguridad.
                            </div>
                        </div>
                    </Alert>
                    <div className="row">
                        <div className="col">
                            <div className="mb-3">
                                <label htmlFor="perms" className="form-label">Permiso</label>
                                <AsyncSelect
                                    defaultOptions
                                    isClearable
                                    inputId="perms"
                                    value={permission}
                                    getOptionLabel={e =>
                                        <div className="d-flex flex-column">
                                            <div>{e.name}</div>
                                            <div>Nivel de acceso: {e.levelOrg}</div>
                                            {e.levelOrg > 1 && <div>Junta: {e.junta.name}</div>}
                                            {e.levelOrg === 3 && <div>Comision(es): {e.committee.map(c => c.name).join(', ')}</div>}
                                        </div>
                                    }
                                    getOptionValue={e => e._id}
                                    loadOptions={searchPerms}
                                    onChange={handleChangePerms}
                                    placeholder="Busque el permiso"
                                    loadingMessage={() => 'Buscando...'}
                                    noOptionsMessage={() => 'Sin resultados'}
                                    menuPlacement={'auto'}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="mb-3">
                                <label htmlFor="passwconfirm" className="form-label">
                                    Contraseña de confirmación{' '}
                                    <OverlayTrigger
                                        placement="auto"
                                        overlay={
                                            <Tooltip>Contraseña de la cuenta de esta sesión</Tooltip>
                                        }
                                    >
                                        <i className="fas fa-exclamation-circle" />
                                    </OverlayTrigger>
                                </label>
                                <input value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} type="password" id="passwconfirm" name="passwconfirm" className="form-control" autoComplete="off" />
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        onClick={onHide}
                        className="btn btn-neutral"
                    >
                        Cerrar
                    </button>
                    <Button
                        onClick={handleSubmitChange}
                        variant="primary"
                    >
                        Cambiar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
