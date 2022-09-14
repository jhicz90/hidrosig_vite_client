import React, { useEffect, useState } from 'react'
import { Alert, Button, Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import validator from 'validator'
import { startUpdateActiveUserSysPassword } from '../../../actions'
import { msgAlert } from '../../../helpers'

export const ChangePassword = () => {

    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('')

    useEffect(() => {
        setPassword('')
        setNewPassword('')
        setNewPasswordConfirm('')
    }, [showModal])

    const handleSubmitChange = () => {
        if (!validator.isEmpty(password) && !validator.isEmpty(newPassword) && !validator.isEmpty(newPasswordConfirm)) {
            if (newPassword === newPasswordConfirm) {
                dispatch(startUpdateActiveUserSysPassword({ password, newPassword, newPasswordConfirm }))
                onHide()
            } else {
                msgAlert('La nueva contraseña no coincide con la confirmación')
            }
        } else {
            msgAlert('Ingrese y verifique todos los campos válidos')
        }
    }

    const onHide = () => {
        setShowModal(false)
    }

    return (
        <>
            <button
                onClick={() => setShowModal(!showModal)}
                className="btn btn-neutral fw-bolder px-3"
            >
                Cambiar contraseña
            </button>
            <Modal
                show={showModal}
                onHide={onHide}
                backdrop="static"
            >
                <Modal.Header closeButton closeVariant="white">
                    <Modal.Title>
                        Contraseña
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Alert variant="warning">
                        <div className="d-flex align-items-center">
                            <i className="fas fa-exclamation-circle fa-2x"></i>
                            <div className="d-flex flex-stack flex-grow-1 ms-3">
                                Por favor, ingresar una contraseña que deba tener como mínimo 8 caracteres, una minuscula, una mayuscula, un número y un simbolo. Y recuerde que al efectuar el cambio, la cuenta que este iniciada se cerrara por seguridad.
                            </div>
                        </div>
                    </Alert>
                    <div className="row">
                        <div className="col">
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Contraseña anterior</label>
                                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" name="password" className="form-control" autoComplete="off" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="mb-3">
                                <label htmlFor="newpassword" className="form-label">Nueva contraseña</label>
                                <input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} type="password" id="newpassword" name="newpassword" className="form-control" autoComplete="off" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="mb-3">
                                <label htmlFor="newpasswordconfirm" className="form-label">Confirmar nueva contraseña</label>
                                <input value={newPasswordConfirm} onChange={(e) => setNewPasswordConfirm(e.target.value)} type="password" id="newpasswordconfirm" name="newpasswordconfirm" className="form-control" autoComplete="off" />
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        onClick={onHide}
                        className="btn btn-neutral me-1"
                    >
                        Cerrar
                    </button>
                    <Button
                        onClick={handleSubmitChange}
                        variant="primary"
                        className="ms-1"
                    >
                        Cambiar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
