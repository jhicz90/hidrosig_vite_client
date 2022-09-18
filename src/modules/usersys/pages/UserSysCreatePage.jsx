import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Modal } from 'react-bootstrap'
import { setActiveNewUserSys, startAddNewUserSys } from '../../../store/usersys'
import { CreateUserStep1, CreateUserStep2, CreateUserStep3 } from '../components'

export const UserSysCreatePage = () => {

    const dispatch = useDispatch()
    const { activeNew } = useSelector(state => state.usersys)
    const [step, setStep] = useState(1)

    useEffect(() => {
        setStep(1)
        return () => dispatch(setActiveNewUserSys(null))
    }, [dispatch])

    return (
        <Modal
            show={!!activeNew}
            onHide={() => dispatch(setActiveNewUserSys(null))}
            backdrop='static'
            size='lg'
        >
            <Modal.Header closeButton>
                <Modal.Title>Crear nuevo usuario</Modal.Title>
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
    )
}
