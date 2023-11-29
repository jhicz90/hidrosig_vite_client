import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Card } from 'react-bootstrap'
import { MapLocation } from '../../../components'
import { sectionApi } from '../../../store/actions'

export const SectionView = () => {

    const { sectid } = useParams()
    const { data = null } = useSelector(sectionApi.endpoints.getSectionById.select(sectid))

    return (
        <Card className='overflow-hidden'>
            {
                !!data.feature
                    ?
                    <div className='row'>
                        <div className='col'>
                            <MapLocation
                                className='my-0'
                                geometry={
                                    [
                                        data.feature
                                    ]
                                }
                                style={{
                                    height: '400px'
                                }}
                            />
                        </div>
                    </div>
                    :
                    <div className='d-flex align-items-center justify-content-center' style={{ height: '400px' }}>
                        No ahi linea geografica definida en el tramo
                    </div>
            }
        </Card>
    )
}
