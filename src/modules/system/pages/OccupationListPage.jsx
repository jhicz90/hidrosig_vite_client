import { useEffect } from 'react'
import { Card } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { LinkBack } from '../../../components'
import { clearToolbarActions, setToolbarActions, setToolbarTitle } from '../../../store/actions'
import { OccupationList } from '../components'

export const OccupationListPage = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(clearToolbarActions())
        dispatch(setToolbarTitle('OCUPACIONES'))
        dispatch(setToolbarActions(
            <>
                <LinkBack className='btn btn-neutral' to={`?w=occupation_create&id=new`} >Nueva ocupación</LinkBack>
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
                        <OccupationList />
                    </Card>
                </div>
            </div>
        </div>
    )
}