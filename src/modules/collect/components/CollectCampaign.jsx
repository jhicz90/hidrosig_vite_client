import { Card } from 'react-bootstrap'
import validator from 'validator'
import { BsCashCoin } from 'react-icons/bs'
import { CropCampaignEdit } from '..'
import { Liner } from '../../../components'
import { useCollectStore } from '../../../hooks'

export const CollectCampaign = ({ tabId = '' }) => {

    const { getCmpActiveByTabId } = useCollectStore()
    const cmpActive = getCmpActiveByTabId(tabId)
    const cmp = cmpActive.split('-')

    return (
        validator.isMongoId(String(cmp[0])) && cmpActive
        &&
        <Card style={{ overflow: 'hidden' }}>
            <Card.Header>
                <div className='row justify-content-end'>
                    <div className='col-auto'>
                        <h6 className='text-uppercase fw-bold m-0'>PAGO DE TARIFA <BsCashCoin size={20} /></h6>
                    </div>
                </div>
            </Card.Header>
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