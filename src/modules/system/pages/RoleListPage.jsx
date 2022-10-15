import { Card } from 'react-bootstrap'
import { RoleList } from '../components'

export const RoleListPage = () => {
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