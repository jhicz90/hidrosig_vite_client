import { Card } from 'react-bootstrap'
import { PettyCashList } from '../components'

export const PettyCashListPage = () => {
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
