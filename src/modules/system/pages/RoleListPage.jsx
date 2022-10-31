import { useEffect } from 'react'
import { Card } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { clearToolbarActions, setToolbarActions } from '../../../store/actions'
import { CreateRole, RoleList } from '../components'

export const RoleListPage = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setToolbarActions(
            <>
                <CreateRole />
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
                        <RoleList />
                    </Card>
                </div>
            </div>
        </div>
    )
}