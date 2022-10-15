import { Card } from 'react-bootstrap'
import { OccupationList } from '../components'

export const OccupationListPage = () => {
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