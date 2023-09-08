import { useParams } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import moment from 'moment'
import { MapLocation, TagNewReg } from '../../../components'
import { useGetChannelByIdQuery, useGetListSectionByChannelQuery } from '../../../store/actions'

export const ChannelView = () => {

    const { strid } = useParams()
    const { data = null } = useGetChannelByIdQuery(strid)
    const { data: sectionsIn = [], isLoading } = useGetListSectionByChannelQuery({ channel: data?._id, search: '' }, { skip: !data })

    return (
        <Card className='overflow-hidden'>
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
