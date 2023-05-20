import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Card } from 'react-bootstrap'
import validator from 'validator'
import { useGetListCropByCollectQuery } from '../../../store/actions'

export const AreaFarmCollectCampaign = ({ tabId = '' }) => {

    const { listSearched = [] } = useSelector(state => state.collect)
    const cmpActive = useMemo(() => listSearched.find(ls => ls.id === tabId)?.campId || null, [listSearched])
    const { data } = useGetListCropByCollectQuery('26a64478-3c1e-4c6c-bc73-a57581fd704d')

    console.log(data)
    return (
        validator.isMongoId(String(cmpActive))
        &&
        <Card>
            <Card.Body>
                {cmpActive}
                {
                    JSON.stringify(data, null, 4)
                }
            </Card.Body>
        </Card>
    )
}