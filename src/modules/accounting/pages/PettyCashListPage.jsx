import { useEffect } from 'react'
import { Card } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { clearToolbarActions, setToolbarActions } from '../../../store/app'
import { CreatePettyCash, PettyCashList } from '../components'

export const PettyCashListPage = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setToolbarActions(
            <>
                <CreatePettyCash />
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
                        <PettyCashList />
                    </Card>
                </div>
            </div>
        </div>
    )
}
