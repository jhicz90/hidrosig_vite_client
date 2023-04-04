import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Card } from 'react-bootstrap'
import moment from 'moment'
import { TagNewReg } from '../../../components'
import { structureApi } from '../../../store/actions'

export const StructureBanner = () => {

    const { strid } = useParams()
    const { data = null } = useSelector(structureApi.endpoints.getStructureById.select(strid))

    return (
        <Card>
            <Card.Body>
                <div className='row align-items-center g-3 text-center text-xxl-start'>
                    <div className='col-12 col-sm-auto flex-1'>
                        <TagNewReg time={data.createdAt} />
                        <h3 className='fw-bolder mb-2'>{data.name}</h3>
                        <p className='fw-light'>Fecha de construcción: {moment(data.dateCons).format('L')}</p>
                        <p className='fw-light'>Fecha de inventario: {moment(data.dateInvt).format('L')}</p>
                        <p className='fw-light'>Margen: {data.margin}</p>
                        <p className='fw-light'>Progresiva: {data.progressive}</p>
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}
