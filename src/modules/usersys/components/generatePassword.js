import React, { useEffect, useState } from 'react'
import { Alert, Button, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import validator from 'validator'
import { msgAlert } from '../../../helpers'
import { startUpdateActiveUserSysGenerateNewPassword } from '../../../actions/UserSys'

export const GeneratePassword = () => {

    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)
    const [passwordConfirm, setPasswordConfirm] = useState('')

    useEffect(() => {
        setPasswordConfirm('')
    }, [showModal])

    const handleSubmitChange = () => {
        if (!validator.isEmpty(passwordConfirm)) {
            dispatch(startUpdateActiveUserSysGenerateNewPassword({ passwordConfirm }))
            onHide()
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
                Generar contraseña
            </button>
            <Modal
                show={showModal}
                onHide={onHide}
                backdrop="static"
            >
                <Modal.Header closeButton closeVariant="white">
                    <Modal.Title>
                        Generar contraseña
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Alert variant="warning">
                        <div className="d-flex align-items-center">
                            <i className="fas fa-exclamation-circle fa-2x"></i>
                            <div className="d-flex flex-stack flex-grow-1 ms-3">
                                No se podrá revertir este cambio, y recuerde que al efectuar el cambio, la cuenta que este iniciada se cerrara por seguridad.
                            </div>
                        </div>
                    </Alert>
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
