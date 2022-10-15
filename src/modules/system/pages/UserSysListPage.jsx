import { Card } from 'react-bootstrap'
import { UserSysList } from '../components'

export const UserSysListPage = () => {
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