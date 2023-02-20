import { useEffect } from 'react'
import { Card } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { LinkBack } from '../../../components'
import { clearToolbarActions, setToolbarActions, setToolbarTitle } from '../../../store/actions'
import { RoleList } from '../components'

export const RoleListPage = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(clearToolbarActions())
        dispatch(setToolbarTitle('ROLES DE USUARIOS'))
        dispatch(setToolbarActions(
            <>
                <LinkBack className='btn btn-neutral text-primary' to={`?w=role_create&id=new`} >Nuevo rol de usuario</LinkBack>
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