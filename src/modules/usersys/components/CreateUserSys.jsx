import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Modal, Button } from 'react-bootstrap'
import { setActiveNewUserSys, startAddNewUserSys } from '../../../store/usersys'
import { CreateUserStep1, CreateUserStep2, CreateUserStep3 } from '.'

export const CreateUserSys = () => {

    const dispatch = useDispatch()
    const { activeNew, isSavingNew } = useSelector(state => state.usersys)
    const [step, setStep] = useState(1)

    useEffect(() => {
        return () => dispatch(setActiveNewUserSys(null))
    }, [dispatch])

    return (
        <>
            <Button
                disabled={isSavingNew}
                variant='primary'
                onClick={() => {
                    setStep(1)
                    dispatch(startAddNewUserSys())
                }}
            >
                Nuevo usuario
            </Button>
            <Modal
                show={!!activeNew}
                onHide={() => dispatch(setActiveNewUserSys(null))}
                backdrop='static'
                size='lg'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Crear usuario de sistema</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card.Body>
                        {
                            step === 1
                            &&
                            <CreateUserStep1 setStep={setStep} />
                        }
                        {
                            step === 2
                            &&
                            <CreateUserStep2 setStep={setStep} />
                        }
                        {
                            step === 3
                            &&
                            <CreateUserStep3 setStep={setStep} />
                        }
                    </Card.Body>
                </Modal.Body>
            </Modal>
        </>
    )
}
