import { useParams } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import { MapLocation } from '@/components'
import { useGetListSectionByChannelQuery } from '@/store/actions'

export const ChannelView = () => {

    const { chnid } = useParams()
    const { data: sectionsIn = [] } = useGetListSectionByChannelQuery({ channel: chnid, search: '' })

    return (
        <Card className='overflow-hidden'>
            <div className='row'>
                <div className='col'>
                    <MapLocation
                        className='my-0'
                        geometry={sectionsIn.filter(({ feature }) => feature !== null).map(sect => sect.feature)}
                        style={{
                            height: '400px'
                        }}
                    />
                </div>
            </div>
        </Card>
    )
}
