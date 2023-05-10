import { Card } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { TagOpened } from '..'
import { TagNewReg } from '../../../components'
import { yearrateApi } from '../../../store/actions'

export const YearRateBanner = () => {

    const { yrtid } = useParams()
    const { data = null } = useSelector(yearrateApi.endpoints.getYearRateById.select(yrtid))

    return (
        <Card>
            <Card.Body>
                <div className='row align-items-center g-3 text-center text-xl-start'>
                    <div className='col-12 col-sm-auto flex-1'>
                        <TagNewReg time={data.createdAt} />
                        <TagOpened yearRateId={data._id} opened={data.opened} />
                        <h3 className='fw-bolder mb-2'>{`${data.year} - ${data.campaign === 1 ? 'CHICA - I' : 'GRANDE - II'}`}</h3>
                        <div className=''>Nombre del año: {data.nameYear}</div>
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}
