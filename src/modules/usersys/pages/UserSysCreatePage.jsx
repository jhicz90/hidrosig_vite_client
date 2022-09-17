import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Card, Modal } from 'react-bootstrap'
import { useNavigate, Route, Routes, useLocation } from 'react-router-dom'
import { setActiveNewUserSys, startAddNewUserSys } from '../../../store/usersys'
import { CreateUserStep1, CreateUserStep2 } from '../components'

export const UserSysCreatePage = () => {

    const navigate = useNavigate()
    const { state } = useLocation()
    const dispatch = useDispatch()

    useEffect(() => {
        if (state?.background) {
            dispatch(startAddNewUserSys())
        } else {
            navigate(-1)
        }

        return () => dispatch(setActiveNewUserSys(null))
    }, [dispatch])

    return (
        <Modal
            show={true}
            onHide={() => navigate(state?.background.pathname)}
            size='lg'
        >
            <Modal.Header closeButton>
                <Modal.Title>Crear nuevo usuario</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Card.Body>
                    <Routes>
                        <Route index element={<CreateUserStep1 />} />
                        <Route path={`/step2`} element={<CreateUserStep2 />} />
                        {/* <Route path={`/step3`} element={<>Paso 3</>} />
                            <Route path={`/step4`} element={<>Paso 4</>} /> */}
                    </Routes>
                </Card.Body>
            </Modal.Body>
        </Modal>
    )
}
