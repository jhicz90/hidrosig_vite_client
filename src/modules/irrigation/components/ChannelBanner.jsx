import { useParams } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import moment from 'moment'
import { MapLocation, TagNewReg } from '../../../components'
import { useGetChannelByIdQuery, useGetListSectionByChannelQuery } from '../../../store/actions'

export const ChannelBanner = () => {

    const { strid } = useParams()
    const { data = null } = useGetChannelByIdQuery(strid)
    const { data: sectionsIn = [], isLoading } = useGetListSectionByChannelQuery({ channel: data?._id, search: '' }, { skip: !data })

    return (
        <Card className='overflow-hidden'>
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
            <div className='row'>
                <div className='col'>
                    <MapLocation
                        className='my-0'
                        geometry={
                            sectionsIn.filter(({ feature }) => feature !== null).map(sect => sect.feature)
                        }
                        style={{
                            height: '400px'
                        }}
                    />
                </div>
            </div>
        </Card>
    )
}
