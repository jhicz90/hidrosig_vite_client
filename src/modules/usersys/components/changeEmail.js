import React, { useEffect, useState } from 'react'
import { Alert, Button, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import validator from 'validator'
import { startUpdateActiveUserSysEmail } from '../../../actions'
import { msgAlert } from '../../../helpers'

export const ChangeEmail = () => {

    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)
    const [email, setEmail] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')

    useEffect(() => {
        setEmail('')
        setPasswordConfirm('')
    }, [showModal])

    const handleSubmitChange = () => {
        if (!validator.isEmpty(email) && !validator.isEmpty(passwordConfirm)) {
            dispatch(startUpdateActiveUserSysEmail({ passwordConfirm, email }))
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
                Cambiar correo
            </button>
            <Modal
                show={showModal}
                onHide={onHide}
                backdrop="static"
            >
                <Modal.Header closeButton closeVariant="white">
                    <Modal.Title>
                        Correo electrónico
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Alert variant="warning">
                        <div className="d-flex align-items-center">
                            <i className="fas fa-exclamation-circle fa-2x"></i>
                            <div className="d-flex flex-stack flex-grow-1 ms-3">
                                Por favor, ingresar un correo electronico válido es requerido para la verificación. Y recuerde que al efectuar el cambio, la cuenta que este iniciada se cerrara por seguridad.
                            </div>
                        </div>
                    </Alert>
                    <div className="row">
                        <div className="col">
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Nuevo correo electrónico</label>
                                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="email" className="form-control" autoComplete="off" />
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
                        variant='primary'
                    >
                        Cambiar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
