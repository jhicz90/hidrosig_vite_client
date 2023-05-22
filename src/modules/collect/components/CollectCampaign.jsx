import { Card } from 'react-bootstrap'
import validator from 'validator'
import { useCollectStore } from '../../../hooks'
import { CropCampaignEdit } from '..'
import { Liner } from '../../../components'

export const CollectCampaign = ({ tabId = '' }) => {

    const { getCmpActiveByTabId } = useCollectStore()
    const cmpActive = getCmpActiveByTabId(tabId)
    const cmp = cmpActive.split('-')

    return (
        validator.isMongoId(String(cmp[0])) && cmpActive
        &&
        <Card style={{ overflow: 'hidden' }}>
            <Card.Body>
                <Liner>Pago Tarifa</Liner>
            </Card.Body>
            <div className='row'>
                <div className='col-12'>
                    <CropCampaignEdit campaignId={cmp[0]} inputIrrig={cmp[1]} />
                </div>
            </div>
            <Card.Body>
                Aqui iran las opciones de como pagar
            </Card.Body>
        </Card>
    )
}