import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Modal } from 'react-bootstrap'
import { setActiveNewUserSys, startAddNewUserSys } from '../../../store/usersys'
import { CreateUserStep1, CreateUserStep2 } from '../components'

export const UserSysCreatePage = () => {

    const dispatch = useDispatch()
    const { activeNew } = useSelector(state => state.usersys)

    useEffect(() => {
        return () => dispatch(setActiveNewUserSys(null))
    }, [dispatch])

    return (
        <Modal
            show={!!activeNew}
            onHide={() => dispatch(setActiveNewUserSys(null))}
            size='lg'
        >
            <Modal.Header closeButton>
                <Modal.Title>Crear nuevo usuario</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Card.Body>
                    <CreateUserStep1 />
                </Card.Body>
            </Modal.Body>
        </Modal>
    )
}
