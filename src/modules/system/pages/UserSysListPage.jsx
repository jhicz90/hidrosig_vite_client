import { useEffect } from 'react'
import { Card } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { clearToolbarActions, setToolbarActions, setToolbarTitle } from '../../../store/app'
import { CreateUserSys, UserSysList } from '../components'

export const UserSysListPage = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(clearToolbarActions())
        dispatch(setToolbarTitle('USUARIOS DE SISTEMA'))
        dispatch(setToolbarActions(
            <>
                <CreateUserSys />
            </>
        ))

        return () => {
            dispatch(clearToolbarActions())
        }
    }, [dispatch])

    return (
        <div className='container'>
            <div className='row justify-content-center'>
                <div className='col'>
                    <Card className='pb-3'>
                        <UserSysList />
                    </Card>
                </div>
            </div>
        </div>
    )
}