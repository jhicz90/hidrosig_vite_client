import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Modal, Button } from 'react-bootstrap'
import { setActiveNewOccupation, startAddNewOccupation } from '../../../store/occupation'
import { CreateOccupationStep1, CreateOccupationStep2 } from '.'

export const CreateOccupation = () => {

    const dispatch = useDispatch()
    const { activeNew, isSavingNew } = useSelector(state => state.occupation)
    const [step, setStep] = useState(1)

    useEffect(() => {
        return () => dispatch(setActiveNewOccupation(null))
    }, [dispatch])

    return (
        <>
            <Button
                disabled={isSavingNew}
                variant='primary'
                onClick={() => {
                    setStep(1)
                    dispatch(startAddNewOccupation())
                }}
            >
                Nuevo ocupación
            </Button>
            <Modal
                show={!!activeNew}
                onHide={() => dispatch(setActiveNewOccupation(null))}
                backdrop='static'
                size='lg'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Crear ocupación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card.Body>
                        {
                            step === 1
                            &&
                            <CreateOccupationStep1 setStep={setStep} />
                        }
                        {
                            step === 2
                            &&
                            <CreateOccupationStep2 setStep={setStep} />
                        }
                    </Card.Body>
                </Modal.Body>
            </Modal>
        </>
    )
}
