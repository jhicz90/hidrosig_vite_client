import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export const Dialog = ({ title, size, fullscreen = false, handleAction, load = true, children }) => {

    const navigate = useNavigate()
    const [show, setShow] = useState(true)

    const handleClose = () => {
        setShow(false)
        navigate(-1)
    }

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop='static'
            size={size}
            fullscreen={fullscreen}
        >
            <Modal.Header closeButton closeVariant='white'>
                <Modal.Title>
                    {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
            <Modal.Footer>
                <button
                    onClick={handleClose}
                    className='btn btn-neutral'
                >
                    Cerrar
                </button>
                <Button
                    disabled={load}
                    variant='primary'
                    onClick={() => {
                        handleAction()
                        handleClose()
                    }}
                >
                    Guardar cambios
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
