import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Card } from 'react-bootstrap'
import { LocationMap, TagNewReg } from '../../../components'
import { sectionApi } from '../../../store/actions'

export const SectionBanner = () => {

    const { sectid } = useParams()
    const { data = null } = useSelector(sectionApi.endpoints.getSectionById.select(sectid))

    return (
        <Card className='overflow-hidden'>
            <Card.Body>
                <div className='row align-items-center g-3 text-center text-xxl-start'>
                    <div className='col-12 col-sm-auto flex-1'>
                        <TagNewReg time={data.createdAt} />
                        <h3 className='fw-bolder mb-2'>{data.name}</h3>
                        <p className='fw-light'>Progresivas: {`${data.progressiveStart} - ${data.progressiveEnd}`}</p>
                    </div>
                </div>
            </Card.Body>
            {
                !!data.feature
                &&
                <div className='row'>
                    <div className='col'>
                        <LocationMap
                            className='my-0'
                            geometry={
                                [
                                    {
                                        type: 'Feature',
                                        ...data.feature.geometry
                                    }
                                ]
                            }
                            view={data.feature.view}
                            style={{
                                height: '400px'
                            }}
                        />
                    </div>
                </div>
            }
        </Card>
    )
}
